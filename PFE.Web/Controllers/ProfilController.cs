using PFE.Domain;
using PFE.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

namespace PFE.Web.Controllers
{
    public class ProfilController : ApiController
    {

        private readonly IProfilService profilService;
        public ProfilController(IProfilService profilService) {
            this.profilService = profilService;    
        }
        // GET: api/Profil
        public IEnumerable<Profil> Get()
        {
            return profilService.getProfils();
        }

        // GET: api/Profil/5
        public Profil Get(long id)
        {
            return profilService.getProfilById(id);
        }

        [HttpGet]
        [Route("api/Profil/Exist")]
        public bool Exist([FromBody] Profil profil)
        {
            return profilService.lookIfExist(profil);
        }


        // POST: api/Profil
        public void Post([FromBody]string value)
        {

        }

        // PUT: api/Profil/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Profil/5
        public void Delete(int id)
        {
        }
    }
}
