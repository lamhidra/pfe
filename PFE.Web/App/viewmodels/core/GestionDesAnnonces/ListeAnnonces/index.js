
/** 
 * @module Gestion des Catalogues . 
 * @requires AnnonceServices
 * @requires logger
 */


define(['services/logger', 'services/AnnonceService'], function (logger, annonceService) {
    var title = 'Annonce';

    var listCatalogues = ko.observableArray();
    var checkedTitles = ko.observableArray();

    function CatalogueInterface(id, titre) {
        var self = this;
        self.id = id;
        self.titre = titre;
        return self;
    }
    var vm = {
        activate: activate,
        refresh: refresh,
        title: title,
        checkedTitles: checkedTitles,
        listCatalogues: listCatalogues,
        CreateCatalogue: function (data) {
            var List = [];
            if (checkedTitles().length > 0) {
                for (var i = 0; i < checkedTitles().length; i++) {
                    List +="%5B%5D=" + checkedTitles()[i] + (i == (checkedTitles().length - 1) ? "":"&");
                }
                checkedTitles([]);
                annonceService.createCatalogues(List);
            }
        }
    };

    return vm;

    function refresh() {
        logger.log(title + ' View Activated', null, title, true);
        listCatalogues([]);
        annonceService.getHeaders().done(function (result) {
            for (Prop in result) {
                listCatalogues.push(new CatalogueInterface(Prop, result[Prop]));
            }
        });
    }

    //#region Internal Methods
    function activate() {
        refresh();
        return true;
    }
    //#endregion
});