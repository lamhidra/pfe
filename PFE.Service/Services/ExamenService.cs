using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;
using PFE.DAL.Repository;
using PFE.DAL;

namespace PFE.Service.Services
{
    public interface IExamenService 
    {
        IEnumerable<Examen> getExamens();
        Examen getExamenById(long id);
        void DeleteExamen(Examen examen);
        void UpdateExamen(Examen examen);
        void AddExamen(Examen examen);
        IEnumerable<Examen> getListExamensParCategorie(int categorie);

        int getExamenCategorie(long id);
        string getExamenTitre(long id);
        void SaveExamen();
    }
    
    public class ExamenService : IExamenService
    {
        private readonly IExamenRepository examenRepository;
        private readonly IUnitOfWork unitOfWork;

        public ExamenService(IExamenRepository examenRepository, IUnitOfWork unitOfWork)
        {
            this.examenRepository = examenRepository;
            this.unitOfWork = unitOfWork;
        }


        public IEnumerable<Examen> getExamens()
        {
            return examenRepository.GetAll();
        }

        public Examen getExamenById(long id)
        {
            return examenRepository.GetById(id);
        }

        public void DeleteExamen(Examen examen)
        {
             examenRepository.Delete(examen);
             SaveExamen();
        }

        public void UpdateExamen(Examen examen)
        {
            examenRepository.Update(examen);
            SaveExamen();
        }

        public void AddExamen(Examen examen)
        {
            examenRepository.Add(examen);
            SaveExamen();
        }

        public IEnumerable<Examen> getListExamensParCategorie(int categorie)
        {
            Categorie c = Categorie.Applications;
            switch (categorie)
            {
                case (int)(Categorie.BaseDeDonnee): c = Categorie.BaseDeDonnee; break;
                case (int)(Categorie.Desktop): c = Categorie.Desktop; break;
                case (int)(Categorie.Developpeur): c = Categorie.Developpeur; break;
                case (int)(Categorie.Serveur): c = Categorie.Serveur; break;
            }
            
            return examenRepository.GetMany(e => e.Categorie == c);
        }


        public int getExamenCategorie(long id)
        {
            return (int)(examenRepository.Get(e => e.ExamenID == id)).Categorie;
        }

        public string getExamenTitre(long id) 
        { 
            return (examenRepository.Get(e => e.ExamenID == id)).Titre;
        }
        public void SaveExamen()
        {
            unitOfWork.Commit();
        }

    }
}
