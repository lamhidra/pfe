namespace PFE.DAL.Migrations
{
    using PFE.Domain;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PFE.DAL.DBPFEContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(PFE.DAL.DBPFEContext context)
        {
            context.Formations.AddOrUpdate(
                f => f.Titre,
                new Formation
                {
                    FormationID = 8,
                    DateDebut = DateTime.Now,
                    DateFin = DateTime.Now,
                    Description = "desc",
                    NombreMaxApprenants = 10,
                    NomOrganisme = "emsi",
                    Titre = "formation"
                },
                new Formation
                {
                    FormationID = 9,
                    DateDebut = DateTime.Now,
                    DateFin = DateTime.Now,
                    Description = "desc1",
                    NombreMaxApprenants = 10,
                    NomOrganisme = "emsi1",
                    Titre = "formation1"
                },
                new Formation
                {
                    FormationID = 10,
                    DateDebut = DateTime.Now,
                    DateFin = DateTime.Now,
                    Description = "desc2",
                    NombreMaxApprenants = 10,
                    NomOrganisme = "emsi2",
                    Titre = "formation2"
                },
                new Formation
                {
                    FormationID = 11,
                    DateDebut = DateTime.Now,
                    DateFin = DateTime.Now,
                    Description = "desc3",
                    NombreMaxApprenants = 10,
                    NomOrganisme = "emsi3",
                    Titre = "formation3"
                }

            );

            context.SaveChanges();
        }
    }
}
