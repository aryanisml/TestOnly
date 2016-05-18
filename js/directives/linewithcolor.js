myApp.directive('doAmLineWithColorChart', ['config', '$filter', function (config, $filter) {

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
                    seriesData.push({ 'year': $filter('date')(data.BuildDateTime, 'MM-dd-yyyy'), 'value': data.MetricValue, 'lineColor': data.Status });
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
                    "balloon": {
                        "cornerRadius": 2,
                        "horizontalPadding": 10,
                        "verticalPadding": 10
                    },
                    "valueAxes": [{
                        //"percentage": "%",
                        "axisAlpha": 0,
                        "axisColor": "#FFF",
                        "gridThickness": 1,
                        "position": "left",
                        "autoGridCount": false,
                        "gridCount": 5,
                        "minimum": 0,
                        "maximum": 150,
                        "strictMinMax": true
                    }],
                    "graphs": [{
                        "id": "g2",
                        "bullet": "round",
                        "bulletSize": 8,
                        "bulletBorderAlpha": 1,
                        "bulletBorderThickness": 1,
                        "fillAlphas": 0.5,
                        "fillColorsField": "lineColor",
                        "lineColorField": "lineColor",
                        "valueField": "value",
                        "balloonText": "[[category]]<br><b><span style='font-size:12px;'>[[value]]%</span></b>",
                        "type": "smoothedLine"
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

                        "parseDates": true,
                        "autoGridCount": true,
                        "axisColor": "#555555",
                        "gridAlpha": 0,
                        "gridCount": 10
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