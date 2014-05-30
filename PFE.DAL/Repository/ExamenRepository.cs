using PFE.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.DAL.Repository
{
    public class ExamenRepository : RepositoryBase<Examen>, IExamenRepository
    {
        public ExamenRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory) { 
        
        }
    }

    public interface IExamenRepository : IRepository<Examen> { }
}
