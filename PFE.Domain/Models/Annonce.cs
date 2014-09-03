using PFE.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PFE.Domain
{
    public class Annonce
    {
        public Annonce() 
        {

        }
        public int AnnonceID { get; set; }
        public string Titre { get; set; }
        public string Description { get; set; }
        public string Logo { get; set; }
        public virtual FicheDescriptive FicheDescriptive { get; set; }
    }
}
