'use strict';

myApp.factory('groupListService', ['$http', 'config', function ($http, config) {

    // get executive dashboard data
    var _getGroupList = function () {
        return $http.get(config.devOpsGroupList);
    };

    return {

        getGroupList: _getGroupList

    }

}]);