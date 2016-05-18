myApp.directive('doAmDoughnutChart', ['config', function (config) {

    return {

        // restrict to use as attribute only
        restrict: 'A',
        
        scope: {
            fillPercent: '@',
            isVisible : '@'
        },
        link: function (scope, element, attr) {

            if (scope.fillPercent){
                scope.fillPercent = Math.round(scope.fillPercent);
            }

            var _getColor = function (fillPercent) {
                
                var statusColor = config.statusColor.red;

                if (fillPercent) {
                    statusColor = fillPercent < config.overallThreshold.min ? config.statusColor.red : (fillPercent < config.overallThreshold.max ? config.statusColor.yellow : config.statusColor.green);
                }

                return statusColor;
            }

            scope.chart = null;
            scope.element = element;

            var _drawChart = function() {

                scope.chart = AmCharts.makeChart(attr["id"], {
                    "type": "pie",
                    "theme": "none",                
                    "colors": [_getColor(scope.fillPercent), config.statusColor.gray],
                    "labelRadius" : 0,
                    "labelsEnabled" : false,
                    // "titles" : [{"text" : "Overall Status : " + scope.fillPercent + "%"}],
                    "marginBottom" : 0,
                    "marginTop" : 0,
                    "dataProvider": [{
                        "title": "Completed",
                        "status": scope.fillPercent,
                    }, {
                        "title": "Remaining",
                        "status": 100 - scope.fillPercent,

                    }],
                    "valueField": "status",
                    "titleField": "title",
                    "innerRadius": "50%",
                    "depth3D": 5,
                    "balloonText": "[[title]]<br /><span style='font-size:14px'><b>[[value]]%</b></span>",
                    "angle": 15,
                    "labelRadius": "-50%",
                    "allLabels": [{
                        "text": scope.fillPercent + "%",
                        "align": "center",
                        "bold": true,
                        "y": "65",
                        "size" : 13,
                        "color" : _getColor(scope.fillPercent)

                    }]
                });

                //scope.chart.invalidateSize();

                console.log('drawing doughnut chart');
            }
               
            var _fillWatcher = scope.$watch(function () { 
                    return scope.fillPercent; 
                }, function() {
                    if (scope.fillPercent) {
                        _drawChart();
                         scope.chart.invalidateSize();
                        console.log('fill : invalidating');
                    }
                });

            var _visibleWatcher = scope.$watch(function () {
                return scope.isVisible;
            }, function () {
                if (scope.isVisible === 'true' && scope.chart) {

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

            scope.$on('$destroy', function() { 
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