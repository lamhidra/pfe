using PFE.DAL.Configuration;
using PFE.Domain;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.DAL
{
    public class DBPFEContext : DbContext
    {
        public DBPFEContext()
        { 
        
        }

        public void Commit() {
           // base.SaveChangesAsync();
            base.SaveChanges();
        }

        public DbSet<Formation> Formations { get; set; }
        public DbSet<Apprenant> Apprenants { get; set; }
        public DbSet<Examen> Examens { get; set; }
        public DbSet<Resultat> Resultats { get; set; }
        public DbSet<NiveauExpertise> NiveauExpertises { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Reponse> Reponses { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Annonce> Annonces { get; set; }
        public DbSet<FormationExamen> FormationExamens { get; set; }
        public DbSet<HistoriqueFormation> HistoriqueFormations { get; set; }
        public DbSet<HistoriqueApprenant> HistoriqueApprenants { get; set; }
        public DbSet<Profil> Profils { get; set; }
        public DbSet<Visiteur> Visiteurs { get; set; }


        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();


            modelBuilder.Configurations.Add(new AnnonceConfiguration());
            modelBuilder.Configurations.Add(new ApprenantConfiguration());
            modelBuilder.Configurations.Add(new ExamenConfiguration());
            modelBuilder.Configurations.Add(new FormationConfiguration());
            modelBuilder.Configurations.Add(new FormationExamenConfiguration());
            modelBuilder.Configurations.Add(new ImageConfiguration());
            modelBuilder.Configurations.Add(new NiveauExpertiseConfiguration());
            modelBuilder.Configurations.Add(new QuestionConfiguration());
            modelBuilder.Configurations.Add(new ReponseConfiguration());
            modelBuilder.Configurations.Add(new ResultatConfiguration());
            modelBuilder.Configurations.Add(new HistoriqueFormationConfiguration());
            modelBuilder.Configurations.Add(new HistoriqueApprenantConfiguration());
            modelBuilder.Configurations.Add(new ProfilConfiguration());

        }
    }
}
