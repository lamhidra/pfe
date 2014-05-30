using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class FormationExamen
    {
        public int FormationExamenID { get; set; }
        public int MaxApprenant { get; set; }
        public int NombreApprenantPasserExamen { get; set; }
        public int FormationID { get; set; }
        public int ExamenID { get; set; }

        public virtual Formation Formation { get; set; }
        public virtual Examen Examen { get; set; }
    }
}
