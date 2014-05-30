using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class Resultat
    {
        public int ResultatID { get; set; }
        public bool IsValid { get; set; }
        public Grade Grade { get; set; }
        public int NoteObtenu { get; set; }

        public int ApprenantID { get; set; }
        public int ExamenID { get; set; }

        public virtual Examen Examen { get; set; }
        public virtual Apprenant Apprenant { get; set; }
    }
}
