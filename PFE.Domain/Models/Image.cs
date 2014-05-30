using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Domain
{
    public class Image
    {
        public int ImageID { get; set; }
        public int Numero { get; set; }
        public byte[] ObjetImage { get; set; }
    }
}
