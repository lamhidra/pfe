/** 
 * @module Gestion des formation . 
           Add formations.
 * @requires system
 * @requires validation
 * @requires F_examenDataService
 * @requires logger
 */


define(['durandal/system','services/validation',
     'services/F_examenDataService', 'services/logger', 'services/errorhandler'],
     function (system, validation, eds, logger, errorhandler) {

         /** property {object} userInfo - The user object */
         var title = 'Ajouter une formation';
  
         var listChoix = ko.observableArray(),
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
                  maxLength:20
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
            }),
            listExamen = ko.observableArray(),
            selectedExamen = ko.observable(),
            nombreApprenant =  ko.observable().extend({
                  required: true,
                  digit: true,
                  validation: { validator: validation.digitValidation, message: '<= 1000 !', params: 1000 }
            }),
            stockListChoix = ko.observableArray(),
            categorie = ['Serveur', 'Desktop', 'Applications', 'BaseDeDonnee', 'Developpeur'],
            selectedCategorie = ko.observable();
       
            selectedCategorie.extend({ notify: 'always' });
            selectedCategorie.subscribe(function (newValue) {
                 eds.examenCategories(categorie.indexOf(newValue)).done(function (data) {
                     listExamen.removeAll();
                     for (Prop in data) {
                         listExamen.push(new eds.Dictionary(Prop, data[Prop]));
                     }
                     listExamen.valueHasMutated();
                 });
             });

  
    var vm = {
       
        /** property {object}  -  */
        title: title,

        /** property {object}  -  */
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
        listExamen: listExamen,

        /** property {object} userInfo - The user object */
        selectedCategorie: selectedCategorie,
        
        /** property {object} userInfo - The user object */
        selectedExamen: selectedExamen,
        
        /** property {object} userInfo - The user object */
        nombreApprenant: nombreApprenant,

        /** property {object} userInfo - The user object */
        stockListChoix: stockListChoix,

        /** property {object} userInfo - The user object */
        categorie: categorie,

        /**
		 * 
		 * 
		 */
        activate: function() {
            logger.log(title, null, title, true);
            return true;
        },


        /**
        * 
        * 
        */
        StockList: function() {
            eds.StockList(stockListChoix, listChoix, nombreApprenant);
        },

        /**
        * 
        * 
        */
        Dismiss: function() {
            eds.Dismiss(stockListChoix, listChoix, nombreApprenant);
        },

        /**
		 * 
		 * 
		 */
        DeleteFromList: function(value) {
            eds.DeleteFromList(stockListChoix, value);
        },

        /**
		 * 
		 * 
		 */
        AddToPanel: function () {
            eds.AddToPanel(stockListChoix, nombreApprenant, selectedExamen, selectedCategorie)
        },

        /**
        * 
        * 
        */
        Add: function() {
            vm.errors = ko.validation.group(vm);
            if (vm.errors().length == 0) {
                var listExamenIds = [];
                var listMaxApprenants = [];
                for (var i = 0; i < listChoix().length; i++) {
                    listExamenIds[i] = listChoix()[i].id;
                    listMaxApprenants[i] = listChoix()[i].nombreApprenant;
                }

                eds.addFormation({
                    'Titre': titre(),
                    'NomOrganisme': nomOrganisme(),
                    'Description': description(),
                    'DateDebut': dateDebut(),
                    'DateFin': dateFin(),
                    'ListMaxApprenants': listMaxApprenants,
                    'ListId': listExamenIds
                }).done(eds.QuerySucceed(titre, nomOrganisme, description, dateDebut,
                dateFin, nombreApprenant, listChoix, stockListChoix, listExamen)
                ).fail(function () {
                   // logger.logError("Formation n'a pas été ajouter.", null, null, true)
                });
            }
            else
                logger.logError("Le formulaire contient des erreurs.", null, null, true);
        }
    };

    return vm;
});
