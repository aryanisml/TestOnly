myApp.directive('doAmColumnChart', ['config', function (config) {

    return {

        restrict: 'A',
        scope: {
            ngModel: '=',
            isVisible : '@'
        },
        controller: function ($scope) {
        },
        link: function (scope, element, attr) {

            scope.element = element;
            scope.chart = null;

            var _getColor = function (fillPercent) {
                return fillPercent <= config.statusThreshold.unsatisfactory ? config.statusColor.red : (fillPercent <= config.statusThreshold.average ? config.statusColor.yellow : (fillPercent >= config.statusThreshold.average ? config.statusColor.green : config.statusColor.gray))
            }

            var _getCodeQualityColor = function (fillPercent) {

                var statusColor = config.statusColor.red;
                    
                if (fillPercent) {
                    statusColor = fillPercent < config.codeQualityThreshold.min ? config.statusColor.red : (fillPercent < config.codeQualityThreshold.max ? config.statusColor.yellow : config.statusColor.green);
                }

                return statusColor;
            }

            var _getUnitTestingColor = function (fillPercent) {

                var statusColor = config.statusColor.red;

                if (fillPercent) {
                    statusColor = fillPercent <= config.unitTestingThreshold.min ? config.statusColor.red : config.statusColor.green;
                }

                return statusColor;

            }

            var _getCodeCoverageColor = function (fillPercent) {

                var statusColor = config.statusColor.red;

                if (fillPercent) {
                    statusColor = fillPercent < config.codeCoverageThreshold.min ? config.statusColor.red : (fillPercent < config.codeCoverageThreshold.max ? config.statusColor.yellow : config.statusColor.green);
                }

                return statusColor;

            }

            var _getPredictabilityScoreColore = function (fillPercent) {

                var statusColor = config.statusColor.red;

                if (fillPercent) {
                    statusColor = fillPercent < config.predictabilityScoreThreshold.min ? config.statusColor.red : (fillPercent < config.predictabilityScoreThreshold.max ? config.statusColor.yellow : config.statusColor.green);
                }

                return statusColor;
            }

            var _getSeriesData = function (productData) {
                var barData = [];

                barData.push({ category: "Code Quality", status: Math.round(productData.CodeQuality), color: _getCodeQualityColor(productData.CodeQuality) });
                barData.push({ category: "Unit Testing", status: Math.round(productData.UnitTesting), color: _getUnitTestingColor(productData.UnitTesting) });
                barData.push({ category: "Code Coverage", status: Math.round(productData.CodeCoverage), color: _getCodeCoverageColor(productData.CodeCoverage) });
                barData.push({ category: "Automated Testing", status: Math.round(productData.AutomatedTesting), color: _getColor(productData.AutomatedTesting) });
                barData.push({ category: "Predictability Score", status: Math.round(productData.PredictabilityScore), color: _getPredictabilityScoreColore(productData.PredictabilityScore) });

                return barData;
            }


            var _drawChart = function() {

                var seriesData = _getSeriesData(scope.ngModel);

                scope.chart = AmCharts.makeChart(attr["id"], {
                    "type": "serial",
                    "theme": "none",
                    "dataProvider": seriesData,
                    "valueAxes": [{
                        "labelsEnabled": false,
                        "gridThickness" : 0,
                        "axisThickness" : 0,
                        "gridColor": "#FFFFFF",
                        "gridAlpha": 0.2,
                        "dashLength": 0
                    }],
                    "gridAboveGraphs": true,
                    "startDuration": 1,
                    "graphs": [{
                        "fontSize" : "1em",
                        "colorField" : "color",
                        "labelColorField" : "color",
                        "balloonText": "[[category]]: <b>[[value]]%</b>",
                        "fillAlphas": 1,
                        "lineAlpha": 0.2,
                        "type": "column",
                        "valueField": "status",
                        "labelText": "[[value]]%"
                    }],
                    "chartCursor": {
                        "categoryBalloonEnabled": false,
                        "cursorAlpha": 0,
                        "zoomable": false
                    },
                    "categoryField": "category",
                    "categoryAxis": {
                        "autoWrap": true,
                        "gridColor" :  "red",
                        "gridPosition": "start",
                        "gridAlpha": 0,
                        "tickPosition": "start",
                        "tickLength": 5,
                        "axisThickness" : 1,                    
                    }
                });

                //scope.chart.invalidateSize();

                console.log('drawing coulmn chart');


            }

            var _visibleWatcher = scope.$watch(function () {
                return scope.isVisible;
            }, function () {
                if (scope.isVisible === 'true'  && scope.chart) {
                    scope.element[0].attributes.style.display = 'none';
                    _drawChart();
                    scope.chart.invalidateSize();
                    scope.chart.handleResize();
                    scope.chart.animateAgain();

                    scope.element[0].offsetHeight; // no need to store this anywhere, the reference is enough
                    scope.element[0].attributes.style.display = 'block';


                    console.log('visible : invalidating');
                }
            });

            var _fillWatcher = scope.$watch(function () {
                return scope.ngModel;
            }, function () {
                if (scope.ngModel) {
                    _drawChart();
                    scope.chart.invalidateSize();
                    console.log('fill : invalidating');
                }

            });

            scope.$on('$destroy', function () {
                if (_fillWatcher) {
                   _fillWatcher();
                }

                if (_visibleWatcher) {
                    _visibleWatcher();
                }

            });
           
        }
    }

} ]);