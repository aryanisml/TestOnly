myApp.controller('thresholdController', function ($scope , $http ) {
    $http.get("http://localhost:2863/api/SEFMeasureThreshold").success(
        function (response) {
            $scope.value = response.data;
        }, function error(reason) {
            console.log(reason);
        }
    )
})