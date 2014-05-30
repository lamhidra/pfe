using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class HistoriqueApprenantRepository : RepositoryBase<HistoriqueApprenant>, IHistoriqueApprenantRepository
    {
        public HistoriqueApprenantRepository(IDatabaseFactory databaseFactory) : base(databaseFactory) { }
    }

    public interface IHistoriqueApprenantRepository : IRepository<HistoriqueApprenant> { }
}
