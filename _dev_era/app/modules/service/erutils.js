angular.module('ERChart').factory('erutils',function($timeout, $rootScope) {

	var erutils = {
        showToast: function (position, duration, message) {
            if (position === 'top') {
                if (duration === 'short') {
                    window.plugins.toast.showShortTop(message);
                } else {
                    window.plugins.toast.showLongTop(message);
                }
            } else if (position === 'bottom') {
                if (duration === 'short') {
                    window.plugins.toast.showShortBottom(message);
                } else {
                    window.plugins.toast.showLongBottom(message);
                }
            } else if (position === 'center') {
                if (duration === 'short') {
                    window.plugins.toast.showShortTop(message);
                } else {
                    window.plugins.toast.showLongTop(message);
                }
            };
        },
        filterCharts: function(charts, chartId) {
            return charts.filter(function(chart){
                return chart.id !== chartId;
            });
        },
        broadcastPageEvent: function (eventName) {
            // console.log('broadcasting: ' + eventName);
            $timeout(function () {
                $rootScope.$broadcast('PageEvent:' + eventName);
            });
        }
    };

	return erutils;
});
