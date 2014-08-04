define(['services/logger'], function (logger) {
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
                window.open("/api/Annonce/Catalogue?"+ List);
               /* $.ajax("/api/Annonce/Catalogue", {
                    type: "Get",
                    cache: false
                    //data: {"": List}
                }).done(function (data) {

                    logger.log("Success", null, title, true);
                });*/
            }
        }
    };

    return vm;

    function refresh() {
        logger.log(title + ' View Activated', null, title, true);
        listCatalogues([]);
        return $.ajax("/api/Annonce/Headers", {
            type: "GET",
            cache: false
        }).done(function (result) {
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