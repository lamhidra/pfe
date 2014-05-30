using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class Reponse
    {
        public int ReponseID { get; set; }
        public bool Etat { get; set; }
        public string Text { get; set; }

        public int QuestionID { get; set; }
        public Question Question { get; set; }

        public virtual ICollection<Image> Images { get; set; }
    }
}
