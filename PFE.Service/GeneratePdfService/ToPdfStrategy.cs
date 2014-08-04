using iTextSharp.text;
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
        void createPdf(FormationDocument document, Document pdfDoc);
        IToPdf Strategy {  set; }
    }

    public class ToPdfStrategy : IToPdfStrategy
    {
        private IToPdf _strategy;

        public IToPdf Strategy { set { _strategy = value; } }

        public void createPdf(FormationDocument document, Document pdfDoc)
        {
             _strategy.createPdf(document, pdfDoc);
        }
    }
}
