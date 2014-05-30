define(['services/logger', 'durandal/system'], function (logger, system) {


    var dataservice = {
        getFormations: getFormations,
        deleteFormation: deleteFormation

    };

    return dataservice;

    function deleteFormation() {

        var selected = [];
        $('#checkboxes input:checked').each(function () {
            selected.push($(this).attr('name'));
        })
    }



     function getFormations(formationsObservable) {

        //reset the observable
        formationsObservable([]);
        log('reset the observable', null, true);

        //set the ajax call
        var options = {
            url: '/api/Formation',
            type: 'Get',
            cache: false,
            datatype: 'json'
        };
        log('set the ajax call', null, true);

        //make call
        return $.ajax(options).then(querySucceeded);
        log('make call', null, true);

        //handle the ajax callback
        function querySucceeded(data) {
            log('handle the ajax callback', null, true);
            var formations = [];
    
             for (var i = 0; i < data.length; i++) {
                 formations.push(data[i]);
             }

            formationsObservable(formations);
        };

    };

   

    function log(msg, data, showToast) {
        logger.log(msg, data, null, showToast);
    }
});