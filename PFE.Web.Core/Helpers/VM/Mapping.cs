using PFE.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PFE.Web.Core.Helpers.VM
{
    public class Mapping
    {
       public static Formation MapToFormation(IFormation obj) {
           Formation formation = new Formation()
           {
                DateDebut = DateTime.Now,
                DateFin = DateTime.Now,
                Description = obj.Description,
                Titre = obj.Titre,
                NomOrganisme = obj.NomOrganisme
           };

           return formation;

        }

       public static Profil MapToProfil(IProfil obj) {
           Profil profil = new Profil()
           {
               Login = obj.Login,
               Password = obj.Password

           };

           return profil;
       }
        
    }
}
