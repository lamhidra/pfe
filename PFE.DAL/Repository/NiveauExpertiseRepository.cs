using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class NiveauExpertiseRepository : RepositoryBase<NiveauExpertise>, INiveauExpertiseRepository
    {
        public NiveauExpertiseRepository(IDatabaseFactory databaseFactory) : base(databaseFactory) { 
        }
    }

    public interface INiveauExpertiseRepository : IRepository<NiveauExpertise> { }
}
