// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.filters', 'LocalForageModule'])

.run(function($ionicPlatform, $rootScope, $state, $stateParams) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
})

.config(function($stateProvider, $urlRouterProvider, $localForageProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
        controller: 'HomeCtrl'
      }
    }
  })

  .state('app.form', {
    url: "/form",
    views: {
      'menuContent': {
        templateUrl: "templates/form.html"
      }
    }
  })
  .state('app.edit', {
    url: '/edit/:formId',
    views: {
      'menuContent': {
        templateUrl: "templates/edit.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

  $localForageProvider.setNotify(true, true); // itemSet, itemRemove
  $localForageProvider.config({
    driver: localforage.LOCALSTORAGE,
    name        : 'ERa_',
    storeName   : 'ERaLocalStore',
    description : 'ERa local data.'
  });
});
