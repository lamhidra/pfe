define(['services/logger', 'durandal/system', 'services/validation'
    , 'services/F_examenDataService', 'services/Helpers'],
    function (logger, system, validation, eds, helpers) {

        var title = 'Modifier une formation',
          dateDebut = ko.observable().extend({
              date: true,
              required: true
          }),
              dateFin = ko.observable().extend({
                  validation: {
                      validator: validation.dateValidation, message: 'Date de Fin inferieure du date de debut !.', params: dateDebut
                  }
              }),
            titre = ko.observable().extend({
                required: true,
                minLength: 4,
                maxLength: 20
            }),
            nomOrganisme = ko.observable().extend({
                required: true,
                minLength: 4,
                maxLength: 20
            }),
            description = ko.observable().extend({
                required: true,
                minLength: 4,
                maxLength: 20
            });

        var selectedCategorie = ko.observable();
            selectedCategorie.extend({ notify: 'always' });
            selectedCategorie.subscribe(function (newValue) {
                eds.examenCategories(categorie.indexOf(newValue)).done(function (data) {
                    listExamen.removeAll();
                    for (Prop in data) {
                        listExamen.push(new eds.Dictionary(Prop, data[Prop]));
                    }
                    listExamen.valueHasMutated();

                });
            }),
            selectedExamen = ko.observable(),
            nombreApprenant = ko.observable().extend({
                required: true,
                digit: true,
                validation: { validator: validation.digitValidation, message: '<= 1000 !', params: 1000 }

            }),
            listChoix = ko.observableArray(),
            stockListChoix = ko.observableArray(),
            categorie = ['Serveur', 'Desktop', 'Applications', 'BaseDeDonnee', 'Developpeur'],
            listExamen = ko.observableArray();

    //Added for update processing
    var listFormations = ko.observableArray(),
        selectedFormation = ko.observable();

    selectedFormation.extend({ notify: 'always' });

    selectedFormation.subscribe(function (newValue) {
        if (!(typeof (newValue) == 'undefined')) {
            
            eds.getFormation(newValue.id).done(function (formation) {
                stockListChoix.removeAll();
              
                FormationInterface(formation.Titre, formation.Description,
                    formation.NomOrganisme, helpers.ToDate(formation.DateDebut),
                    helpers.ToDate(formation.DateFin));
          
                for (var i = 0; i < formation.ListId.length; i++) {
                    eds.FillStockList(stockListChoix,formation.ListMaxApprenants[i], 
                        formation.ListExamensTitre[i], formation.ListId[i], categorie[formation.ListCategorie[i]])
                }
                eds.StockList(stockListChoix, listChoix, nombreApprenant);
            });
        } else {
            FormationInterface('', '', '', '', '');
        }

    });

    var vm = {

        /** property {object} userInfo - The user object */
        listFormations: listFormations,

        /** property {object} userInfo - The user object */
        selectedFormation: selectedFormation,

        Modifier: Modifier,
        
        /** property {object} userInfo - The user object */
        title: title,

        /** property {object} userInfo - The user object */
        titre: titre,

        /** property {object} userInfo - The user object */
        nomOrganisme: nomOrganisme,

        /** property {object} userInfo - The user object */
        description: description,

        /** property {object} userInfo - The user object */
        dateDebut: dateDebut,

        /** property {object} userInfo - The user object */
        dateFin: dateFin,


        /** property {object} userInfo - The user object */
        categorie: categorie,

        /** property {object} userInfo - The user object */
        selectedExamen: selectedExamen,

        /** property {object} userInfo - The user object */
        selectedCategorie: selectedCategorie,

        /** property {object} userInfo - The user object */
        nombreApprenant: nombreApprenant,

        /** property {object} userInfo - The user object */
        listExamen: listExamen,

        /** property {object} userInfo - The user object */
        stockListChoix: stockListChoix,

        /**
		 * 
		 * 
		 *
        refresh: refresh,

        /**
		 * 
		 * 
		 */
        activate: function () {
            logger.log(title, null, title, true);
            Refresh();
            return true;
        },


        /**
          * 
          * 
        */
        StockList: function () {
            eds.StockList(stockListChoix, listChoix, nombreApprenant);
        },

        /**
        * 
        * 
        */
        Dismiss: function () {
            eds.Dismiss(stockListChoix, listChoix, nombreApprenant);
        },

        /**
		 * 
		 * 
		 */
        DeleteFromList: function (value) {
            eds.DeleteFromList(stockListChoix, value);
        },

        /**
		 * 
		 * 
		 */
        AddToPanel: function () {
            eds.AddToPanel(stockListChoix, nombreApprenant, selectedExamen, selectedCategorie)
        }

    };

    return vm;

    function Refresh() {
        eds.listformationsTitres().done(function (data) {
            listFormations.removeAll();
            if (!(jQuery.isEmptyObject(data))) {
                for (Prop in data) {
                    listFormations.push(new eds.Dictionary(Prop, data[Prop]));
                }
            }
            else {
                selectedFormation(undefined);
                logger.logError("Aucune formation trouvé.", null, null, true);
            }

            listFormations.valueHasMutated();
        });
    }

    function FormationInterface(vTitre, vDescription, vNomOrganisme, vDateDebut, vDateFin) {
        titre(vTitre);
        description(vDescription);
        nomOrganisme(vNomOrganisme);
        dateDebut(vDateDebut);
        dateFin(vDateFin);
    }

    function Modifier() {
        vm.errors = ko.validation.group(vm);
        if (vm.errors().length == 0 && listFormations().length != 0) {
            var listExamenIds = [];
            var listMaxApprenants = [];
            for (var i = 0; i < listChoix().length; i++) {
                listExamenIds[i] = listChoix()[i].id;
                listMaxApprenants[i] = listChoix()[i].nombreApprenant;
            }

            eds.updateFormation({
                'Titre': titre(),
                'NomOrganisme': nomOrganisme(),
                'Description': description(),
                'DateDebut': dateDebut(),
                'DateFin': dateFin(),
                'ListMaxApprenants': listMaxApprenants,
                'ListId': listExamenIds
            }, selectedFormation().id).done(function () {
                Refresh();
                logger.logSuccess("Formation modifié avec succes", null, null, true)
            }).fail(function (data) {
                logger.logError("Formation n'a pas été modifier.", null, null, true)
            });
        }
        else {
            if (listFormations().length == 0)
            {
                logger.logError("Aucune formation trouvé.", null, null, true);
            }else
               logger.logError("Le formulaire contient des erreurs.", null, null, true);

        }
    }

});