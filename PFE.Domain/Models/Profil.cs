using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class Profil
    {
        public int ProfilID { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }

        public int VisiteurID { get; set; }

        public int FormationID { get; set; }
    }
}

