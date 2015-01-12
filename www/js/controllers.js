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
.controller('HomeCtrl', function($scope, cacheFactory){
  var init = function(){
    cacheFactory.getLocalData().then(function(getLocalDataSuccess){
      $scope.forms = getLocalDataSuccess;
    });

    cacheFactory.getStoreLength().then(function(data){
      console.log('Store Lenght: '+data);
    });
  };

  $scope.refresh = function(){
    cacheFactory.getLocalData().then(function(getLocalDataSuccess){
      console.log(getLocalDataSuccess)
      $scope.forms = getLocalDataSuccess;
    });
  };
  $scope.clearAll = cacheFactory.clearAll;

  
  $scope.$on('$viewContentLoaded', function(event, args){
    init();
  });
  init();
})
.controller('BrowseCtrl', function($scope, cacheFactory){
    var page;
    var setPageToPrint = function(){
      page = document.getElementById('form');
      return page;
    };

    var print = function(){
      console.log('should print');
      cordova.plugins.printer.print(setPageToPrint(), 'Document.html', function () {
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

    $scope.print = function(){
      document.addEventListener("deviceready", print, false);
    };
    $scope.save = function(){
      cacheFactory.broadcastCacheEvent('Save');
    };

})
.controller('FormCtrl', function($scope, cacheFactory, $timeout){
    var date, time;
    var physicalExamProblemsCount = 0,
        default_physical_exam_status = true;

    var setPhysicalExamStatus = function(){
      if (physicalExamProblemsCount === 0){
        $scope.ExaminationForm.physical_exam_status.$viewValue = true;
        $scope.ExaminationForm.physical_exam_status.$modelValue = true;
        $scope.ExaminationForm.physical_exam_status.$render();
        $scope.ExaminationForm.physical_exam_status.$$writeModelToScope();
      } else {
        $scope.ExaminationForm.physical_exam_status.$viewValue = false;
        $scope.ExaminationForm.physical_exam_status.$modelValue = false;
        $scope.ExaminationForm.physical_exam_status.$render();
        $scope.ExaminationForm.physical_exam_status.$$writeModelToScope();
      }
    };
    $scope.setPhysicalExamMainChildren = function(){
      $scope.ExaminationForm.wheezing = 'No';
      $scope.ExaminationForm.crackles = 'No';
      $scope.ExaminationForm.s1 = 'No';
      $scope.ExaminationForm.s2 = 'No';
      $scope.ExaminationForm.s3 = 'No';
      $scope.ExaminationForm.murmur = 'No';
      $scope.ExaminationForm.peripheral_pulses = 'No';
      $scope.ExaminationForm.soft = 'No';
      $scope.ExaminationForm.tender = 'No';
      $scope.ExaminationForm.bowel_sound_preset = 'No';
      $scope.ExaminationForm.mass = 'No';
      $scope.ExaminationForm.organomegaly = 'No';
      $scope.ExaminationForm.rebound_tenderness = 'No';
      $scope.ExaminationForm.peritonitis = 'No';
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


    $timeout(function(){
      date = moment().format('YYYY-MM-DD');
      time = moment().format('h:MM A')

      $scope.ExaminationForm.date.$viewValue = date;
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.time.$viewValue = time;
      $scope.ExaminationForm.time.$render();

      $scope.ExaminationForm.physical_exam_status.$viewValue = true;
      $scope.ExaminationForm.physical_exam_status.$modelValue = true;
      $scope.ExaminationForm.physical_exam_status.$render();
      $scope.ExaminationForm.physical_exam_status.$$writeModelToScope();
    });

    $scope.$on('CacheUpdate:Save', function(event, args){
      var formData = {};

      formData = {
        id: $scope.erform.id,
        date: $scope.erform.date,
        time: $scope.erform.time,
        first_name: $scope.erform.first_name,
        last_name: $scope.erform.last_name,
        er_card: {
          hpi: $scope.erform.hpi,
          pmhx: $scope.erform.pmhx,
          medication: $scope.erform.medication,
          allergies: $scope.erform.allergies,
          ros: $scope.erform.ros
        },
        physical_exam: {
          physical_exam_status: $scope.erform.physical_exam_status,
          respiratory_exam: {
            air_entry_equal_and_bilateral: $scope.ExaminationForm.air_entry_equal_and_bilateral.$viewValue,
            wheezing: $scope.ExaminationForm.wheezing.$viewValue,
            crackles: $scope.ExaminationForm.crackles.$viewValue
          },
          cardio_vascular: {
            s1: $scope.ExaminationForm.s1.$viewValue,
            s2: $scope.ExaminationForm.s2.$viewValue,
            s3: $scope.ExaminationForm.s3.$viewValue,
            murmur: $scope.ExaminationForm.murmur.$viewValue,
            peripheral_pulses: $scope.ExaminationForm.peripheral_pulses.$viewValue
          },
          abdominal_exam: {
            soft: $scope.ExaminationForm.soft.$viewValue,
            tender: $scope.ExaminationForm.tender.$viewValue,
            bowel_sound_present: $scope.ExaminationForm.bowel_sound_present.$viewValue,
            mass: $scope.ExaminationForm.mass.$viewValue,
            organomegaly: $scope.ExaminationForm.organomegaly.$viewValue,
            rebound_tenderness: $scope.ExaminationForm.rebound_tenderness.$viewValue,
            peritonitis: $scope.ExaminationForm.peritonitis.$viewValue
          },
          heent: {
            tympanic_membrane: $scope.ExaminationForm.tympanic_membrane.$viewValue,
            throat: $scope.ExaminationForm.throat.$viewValue,
            nodes: $scope.ExaminationForm.nodes.$viewValue,
            neck_supple: $scope.ExaminationForm.neck_supple.$viewValue
          },
          neurological_exam: {
            cranial_nerve_ii_xii: $scope.ExaminationForm.cranial_nerve_ii_xii.$viewValue,
            power: $scope.ExaminationForm.power.$viewValue,
            sensation: $scope.ExaminationForm.sensation.$viewValue,
            tone: $scope.ExaminationForm.tone.$viewValue,
            reflexes: $scope.ExaminationForm.reflexes.$viewValue,
            cl_exam: $scope.ExaminationForm.cl_exam.$viewValue
          },
          notes: $scope.ExaminationForm.notes
        },
        diagnosis: $scope.ExaminationForm.diagnosis,
        discharge_instruction: $scope.ExaminationForm.discharge_instruction
      }

      cacheFactory.setLocalData(formData);
    });
})
;

