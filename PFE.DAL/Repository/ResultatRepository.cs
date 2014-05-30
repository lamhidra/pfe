using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class ResultatRepository : RepositoryBase<Resultat>, IResultatRepository
    {
        public ResultatRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory) { 
        }
    }

    public interface IResultatRepository : IRepository<Resultat> { }
}
