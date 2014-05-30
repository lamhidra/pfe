using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.DAL;
using PFE.DAL.Repository;
using PFE.Domain;

namespace PFE.Service
{

    public interface IFormationService {

        IEnumerable<Formation> GetFormations();
        Formation GetFormationById(long id);
        void Delete(Formation formation);
        void update(Formation formation);

        void AddFormation(Formation formation, Profil profil,
            List<long> ListIds, List<int> ListNombreApprenants);
        void SaveFormation();
    }

    public class FormationService : IFormationService
    {

        private readonly IFormationRepository formationRespository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IFormationExamenRepository formationExamenRepository;
        private readonly IExamenRepository examenRepository;
        private readonly IProfilRepository profilRepository;

        public FormationService(IFormationRepository formationRespository, IUnitOfWork unitOfWork,
               IFormationExamenRepository formationExamenRepository, IExamenRepository examenRepository
               ,IProfilRepository profilRepository) 
        {
            this.formationRespository = formationRespository;
            this.unitOfWork = unitOfWork;
            this.formationExamenRepository = formationExamenRepository;
            this.examenRepository = examenRepository;
            this.profilRepository = profilRepository;
        }

        IEnumerable<Formation> IFormationService.GetFormations()
        {
            return formationRespository.GetAll();
        }

        Formation IFormationService.GetFormationById(long id)
        {
            return formationRespository.GetById(id);
        }

        public void Delete(Formation formation)
        {
            formationExamenRepository.Delete(f => f.FormationID == formation.FormationID);
            profilRepository.Delete(p => p.FormationID == formation.FormationID);
            formationRespository.Delete(formation);
            SaveFormation();
        }

        public void update(Formation formation)
        {
            formationRespository.Update(formation);
            SaveFormation();
        }

        public void AddFormation(Formation formation, Profil profil, List<long> ListIds, List<int> ListNombreApprenants) 
        {
            formationRespository.Add(formation);
            SaveFormation();


            for (int i = 0; i < ListIds.Count; i++)
            {
                FormationExamen formationExamen = new FormationExamen();
                formationExamen.FormationID = formation.FormationID;
                formationExamen.ExamenID = (int)ListIds[i];
                formationExamen.MaxApprenant = ListNombreApprenants[i];
                formationExamen.NombreApprenantPasserExamen = 0;
                formationExamenRepository.Add(formationExamen);
                SaveFormation();

            }

            //formationExamenRepository.
            profil.FormationID = formation.FormationID;
            profilRepository.Add(profil);
            SaveFormation();
        }

        public void SaveFormation() 
        {
            unitOfWork.Commit();
        }
    }
}
