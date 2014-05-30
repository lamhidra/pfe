using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class HistoriqueFormation
    {
        public int HistoriqueFormationID { get; set; }

        public DateTime DateDebut { get; set; }
        public DateTime DateFin { get; set; }
        public string Description { get; set; }
        public int NombreMaxApprenants { get; set; }
        public string NomOrganisme { get; set; }
        public string titre { get; set; }

        public virtual ICollection<HistoriqueApprenant> HistoriqueApprenants { get; set; }
    }
}
