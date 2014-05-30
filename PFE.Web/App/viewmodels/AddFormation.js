define(['services/logger', 'durandal/system'], function (logger, system) {

    var title = 'AddFormation',
    //
    Titre = ko.observable(),
    NomOrganisme = ko.observable(),
    Description = ko.observable(),
    DateDebut = ko.observable(),
    DateFin = ko.observable();

    //Gestion des examens
    //#region GE

    //Variables and Observables

    var selectedCategorie = ko.observable(),
        selectedExamen = ko.observable(),
        NombreApprenant = ko.observable(),
        ListChoix = ko.observableArray(),
        StockListChoix = ko.observableArray(),
        Categorie = ['Serveur', 'Desktop', 'Applications', 'BaseDeDonnee', 'Developpeur'],
        listChoices = ko.observableArray(),
        listExamen = ko.observableArray();

    selectedCategorie.extend({ notify: 'always' });

    selectedCategorie.subscribe(function (newValue) {
        var index = Categorie.indexOf(newValue),
        url = "api/Examen/Categorie/" + index.toString();
        $.getJSON(url, function (data) {
            listExamen.removeAll();
           // system.log(data[1]);
            for (Prop in data) {
                system.log(Prop);
                listExamen.push(new ListExamenDictionary(Prop, data[Prop]));
            }

        })

    });

    // Methods
    function ListExamenDictionary(vid, vtitre) {
        var self = this;
        self.id = vid;
        self.titre = vtitre;
        return self;
    }

    function ctor(vindex, vcategorie, vexamen, vnombreApprenant, vid) {
        var self = this;
        self.index = vindex;
        self.examen = vexamen;
        self.categorie = vcategorie;
        self.nombreApprenant = vnombreApprenant;
        self.id = vid;
        return self;
    }

    function AddToPanel() {
        if (NombreApprenant() > 0) {
            system.log('newww Main Module started');
            var i = 0;
            for (; i < StockListChoix().length; i++) {
                system.log(selectedExamen().titre);
                if (StockListChoix()[i].categorie == selectedCategorie() &&
                    StockListChoix()[i].examen == selectedExamen().titre) {
                    break;
                }
            }
       
       
            if (i == StockListChoix().length) {
                StockListChoix.push(new ctor(StockListChoix().length + 1, selectedCategorie(), selectedExamen().titre,
                    NombreApprenant(), selectedExamen().id));

            }
        }
    }

    function StockList() {
        system.log('Main Module started');
        NombreApprenant('');
        selectedCategorie(Categorie[0]);
        ListChoix([]);
        for (var i = 0; i < StockListChoix().length; i++) {
            ListChoix().push(StockListChoix()[i]);
        }
        logger.log("success",null, 'succes', null);
    }

    function Dismiss() {

        NombreApprenant('');
        selectedCategorie(Categorie[0]);
        StockListChoix.removeAll();

        //system.log(StockListChoix([]).length + "");
        for (var i = 0; i < ListChoix().length; i++) {
            StockListChoix().push(ListChoix()[i]);
        }
        system.log(i + " " + StockListChoix().length);
        StockListChoix.valueHasMutated();
        system.log("valueHasMutated");



       /* StockListChoix().push(new ctor(StockListChoix().length + 1, 'cat', 'exam', 'fin'));
        StockListChoix().push*/

        system.log('Fin Dismiss');

    }

    function deleteFromList(value) {
        StockListChoix.remove(value);
        system.log('deleteFromList');
    }

    //#endregion GE


    //Gestion de profil
    //#region GP

    //Variables and Observables
    var login = ko.observable();
    var password = ko.observable();
    var repeatPassword = ko.observable();
    var StockProfilExist = ko.observableArray();
    var ProfilExist = ko.observableArray();

    // Methods
    function ctorProfil(vlogin, vpassword) {
        var self = this
        self.login = vlogin
        self.password = vpassword
        return self
    }
   

    function AddProfil() {

        if (StockProfilExist().length == 0 && repeatPassword() === password()) {
            system.log('AddProfil');
            StockProfilExist().push(new ctorProfil(login(), password()));
            StockProfilExist.valueHasMutated();
        }
       
    }

    function deleteProfil() {
        system.log('deleteProfil');
        StockProfilExist().pop();
        StockProfilExist.valueHasMutated();

    }

    function SaveProfil() {
    
        system.log('SaveProfil');
        if (ProfilExist().length > 0) { ProfilExist().pop(); }
        if (StockProfilExist().length > 0) {
            ProfilExist().push(StockProfilExist()[0]);
        }
    }

    function dismissProfil() {
        system.log('dismissProfil');
        login('');
        password('');
        repeatPassword('');
        if (StockProfilExist().length > 0) { StockProfilExist().pop(); }
        if (ProfilExist().length > 0) {
            StockProfilExist().push(ProfilExist()[0]);
        }
        StockProfilExist.valueHasMutated();
      


    }
    //#endregion GE


    var vm = {
        activate: activate,
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
        repeatPassword: repeatPassword
    };

    return vm;

    //#region Internal Methods
    function activate() {
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }

    function Add() {

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
        }
        
        return $.ajax(options);
    }

});

/*'Login': login(),
               'Password': password(),
               'Titre': Titre(),
               'NomOrganisme': NomOrganisme(),
               'Description': Description(),
               'DateDebut': DateDebut(),
               'DateFin': DateFin(),
               'MaxApprenant': NombreApprenant()*/