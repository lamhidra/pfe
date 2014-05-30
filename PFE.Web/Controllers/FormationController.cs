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

namespace PFE.Web.Controllers
{
    public class FormationController : ApiController
    {

        private readonly IFormationService formationService;

        public FormationController(IFormationService formationService) 
        {
            this.formationService = formationService;
        }

        // GET api/Formation

        [HttpGet]
        [Route("api/Formation")]
        public IEnumerable<Formation> GetFormations()
        {
            return formationService.GetFormations();
        }

        // GET api/Formation/5
        [HttpGet]
        [Route("api/Formation/{id}")]
        [ResponseType(typeof(Formation))]
        public IHttpActionResult GetFormation(int id)
        {
            Formation formation = formationService.GetFormationById(id);
            if (formation == null)
            {
                return NotFound();
            }

            return Ok(formation);
        }

        // PUT api/Formation/5
        /*public IHttpActionResult PutFormation(int id, Formation formation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != formation.FormationID)
            {
                return BadRequest();
            }

            db.Entry(formation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FormationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }*/

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

            return null;
        }

       

        //DELETE api/Formation/5
        [HttpDelete]
        [Route("api/Formation")]
        [ResponseType(typeof(Formation))]
        public IHttpActionResult DeleteFormation ([FromBody] List<long> id)
        {
            int count = id.Count;

            for (int i = 0; i < id.Count; i++)
            {
                Formation formation = formationService.GetFormationById(id[i]);
                formationService.Delete(formation);
            }
        
            return Ok(true);
        }

        /* protected override void Dispose(bool disposing)
         {
             if (disposing)
             {
                 db.Dispose();
             }
             base.Dispose(disposing);
         }

         private bool FormationExists(int id)
         {
             return db.Formations.Count(e => e.FormationID == id) > 0;
         }*/
    }
}