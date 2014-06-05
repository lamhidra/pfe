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
       public static Formation MapToFormation(IFormation obj) 
       {
           Formation formation = new Formation()
           {
                FormationID = obj.FormationID,
                DateDebut = DateTime.Now,
                DateFin = DateTime.Now,
                Description = obj.Description,
                Titre = obj.Titre,
                NomOrganisme = obj.NomOrganisme
           };

           return formation;

        }

       public static Profil MapToProfil(IProfil obj) 
       {
           Profil profil = new Profil()
           {
               ProfilID = obj.ProfilID,
               Login = obj.Login,
               Password = obj.Password

           };

           return profil;
       }


       public static FormationVM MapToFormationVM(Formation formation, Profil profil, List<long> vListId, 
           List<int> vListMaxApprenants)
       {
           FormationVM formationVM = new FormationVM()
           {
                Titre = formation.Titre,
                Description = formation.Description,
                NomOrganisme = formation.NomOrganisme,
                NombreMaxApprenants = formation.NombreMaxApprenants,
                DateDebut = formation.DateDebut,
                DateFin = formation.DateFin,
                
                Login = profil.Login,
                Password = profil.Password,

                ListId = vListId,
                ListMaxApprenants = vListMaxApprenants

           };
            
           return formationVM;
        }
        
    }
}
