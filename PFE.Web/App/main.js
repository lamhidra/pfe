requirejs.config({

    paths: {

        'text': '../Scripts/text',
        'durandal': '../Scripts/durandal',
        'plugins': '../Scripts/durandal/plugins',
        'transitions': '../Scripts/durandal/transitions'
    }
});

define('jquery', function () { return jQuery; });
define('knockout', ko);


define(['durandal/app', 'durandal/viewLocator', 'durandal/system', 'plugins/router', 'services/logger'], boot);

function boot(app, viewLocator, system, router, logger) {

    // Enable debug message to show in the console 
    system.debug(true);
    //alert('after : system.debug(true);');

    app.title = 'My App';
    //alert('after : app.title = main;');

    app.configurePlugins({
        router: true
    });
    //alert('after : Configure;');


    app.start().then(function () {
        toastr.options.positionClass = 'toast-bottom-right';
        toastr.options.backgroundpositionClass = 'toast-bottom-right';

        // When finding a viewmodel module, replace the viewmodel string 
        // with view to find it partner view.
        // [viewmodel]s/sessions --> [view]s/sessions.html
        // Defaults to viewmodels/views/views. 
        // Otherwise you can pass paths for modules, views, partials
        viewLocator.useConvention();
        
        //alert('after : useConvention');
        //Show the app by setting the root view model for our application.
        app.setRoot('viewmodels/shell', 'entrance');
       // system.log('Main Module started');

//        alert('after : setRoot');

    });
};








/*define(function (require) {
    var system = require('durandal/system'),
        app = require('durandal/app'),
        viewLocator = require('durandal/viewLocator'),
        router = require('plugins/router');
    alert('before : system.debug(true);');
    system.debug(true);
   alert('after : system.debug(true);');
    app.title = 'main';
    alert('after : app.title = main;');
    app.configurePlugins({
        router:true
    });
    alert('after : Configure;');

    app.start().then(function () {
        alert('before : useConvention');

        //viewLocator.useConvention();
        alert('after : useConvention');
        app.setRoot('../viewmodels/shell');
        alert('after : setRoot');

    });
});*/



