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
    public interface IApprenantService 
    {
        Apprenant GetApprenantByID(long id);
        IEnumerable<Apprenant> GetALLApprenant();
        void Delete(Apprenant apprenant);
        void AddApprenant(Apprenant apprenant);
        void SaveApprenant();
    }

    public class ApprenantService : IApprenantService
    {
        private readonly IApprenantRepository apprenantRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IFormationRepository formationRepository;

        public ApprenantService(IApprenantRepository apprenantRepository,
              IUnitOfWork unitOfWork, IFormationRepository formationRepository) 
        {
            this.apprenantRepository = apprenantRepository;
            this.unitOfWork = unitOfWork;
            this.formationRepository = formationRepository;
        }

        public Apprenant GetApprenantByID(long id) {
            return apprenantRepository.GetById(id);
        }

        public IEnumerable<Apprenant> GetALLApprenant() 
        {
            return apprenantRepository.GetAll();
        }

        public void Delete(Apprenant apprenant)
        {
            apprenantRepository.Delete(apprenant);
            SaveApprenant();
        }

        public void AddApprenant(Apprenant apprenant)
        {
            apprenantRepository.Add(apprenant);
            SaveApprenant();
        }

        public void SaveApprenant() 
        {
            unitOfWork.Commit();
        }

        
    }
}
