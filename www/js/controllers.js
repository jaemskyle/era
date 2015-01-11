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
.controller('BrowseCtrl', function($scope, cacheFactory){
    var page = angular.element(document.getElementById('form'));

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
        date: $scope.erform.date,
        time: $scope.erform.time,
        first_name: $scope.erform.first_name,
        last_name: $scope.erform.last_name,
      }
      // formData = {
      //   date: $scope.erform.date,
      //   time: $scope.erform.time,
      //   first_name: $scope.erform.first_name,
      //   last_name: $scope.erform.last_name,
      //   er_card: {
      //     hpi: $scope.erform.hpi,
      //     pmhx: $scope.erform.pmhx,
      //     medication: $scope.erform.medication,
      //     allergies: $scope.erform.allergies,
      //     ros: $scope.erform.ros
      //   },
      //   physical_exam: {
      //     physical_exam_status: $scope.erform.physical_exam_status,
      //     respiratory_exam: {
      //       air_entry_equal_and_bilateral: $scope.erform.physical_exam.respiratory.air_entry_equal_and_bilateral,
      //       wheezing: $scope.erform.physical_exam.respiratory.wheezing,
      //       crackles: $scope.erform.physical_exam.respiratory.crackles
      //     },
      //     cardio_vascular: {
      //       s1: $scope.erform.physical_exam.cardio_vascular.s1,
      //       s2:$scope.erform.physical_exam.cardio_vascular.s2,
      //       s3:$scope.erform.physical_exam.cardio_vascular.s3,
      //       murmur:$scope.erform.physical_exam.cardio_vascular.murmur,
      //       peripheral_pulses:$scope.erform.physical_exam.cardio_vascular.peripheral_pulses
      //     },
      //     abdominal_exam: {
      //       soft: $scope.erform.physical_exam.abdominal.soft,
      //       tender: $scope.erform.physical_exam.abdominal.tender,
      //       bowel_sound_preset: $scope.erform.physical_exam.abdominal.bowel_sound_preset,
      //       mass: $scope.erform.physical_exam.abdominal.mass,
      //       organomegaly: $scope.erform.physical_exam.abdominal.organomegaly,
      //       rebound_tenderness: $scope.erform.physical_exam.abdominal.rebound_tenderness,
      //       peritonitis: $scope.erform.physical_exam.abdominal.peritonitis
      //     },
      //     heent: {
      //       tympanic_membrane: $scope.erform.physical_exam.heent.tympanic_membrane,
      //       throat: $scope.erform.physical_exam.heent.throat,
      //       nodes: $scope.erform.physical_exam.heent.nodes,
      //       neck_supple: $scope.erform.physical_exam.heent.neck_supple
      //     },
      //     neurological_exam: {
      //       cranial_nerve_ii_xii: $scope.erform.physical_exam.neurological.cranial_nerve_ii_xii,
      //       power: $scope.erform.physical_exam.neurological.power,
      //       sensation: $scope.erform.physical_exam.neurological.sensation,
      //       tone: $scope.erform.physical_exam.neurological.tone,
      //       reflexes: $scope.erform.physical_exam.neurological.reflexes,
      //       cl_exam: $scope.erform.physical_exam.neurological.cl_exam
      //     },
      //     notes: $scope.erform.physical_exam.notes
      //   },
      //   reassessment: $scope.erform.reassessment,
      //   diagnosis: $scope.erform.diagnosis
      // };
      cacheFactory.setLocalData(formData)
    });
})
;

