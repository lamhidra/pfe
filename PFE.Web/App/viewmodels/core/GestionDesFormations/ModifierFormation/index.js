define(['services/logger', 'durandal/system', 'services/validation',
    'services/profilDataService', 'services/F_examenDataService', 'services/Helpers'],
    function (logger, system, validation, ds, eds, helpers) {

    var title = 'Modifier une formation';


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
    
    //the same function is defined twice!!!!!!!!!!! warning
    function ctorProfilInterface(vLogin, vPassword) {
        var self = this;
        self.login = vLogin;
        self.password = vPassword;
        return self;
    }


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

        //cancel changes and push the existed profil in StockProfiExist ObservableArray
        ds.dismissProfil(StockProfilExist, ProfilExist);
  
    }
    //#endregion GP



    //#region GE
        //Gestion des examens

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

        $.ajax(options).then(function (data) {
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
        eds.StockList(StockListChoix, ListChoix, NombreApprenant, selectedCategorie);
    }

    function Dismiss() {
        eds.Dismiss(StockListChoix, ListChoix, selectedCategorie, Categorie, NombreApprenant);
    }

    function deleteFromList(value) {
        eds.deleteFromList(StockListChoix, value);
    }

   //#endregion GE

    function ctorFormationInterface(vTitre, vDescription, vNomOrganisme, vDateDebut, vDateFin) {
        var self = this;
        self.Titre = vTitre;
        self.Description = vDescription;
        self.NomOrganisme = vNomOrganisme;
        self.DateDebut = vDateDebut;
        self.DateFin = vDateFin;
        return self;
    }



    //Added for update processing
    var ListFormations = ko.observableArray(),
        selectedFormation = ko.observable();

    selectedFormation.extend({ notify: 'always' });

    selectedFormation.subscribe(function (newValue) {

        url = 'api/Formation/' + newValue.id;
        $.getJSON(url, function(formation) {
            data.removeAll();
            StockListChoix.removeAll();

            StockProfilExist.removeAll();
            StockProfilExist.valueHasMutated();

            ProfilExist.removeAll();
            ProfilExist.valueHasMutated();

            //Copy the ViewModel Values and refresh inputs.
             FormationVMInterface = formation;

             StockProfilExist.push(new ctorProfilInterface(FormationVMInterface.Login, FormationVMInterface.Password));
             StockProfilExist.valueHasMutated();
            
            data.push(new ctorFormationInterface(FormationVMInterface.Titre, FormationVMInterface.Description,
                FormationVMInterface.NomOrganisme, helpers.ToDate(FormationVMInterface.DateDebut),
                helpers.ToDate(FormationVMInterface.DateFin)));
          
            ProfilExist.push(new ctorProfilInterface(FormationVMInterface.Login, FormationVMInterface.Password));
            ProfilExist.valueHasMutated();

            for (var i = 0; i < formation.ListId.length; i++) {
                NombreApprenant(formation.ListMaxApprenants[0]);
                selectedExamen(new eds.ctorModificationExamenIdTitre(formation.ListId[i], formation.ListExamensTitre[i]));
                selectedCategorie(Categorie[formation.ListCategorie[i]]);
                eds.AddToPanel(StockListChoix, NombreApprenant, selectedExamen, selectedCategorie);
            }
            StockListChoix.valueHasMutated();
            StockList(StockListChoix, ListChoix, NombreApprenant, selectedCategorie, Categorie);


            return true;
        });

    });

  

   var FormationVMInterface = {

       Titre: ko.observable(),
       Description: ko.observable(),
       NomOrganisme: ko.observable(),
       DateDebut: ko.observable(),
       DateFin: ko.observable(),
         
       Login: ko.observable(),
       Password: ko.observable()
    }


        //Errors declaration
        var MessageError = ko.observable();
        function clearMessageError() {
            MessageError(undefined);
        }


    var data = ko.observableArray();

    var vm = {
        activate: activate,
        ListFormations: ListFormations,
        selectedFormation: selectedFormation,
        data: data,
        title: title,
        Modifier: Modifier,


        
        //GP
        login: login,
        password: password,
        StockProfilExist: StockProfilExist,
        AddProfil: AddProfil,
        deleteProfil: deleteProfil,
        dismissProfil: dismissProfil,
        SaveProfil: SaveProfil,
        repeatPassword: repeatPassword,

        
        ////GE
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



        //Errors
        MessageError: MessageError,
        clearMessageError: clearMessageError

    };

    function activate() {
        refresh();
        return true;
    }


    return vm;

    function refresh() {

        var url = 'api/Formation/FormationsTitres';
        $.getJSON(url, function (data) {
            ListFormations.removeAll();
            // system.log(data[1]);
            for (Prop in data) {
                system.log(Prop);
                ListFormations.push(new ListFormationsDictionary(Prop, data[Prop]));
            }

        });


    }

    function ListFormationsDictionary(vid, vtitre) {
        var self = this;
        self.id = vid;
        self.titre = vtitre;
        return self;
    }





    function Modifier() {
        //MessageError('')

        //Validation (Just for Markup)
       /* MessageError(undefined);
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
            for (var i = 0; i < ListChoix().length; i++) {
                ListExamenIds[i] = ListChoix()[i].id;
                ListMaxApprenants[i] = ListChoix()[i].nombreApprenant;
                system.log(ListChoix()[0].id);

            }


            var options = {
                url: '/api/Formation' + ListFormations()[0].id,
                type: 'put',
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

            var message = "";

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
            logger.log(null, null, "Formulaire contient des erreurs", true);
            system.log('Le Formulaire contient des erreurs');
        }

        */
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