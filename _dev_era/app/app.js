angular.module('ERChart', ['ionic', 'LocalForageModule', 'firebase', 'mgcrea.ngStrap']);

angular.module('ERChart').config(function($stateProvider, $urlRouterProvider, $locationProvider,$localForageProvider) {
    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });

    $stateProvider.state('root', {
        url: '/a',
        templateUrl: 'modules/partial/menu/menu.html',
        abstract: true
    });
    $stateProvider.state('login', {
        url: '/login',
        views: {
            '@': {
                templateUrl: 'modules/partial/login/login.html',
                controller: 'LoginCtrl'
            }
        }
    });
    $stateProvider.state('signup', {
        url: '/signup',
        views: {
            '@': {
                templateUrl: 'modules/partial/signup/signup.html',
                controller: 'SignupCtrl'
            }
        }
    });
    $stateProvider.state('forgot', {
        url: '/forgot',
        views: {
            '@': {
                templateUrl: 'modules/partial/forgot/forgot.html',
                controller: 'ForgotCtrl'
            }
        }
    });
    $stateProvider.state('root.settings', {
        url: '/settings',
        views: {
            'rootContent': {
                templateUrl: 'modules/partial/settings/settings.html'
            }
        }
    });
    $stateProvider.state('root.form', {
        url: '/form',
        views: {
            'rootContent': {
                resolve: {
                  'isEditMode': function(){
                    return false;
                  }
                },
                templateUrl: 'modules/partial/form/form.html',
                controller: 'FormCtrl'
            }
        }
    });
    $stateProvider.state('root.edit', {
        url: '/form/:formId',
        views: {
            'rootContent': {
                resolve: {
                  'isEditMode': function(){
                    return true;
                  }
                },
                templateUrl: 'modules/partial/form/form.html',
                controller: 'FormCtrl'
            }
        }
    });
    $stateProvider.state('root.home', {
        url: '/home',
        views: {
            'rootContent': {
                templateUrl: 'modules/partial/home/home.html',
                controller: 'HomeCtrl'
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');
    // console.log(window.localforage)

      $localForageProvider.setNotify(true, true); // itemSet, itemRemove
      $localForageProvider.config({
        driver: window.localforage.LOCALSTORAGE,
        name        : 'ERa_',
        storeName   : 'ERaLocalStore',
        description : 'ERa local data.'
      });
});

angular.module('ERChart').run(function($rootScope,$state,$stateParams) {

   $rootScope.$state=$state;
   $rootScope.$stateParams=$stateParams;


    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
