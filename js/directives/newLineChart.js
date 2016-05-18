googleChart.directive('doLineWithColorChart', ['config', '$filter', function (config, $filter) {

    return {
        restrict: 'A',
        scope: {
            ngModel: '='
        },
        link: function (scope, element, attrs) {

            var _getSeriesData = function (series) {


               
                var seriesData = [];
                angular.forEach(series, function (data, key) {
                    seriesData.push([new Date(data.BuildDateTime), data.MetricValue, data.Status]);
                });
                return seriesData;
            }



            var googleChart = new google.visualization.LineChart(element[0]);

            var options = {
                hAxis: {

                    gridlines: {
                        color: 'transparent'
                    },

                    format: "MMM dd",
                    textStyle: {
                        color: '#FFF',
                        fontName: 'Verdana',
                        fontSize: 11
                    },
                    showTextEvery: 2
                },
                vAxis: {
                    //minValue: 0,
                    //maxValue: 125,
                    gridlines: {
                        count: 7,
                        color: '#FFF'
                    },
                    viewWindow: {
                        max: 125,
                        min: 0
                    },

                    baselineColor: "#FFF",
                    format: '#\'%\'',
                    textStyle: {
                        color: '#FFF',
                        fontName: 'Verdana',
                        fontSize: 11
                    },
                },
                pointSize: 6,
                pointShape: {
                    type: 'circle'
                },
                lineWidth: 2,
                legend: {
                    position: 'none'
                },
                backgroundColor: '#222',

                tooltip: {
                    textStyle: {
                        fontName: 'Calibri',
                        fontSize: 12
                    }
                }
            };

            
            scope.$watch(function () { return scope.ngModel; }, function (xData) {
                var dt = _getSeriesData(scope.ngModel);
                var data = new google.visualization.DataTable();
                data.addColumn('date', 'Date');
                data.addColumn('number', 'Percentage');
                data.addColumn({ type: 'string', role: 'style' });
                data.addRows(dt);
                googleChart.draw(data, options);


            });



        }

    }


}]);