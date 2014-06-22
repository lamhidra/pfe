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
using PFE.Service.Services;

namespace PFE.Web.Controllers
{
    public class ApprenantController : ApiController
    {
        private readonly IApprenantService apprenantService;
      
        public ApprenantController(IApprenantService apprenantService) 
        {
            this.apprenantService = apprenantService;
        }

        // GET api/Apprenant
        [HttpGet]
        [Route("api/Apprenant")]
        public IEnumerable<Apprenant> GetApprenants()
        {
            return apprenantService.GetALLApprenant();
        }

        // GET api/Apprenant/5
        [HttpGet]
        [Route("api/Apprenant/{id}")]
        [ResponseType(typeof(Apprenant))]
        public IHttpActionResult GetApprenant(int id)
        {
            Apprenant apprenant = apprenantService.GetApprenantByID(id);
            if (apprenant == null)
            {
                return NotFound();
            }

            return Ok(apprenant);
        }

        // PUT api/Apprenant/5
       /* public IHttpActionResult PutApprenant(int id, Apprenant apprenant)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != apprenant.ApprenantID)
            {
                return BadRequest();
            }

            db.Entry(apprenant).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApprenantExists(id))
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

        // POST api/Apprenant
        [HttpPost]
        [Route("api/Apprenant")]
        [ResponseType(typeof(Apprenant))]
        public IHttpActionResult PostApprenant() //Apprenant apprenant
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            Apprenant apprenant = new Apprenant();
            apprenantService.AddApprenant(apprenant);

            return CreatedAtRoute("DefaultApi", new { id = 5 }, apprenant);
        }

        // DELETE api/Apprenant/5
        [HttpDelete]
        [Route("api/Apprenant/{id}")]
        [ResponseType(typeof(Apprenant))]
        public IHttpActionResult DeleteApprenant(int id)
        {
            Apprenant apprenant = apprenantService.GetApprenantByID(id);
            if (apprenant == null)
            {
                return NotFound();
            }

            apprenantService.Delete(apprenant);

            return Ok(apprenant);
        }

        /*protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ApprenantExists(int id)
        {
            return db.Apprenants.Count(e => e.ApprenantID == id) > 0;
        }*/
    }
}