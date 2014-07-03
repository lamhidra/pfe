/** 
 * @module Manage errors in the app
 * @requires logger
 * @requires system
 * @requires utils
 */

define(['services/logger', 'durandal/system', 'services/utils'],
    function (logger, system, util) {

        var ErrorHandler = (function () {
            /**
             * @constructor
             */
            var ctor = function (targetObject) {

                /**
                 * Log the error
                 * @method
                 * @param {string} message
                 * @param {bool} showToast - Show a toast using toastr.js
                 */
                this.log = function (message, showToast) {
                    logger.log(message, null, system.getModuleId(targetObject), showToast);                    
                };

           
                /**
                 * Handle authentication errors                 
                 * @method
                 * @param {object} errors
				 * @returns {object} error object
                 */
                this.handleauthenticationerrors = function (errors) {
                    if (errors.responseText != "") {
                        var data = $.parseJSON(errors.responseText);
                        if (data && data.error_description) {
                            logger.logError(data.error_description, null, errors, true);
                        } else {
                            if (data.message) {
                                logger.logError(data.message, null, errors, true);
                            }
                        }
                    }
                };
            };

            return ctor;
        })();

        return {
            includeIn: includeIn
        };

        /**
         * Include the error handler class in any viewmodel
         * @method
         * @param {object} targetObject
         * @return {object} - The extended object
         */
        function includeIn(targetObject) {
            return $.extend(targetObject, new ErrorHandler(targetObject));
        }
    });