/** 
 * @module Login
 * @requires appsecurity
 * @requires router
 * @requires errorHandler
 */

define(['durandal/system', 'services/appsecurity', 'plugins/router', 'services/errorhandler', 'services/utils', 'services/logger'],
    function (system, appsecurity, router, errorhandler, utils, logger) {

        var username = ko.observable().extend({ required: true }),
            password = ko.observable().extend({ required: true, minLength: 6 }),
            rememberMe = ko.observable(false),
            returnUrl = ko.observable(null),
            isAuthenticated = ko.observable(false);

        function ExternalLoginProviderViewModel(data, returnUrl) {
            system.log("login: ExternalLoginProviderViewModel");

            var self = this;

            self.name = ko.observable(data.Name);
            
            self.login = function () {
                sessionStorage["state"] = data.State;
                sessionStorage["loginUrl"] = data.Url;
                if (returnUrl) {
                    sessionStorage["redirectTo"] = returnUrl;
                } else {
                    sessionStorage["redirectTo"] = "account/manage";
                }

                // IE doesn't reliably persist sessionStorage when navigating to another URL. Move sessionStorage temporarily
                // to localStorage to work around this problem.
                appsecurity.archiveSessionStorageToLocalStorage();                

                window.location = data.Url;
            };

            self.socialIcon = function (data) {
                var icon = "";
                switch (data.name().toLowerCase()) {
                    case "facebook":
                        icon = "fa fa-facebook-square";
                        break;
                    case "twitter":
                        icon = "fa fa-twitter-square";
                        break;
                    case "google":
                        icon = "fa fa-google-plus-square";
                        break;
                    case "microsoft":
                        icon = "fa fa-envelope";
                        break;
                    default:
                        icon = "fa fa-check-square";
                }
                return icon;
            }
        }

        var viewmodel =  {
            
            convertRouteToHash: router.convertRouteToHash,
            
            username : username,
            
            password : password,
            
            rememberMe : rememberMe,
            
            returnUrl : returnUrl,       
            
            appsecurity: appsecurity,

            externalLoginProviders: ko.observableArray(),
  
            activate: function (splat) {
                system.log("login: activate");

                var self = this;

                //ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });

                if (splat && splat.returnUrl) {
                    self.returnUrl(splat.returnUrl);
                }                
                
                return appsecurity.getExternalLogins(appsecurity.returnUrl, true)
                    .then(function (data) {
                        system.log("login: getExternalLogins");
                        if (typeof (data) === "object") {
                            self.externalLoginProviders.removeAll();
                            for (var i = 0; i < data.length; i++) {
                                self.externalLoginProviders.push(new ExternalLoginProviderViewModel(data[i], self.returnUrl() ? self.returnUrl() : null ));
                            }
                        }
                    }).fail(self.handleauthenticationerrors);                
            },

            login: function () {
                system.log("login: login");
                var self = this;

                if (this.errors().length != 0) {
                    this.errors.showAllMessages();
                    return;
                }

                appsecurity.login({
                    grant_type: "password",
                    username: self.username(),
                    password: self.password()
                }).done(function (data) {
                    if (data.userName && data.access_token) {
                        appsecurity.setAuthInfo(data.userName, data.roles, data.emailConfirmed == "true" ? true : false, data.access_token, self.rememberMe());

                        self.username("");
                        self.password("");
                        self.rememberMe(false);

                        self.errors.showAllMessages(false);

                        // Avoid redirect attacks
                        if (self.returnUrl() && utils.isExternal(self.returnUrl())) {
                            logger.logError("Can�t redirect to external urls", self.returnUrl(), null, true);
                            return false;
                        }

                        if (self.returnUrl()) {
                            router.navigate(self.returnUrl());
                        } else {
                            router.navigate("account/manage");
                        }
                    }
                }).fail(self.handleauthenticationerrors);
            },

            logout: function () {
                system.log("login: logout");
                appsecurity.logout();
            }
        }

        errorhandler.includeIn(viewmodel);

        viewmodel["errors"] = ko.validation.group(viewmodel);

        return viewmodel;
    });