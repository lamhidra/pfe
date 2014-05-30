using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PFE.Domain;

namespace PFE.DAL.Configuration
{
    class AnnonceConfiguration : EntityTypeConfiguration<Annonce>
    {
        public AnnonceConfiguration() 
        {
            //Property(a => a.Titre).IsRequired();
        }
    }
}
