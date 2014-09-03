define(['durandal/system', 'plugins/router', 'services/appsecurity', 'services/errorhandler'],
    function (system, router, appsecurity, errorhandler) {


    var viewmodel = {

        attached : function() {
            $(document).find("footer").show();
        },

        activate: function () {
                        var self = this;            
                       
                        system.log("shell: activate");
                        
                        //configure routing
                        router.makeRelative({ moduleId: 'viewmodels' });

                        // If the route has the authorize flag and the user is not logged in => navigate to login view      
                        // If the route has the confirmed flag and the user's email is not confirmed => navigate to login view and display confirmation warning
                        router.guardRoute = function (instance, instruction) {
                            if (sessionStorage["redirectTo"]) {
                                var redirectTo = sessionStorage["redirectTo"]
                                sessionStorage.removeItem("redirectTo");
                                return redirectTo;
                            }

                            if (instruction.config.authorize) {
                                if (typeof (appsecurity.userInfo()) !== 'undefined') {
                                    if (appsecurity.isUserInRole(instruction.config.authorize)) {
                                        if (instruction.config.confirmed) {
                                            if (appsecurity.userInfo().isEmailConfirmed()) {
                                                return true;
                                            } else {
                                                appsecurity.showConfirmationWarning(true);
                                                return "/account/login?returnUrl=" + encodeURIComponent(instruction.fragment);
                                            }
                                        } else {
                                            return true;
                                        }
                                    } else {
                                        return "/account/login?returnUrl=" + encodeURIComponent(instruction.fragment);
                                    }
                                } else {
                                    return "/account/login?returnUrl=" + encodeURIComponent(instruction.fragment);
                                }
                            } else {
                                return true;
                            }
                        };
						
                        // Config Routes
                        // Routes with authorize flag will be forbidden and will redirect to login page
                        // As this is javascript and is controlled by the user and his browser, the flag is only a UI guidance. You should always check again on 
                        // server in order to ensure the resources travelling back on the wire are really allowed

                        return router.map([
                            // Nav urls
                            { route: ['', 'home/index'], moduleId: 'home/index', title: 'Acceuil', type: 'User', nav: true, hash: "#home/index" },
                            { route: 'notfound',                              moduleId: 'notfound',                          title: 'Not found',                   nav: false },
                                
                            // Admin panel url
                            { route: 'admin/panel',                           moduleId: 'admin/panel',                       title: 'Admin Panel',                 nav: false, hash : "#admin/panel",  authorize: ["Administrateur"] } ,

                            // Account Controller urls
                            { route: 'account/login',                         moduleId: 'account/login',                     title: 'Login',                       nav: false, hash : "#account/login" },
                            { route: 'account/externalloginconfirmation',     moduleId: 'account/externalloginconfirmation', title: 'External login confirmation', nav: false, hash : "#account/externalloginconfirmation" },
                            { route: 'account/externalloginfailure',          moduleId: 'account/externalloginfailure',      title: 'External login failure',      nav: false, hash : "#account/externalloginfailure" },
                            { route: 'account/register',                      moduleId: 'account/register',                  title: 'Register',                    nav: false, hash : "#account/register" },
                            {
                                route: 'account/manage', moduleId: 'account/manage', title: 'Manage account', nav: false, hash: "#account/manage",
                                authorize: ["Visiteur", "Administrateur", "Formateur"]
                            },
                            {
                                route: 'account/registrationcomplete', moduleId: 'account/registrationcomplete', title: 'Registration complete', nav: false, hash: "#account/registrationcomplete",
                                authorize: ["Visiteur", "Administrateur", "Formateur"]
                            },
                            {
                                route: 'account/forgotpassword', moduleId: 'account/forgotpassword', title: 'Forgot password', nav: false, hash: "#account/forgotpassword"
                            },
                            {
                                route: 'account/resetpassword', moduleId: 'account/resetpassword', title: 'Reset password', nav: false, hash: "#account/resetpassword",
                                authorize: ["Visiteur", "Administrateur", "Formateur"]
                            },

                            //Application Core urls
                            {
                                route: ['core/application*module'], moduleId: 'core/index', title: 'Application', type: 'Admin', nav: true, hash: '#core/application',
                                authorize: ["Administrateur", "Formateur"]
                            }
                        ])
                        .buildNavigationModel()
                        .mapUnknownRoutes("notfound","notfound")
                        .activate({ pushState : true });
                    }
    };

    errorhandler.includeIn(viewmodel);

    return viewmodel;
});