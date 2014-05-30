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
    }

    public interface IProfilRepository : IRepository<Profil> 
    {
    
    } 
}
