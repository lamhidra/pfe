using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class QuestionRepository : RepositoryBase<Question> , IQuestionRepository
    {
        public QuestionRepository(IDatabaseFactory databaseFactory)
            :base(databaseFactory){ }
    }

    public interface IQuestionRepository : IRepository<Question> { }
}
