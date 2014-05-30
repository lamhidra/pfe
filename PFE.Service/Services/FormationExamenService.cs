using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.DAL.Repository;
using PFE.DAL;
using PFE.Domain;

namespace PFE.Service.Services
{

    public interface IFormationExamenService {

        IEnumerable<FormationExamen> getFormationExamens();
        FormationExamen getFormationExamenById(long id);
        void DeleteFormationExamen(FormationExamen formationExamen);
        void UpdateFormationExamen(FormationExamen formationExamen);
        void AddFormationExamen(FormationExamen formationExamen);
        void SaveFormationExamen();
    }

    public class FormationExamenService : IFormationExamenService
    {
        private readonly IFormationExamenRepository formationExamenRepository;
        private readonly IUnitOfWork unitOfWork;

        public FormationExamenService(IFormationExamenRepository formationExamenRepository,
            IUnitOfWork unitOfWork)
        {
            this.formationExamenRepository = formationExamenRepository;
            this.unitOfWork = unitOfWork;
        }

        public IEnumerable<FormationExamen> getFormationExamens()
        {
            return formationExamenRepository.GetAll();
        }

        public FormationExamen getFormationExamenById(long id)
        {
            return formationExamenRepository.GetById(id);
        }

        public void DeleteFormationExamen(FormationExamen formationExamen)
        {
             formationExamenRepository.Delete(formationExamen);
             SaveFormationExamen();
        }

        public void UpdateFormationExamen(FormationExamen formationExamen)
        {
            formationExamenRepository.Update(formationExamen);
            SaveFormationExamen();
        }

        public void AddFormationExamen(FormationExamen formationExamen)
        {
            formationExamenRepository.Add(formationExamen);
            SaveFormationExamen();
        }

        public void SaveFormationExamen()
        {
            unitOfWork.Commit();
        }
    }
}
