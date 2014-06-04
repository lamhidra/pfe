define(['durandal/system', 'plugins/router', 'services/logger'],
    function (system, router, logger) {
        var shell = {
            activate: activate,
            router: router
        };

        return shell;

        //#region Internal Methods
        function activate() {
            return boot();
        }

        function boot() {

            router.on('router:route:not-found', function (fragment) {
                logError('No Route Found', fragment, true);
            });

            var routes = [
                { route: ['', 'application*module'], moduleId: 'index', title: 'Application', nav: 1, hash: '#application' }];
               // { route: 'application*module', moduleId: 'viewmodels/index', title: 'Home', nav: 2, hash: '#application' }];
                /*{ route: 'formations', moduleId: 'formations', title: 'Formations', nav: 2 },
                { route: 'AddFormation', moduleId: 'AddFormation', title: 'AddFormation', nav: 3 },
                { route: 'Annonces', moduleId: 'Annonces', title: 'aAnnonces', nav: 4 }];*/
            // makeRelative({ moduleId: 'viewmodels' }).// router will look here for viewmodels by convention

            return router.makeRelative({ moduleId: 'viewmodels' }).map(routes)            // Map the routes
                .buildNavigationModel().activate(); // Finds all nav routes and readies them
                           // Activate the router
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }

        function logError(msg, data, showToast) {
            logger.logError(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion
    });
