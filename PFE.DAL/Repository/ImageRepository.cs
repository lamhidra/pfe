using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Repository
{
    public class ImageRepository : RepositoryBase<Image>, IImageRepository
    {
        public ImageRepository(IDatabaseFactory databaseFactory) : base(databaseFactory) { }
    }

    public interface IImageRepository : IRepository<Image> { }
}
