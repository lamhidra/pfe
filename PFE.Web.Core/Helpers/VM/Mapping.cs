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
       public static void MapToFormation(IFormation obj, Formation formation) 
       {
                formation.DateDebut = obj.DateDebut;
                formation. DateFin = obj.DateFin;
                formation.Description = obj.Description;
                formation.Titre = obj.Titre;
                formation.NomOrganisme = obj.NomOrganisme;
        }

       public static FormationVM MapToFormationVM(Formation formation, List<long> vListId,
           List<int> vListMaxApprenants, List<int> vListCategorie, List<string> vListExamensTitre)
       {
           FormationVM formationVM = new FormationVM()
           {
                Titre = formation.Titre,
                Description = formation.Description,
                NomOrganisme = formation.NomOrganisme,
                NombreMaxApprenants = formation.NombreMaxApprenants,
                DateDebut = formation.DateDebut,
                DateFin = formation.DateFin,

                ListId = vListId,
                ListMaxApprenants = vListMaxApprenants,
                ListCategorie = vListCategorie,
                ListExamensTitre = vListExamensTitre
           };
            
           return formationVM;
        }
        
    }
}
