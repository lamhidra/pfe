define(['services/logger', 'durandal/system', 'services/validation', 'services/profilDataService',
     'services/F_examenDataService' ], function (logger, system, validation, ds, eds) {

    var title = 'Ajouter une formation';

   
    //
    var Titre = ko.observable().extend({
        required: true,
        minLength: 8,
        maxLength:20
    }),
    NomOrganisme = ko.observable().extend({
        required: true,
        minLength: 8,
        maxLength: 20
    }),
    Description = ko.observable().extend({
        required: true,
        minLength: 8,
        maxLength: 20
    }),
    DateDebut = ko.observable().extend({
        date: true,
        required: true
    }),
    DateFin = ko.observable().extend({
        validation: { validator: validation.dateValidation, message: 'Date de Fin inferieure du date de debut !.', params: DateDebut }
    });
  
    //Gestion des examens
    //#region GE

    //Variables and Observables

    var selectedCategorie = ko.observable(),
        selectedExamen = ko.observable(),
        NombreApprenant = ko.observable().extend({
            required: true,
            digit: true,
            validation: { validator: validation.digitValidation, message: '<= 1000 !', params: 1000 }

        }),
        ListChoix = ko.observableArray(),
        StockListChoix = ko.observableArray(),
        Categorie = ['Serveur', 'Desktop', 'Applications', 'BaseDeDonnee', 'Developpeur'],
        listChoices = ko.observableArray(),
        listExamen = ko.observableArray();

    selectedCategorie.extend({ notify: 'always' });

    selectedCategorie.subscribe(function (newValue) {
        var options = {
            url: "api/Examen/Categorie/" + Categorie.indexOf(newValue),
            type: 'get',
            async: false
        };

        $.ajax(options).then( function (data) {
            listExamen.removeAll();
            for (Prop in data) {
                system.log(Prop);
                listExamen.push(new ListExamenDictionary(Prop, data[Prop]));
            }

        });
    });

    // Methods
    function ListExamenDictionary(vid, vtitre) {
        var self = this;
        self.id = vid;
        self.titre = vtitre;
        return self;
    }


    function AddToPanel() {
        eds.AddToPanel(StockListChoix, NombreApprenant, selectedExamen, selectedCategorie);
    }

    function StockList() {
       // var categorieObservale = ko.observableArray();
        eds.StockList(StockListChoix, ListChoix, NombreApprenant, selectedCategorie, Categorie[0]);
    }

    function Dismiss() {
        eds.Dismiss(StockListChoix, ListChoix, selectedCategorie, Categorie, NombreApprenant);
    }

    function deleteFromList(value) {
        eds.deleteFromList(StockListChoix, value);
    }

    //#endregion GE


    //Gestion de profil
    //#region GP

    //Variables and Observables
    var login = ko.observable().extend({
        required: true,
        minLength: 6,
        maxLength: 15
    });
    var password = ko.observable().extend({
        required: true,
        minLength: 6,
        maxLength: 15
    });

    var repeatPassword = ko.observable().extend({
        validation: { validator: validation.mustEqual, message: 'Passwords do not match.', params: password }
    });
    var StockProfilExist = ko.observableArray();
    var ProfilExist = ko.observableArray();

    // Methods
    
   

    function AddProfil() {
        ds.AddProfil(StockProfilExist, login, password, repeatPassword);
    }

    function deleteProfil() {
        ds.deleteProfil(StockProfilExist);
    }

    function SaveProfil() {
        //ProfilExist() may hold an old Profil so we need to clear it
        //StockProfil empty means this is the first time we enter the profil modal or we cleaned an existed profil.
        ds.SaveProfil(StockProfilExist, ProfilExist);       
    }

    function dismissProfil() {
        system.log('dismissProfil');
        login(undefined);
        password(undefined);
        repeatPassword(undefined)

        ds.dismissProfil(StockProfilExist, ProfilExist);
    }
    //#endregion GE


    //Errors
    var MessageError = ko.observable();
    function clearMessageError() {
        MessageError(undefined);
    }

    var vm = {
        activate: activate,
        querySucceed: querySucceed,
        title: title,
        Add: Add,
        Titre: Titre,
        NomOrganisme: NomOrganisme,
        Description: Description,
        DateDebut: DateDebut,
        DateFin: DateFin,

        //GE
        Categorie: Categorie,
        listExamen: listExamen,
        AddToPanel: AddToPanel,
        selectedCategorie: selectedCategorie,
        selectedExamen: selectedExamen,
        NombreApprenant: NombreApprenant,
        StockListChoix: StockListChoix,
        StockList: StockList,
        Dismiss: Dismiss,
        deleteFromList: deleteFromList,

        //GP
        login: login,
        password: password,
        StockProfilExist: StockProfilExist,
        AddProfil: AddProfil,
        deleteProfil: deleteProfil,
        dismissProfil: dismissProfil,
        SaveProfil: SaveProfil,
        repeatPassword: repeatPassword,

        //Errors
        MessageError: MessageError,
        clearMessageError: clearMessageError
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }

    function Add() {
        //MessageError('')

        //Validation (Just for Markup)
        MessageError(undefined);
        MessageError.valueHasMutated();

        var isProfilExist = false;
        var self = this;

        if (ProfilExist().length > 0) {
            login('valogin');
            password('password');
            repeatPassword('password');
            NombreApprenant('1');
        
     
            //Check if the profil does exist.

            //url: "api/Profil/Exist?" + "Login=" + ProfilExist()[0].login + "&" + "Password=" + ProfilExist()[0].password,

            var options = {
                url: "api/Profil/Exist",
                type: 'get',
                data: {
                    'Login': ProfilExist()[0].login,
                    'Password': ProfilExist()[0].password
                },
                async: false
            };


            $.ajax(options).then(function (result) {

                if (result == true) {
                    system.log('Profil deja exist');
                    isProfilExist = true;
                }
                return true;
            });
        }
        system.log(isProfilExist);

        //
        vm.errors = ko.validation.group(vm);
        if (vm.errors().length == 0 && isProfilExist == false) {

                var ListExamenIds = [];
                var ListMaxApprenants = [];
                for (var i = 0; i < ListChoix().length; i ++){
                    ListExamenIds[i] = ListChoix()[i].id;
                    ListMaxApprenants[i] = ListChoix()[i].nombreApprenant;
                    system.log(ListChoix()[0].id);

                }


                var options = {
                    url: '/api/Formation',
                    type: 'post',
                    data: {
                        'Login': ProfilExist()[0].login,
                        'Password': ProfilExist()[0].password,
                        'Titre': Titre(),
                        'NomOrganisme': NomOrganisme(),
                        'Description': Description(),
                        'DateDebut': DateDebut(),
                        'DateFin': DateFin(),
                        'ListMaxApprenants': ListMaxApprenants,
                        'ListId': ListExamenIds
                    }
                };
        
                $.ajax(options).then(querySucceed).fail(querySucceed);
        }
        else {

            var message = "" ;

            if (vm.errors().length > 0)
                message += "<p class=\"text-info\">" + ".Le Formulaire contient des erreurs \n" + "</p>";

            if (isProfilExist == true) 
                message += "<p class=\"text-info\">" + ".Profil deja exist" + "</p>";


            if (ProfilExist().length == 0) {
                message += " <p class=\"text-info\">" + ".Une Formation doit avoir un profil." + "</p>";
                login(undefined);
                password(undefined);
                repeatPassword(undefined);
                NombreApprenant(undefined);
            }

           // message += "</p>";
            MessageError(message);
            logger.log(null , null, "Formulaire contient des erreurs", true);
            system.log('Le Formulaire contient des erreurs');
        }


    }

    function querySucceed() {
        logger.log(null, null, "Formation Ajouté avec succes", true);

        system.log('querySucceed');
        Titre(undefined);
        NomOrganisme(undefined);
        Description(undefined);
        DateDebut(undefined);
        DateFin(undefined);
        NombreApprenant(undefined);
        ListChoix.removeAll();
        StockListChoix.removeAll();
        ProfilExist.removeAll();
        listExamen.removeAll();
        login(undefined);
        password(undefined);
        repeatPassword(undefined);
        StockProfilExist.removeAll();
        return true;

    }

});
