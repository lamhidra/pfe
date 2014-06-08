define(function () {


    var helpers = {

        ToDate : ToDate
    };


    function ToDate(date) {

        var Day = (new Date(date).getDate()) > 9 ?
                (new Date(date).getDate()) : "0"
                + (new Date(date).getDate()),

            Month = (new Date(date).getMonth()) > 9 ?
                (new Date(date).getMonth() + 1) : "0"
                + (new Date(date).getMonth() + 1),

            Year = new Date(date).getFullYear();

                  
        return Year + "-" + Month + "-" + Day;
    }

    return helpers;
});