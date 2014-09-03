
define(['services/routeconfig'], function (routeconfig) {

    var data = ko.observableArray();

    function AnnonceInterface(index, id, titre, description, logo) {
        var self = this;
        self.index = index;
        self.id = id;
        self.titre = titre;
        self.description = description;
        self.logo = "../../../Content/images/" + logo;
        return self;
    }

    var vm = {
        data: data,

        activate: function () {
            //ga('send', 'pageview', { 'page': window.location.href, 'title': document.title });                      
            data([]);
            return $.ajax(routeconfig.getListAnnonces, {
                type: "GET",
                cache: false
            }).done(function (result) {
                for (var i = 0; i < result.length; i++)
                    data.push(new AnnonceInterface(i, result[i].AnnonceID, result[i].Titre,
                        result[i].Description, result[i].Logo));
            });
        },

        renderPdf: function (param) {
            window.open(routeconfig.getFicheDescriptive + param);
        }

    };
    return vm;
});