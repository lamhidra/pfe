using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class HistoriqueFormationRepository : RepositoryBase<HistoriqueFormation>, IHistoriqueFormationRepository
    {
        public HistoriqueFormationRepository(IDatabaseFactory databaseFactory) : base(databaseFactory) { }
    }

    public interface IHistoriqueFormationRepository : IRepository<HistoriqueFormation> { }
}
