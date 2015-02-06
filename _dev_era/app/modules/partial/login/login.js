angular.module('ERChart').controller('LoginCtrl',function($scope, $state){
    $scope.login = function(){
        console.log('should go root.home');
        $state.go('root.home');
    };
});
