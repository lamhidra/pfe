define(['services/logger', 'durandal/system', 'services/validation', 'services/profilDataService'],
    function (logger, system, validation, ds) {



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





    //Added for update processing
    var ListFormations = ko.observableArray(),
        selectedFormation = ko.observable();

    selectedFormation.extend({ notify: 'always' });

    selectedFormation.subscribe(function (newValue) {
        //var index = ListFormations.indexOf(newValue);

        url = 'api/Formation/' + newValue.id;
        $.getJSON(url, function (formation) {
            data.removeAll();

            StockProfilExist.removeAll();
            StockProfilExist.valueHasMutated();

            ProfilExist.removeAll();
            ProfilExist.valueHasMutated();
            // system.log(data[1]);

            //Copy the ViewModel Values and refresh inputs.
            FormationVMInterface = formation;
            data.push(new ctorFormationInterface(FormationVMInterface.Titre, FormationVMInterface.Description,
                FormationVMInterface.NomOrganisme, FormationVMInterface.DateDebut, FormationVMInterface.DateFin));

            //ProfilInterface = formation;
            StockProfilExist.push(new ctorProfilInterface(FormationVMInterface.Login, FormationVMInterface.Password));
            StockProfilExist.valueHasMutated();

            ProfilExist.push(new ctorProfilInterface(FormationVMInterface.Login, FormationVMInterface.Password));
            ProfilExist.valueHasMutated();

        });

    });

    function ctorFormationInterface(vTitre, vDescription, vNomOrganisme, vDateDebut, vDateFin) {
        var self = this;
        self.Titre = vTitre;
        self.Description = vDescription;
        self.NomOrganisme = vNomOrganisme;
        self.DateDebut = vDateDebut;
        self.DateFin = vDateFin;
        return self;
    }

    var FormationVMInterface = {

        FormationInterface : {
            Titre: ko.observable(),
            Description: ko.observable(),
            NomOrganisme: ko.observable(),
            DateDebut: ko.observable(),
            DateFin: ko.observable()
        },
        ProfilInterface: {
            Login: ko.observable(),
            Password: ko.observable()
        }
    }


    var data = ko.observableArray();

    var vm = {
        activate: activate,
        ListFormations: ListFormations,
        selectedFormation: selectedFormation,
        data: data,


        
        //GP
        login: login,
        password: password,
        StockProfilExist: StockProfilExist,
        AddProfil: AddProfil,
        deleteProfil: deleteProfil,
        dismissProfil: dismissProfil,
        SaveProfil: SaveProfil,
        repeatPassword: repeatPassword

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



});