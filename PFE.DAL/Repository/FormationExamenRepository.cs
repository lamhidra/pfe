using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class FormationExamenRepository : RepositoryBase<FormationExamen>, IFormationExamenRepository
    {
        public FormationExamenRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory) { 
        
        }
    }

    public interface IFormationExamenRepository : IRepository<FormationExamen> { }
}
