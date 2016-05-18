myApp.controller('ExecutiveController', ['$scope', '$interval', 'ExecutiveService',
    function ($scope, $interval, executiveService) {

        var timer, scrollCounter = 0;
        var productGroups = {};

        executiveService.getDashboardData().then(
        function success(response) {
            productGroups = response.data[0];
            organizeProducts(productGroups);

            $scope.productsInfo = productGroups;

            // scrolling disabled temporarily
            //if (productGroups.Products.length > 4) {
            //    timer = $interval(scrollProducts, 10000);
            //}

        }, function error(reason) {
            console.log(reason);
        });

        var organizeProducts = function (productGroups) {

            productGroups.Groups = [];

            var count = 0;
            var group = {
                IsVisible: false,
                ProductGroup: []
            };

            angular.forEach(productGroups.Products, function (product) {

                if (count != 0 && count % 4 == 0) {
                    productGroups.Groups.push(group);

                    group = {
                        IsVisible: false,
                        ProductGroup: []
                    };
                    group.ProductGroup.push(product);
                }
                else {
                    group.ProductGroup.push(product);
                }
                ++count;
            });

            if ((count == productGroups.Products.length) && group.ProductGroup.length > 0) {
                productGroups.Groups.push(group);
            }

            productGroups.Groups[0].IsVisible = true;

        }

        //var scrollProducts = function () {

        //    productGroups.Groups[scrollCounter].IsVisible = false;

        //    ++scrollCounter;

        //    if (scrollCounter === productGroups.Groups.length) {
        //        scrollCounter = 0;
        //    }

        //    productGroups.Groups[scrollCounter].IsVisible = true;

        //}

        $scope.scrollToGroup = function (groupIndex) {

            productGroups.Groups[scrollCounter].IsVisible = false;
            scrollCounter = groupIndex;

            if (scrollCounter === productGroups.Groups.length) {
                scrollCounter = 0;
            }

            productGroups.Groups[scrollCounter].IsVisible = true;

        }

        //$scope.$on("$destroy", function () {
        //    if (timer) {
        //        $interval.cancel(timer);
        //    }
        //});

    }]);
