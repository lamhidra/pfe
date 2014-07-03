define(['plugins/router'], function (router) {
    var childRouter = router.createChildRouter()
        .makeRelative({
            moduleId: 'viewmodels',
            fromParent: true
        }).map([
            { route: ['', 'ListeFormations'], moduleId: 'core/GestionDesFormations/ListeFormations/index', title: 'La liste des formations', type: 'formation', nav: true },
            { route: 'AjoutFormation', moduleId: 'core/GestionDesFormations/AjoutFormation/index', title: 'Ajouter une formation', type: 'formation', nav: true },
            { route: 'ModifierFormation', moduleId: 'core/GestionDesFormations/ModifierFormation/index', title: 'Modifier une formation', type: 'formation', nav: true },
            { route: 'ListeAnnonce', moduleId: 'core/GestionDesAnnonces/ListeAnnonces/index', title: 'La liste des annonces', type: 'annonce', nav: true }

        ]).buildNavigationModel();


    var home = {
        router: childRouter,
        ModuleFormation: ko.computed(function () {
            return ko.utils.arrayFilter(childRouter.navigationModel(), function (route) {
                return route.type == 'formation';
            });
        }),

        ModuleAnnonce: ko.computed(function () {
            return ko.utils.arrayFilter(childRouter.navigationModel(), function (route) {
                return route.type == 'annonce';
            });
        })
    }

    return home;
});