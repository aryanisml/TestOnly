'use strict';

var googleChart = googleChart || angular.module('google-chart', []);
var myApp = myApp || angular.module('myApp', ['google-chart', 'ngRoute']);

/*We need to manually start angular as we need to
wait for the google charting libs to be ready*/  
google.setOnLoadCallback(function () {  
    angular.bootstrap(document.body, ['myApp']);
});

google.load('visualization', '1', {packages: ['corechart']});


myApp.config(function ($routeProvider, $httpProvider) {

       $routeProvider.when('/dashboard',
            {
		redirectTo: '/summary/SEF'
            });

        $routeProvider.when('/summary/:groupName',
            {
                authenticate: false,
                title: 'Developer Summary',
                templateUrl: 'partials/devSummary.html',
                controller: 'developerSummaryController'
            });

        $routeProvider.when('/:groupName/component/:componentName',
            {
                authenticate: false,
                title: 'Application Details',
                templateUrl: 'partials/newComponentDetails.html',
                controller: 'componentDetailsController'
            });

        $routeProvider.when('/executive',
            {
                authenticate: false,
                title: 'Dashboard',
                templateUrl: 'partials/executiveSummary.html',
                controller: 'ExecutiveController'
            });

        $routeProvider.otherwise({ redirectTo: '/dashboard' });

        //TODO: REST proxy services must include CORS support
        //      basically add the following header (it's case sensitive)
        //      to all REST responses.
        //      Replace the * with value from the request's "Origin" header.
        //
        //           Access-Control-Allow-Origin: *
        //

        // Client Side code to enable CORS calls from Angular
        // (still need the above on the server side)
        $httpProvider.defaults.useXDomain = true;
        // Tell Angular to send remote cookies with REST request, true sends cookies but also disallows Access-Control-Allow-Origin value of *
        //$httpProvider.defaults.withCredentials = true;
        // Remove unnecessary request header
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    });

