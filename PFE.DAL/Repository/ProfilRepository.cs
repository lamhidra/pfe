using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class ProfilRepository : RepositoryBase<Profil>,  IProfilRepository
    {
        public ProfilRepository(IDatabaseFactory databaseFactory) 
           : base(databaseFactory){ 
        
        }

        public bool LookIfExist(Profil profil)
        {
            IEnumerable<Profil> ListProfil = GetAll();

            foreach(Profil p in ListProfil ) {
                if (p.Login == profil.Login && p.Password == profil.Password)
                    return true;
            }

            return false;
        }
    }

    public interface IProfilRepository : IRepository<Profil> 
    {
       bool LookIfExist(Profil profil);
    } 
}
