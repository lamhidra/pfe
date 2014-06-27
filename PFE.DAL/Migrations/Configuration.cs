namespace PFE.DAL.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using PFE.Domain;
    using PFE.Domain.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<PFE.DAL.DBPFEContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            AutomaticMigrationDataLossAllowed = true;
        }

        protected override void Seed(PFE.DAL.DBPFEContext context)
        {
            UserManager<ApplicationUser> UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            RoleManager<IdentityRole> RoleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(context));

            if (!RoleManager.RoleExists("Administrator"))
            {
                RoleManager.Create(new IdentityRole("Administrator"));

            }

            if (!RoleManager.RoleExists("Visiteur"))
            {
                RoleManager.Create(new IdentityRole("Visiteur"));

            }

            if (!RoleManager.RoleExists("Formateur"))
            {
                RoleManager.Create(new IdentityRole("Formateur"));

            }

            if (!RoleManager.RoleExists("Formation"))
            {
                RoleManager.Create(new IdentityRole("Formation"));

            }

            if (UserManager.FindByName("admin") == null)
            {
                var user = new ApplicationUser() { UserName = "admin", Email = "admin@mydomain.com", EmailConfirmed = true };
                var result = UserManager.Create(user, "admin1234");
                if (result.Succeeded)
                {
                    UserManager.AddToRole(user.Id, "Administrator");
                }
            }
            /*context.Formations.AddOrUpdate(
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

            );*/

            context.SaveChanges();
        }
    }
}
