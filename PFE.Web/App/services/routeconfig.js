/** 
 * @module Route table
 */
define(function () {

    var routes = {
		
        //Authentication Routes
        addExternalLoginUrl : "/api/account/addexternallogin",
        changePasswordUrl: "/api/account/changepassword",
        loginUrl : "/token",
        logoutUrl: "/api/account/logout",
        registerUrl: "/api/account/register",
        registerExternalUrl: "/api/account/registerexternal",
        removeLoginUrl: "/api/account/removelogin",
        setPasswordUrl: "/api/account/setpassword",
        siteUrl : "/",
        userInfoUrl: "/api/account/userinfo",
        getUsersUrl: "/api/account/getusers",
        forgotPassword: "/api/account/forgotpassword",
        resendMailRoute: "/api/account/resendconfirmationemail",
        resetPassword: "/api/account/resetpassword",
        deleteaccount: "/api/account/deleteaccount",
        deleteuseraccount: "/api/account/deleteuseraccount",
        getroles: "/api/account/getroles",
        changerole: "/api/account/changerole",

        //Formation Routes
        getExamenCategories: "/api/examen/categorie/",
        getListFormations: "/api/formation",
        getFormation: "/api/formation/",
        getFormationsTitres: "/api/formation/formationstitres",
        addFormation: "/api/formation",
        deleteFormations: "/api/formation",
        updateFormation: "/api/formation/",

        //Annonce Routes
        getListAnnonces: "/api/annonce",
        getFicheDescriptive: "/api/annonce/FicheDescriptive/",
        createCatalogues: "/api/annonce/catalogue?",
        getHeaders:  "/api/annonce/Headers"
    };

    return routes;

});