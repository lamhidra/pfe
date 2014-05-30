using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PFE.Web.Core.Helpers.VM
{

    public interface IProfil
    {
        string Login { get; set; }
        string Password { get; set; }
    }

    public interface IFormation
    {

        DateTime DateDebut { get; set; }
        DateTime DateFin { get; set; }
        string Description { get; set; }
        int NombreMaxApprenants { get; set; }
        string NomOrganisme { get; set; }
        string Titre { get; set; }

    }

    public interface IFormationExamen
    {
        int MaxApprenant { get; set; }
        int NombreApprenantPasserExamen { get; set; }

        List<int> ListMaxApprenants { get; set; }
        List<long> ListId { get; set; }

    }
    public class FormationVM : IProfil, IFormation, IFormationExamen
    {
        public int MaxApprenant { get; set; }
        public int NombreApprenantPasserExamen { get; set; }

        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public string Description { get; set; }
        public int NombreMaxApprenants { get; set; }
        public string NomOrganisme { get; set; }
        public string Titre { get; set; }

        public string Login { get; set; }
        public string Password { get; set; }

        public List<int> ListMaxApprenants { get; set; }
        public List<long> ListId { get; set; }

    }
}