angular.module('starter.controllers', ['starter.factories'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('HomeCtrl', function($scope, cacheFactory, $interval, $state, $timeout, $firebase){
  $scope.showListDelete = false;
  var allExForms = [];
  var init = function(){
    cacheFactory.getLocalData().then(function(getLocalDataSuccess){
      if (getLocalDataSuccess.length){
        $scope.forms = getLocalDataSuccess;
      } else {
        $scope.forms = allExForms;
      }
    });
  };
  var syncScopeToLocal = function(){
    cacheFactory.setLocalData(allExForms).then(
      function(setSuccess){
        init()
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
    cacheFactory.getLocalData().then(function(getLocalDataSuccess){
      if (!getLocalDataSuccess.length){
      } else {
          allExForms = getLocalDataSuccess;
          deleteItem(item, index);
      }
    });
  };

  var getLocalData = function(){
    cacheFactory.getLocalData().then(function(getLocalDataSuccess){
      if (!getLocalDataSuccess){
//          $interval(getLocalData, 1000, 3);
      } else {
          console.log(getLocalDataSuccess)
          allExForms = getLocalDataSuccess;
          $scope.forms = getLocalDataSuccess;
      }
    });
  };

  $scope.refresh = function(){
      getLocalData();
  };
  $scope.clearAll = function(data){
    cacheFactory.clearAllCached();
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
      $state.transitionTo('default.edit', {formId: form.id});
    })
  };

  init();

  $scope.$on('CacheUpdate:Updated', function(event, args){
    init();
  });

})
.controller('ChartCtrl', function($scope, cacheFactory, ERaUtilsFactory, $state, isEditMode, $stateParams){
    if (isEditMode){
      ERaUtilsFactory.broadcastPageEvent('isEdit');
    } else {
      ERaUtilsFactory.broadcastPageEvent('isAdd');
    }
    $scope.print = function(){
      ERaUtilsFactory.broadcastPageEvent('Print');
    };
    $scope.save = function(){
      if ($state.is('default.edit')){
        console.log('saving: on edit')
        ERaUtilsFactory.broadcastPageEvent('UpdateChart');
      } else if ($state.is('default.form')){
        console.log('saving: on create')
        ERaUtilsFactory.broadcastPageEvent('SaveChart');
      }
    };
    $scope.goHome = function(){
      ERaUtilsFactory.broadcastPageEvent('GoHome');
    };
})
;

