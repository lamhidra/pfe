using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public  class Question
    {
        public int QuestionID { get; set; }
        public string text { get; set; }
        public int Note { get; set; }
        public TypeQuestion TypeQuestion { get; set; }

        public int ExamenID { get; set; }
        public virtual Examen Examen { get; set; }

        public virtual ICollection<Reponse> Reponses { get; set; }
        public virtual ICollection<Image> Images { get; set; }
    }

    public enum TypeQuestion 
    {
        VraiFaux,
        Autre
    }
}
