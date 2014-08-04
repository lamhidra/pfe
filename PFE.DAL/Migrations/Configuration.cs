namespace PFE.DAL.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
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

            if (!RoleManager.RoleExists("Administrateur"))
            {
                RoleManager.Create(new IdentityRole("Administrateur"));

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
                    UserManager.AddToRole(user.Id, "Administrateur");
                }
            }
            if (UserManager.FindByName("formateur1") == null)
            {
                var user = new ApplicationUser() { UserName = "formateur1", Email = "formateur@formateur.com", EmailConfirmed = true };
                var result = UserManager.Create(user, "formateur123");
                if (result.Succeeded)
                {
                    UserManager.AddToRole(user.Id, "Formateur");
                }
            }
        }
    }
}
