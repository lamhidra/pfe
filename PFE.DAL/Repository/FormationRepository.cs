using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class FormationRepository : RepositoryBase<Formation>, IFormationRepository
    {
        public FormationRepository(IDatabaseFactory databaseFactory) 
            : base(databaseFactory){ }
    }

    public interface IFormationRepository : IRepository<Formation> 
    { 
    
    }
}
