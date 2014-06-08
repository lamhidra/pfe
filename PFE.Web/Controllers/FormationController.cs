using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PFE.Domain;
using PFE.DAL;
using PFE.Service;
using PFE.Web.Core.Helpers.VM;
using PFE.Service.Services;

namespace PFE.Web.Controllers
{
    public class FormationController : ApiController
    {

        private readonly IFormationService formationService;
        private readonly IProfilService profilService;
        private readonly IFormationExamenService formationExamenService;
        private readonly IExamenService examenService;

        public FormationController(IFormationService formationService,
            IProfilService profilService, IFormationExamenService formationExamenService,
            IExamenService examenService)
        {
            this.formationService = formationService;
            this.profilService = profilService;
            this.formationExamenService = formationExamenService;
            this.examenService = examenService;
        }

        // GET api/Formation

        [HttpGet]
        [Route("api/Formation")]
        public IEnumerable<Formation> GetFormations()
        {
            return formationService.GetFormations();
        }

        [HttpGet]
        [Route("api/Formation/FormationsTitres")]
        public IEnumerable<KeyValuePair<int, string>> getFormationsTitres()
        {

            IEnumerable<Formation> formations = formationService.GetFormations();

            Dictionary<int, string> titreFormation = new Dictionary<int, string>();
            foreach (Formation e in formations)
            {
                titreFormation.Add(e.FormationID, e.Titre);
            }

            return titreFormation;
        }


        // GET api/Formation/5
        [HttpGet]
        [Route("api/Formation/{id}")]
        [ResponseType(typeof(Formation))]
        public FormationVM GetFormation(int id)
        {
            Formation formation = formationService.GetFormationById(id);
            Profil profil = profilService.GetFormationProfil(id);
            IEnumerable<FormationExamen> formationExamen = formationExamenService.GetFormationInfos(id);
            List<long> ListId = new List<long>();
            List<int> ListMaxApprenants = new List<int>();
            List<int> ListCategorie = new List<int>();
            List<string> ListExamensTitre = new List<string>();

            foreach (FormationExamen f in formationExamen)
            {
                ListId.Add(f.ExamenID);
                ListMaxApprenants.Add(f.MaxApprenant);
                ListCategorie.Add(examenService.getExamenCategorie(f.ExamenID));
                ListExamensTitre.Add(examenService.getExamenTitre(f.ExamenID));
            }

            FormationVM formationVm = Mapping.MapToFormationVM(formation, profil, ListId, ListMaxApprenants,
                ListCategorie, ListExamensTitre);

            return formationVm;
        }

        // PUT api/Formation/5
        public IHttpActionResult PutFormation(int id, [FromBody] FormationVM obj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Formation formation = Mapping.MapToFormation(obj);
            Profil profil = Mapping.MapToProfil(obj);
            formationService.UpdateFormation(formation, profil, (List<long>)obj.ListId, (List<int>)obj.ListMaxApprenants);

            
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Formation
        [HttpPost]
        [Route("api/Formation")]
        //[ResponseType(typeof(Formation))]
        public IHttpActionResult PostFormation([FromBody] FormationVM obj)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Formation formation = Mapping.MapToFormation(obj);
            Profil profil = Mapping.MapToProfil(obj);
            formationService.AddFormation(formation, profil, (List<long>)obj.ListId, (List<int>)obj.ListMaxApprenants);

            return Ok(true);
        }



        //DELETE api/Formation/5
        [HttpDelete]
        [Route("api/Formation")]
        [ResponseType(typeof(Formation))]
        public IHttpActionResult DeleteFormation([FromBody] List<long> id)
        {
            int count = id.Count;

            for (int i = 0; i < id.Count; i++)
            {
                Formation formation = formationService.GetFormationById(id[i]);
                formationService.Delete(formation);
            }

            return Ok(true);
        }
    }

}