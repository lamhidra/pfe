namespace PFE.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class INI : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Annonce",
                c => new
                    {
                        AnnonceID = c.Int(nullable: false, identity: true),
                        Titre = c.String(),
                        Description = c.String(),
                        Lien = c.String(),
                    })
                .PrimaryKey(t => t.AnnonceID);
            
            CreateTable(
                "dbo.Image",
                c => new
                    {
                        ImageID = c.Int(nullable: false, identity: true),
                        Numero = c.Int(nullable: false),
                        ObjetImage = c.Binary(),
                        Annonce_AnnonceID = c.Int(),
                        Question_QuestionID = c.Int(),
                        Reponse_ReponseID = c.Int(),
                    })
                .PrimaryKey(t => t.ImageID)
                .ForeignKey("dbo.Annonce", t => t.Annonce_AnnonceID)
                .ForeignKey("dbo.Question", t => t.Question_QuestionID)
                .ForeignKey("dbo.Reponse", t => t.Reponse_ReponseID)
                .Index(t => t.Annonce_AnnonceID)
                .Index(t => t.Question_QuestionID)
                .Index(t => t.Reponse_ReponseID);
            
            CreateTable(
                "dbo.Apprenant",
                c => new
                    {
                        ApprenantID = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        Name = c.String(),
                        Prenom = c.String(),
                        Formation_FormationID = c.Int(),
                    })
                .PrimaryKey(t => t.ApprenantID)
                .ForeignKey("dbo.Formation", t => t.Formation_FormationID)
                .Index(t => t.Formation_FormationID);
            
            CreateTable(
                "dbo.Examen",
                c => new
                    {
                        ExamenID = c.Int(nullable: false, identity: true),
                        Description = c.String(),
                        Duree = c.Double(nullable: false),
                        Permission = c.Boolean(nullable: false),
                        Titre = c.String(),
                        Categorie = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ExamenID);
            
            CreateTable(
                "dbo.NiveauExpertise",
                c => new
                    {
                        NiveauExpertiseID = c.Int(nullable: false, identity: true),
                        Min = c.Int(nullable: false),
                        Max = c.Int(nullable: false),
                        grade = c.Int(nullable: false),
                        Examen_ExamenID = c.Int(),
                    })
                .PrimaryKey(t => t.NiveauExpertiseID)
                .ForeignKey("dbo.Examen", t => t.Examen_ExamenID)
                .Index(t => t.Examen_ExamenID);
            
            CreateTable(
                "dbo.Question",
                c => new
                    {
                        QuestionID = c.Int(nullable: false, identity: true),
                        text = c.String(),
                        Point = c.Int(nullable: false),
                        TypeQuestion = c.Int(nullable: false),
                        ExamenID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.QuestionID)
                .ForeignKey("dbo.Examen", t => t.ExamenID, cascadeDelete: true)
                .Index(t => t.ExamenID);
            
            CreateTable(
                "dbo.Reponse",
                c => new
                    {
                        ReponseID = c.Int(nullable: false, identity: true),
                        Etat = c.Boolean(nullable: false),
                        Text = c.String(),
                        QuestionID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ReponseID)
                .ForeignKey("dbo.Question", t => t.QuestionID, cascadeDelete: true)
                .Index(t => t.QuestionID);
            
            CreateTable(
                "dbo.FormationExamen",
                c => new
                    {
                        FormationExamenID = c.Int(nullable: false, identity: true),
                        MaxApprenant = c.Int(nullable: false),
                        NombreApprenantPasserExamen = c.Int(nullable: false),
                        FormationID = c.Int(nullable: false),
                        ExamenID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.FormationExamenID)
                .ForeignKey("dbo.Examen", t => t.ExamenID, cascadeDelete: true)
                .ForeignKey("dbo.Formation", t => t.FormationID, cascadeDelete: true)
                .Index(t => t.FormationID)
                .Index(t => t.ExamenID);
            
            CreateTable(
                "dbo.Formation",
                c => new
                    {
                        FormationID = c.Int(nullable: false, identity: true),
                        DateDebut = c.DateTime(nullable: false),
                        DateFin = c.DateTime(nullable: false),
                        Description = c.String(),
                        NombreMaxApprenants = c.Int(nullable: false),
                        NomOrganisme = c.String(),
                        Titre = c.String(),
                        Profil_ProfilID = c.Int(),
                    })
                .PrimaryKey(t => t.FormationID)
                .ForeignKey("dbo.Profil", t => t.Profil_ProfilID)
                .Index(t => t.Profil_ProfilID);
            
            CreateTable(
                "dbo.Profil",
                c => new
                    {
                        ProfilID = c.Int(nullable: false, identity: true),
                        Login = c.String(),
                        Password = c.String(),
                        VisiteurID = c.Int(nullable: false),
                        FormationID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProfilID);
            
            CreateTable(
                "dbo.HistoriqueApprenant",
                c => new
                    {
                        HistoriqueApprenantID = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        Nom = c.String(),
                        Prenom = c.String(),
                        HistoriqueFormation_HistoriqueFormationID = c.Int(),
                    })
                .PrimaryKey(t => t.HistoriqueApprenantID)
                .ForeignKey("dbo.HistoriqueFormation", t => t.HistoriqueFormation_HistoriqueFormationID)
                .Index(t => t.HistoriqueFormation_HistoriqueFormationID);
            
            CreateTable(
                "dbo.HistoriqueFormation",
                c => new
                    {
                        HistoriqueFormationID = c.Int(nullable: false, identity: true),
                        DateDebut = c.DateTime(nullable: false),
                        DateFin = c.DateTime(nullable: false),
                        Description = c.String(),
                        NombreMaxApprenants = c.Int(nullable: false),
                        NomOrganisme = c.String(),
                        titre = c.String(),
                    })
                .PrimaryKey(t => t.HistoriqueFormationID);
            
            CreateTable(
                "dbo.Resultat",
                c => new
                    {
                        ResultatID = c.Int(nullable: false, identity: true),
                        IsValid = c.Boolean(nullable: false),
                        Grade = c.Int(nullable: false),
                        NoteObtenu = c.Int(nullable: false),
                        ApprenantID = c.Int(nullable: false),
                        ExamenID = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ResultatID)
                .ForeignKey("dbo.Apprenant", t => t.ApprenantID, cascadeDelete: true)
                .ForeignKey("dbo.Examen", t => t.ExamenID, cascadeDelete: true)
                .Index(t => t.ApprenantID)
                .Index(t => t.ExamenID);
            
            CreateTable(
                "dbo.Visiteur",
                c => new
                    {
                        VisiteurID = c.Int(nullable: false, identity: true),
                        Email = c.String(),
                        Nom = c.String(),
                        Prenom = c.String(),
                        Discriminator = c.String(nullable: false, maxLength: 128),
                        Profil_ProfilID = c.Int(),
                    })
                .PrimaryKey(t => t.VisiteurID)
                .ForeignKey("dbo.Profil", t => t.Profil_ProfilID)
                .Index(t => t.Profil_ProfilID);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Visiteur", "Profil_ProfilID", "dbo.Profil");
            DropForeignKey("dbo.Resultat", "ExamenID", "dbo.Examen");
            DropForeignKey("dbo.Resultat", "ApprenantID", "dbo.Apprenant");
            DropForeignKey("dbo.HistoriqueApprenant", "HistoriqueFormation_HistoriqueFormationID", "dbo.HistoriqueFormation");
            DropForeignKey("dbo.FormationExamen", "FormationID", "dbo.Formation");
            DropForeignKey("dbo.Formation", "Profil_ProfilID", "dbo.Profil");
            DropForeignKey("dbo.Apprenant", "Formation_FormationID", "dbo.Formation");
            DropForeignKey("dbo.FormationExamen", "ExamenID", "dbo.Examen");
            DropForeignKey("dbo.Reponse", "QuestionID", "dbo.Question");
            DropForeignKey("dbo.Image", "Reponse_ReponseID", "dbo.Reponse");
            DropForeignKey("dbo.Image", "Question_QuestionID", "dbo.Question");
            DropForeignKey("dbo.Question", "ExamenID", "dbo.Examen");
            DropForeignKey("dbo.NiveauExpertise", "Examen_ExamenID", "dbo.Examen");
            DropForeignKey("dbo.Image", "Annonce_AnnonceID", "dbo.Annonce");
            DropIndex("dbo.Visiteur", new[] { "Profil_ProfilID" });
            DropIndex("dbo.Resultat", new[] { "ExamenID" });
            DropIndex("dbo.Resultat", new[] { "ApprenantID" });
            DropIndex("dbo.HistoriqueApprenant", new[] { "HistoriqueFormation_HistoriqueFormationID" });
            DropIndex("dbo.Formation", new[] { "Profil_ProfilID" });
            DropIndex("dbo.FormationExamen", new[] { "ExamenID" });
            DropIndex("dbo.FormationExamen", new[] { "FormationID" });
            DropIndex("dbo.Reponse", new[] { "QuestionID" });
            DropIndex("dbo.Question", new[] { "ExamenID" });
            DropIndex("dbo.NiveauExpertise", new[] { "Examen_ExamenID" });
            DropIndex("dbo.Apprenant", new[] { "Formation_FormationID" });
            DropIndex("dbo.Image", new[] { "Reponse_ReponseID" });
            DropIndex("dbo.Image", new[] { "Question_QuestionID" });
            DropIndex("dbo.Image", new[] { "Annonce_AnnonceID" });
            DropTable("dbo.Visiteur");
            DropTable("dbo.Resultat");
            DropTable("dbo.HistoriqueFormation");
            DropTable("dbo.HistoriqueApprenant");
            DropTable("dbo.Profil");
            DropTable("dbo.Formation");
            DropTable("dbo.FormationExamen");
            DropTable("dbo.Reponse");
            DropTable("dbo.Question");
            DropTable("dbo.NiveauExpertise");
            DropTable("dbo.Examen");
            DropTable("dbo.Apprenant");
            DropTable("dbo.Image");
            DropTable("dbo.Annonce");
        }
    }
}
