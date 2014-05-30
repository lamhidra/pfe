using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class ReponseRepository : RepositoryBase<Reponse>, IReponseRepository 
    {
        public ReponseRepository(IDatabaseFactory databaseFactory) 
            : base(databaseFactory) { }
    }

    public interface IReponseRepository : IRepository<Reponse> { }
}
