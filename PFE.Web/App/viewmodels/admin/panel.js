
/** 
 * @module Gestion des profils . 
 * @requires appsecurity
 * @requires logger
 */


define(['services/appsecurity', 'services/logger'], function (appsecurity, logger) {

    var userprofiles = ko.observableArray();
    var currentuserprofile = ko.observable();
    var Roles = ko.observableArray();

    function UserProfileVM(index, id, username, email, role) 
    {
        var self = this;
        self.index = index;
        self.id = id;
        self.username = username;
        self.email = email;
        self.role = role;
        self.selectedRole = ko.observable();
        return self;
    }

    function refresh() {
        var self = this;
        userprofiles.removeAll();
        appsecurity.getUsers().then(function (data) {
            for (var i = 0; i < data.length; i++) {
                userprofiles.push(new UserProfileVM(i, data[i].UserId, data[i].UserName, data[i].Email, data[i].Role));
            }
        });
        userprofiles.valueHasMutated();
    }

    var viewmodel = {
        Roles: Roles,
        userprofiles: userprofiles,
        currentuserprofile : currentuserprofile,

        refresh: refresh,

        activate: function () 
        {
            //ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });
            refresh();
            if (Roles().length == 0) {
                appsecurity.getRoles().done(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        Roles.push(data[i]);
                    }
                });
                Roles.valueHasMutated();
            }
            return true;
        },

        currentUser: function(index) 
        {
            currentuserprofile(userprofiles()[index]);
            currentuserprofile.valueHasMutated();

        },

        deleteCurrentUser: function (id)
        {
            var r = confirm("voulez vous vraiment supprimer cet utilisateur");
            if (r == true) {
                appsecurity.deleteUserAccount(id).done(function () {
                    logger.logSuccess("Utilisateur Supprimé.", null, null, true);
                    refresh();
                });
            } 
        },

        changeRole: function (index, id, role)
        {
            if (userprofiles()[index].role != role())
            {
                appsecurity.changeRole({ "userId": id, "Role": role() }).done(function () {
                    logger.logSuccess("succes.", null, null, true);
                    refresh();
                });
            }
        }
    }

    return viewmodel;
});