myApp.directive('doAmLineChart', ['config', '$filter', function (config, $filter) {

    return {

        restrict: 'A',
        scope: {
            ngModel: '='
        },
        controller: function ($scope) {
        },
        link: function (scope, element, attr) {

            scope.chart = null;

            var _getSeriesData = function (series) {

                var seriesData = [];

                angular.forEach(series, function (data) {
                    seriesData.push({ 'year' : $filter('date')(data.BuildDateTime, 'MM-dd-yyyy'),  'value' : data.MetricValue });
                });

                return seriesData;
            }

            var _drawChart = function () {

                var lineSeries = _getSeriesData(scope.ngModel);

                AmCharts.makeChart(attr["id"], {
                    "type": "serial",
                    "theme": "light",
                    "marginTop": 0,
                    "marginRight": 80,
                    "dataProvider": lineSeries,
                    "valueAxes": [{
                        "color": "#FFF",
                        "axisAlpha": 0,
                        "gridThickness" : 1,
                        "position": "left",
                        "axisColor": "#FFF",
                        "gridColor": "#FFF",
                        "autoGridCount": true,
                        "gridCount": 5,
                        "minimum": 0,
                        "maximum" : 150
                    }],
                    "graphs": [{
                        "id": "g1",
                        "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]%</span></b>",
                        "bullet": "round",
                        "bulletSize": 8,
                        "lineColor": "white",
                        "lineThickness": 2,
                        "negativeLineColor": "#637bb6",
                        "type": "smoothedLine",
                        "valueField": "value"
                    }],
                    "chartCursor": {
                        "categoryBalloonDateFormat": "MM-DD-YYYY",
                        "cursorAlpha": 0,
                        "valueLineEnabled": true,
                        "valueLineBalloonEnabled": true,
                        "valueLineAlpha": 0.5,
                        "fullWidth": true
                    },
                    "dataDateFormat": "MM-DD-YYYY",
                    "categoryField": "year",
                    "categoryAxis": {
                        "color" : "#FFF",
                        "axisColor" : "#FFF",
                        "gridThickness" :  0,
                        "minPeriod": "DD",
                        "parseDates": true,
                        "minorGridAlpha": 0.5,
                        "minorGridEnabled": true
                    },
                    "export": {
                        "enabled": false
                    }
                });

            }

            _drawChart();

            var _fillWatcher = scope.$watch(function () {
                return scope.ngModel;
            }, function () {
                if (!scope.ngModel) { return };
                _drawChart();
            });

            scope.$on('$destroy', function () {
                if (_fillWatcher) {
                    _fillWatcher();
                }
            });

        }
    }

}]);