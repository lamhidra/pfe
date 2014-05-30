using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class AnnonceRepository : RepositoryBase<Annonce>, IAnnonceRepository
    {
        public AnnonceRepository(IDatabaseFactory databaseFactory) 
           : base(databaseFactory){ 
        
        }
    }

    public interface IAnnonceRepository : IRepository<Annonce> 
    {
        
    }
}
