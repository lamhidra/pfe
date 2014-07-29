using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Service.GeneratePdfService
{
    public interface IToPdfStrategy 
    {
        byte[] createPdf(FormationDocument document);
        IToPdf Strategy {  set; }
    }

    public class ToPdfStrategy : IToPdfStrategy
    {
        private IToPdf _strategy;

        public IToPdf Strategy { set { _strategy = value; } }

        public byte[] createPdf(FormationDocument document)
        {
            return _strategy.createPdf(document);
        }
    }
}
