define(function () {


    //validation
    var mustEqual = function (val, other) {
        return val == other();
    };

    var dateValidation = function (val, other) {
        return val >= other();
    };

    var digitValidation = function (val, max) {
        return val <= max;
    }

    var validation = {
        mustEqual: mustEqual,
        dateValidation: dateValidation,
        digitValidation: digitValidation
    };

    return validation;

});