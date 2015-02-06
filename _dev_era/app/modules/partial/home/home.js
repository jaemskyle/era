angular.module('ERChart').controller('HomeCtrl',function($scope, cache, $interval, $state, $timeout){
  $scope.showListDelete = false;
  var allExForms = [];
  var init = function(){
    cache.getLocalData().then(function(getLocalDataSuccess){
      if (getLocalDataSuccess.length){
        $scope.forms = getLocalDataSuccess;
      } else {
        $scope.forms = allExForms;
      }
    });
  };
  var syncScopeToLocal = function(){
    cache.writeLocalData(allExForms).then(
      function(setSuccess){
        init();
      }
    );
  };
  var deleteItem = function(item, index){
    if (allExForms.length){
      allExForms.splice(index, 1);
      syncScopeToLocal();
    }
  };

  var prepForDelete = function(item, index){
    cache.getLocalData().then(function(getLocalDataSuccess){
      if (!getLocalDataSuccess.length){
      } else {
          allExForms = getLocalDataSuccess;
          deleteItem(item, index);
      }
    });
  };

  var getLocalData = function(){
    cache.getLocalData().then(function(getLocalDataSuccess){
      if (!getLocalDataSuccess){
//          $interval(getLocalData, 1000, 3);
      } else {
          // console.log(getLocalDataSuccess)
          allExForms = getLocalDataSuccess;
          $scope.forms = getLocalDataSuccess;
      }
    });
  };

  $scope.refresh = function(){
      getLocalData();
  };
  $scope.clearAll = function(data){
    cache.clearAllCached();
    $scope.forms = [];
  };
  $scope.canSwipeList = function(){
    return true;
  };
  $scope.deleteItem = function(item, index){
    if (!index && allExForms.length === 1){
      allExForms = [];
      syncScopeToLocal();
    } else {
      prepForDelete(item, index);
    }
  };
  $scope.editItem = function(form){
    $timeout(function(){
      $state.transitionTo('root.edit', {formId: form.id});
    });
  };

  init();

  $scope.$on('CacheUpdate:Updated', function(event, args){
    init();
  });

});
