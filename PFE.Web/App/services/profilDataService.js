define(['services/logger', 'durandal/system'], function (logger, system) {


    var dataservice = {
        dismissProfil: dismissProfil,
        SaveProfil: SaveProfil,
        deleteProfil: deleteProfil,
        AddProfil: AddProfil
    }

    function dismissProfil(StockProfilExist, ProfilExist) {

        //cancel changes and push the existed profil in StockProfiExist ObservableArray

        if (StockProfilExist().length > 0) { StockProfilExist().pop(); }
        if (ProfilExist().length > 0) {
            StockProfilExist().push(ProfilExist()[0]);
        }
        StockProfilExist.valueHasMutated();
    }

    function SaveProfil(StockProfilExist, ProfilExist) {
        //ProfilExist() may hold an old Profil so we need to clear it
        //StockProfil empty means this is the first time we enter the profil modal or we cleaned an existed profil.

        if (ProfilExist().length > 0) { ProfilExist().pop(); }
        if (StockProfilExist().length > 0) {
            ProfilExist().push(StockProfilExist()[0]);
        }
    }

    function deleteProfil(StockProfilExist) {
        StockProfilExist().pop();
        StockProfilExist.valueHasMutated();
    }

    function ctorProfilInterface(vLogin, vPassword) {
        var self = this;
        self.login = vLogin;
        self.password = vPassword;
        return self;
    }
    
    function AddProfil(StockProfilExist, login, password, repeatPassword) {

        if (StockProfilExist().length == 0 && login().length > 4 && password().length > 4 
            && password() == repeatPassword()) {
            system.log('AddProfil');
            StockProfilExist().push(new ctorProfilInterface(login(), password()));
            StockProfilExist.valueHasMutated();
        }

    }


    //Added for modification



    return dataservice;
});
