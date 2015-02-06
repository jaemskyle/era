angular.module('ERChart').controller('FormCtrl',function($scope, cache, erutils, $state, isEditMode, $stateParams){
    if (isEditMode){
        // console.log('should broadcast: isEdit')
      erutils.broadcastPageEvent('isEdit');
    } else {
        // console.log('should broadcast: isAdd')
      erutils.broadcastPageEvent('isAdd');
    }
    $scope.print = function(){
      erutils.broadcastPageEvent('Print');
    };
    $scope.save = function(){
      if ($state.is('root.edit')){
        // console.log('saving: on edit')
        erutils.broadcastPageEvent('UpdateChart');
      } else if ($state.is('root.form')){
        // console.log('saving: on create')
        erutils.broadcastPageEvent('SaveChart');
      }
    };
    $scope.goHome = function(){
      erutils.broadcastPageEvent('GoHome');
    };
});
