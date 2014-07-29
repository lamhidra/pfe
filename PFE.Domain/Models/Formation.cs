using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class Formation
    {

        public Formation() 
        {
            //DateDebut = DateTime.Now;
            //DateFin = DateTime.Now;
        }
        public int FormationID { get; set; }

        public DateTime DateDebut { get; set; }
        public DateTime  DateFin { get; set; }
        public string Description { get; set; }
        public int NombreMaxApprenants { get; set; }
        public string NomOrganisme { get; set; }
        public string Titre { get; set; }

        public virtual ICollection<Apprenant> Apprenants { get; set; }
       
       // public virtual Profil Profil { get; set; }

    }

}
