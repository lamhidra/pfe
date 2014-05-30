define(['services/dataservice', 'durandal/system'], function (ds, system) {

    //#region variables 
    var title = 'Formations';
    var initialized = false;
    var formations = ko.observableArray(),
        toDelete = ko.observableArray();
   
    //#endregion

    //#region Main Object 

    var vm = {
        activate: activate,
        title: title,
        formations: formations,
        refresh: refresh,
        toDelete: toDelete,
        check: check,
        Supprimer: Supprimer,
        selectAll: selectAll
    };

    return vm;

    //#endregion

    //#region Internal Methods

    function selectAll() {
        system.log("selectAll");
        for (var i = 0; i < formations.length; i++) {
            toDelete()[i] = formations()[i].FormationID;
            
        }

    }

    function Supprimer() {
        var List = [];
        if (toDelete().length > 0) {
            for (var i = 0; i < toDelete().length; i++) {
                List[i] = toDelete()[i];
            }
            toDelete([]);
            var options = {
                url: '/api/Formation',
                type: 'delete',
                data: { "": List},
            };
            $.ajax(options).then(refresh);

        }
    }

    function check() {
        for (var i = 0; i < toDelete().length; i++) {
            system.log(toDelete()[i]);
        }
    }

    function refresh() {
        return ds.getFormations(formations);
    };

    function deleteFormation() {
        return ds.deleteFormation();
    }

    function activate() {
        if (initialized)
            return;
        initialized = true;
        return refresh();
    }
    //#endregion


});