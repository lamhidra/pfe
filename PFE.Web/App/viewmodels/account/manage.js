/** 
 * @module Module for managing user accounts
 * @requires system
 * @requires appsecurity
 * @requires errorHandler
 * @requires logger
*/

define(['durandal/system','services/appsecurity', 'services/errorhandler', 'services/logger', 'services/utils', 'durandal/app', 'plugins/router'], 
function (system,appsecurity, errorhandler, logger, utils, app, router) {
    
    var self = this,
        externalAccessToken,
		externalError;

    function AddExternalLoginProviderViewModel(data) {

        system.log("manage: AddExternalLoginProviderViewModel");

	    var self = this;

	    // Data
	    self.name = ko.observable(data.Name);

	    // Operations
	    self.login = function () {
	        sessionStorage["state"] = data.State;
	        sessionStorage["associatingExternalLogin"] = true;
	        // IE doesn't reliably persist sessionStorage when navigating to another URL. Move sessionStorage temporarily
	        // to localStorage to work around this problem.
	        appsecurity.archiveSessionStorageToLocalStorage();
	        window.location = data.Url;
	    };

	    self.socialIcon = function (provider) {
	        var icon = "";
	        switch (provider.name().toLowerCase()) {
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
	    };
	}

    function ChangePasswordViewModel(name) {
        system.log("manage: ChangePasswordViewModel");

		var self = this;

		// Private operations
		function reset() {
		    self.oldPassword(null);
		    self.newPassword(null);
		    self.confirmPassword(null);
		    self.changing(false);
		    self.validationErrors.showAllMessages(false);
		}

		// Data
		self.name = ko.observable(name);
		self.oldPassword = ko.observable("").extend({ required: true });
		self.newPassword = ko.observable("").extend({ required: true });
		self.confirmPassword = ko.observable("").extend({ required: true, equal: self.newPassword });

		// Other UI state
		self.changing = ko.observable(false);
		self.validationErrors = ko.validation.group([self.oldPassword, self.newPassword, self.confirmPassword]);

		errorhandler.includeIn(self);

		// Operations
		self.change = function () {
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}
			self.changing(true);

			appsecurity.changePassword({
				oldPassword: self.oldPassword(),
				newPassword: self.newPassword(),
				confirmPassword: self.confirmPassword()
			}).done(function (data) {
				self.changing(false);
				reset();
				logger.logSuccess("Mot de passe modifiée", null, null, true);
			})
            .fail(self.handlevalidationerrors)
		    .fail(function () {
		        self.changing(false);
		    });
		};
	}

    function RemoveLoginViewModel(data, userLogins) {
        system.log("manage: RemoveLoginViewModel");

		// Private state
        var self = this,
			providerKey = ko.observable(data.ProviderKey);

		// Data
		self.loginProvider = ko.observable(data.LoginProvider);

		// Other UI state
		self.removing = ko.observable(false);

		errorhandler.includeIn(self);

		// Operations
		self.remove = function () {
            var self = this;
			self.removing(true);
			appsecurity.removeLogin({
			    loginProvider: self.loginProvider(),
			    providerKey: providerKey()
			}).done(function (data) {
			    self.removing(false);
			    userLogins.remove(self);
			    logger.logSuccess("Connexion retiré avec succée", null, null, true);
			})
            .fail(self.handlevalidationerrors)
            .fail(function () {
                self.removing(false);
            });
		};
	}

    function SetPasswordViewModel(userLogins, localLoginProvider, userName) {
        system.log("manage: SetPasswordViewModel");

		var self = this;

		// Data
		self.newPassword = ko.observable("").extend({ required: true });
		self.confirmPassword = ko.observable("").extend({ required: true, equal: self.newPassword });

		// Other UI state
		self.setting = ko.observable(false);
		self.validationErrors = ko.validation.group([self.newPassword, self.confirmPassword]);

		// Operations
		self.set = function () {
		    var self = this;
			if (self.validationErrors().length > 0) {
				self.validationErrors.showAllMessages();
				return;
			}
			self.setting(true);

			errorhandler.includeIn(self);

			appsecurity.setPassword({
				newPassword: self.newPassword(),
				confirmPassword: self.confirmPassword()
			}).done(function (data) {
				self.setting(false);
				userLogins.push(new RemoveLoginViewModel({
					loginProvider: localLoginProvider(),
					providerKey: userName()
				}, userLogins));
				logger.logSuccess("Mot de passe réglé avec succée", null, null, true);
			})
            .fail(self.handlevalidationerrors)
			.fail(function () {
			    self.setting(false);
			});
		};
	}

	var userName = ko.observable();

	var userLogins = ko.observableArray();
	var externalLoginProviders = ko.observableArray();
	var localLoginProvider = ko.observable();
	var hasLocalPassword = ko.computed(function () {

	    var logins = userLogins();

	    for (var i = 0; i < logins.length; i++) {
	        if (logins[i].loginProvider() === localLoginProvider()) {
	            return true;
	        }
	    }

	    return false;
	});

	var hasExternalLogin = ko.computed(function () {
	    system.log("manage: hasExternalLogin");
        return externalLoginProviders().length > 0;
    });

	var canRemoveLogin = ko.computed(function () {
	    system.log("manage: canRemoveLogin");
        return userLogins().length > 1;
    });
	
	var viewmodel = {

	    /** @property {observable} userName */
	    userName: userName,

	    /** @property {observable} localLoginProvider */
	    localLoginProvider: localLoginProvider,

	    addExternalLogin: function (externalAccessToken, externalError) {
	        system.log("manage: addExternalLogin");

	        var self = this;
	        return system.defer(function (dfd) {
	            if (externalError !== "null" || externalAccessToken === null) {
	                logger.logError("Erreur de connexion externe", null, null, true);
	                dfd.resolve();
	            } else {
	                appsecurity.addExternalLogin({
	                    externalAccessToken: externalAccessToken
	                })
	                .done(function () {
	                    dfd.resolve();
	                })
                    .fail(function(errors) {
                        self.handleauthenticationerrors(errors);
                        dfd.resolve();
                    });
	            }
	        });
	    },

	    userLogins: userLogins,

	    hasLocalPassword: hasLocalPassword,

	    externalLoginProviders: externalLoginProviders,

	    loading: ko.observable(true),

	    message: ko.observable(),

	    changePassword: new ChangePasswordViewModel(userName()),

	    setPassword: new SetPasswordViewModel(userLogins, localLoginProvider, userName),

	    hasExternalLogin: hasExternalLogin,

	    canRemoveLogin: canRemoveLogin,

	    appsecurity: appsecurity,

	    initialize: function () {
	        system.log("manage: addExternalLogin");
	        var self = this;
	        appsecurity.getManageInfo(appsecurity.returnUrl, true /* generateState */)
                    .done(function (data) {
                        if (typeof (data.LocalLoginProvider) !== "undefined" &&
                            typeof (data.UserName) !== "undefined" &&
                            typeof (data.Logins) !== "undefined" &&
                            typeof (data.ExternalLoginProviders) !== "undefined") {
                            system.log("manage: addExternalLogin : getManageInfo");

                            self.userName(data.UserName);

                            self.localLoginProvider(data.LocalLoginProvider);
                            system.log("manage: addExternalLogin : LocalLoginProvider : " + data.LocalLoginProvider);

                            self.userLogins.removeAll();

                            for (var i = 0; i < data.Logins.length; i++) {
                                self.userLogins.push(new RemoveLoginViewModel(data.Logins[i], self.userLogins));
                            }

                            self.externalLoginProviders.removeAll();

                            for (var i = 0; i < data.ExternalLoginProviders.length; i++) {
                                self.externalLoginProviders.push(new AddExternalLoginProviderViewModel(data.ExternalLoginProviders[i]));
                            }
                        } else {
                            logger.logError("Erreur de récupération des informations de compte d'utilisateur", null, null, true);
                        }
                        self.loading(false);
                    })
                    .fail(self.handlevalidationerrors)
                    .fail(function () {
                        self.loading(false);
                    });
	    },

	    /**
         * Activate view
         * @method
         * @return {promise} - Promise of user having an account
        */
	    activate: function () {
	        var self = this;
	       // ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
	        system.log("manage: activate");

	        externalAccessToken = utils.getUrlParameter("externalAccessToken");
	        externalError = utils.getUrlParameter("externalError");

	        if (externalAccessToken !== "null" || externalError !== "null") {
	            self.addExternalLogin(externalAccessToken, externalError)
                    .done(function () {
                        return self.initialize();
                    });
	        } else {
	            return self.initialize();
	        }	    
	    },

	    /**
         * Delete the user account
         * @method         
        */
	    deleteAccount: function () {
	        var self = this;
	        system.log("manage: deleteAccount");

	        return app.showMessage("Le compte sera définitivement supprimé", "Etes-vous sûr?", ['Oui', 'Non'])
                        .then(function (option) {
                            if (option === 'Oui') {
                                appsecurity.deleteAccount()
                                    .done(function () {
                                        appsecurity.logout()
                                            .done(function () {
                                                appsecurity.clearAuthInfo();
                                                window.location = "/account/login";                                         
                                            })
                                            .fail(self.handlevalidationerrors);
                                    })
                                    .fail(self.handlevalidationerrors);
                            }
                        });
        }
	};

	errorhandler.includeIn(viewmodel);

    return viewmodel;
        
});