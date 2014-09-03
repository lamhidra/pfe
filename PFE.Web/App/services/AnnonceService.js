/** 
 * @Service AnnonceService . 
 * @requires appsecurity
 * @requires logger
  * @requires routeconfig
 */


define(['services/logger', 'services/appsecurity', 'services/routeconfig'],
    function (logger, appsecurity, routeconfig) {

        var vm = {

            getHeaders: function ()
            {
                return $.ajax(routeconfig.getHeaders, {
                    type: "GET",
                    headers: appsecurity.getSecurityHeaders()
                }) 
            },

            createCatalogues: function (List)
            {
                window.open(routeconfig.createCatalogues + List);
                /*return $.ajax(routeconfig.createCatalogues + List, {
                    type: "GET",
                    headers: appsecurity.getSecurityHeaders()
                });*/
            }
            
        };

        return vm;
    
})