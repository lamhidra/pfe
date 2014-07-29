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
    [Authorize]
    public class ExamenController : ApiController
    {
        private readonly IExamenService examenService;

        public ExamenController(IExamenService examenService)
        {
            this.examenService = examenService;
        }

        [HttpGet]
        [Route("api/Examen")]
        public IEnumerable<Examen> GetExamens()
        {
            return examenService.getExamens();
        }

        [HttpGet]
        [Route("api/Examen/Categorie/{value}")]
        public IEnumerable<KeyValuePair<int, string>> getExamensParCategorie(int value)
        {

            IEnumerable<Examen> examen = examenService.getListExamensParCategorie(value);

            Dictionary<int, string> titreExamen = new Dictionary<int, string>();
            foreach(Examen e in examen) {
                titreExamen.Add(e.ExamenID, e.Titre);
            }

            return titreExamen;
        }
        // GET api/Examen/5
       /* [ResponseType(typeof(Examen))]
        public IHttpActionResult GetExamen(int id)
        {
            Examen examen = db.Examens.Find(id);
            if (examen == null)
            {
                return NotFound();
            }

            return Ok(examen);
        }

        // PUT api/Examen/5
        public IHttpActionResult PutExamen(int id, Examen examen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != examen.ExamenID)
            {
                return BadRequest();
            }

            db.Entry(examen).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExamenExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST api/Examen
        [ResponseType(typeof(Examen))]
        public IHttpActionResult PostExamen(Examen examen)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Examens.Add(examen);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = examen.ExamenID }, examen);
        }

        // DELETE api/Examen/5
        [ResponseType(typeof(Examen))]
        public IHttpActionResult DeleteExamen(int id)
        {
            Examen examen = db.Examens.Find(id);
            if (examen == null)
            {
                return NotFound();
            }

            db.Examens.Remove(examen);
            db.SaveChanges();

            return Ok(examen);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExamenExists(int id)
        {
            return db.Examens.Count(e => e.ExamenID == id) > 0;
        }*/
    }
}