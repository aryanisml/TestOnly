'use strict';

myApp.controller('developerSummaryController', ['$scope', '$filter', '$routeParams', 'developerSummaryService',
    function ($scope, $filter, $routeParams, summaryBoardService) {

        $scope.group = null;

        // parser data 
        var _parseSummaryData = function (summaryValue) {

            angular.forEach(summaryValue.Components, function (componentValue, componentKey) {

                componentValue.BuildTime = $filter('date')(componentValue.BuildTime, 'yyyy-MM-dd HH:mm:ss a');
                componentValue.Deploy.DevTime = $filter('date')(componentValue.Deploy.DevTime, 'yyyy-MM-dd HH:mm:ss a');
                componentValue.Deploy.QATime = $filter('date')(componentValue.Deploy.QATime, 'yyyy-MM-dd HH:mm:ss a');
                componentValue.Deploy.ProductionTime = $filter('date')(componentValue.Deploy.ProductionTime, 'yyyy-MM-dd HH:mm:ss a');

                // decode URLs
                if (componentValue.CodeQualityLinkToLogFile) {
                    componentValue.CodeQualityLinkToLogFile = decodeURIComponent(componentValue.CodeQualityLinkToLogFile);
                }

                if (componentValue.UnitTestingLinkToLogFile) {
                    componentValue.UnitTestingLinkToLogFile = decodeURIComponent(componentValue.UnitTestingLinkToLogFile);
                }

                if (componentValue.CodeCoverageLinkToLogFile) {
                    componentValue.CodeCoverageLinkToLogFile = decodeURIComponent(componentValue.CodeCoverageLinkToLogFile);
                }

            });

            angular.forEach(summaryValue.Projects, function (project) {
                project.monitor.DevTime = $filter('date')(project.monitor.DevTime, 'yyyy-MM-dd HH:mm:ss a');
                project.monitor.QATime = $filter('date')(project.monitor.QATime, 'yyyy-MM-dd HH:mm:ss a');
                project.monitor.ProductionTime = $filter('date')(project.monitor.ProductionTime, 'yyyy-MM-dd HH:mm:ss a');

                project.autoTesting.DevTime = $filter('date')(project.autoTesting.DevTime, 'yyyy-MM-dd HH:mm:ss a');
                project.autoTesting.QATime = $filter('date')(project.autoTesting.QATime, 'yyyy-MM-dd HH:mm:ss a');
                project.DefectsTime = $filter('date')(project.DefectsTime, 'yyyy-MM-dd HH:mm:ss a');
                project.PredictabilityScoreTime = $filter('date')(project.PredictabilityScoreTime, 'yyyy-MM-dd HH:mm:ss a');
            });

            return summaryValue;

        }

        summaryBoardService.getSummaryBoardData($routeParams.groupName).then(
            function success(response) {
                $scope.group = _parseSummaryData(response.data);
            }, function error(reason) {
                console.log(reason);
            });
    } ]);
