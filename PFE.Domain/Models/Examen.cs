using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class Examen
    {
        public int ExamenID { get; set; }
        public string Description { get; set; }
        public Double Duree { get; set; }
        public bool Permission { get; set; }
        public string Titre { get; set; }
        public Categorie Categorie { get; set; }

        public virtual ICollection<NiveauExpertise> NiveauExpertises { get; set; }
        public virtual ICollection<Question> Questions { get; set; }
    }

    public enum Categorie
    {

        Serveur,
        Desktop,
        Applications,
        BaseDeDonnee,
        Developpeur
    }
}
