using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class NiveauExpertise
    {
        public int NiveauExpertiseID { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
        public Grade grade { get; set; }
    }

    public enum Grade {
    
        Debutant,
        Intermediaire,
        Avance,
        Expert
    }
}
