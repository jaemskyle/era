angular.module('ERChart').directive('erItemIsprinted', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, fn) {
            if (attrs.erItemIsprinted) {
                var c = angular.element(element.children()[0]);
                c[0].style.background = 'beige';
            }
		}
	};
});
