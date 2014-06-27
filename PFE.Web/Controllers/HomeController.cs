﻿using PFE.Web.SEO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace PFE.Web.Controllers
{
    public class HomeController : AsyncController
    {
        ISnapshot Snapshot;

        public HomeController(ISnapshot snapshot)
        {
            this.Snapshot = snapshot;
        }

        /// <summary>
        /// All routes in this site always return to the Index action and the control is passed to 
        /// the Durandal application
        /// If the route parameters include a _escaped_fragment_ parameter, then a snapshot of the resource is returned
        /// </summary>
        /// <returns></returns>
        public async Task<ActionResult> Index()
        {
            // If the request is not from a bot or the system is not ready or taking snapshots => control to Durandal app
            if (!Snapshot.IsBot(Request))
            {
                return View();
            }

            // Check if the service is configured
            if (!Snapshot.Configured())
            {
                return View();
            }

            // Take snapshot for bot
            try
            {
                var result = await Snapshot.Get(Request.Url.AbsoluteUri.Replace("?_escaped_fragment_=", ""), Request.UserAgent);
                return Content(result);
            }
            catch (HttpException ex)
            {
                return new HttpNotFoundResult(ex.Message);
            }
            catch (Exception ex)
            {
                return View();
            }
        }

    }
    /*public class HomeController : Controller
    {
        
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }*/
}
