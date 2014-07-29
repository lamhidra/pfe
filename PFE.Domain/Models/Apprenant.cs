using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class Apprenant
    {

        public Apprenant()
        {
        }
        public int ApprenantID { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Prenom { get; set; }
    }
}
