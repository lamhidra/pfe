using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;
using System.Linq.Expressions;
using System.Data.Entity;

namespace PFE.DAL.Repository
{
    public class FormationExamenRepository : RepositoryBase<FormationExamen>, IFormationExamenRepository
    {
        public FormationExamenRepository(IDatabaseFactory databaseFactory)
            : base(databaseFactory) { 
        
        }

        public void DeleteFormationExamens(Expression<Func<FormationExamen, bool>> where)
        {
            DataContext.FormationExamens.RemoveRange(DataContext.FormationExamens.Where(where));
        }
    }

    public interface IFormationExamenRepository : IRepository<FormationExamen> {

        void DeleteFormationExamens(Expression<Func<FormationExamen, bool>> where);
    }
}
