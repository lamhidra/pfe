using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace PFE.Domain
{
    public class Annonce
    {
        public int AnnonceID { get; set; }
        public string Titre { get; set; }
        public string Description { get; set; }
        public string Lien { get; set; }

        public byte[] Pdf { get; set; }

        public string ToPdfImpl { get; set; }
        public string JsonData { get; set; }

        public int PdfSize { get; set; }

        public virtual ICollection<Image> Images { get; set; }
    }
}
