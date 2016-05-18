'use strict';


myApp.controller('defaultController', ['$scope', '$routeParams', 'groupListService', function ($scope, $routeParams, groupListService) {
    groupListService.getGroupList().then(
           function success(response) {
               $scope.groupList = response.data;
           }, function error(reason) {
               console.log(reason);
           });
}

]);
