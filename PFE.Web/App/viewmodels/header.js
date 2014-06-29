﻿define(['plugins/router', 'services/appsecurity', 'services/errorhandler', 'services/utils'],
    function (router, appsecurity, errorhandler, utils) {        

        var viewmodel = {

            router: router,

            userHeader: ko.computed(function () {
                return ko.utils.arrayFilter(router.navigationModel(), function (route) {
                    return route.type == 'User';
                });
            }),

            adminHeader: ko.computed(function () {
                return ko.utils.arrayFilter(router.navigationModel(), function (route) {
                    return route.type == 'Admin';
                });
            }),


            appsecurity: appsecurity,

            logout: function () {
                var self = this;
                appsecurity.logout()
                    .done(function () {
                        appsecurity.clearAuthInfo();
                        if (router.activeInstruction().config.authorize) {
                            window.location = "/account/login";
                        } else {
                            window.location = "/home/index";
                        }
                    })
                    .fail(self.handlevalidationerrors);
            }
        };

        errorhandler.includeIn(viewmodel);

        return viewmodel;
    });