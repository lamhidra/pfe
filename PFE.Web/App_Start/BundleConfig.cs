﻿using System;
using System.Web;
using System.Web.Optimization;

namespace PFE.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                .Include("~/scripts/jquery-{version}.js")
                .Include("~/scripts/knockout-{version}.debug.js")
                .Include("~/scripts/knockout.validation.js")
                .Include("~/scripts/bootstrap.js")
                .Include("~/scripts/jquery.hammer.min.js")
                .Include("~/scripts/Stashy.js")
                .Include("~/scripts/toastr.js")
                .Include("~/scripts/Q.js")
                .Include("~/scripts/moment.js")
                .Include("~/scripts/zen-form.js")
              );

            bundles.Add(
              new StyleBundle("~/Content/css")
                .Include("~/Content/ie10mobile.css")
                .Include("~/Content/bootstrap-whiteplum.css")
                .Include("~/Content/font-awesome.css")
                .Include("~/Content/durandal.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/Site.css")
                .Include("~/Content/Stashy.css")
                .Include("~/Content/zen-form.css")
           );

            bundles.Add(
       new StyleBundle("~/Content/custom")
         .Include("~/Content/app.css")
       );
           /* bundles.Add(
             new ScriptBundle("~/Scripts/vendor")
               .Include("~/Scripts/jquery-{version}.js")
               .Include("~/Scripts/knockout-{version}.debug.js")
               .Include("~/Scripts/toastr.js")
               .Include("~/Scripts/bootstrap.js")
               .Include("~/Scripts/respond.js")
               .Include("~/Scripts/modernizr-*")
             );*/

           /* bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));*/

            /*bundles.Add(new ScriptBundle("~/bundles/knockout").Include(
                "~/Scripts/knockout-{version}.debug.js"));*/ 

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            /*bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                      "~/Scripts/modernizr-*"));*/

            
        }
        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");

            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}
