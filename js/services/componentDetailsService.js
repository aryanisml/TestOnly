'use strict';

myApp.factory('componentDetailsService', ['$http', 'config', function ($http, config) {

    // get component details data 
    var _getComponentDetailsData = function (componentName) {
        return $http.get(config.devopsComponentDetails + componentName);
    };

    return {

        getComponentDetailsData : _getComponentDetailsData

    }

} ]);