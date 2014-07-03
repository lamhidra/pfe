/** 
 * @module Gestion des formation . 
           retrieve list of formations and informations related to each one.
 * @requires system
 * @requires F_examenDataService
 * @requires logger
 */


define(["durandal/system", "services/F_examenDataService", "services/logger"],
    function (system, eds, logger) {

    var title = 'Formations';
    var initialized = false;
    var formations = ko.observableArray(),
        toDelete = ko.observableArray();

    function refresh() {
        eds.listFormations().done(function (data) {
            logger.log('Liste des formations', null, title, true);
            formations([]);

            for (var i = 0; i < data.length; i++) {
                formations.push(data[i]);
            }
            formations.valueHasMutated();
        });
    }
   

    var vm = {
        
        title: title,
        formations: formations,
        toDelete: toDelete,
        refresh: refresh,

        /**
         * 
         */
        activate: function () {
            if (initialized)
                return;
            initialized = true;
            refresh();
        },

        /**
         * 
         */
        Supprimer: function () {
            var List = [];
            if (toDelete().length > 0) {
                for (var i = 0; i < toDelete().length; i++) {
                    List[i] = toDelete()[i];
                }
                toDelete([]);
                eds.deleteFormations({ "": List }).done(refresh);
            }
        },

        /*selectAll: function () {
            for (var i = 0; i < formations.length; i++) {
                toDelete()[i] = formations()[i].FormationID;

            }
        }*/
    };

    return vm; 

});