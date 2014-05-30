using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class ApprenantRepository : RepositoryBase<Apprenant>, IApprenantRepository
    {
        public ApprenantRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory) { 
        
        }
    }

    public interface IApprenantRepository : IRepository<Apprenant> { }
}
