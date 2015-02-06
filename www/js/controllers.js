angular.module('starter.controllers', ['starter.factories'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebase, $firebaseAuth, $state) {
    var erfire = new Firebase('https://era.firebaseio.com');
    var erfiresync = $firebase(erfire).$asArray();
    $scope.authObj = $firebaseAuth(erfire);
    var authData = $scope.authObj.$getAuth();
    var users = [];

    $scope.signup = {};
    $scope.cred = {};
    $scope.user = {
        eruid : null
    };


    if (authData) {
      console.log("Already in as:", authData.uid);
      console.log(authData)
      $scope.user.eruid = authData.uid;
      console.log($scope.user);
      $timeout( function(){
          $state.go('default.home')
          });
    } else {
      console.log("Logged out");
    }

    $scope.login = function(){
        $scope.authObj.$authWithPassword({
          email: $scope.cred.email,
          password: $scope.cred.pass
        }).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          $scope.cred = {}
          $timeout( function(){
              $state.go('default.home')
            });
          
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });
    };
    $scope.signup = function(){
        $scope.authObj.$createUser({
          email: $scope.signup.email,
          password: $scope.signup.pass,
        }).then(function(userData) {
          console.log("User " + userData.uid + " created successfully!");
          var newUid = userData.uid;
          var newUser = {
                  _eruid: userData.uid,
                  hospital: $scope.signup.hospital,
                  name: $scope.signup.nom
              };
              erfiresync.$add(newUser).then(function(ref) {
                  var id = ref.key();
                  console.log("added record with id " + id);
                  erfiresync.$indexFor(id); // returns location in the array
                  console.log(erfiresync);
                });

          return $scope.authObj.$authWithPassword({
            email: $scope.signup.email,
            password: $scope.signup.pass
          });
        }).then(function(authData) {
          console.log("Logged in as:", authData.uid);
          $scope.user.eruid = authData.uid;
          console.log($scope.user);
          console.log(authData);

          $timeout( function(){
                $state.go('default.home');
            });

          $scope.signup = {};
        }).catch(function(error) {
          console.error("Error: ", error);
        });
    };
  
  
  
  
  
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  // $ionicModal.fromTemplateUrl('templates/login.html', {
  //   scope: $scope
  // }).then(function(modal) {
  //   $scope.modal = modal;
  // });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
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

  $scope.logout = function(){
      console.log('should log out');
      $scope.authObj.$unauth();
      $timeout( function(){
          $state.go('default.login')
        });
    };
})

.controller('HomeCtrl', function($scope, cacheFactory, $interval, $state, $timeout){
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

