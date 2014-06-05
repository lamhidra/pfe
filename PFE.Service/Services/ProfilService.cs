using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.DAL;
using PFE.Domain;
using PFE.DAL.Repository;

namespace PFE.Service.Services
{

    public interface IProfilService {

        IEnumerable<Profil> getProfils();
        Profil getProfilById(long id);
        void DeleteProfil(Profil profil);
        void UpdateProfil(Profil profil);
        void AddProfil(Profil profil);
        void SaveProfil();

        Profil GetFormationProfil(long id);

        bool lookIfExist(Profil profil);
    
    }
    public class ProfilService : IProfilService
    {
        private readonly IProfilRepository profilRepository;
        private readonly IUnitOfWork unitOfWork;

        public ProfilService(IProfilRepository profilRepository, IUnitOfWork unitOfWork)
        {
            this.profilRepository = profilRepository;
            this.unitOfWork = unitOfWork;
        }



        public IEnumerable<Profil> getProfils()
        {
            return profilRepository.GetAll();
        }

        public Profil getProfilById(long id)
        {
            return profilRepository.GetById(id);
        }

        public void DeleteProfil(Profil profil)
        {
            profilRepository.Delete(profil);
            SaveProfil();
        }

        public void UpdateProfil(Profil profil)
        {
            profilRepository.Update(profil);
            SaveProfil();
        }

        public void AddProfil(Profil profil)
        {
            profilRepository.Add(profil);
            SaveProfil();
        }

        public bool lookIfExist(Profil profil)
        {
            return profilRepository.LookIfExist(profil);
        }

        public Profil GetFormationProfil(long id)
        {
            return profilRepository.Get(p => p.FormationID == id);
        }

        public void SaveProfil()
        {
            unitOfWork.Commit();
        }

    }
}
