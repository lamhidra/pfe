define(function () {

    var data = ko.observableArray();

    function AnnonceInterface(index, id, titre, description, lien) {
        var self = this;
        self.index = index;
        self.id = id;
        self.titre = titre;
        self.description = description;
        self.lien = "../../../Content/images/" + lien;
        return self;
    }

    var vm = {
        data: data,

        activate:  function() {
            data([]);
            return $.ajax("/api/Annonce", {
                type: "GET",
                cache: false
            }).done(function (result) {
                for (var i = 0; i < result.length; i ++)
                    data.push(new AnnonceInterface(i, result[i].AnnonceID, result[i].Titre,
                        result[i].Description, result[i].Lien));
            });
        },

        renderPdf: function (param) {
            window.open("/api/Annonce/FicheDescriptive/" + param);
        }
          
    };
    return vm;
});