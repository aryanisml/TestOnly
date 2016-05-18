'use strict';


//google.setOnLoadCallback(function () {
//    angular.bootstrap(document.body, ['my-app']);
//});
//google.load('visualization', '1', { packages: ['corechart'] });


//var myApp = myApp || angular.module("my-app", ["google-chart"]);

myApp.controller('componentDetailsController', ['$scope', '$routeParams', 'componentDetailsService', function ($scope, $routeParams, componentDetailsService) {

    $scope.componentDetails = {};
    


    var _parseComponentData = function (component) {

        // decode URL to link them up correctly
        if (component.CodeQualityLinkToLogFile) {
            component.CodeQualityLinkToLogFile = decodeURIComponent(component.CodeQualityLinkToLogFile);
        }

        if (component.UnitTestLinkToLogFile) {
            component.UnitTestLinkToLogFile = decodeURIComponent(component.UnitTestLinkToLogFile);
        }

        if (component.CodeCoverageLinkToLogFile) {
            component.CodeCoverageLinkToLogFile = decodeURIComponent(component.CodeCoverageLinkToLogFile);
        }

        if (component.RuleViolationsLinkToLogFile) {
            component.RuleViolationsLinkToLogFile = decodeURIComponent(component.RuleViolationsLinkToLogFile);
        }

        $scope.componentDetails = component;
        $scope.componentDetails.GroupName = $routeParams.groupName;
    }

    // get the component details 
    componentDetailsService.getComponentDetailsData($routeParams.componentName).then(
        function success(response) {
            _parseComponentData(response.data);
        }, function error(reason) {
            console.log(reason);
        });
}]);