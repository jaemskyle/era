angular.module('starter.controllers', [])

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
.controller('BrowseCtrl', function($scope){
    var page = document.getElementById('form');

    var print = function(){
      console.log('should print');
      cordova.plugins.printer.print(page, 'Document.html', function () {
          alert('printing finished or canceled')
          $scope.apply();
      });
    };
    $scope.isRadiate = false;
    $scope.isPalpitation = 'No';
    $scope.isBreathShortness = 'No';
    $scope.isNausea = 'No';
    $scope.isSuddenChestPain = 'No';
    $scope.isFever = 'No';
    $scope.isChills = 'No';
    $scope.isCough = 'No';
    $scope.isSyncopy = 'No';
    $scope.isAbdominalPain = 'No';
    $scope.isChangeInBowel_Bladder = 'No';

    var physicalExamProblemsCount = 0;
    $scope.isPhysicalExam = true;
    var setPhysicalExamStatus = function(){
      if (physicalExamProblemsCount === 0){
        $scope.isPhysicalExam = true;
      } else {
        $scope.isPhysicalExam = false;
      }
    };
    

    $scope.print = function(){
      document.addEventListener("deviceready", print, false);
    };
    $scope.physicalExamChildListener = function(value, param){
      if (value){
        physicalExamProblemsCount = physicalExamProblemsCount +1;
      } else if (!value && physicalExamProblemsCount !== 0) {
        physicalExamProblemsCount = physicalExamProblemsCount -1;
      } else if (!value && physicalExamProblemsCount === 0) {
        physicalExamProblemsCount = 0;
      }  
      setPhysicalExamStatus()
    };
    $scope.physicalExamParentListener = function(param){
    };
    $scope.setPhysicalExamParent = function(param){
      if (param === 'Yes' || param){
        $scope.isPhysicalExam = false;
      } 
    };
    $scope.setPhysicalExamMainChildren = function(){
      $scope.isAirEntry = false;
      $scope.isWheezing = 'No';
      $scope.isCrackles = 'No';
      $scope.isS1 = 'No';
      $scope.isS2 = 'No';
      $scope.isS3 = 'No';
      $scope.isMurmur = 'No';
      $scope.isPeripheralPulses = 'No';
      $scope.isSoft = 'No';
      $scope.isTender = 'No';
      $scope.isBowelSoundPresent = 'No';
      $scope.isMass = 'No';
      $scope.isOrganomegaly = 'No';
      $scope.isReboundTenderness = 'No';
      $scope.isPeripheralPulses = 'No';
    };
    $scope.setPhysicalExamChild = function(param){
      if (param) {
        console.log($scope.ername);
        $scope.ername.airEntry.$viewValue = false;
        $scope.ername.airEntry.$render();
        // $scope.setPhysicalExamMainChildren();
      }
    };
})
;

