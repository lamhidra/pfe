using System;


namespace PFE.DAL
{
    public interface IDatabaseFactory : IDisposable
    {
        DBPFEContext Get();
    }
}
