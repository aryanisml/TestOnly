'use strict';

myApp.factory('developerSummaryService', ['$http', 'config', function ($http, config) {

    // get developer summary data  
    var _getSummaryBoardData = function (groupName) {
        return $http.get(config.devopsReportingDeveloperSummary + groupName);
    };

    return {

        getSummaryBoardData: _getSummaryBoardData

    }

} ]);