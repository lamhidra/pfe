
namespace PFE.DAL
{
    public class DatabaseFactory : Disposable, IDatabaseFactory
    {
        private DBPFEContext dataContext;
        public DBPFEContext Get()
        {
            return dataContext ?? (dataContext = new DBPFEContext());
        }
        protected override void DisposeCore()
        {
            if (dataContext != null)
                dataContext.Dispose();
        }
    }
}
