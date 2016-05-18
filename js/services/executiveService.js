'use strict';

myApp.factory('ExecutiveService', ['$http', 'config', function ($http, config) {

    // get executive dashboard data
    var _getDashboardData = function () {
        return $http.get(config.devopsReportingExecutiveDashboard);
    };

    return {

        getDashboardData: _getDashboardData

    }    

} ]);