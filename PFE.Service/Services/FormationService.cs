using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.DAL;
using PFE.DAL.Repository;
using PFE.Domain;

namespace PFE.Service.Services
{

    public interface IFormationService {

        IEnumerable<Formation> GetFormations();
        Formation GetFormationById(long id);
        void Delete(Formation formation);
        void UpdateFormation(Formation formation, Profil profil,
            List<long> ListIds, List<int> ListNombreApprenants);

        void AddFormation(Formation formation, Profil profil,
            List<long> ListIds, List<int> ListNombreApprenants);
        void Save();
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
            Save();
        }

        public void UpdateFormation(Formation formation, Profil profil,
            List<long> ListIds, List<int> ListNombreApprenants)
        {
            formationRespository.Update(formation);
            Save();


            formationExamenRepository.DeleteFormationExamens(f => f.FormationExamenID == formation.FormationID);
            Save();
            if (ListIds != null)
            {
                for (int i = 0; i < ListIds.Count; i++)
                {
                    FormationExamen formationExamen = new FormationExamen();
                    formationExamen.FormationID = formation.FormationID;
                    formationExamen.ExamenID = (int)ListIds[i];
                    formationExamen.MaxApprenant = ListNombreApprenants[i];
                    formationExamen.NombreApprenantPasserExamen = 0;
                    formationExamenRepository.Add(formationExamen);
                    Save();

                }
            }

            profilRepository.Update(profil);
        }

        public void AddFormation(Formation formation, Profil profil, List<long> ListIds, List<int> ListNombreApprenants) 
        {
            formationRespository.Add(formation);
            Save();


            if (ListIds != null)
            {
                for (int i = 0; i < ListIds.Count; i++)
                {
                    FormationExamen formationExamen = new FormationExamen();
                    formationExamen.FormationID = formation.FormationID;
                    formationExamen.ExamenID = (int)ListIds[i];
                    formationExamen.MaxApprenant = ListNombreApprenants[i];
                    formationExamen.NombreApprenantPasserExamen = 0;
                    formationExamenRepository.Add(formationExamen);
                    Save();

                }
            }

            //formationExamenRepository.
            profil.FormationID = formation.FormationID;
            profilRepository.Add(profil);
            Save();
        }

        public void Save() 
        {
            unitOfWork.Commit();
        }
    }
}
