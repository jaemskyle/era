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
.controller('HomeCtrl', function($scope, cacheFactory, $interval, $state){
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
  $scope.editItem = function(form, index){
    $state.transitionTo('app.edit', {formId: index});
  };

  init();

  // $scope.$on('CacheUpdate:Updated', function(event, args){});

})
.controller('BrowseCtrl', function($scope, cacheFactory, ERaUtilsFactory){
    var allExForms = [],
        page;

    var setScope = function(data){
          $scope.forms = data;
        },
        writeLocalData = function(data){
          cacheFactory.setLocalData(data).then(
            function(setSuccess){
              console.log('writeLocalDataSuccess');

            }, function(setFail){}
          );
        },
        sync = function(newData){
          cacheFactory.getLocalData().then(
            function(getSuccess){
              allExForms = getSuccess;      
              allExForms.push(newData);
              writeLocalData(allExForms);
            }, function(getFail){}
          );
        },
        setLocalData = function(newData){
          sync(newData);
        },
        setPageToPrint = function(){
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

    $scope.goHome = function(){
      ERaUtilsFactory.broadcastPageEvent('GoHome');
    };
})
.controller('FormCtrl', function($scope, cacheFactory, $timeout, ERaUtilsFactory, $stateParams, $state){
    var allExForms = [];
    var rePristineForm = function(){
      $scope.ExaminationForm.$setPristine();
    };
    var setFormPending = function(param){
      $scope.ExaminationForm.$pending = param || false;
    };

    var setFormItems = function(dataObj){
      var reRenderViewValue = function(fn, value){
        fn.$viewValue = value || '';
        fn.$render();
      };
      // $scope.ExaminationForm.id.$viewValue = dataObj.id;
      // $scope.ExaminationForm.id.$render();
      reRenderViewValue($scope.ExaminationForm.id, dataObj.id);
      formData = {
        _id: null,
        date: $scope.ExaminationForm.date.$viewValue,
        time: $scope.ExaminationForm.time.$viewValue,
        er_card: {
          hpi: $scope.ExaminationForm.hpi.$viewValue,
          pmhx: $scope.ExaminationForm.pmhx.$viewValue,
          medication: $scope.ExaminationForm.medication.$viewValue,
          allergies: $scope.ExaminationForm.allergies.$viewValue,
          ros: $scope.ExaminationForm.ros.$viewValue
        },
        physical_exam: {
          physical_exam_status: $scope.ExaminationForm.physical_exam_status.$viewValue,
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
    };
    var setFormDataFromScope = function(){
      formData = {
        _id: null,
        id: $scope.ExaminationForm.id.$viewValue,
        date: $scope.ExaminationForm.date.$viewValue,
        time: $scope.ExaminationForm.time.$viewValue,
        er_card: {
          hpi: $scope.ExaminationForm.hpi.$viewValue,
          pmhx: $scope.ExaminationForm.pmhx.$viewValue,
          medication: $scope.ExaminationForm.medication.$viewValue,
          allergies: $scope.ExaminationForm.allergies.$viewValue,
          ros: $scope.ExaminationForm.ros.$viewValue
        },
        physical_exam: {
          physical_exam_status: $scope.ExaminationForm.physical_exam_status.$viewValue,
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
      return formData;
    };

    var updateLocalList = function(data){
      cacheFactory.setLocalData(data).then(
        function(setSuccess){}
      );
    };

    var prepEditScope = function(){
      var formScope = {};
      for (var i=0, aL=allExForms.length; i<aL; i++){
        if (Number($stateParams.formId) === i){
          formScope = allExForms[i];
          allExForms = window._.reject(allExForms, {id: formScope.id})
          setFormItems(formScope);
          updateLocalList(allExForms);
        }
      }
    };
    var getLocalData = function(){
          cacheFactory.getLocalData().then(
            function(getLocalSuccess){
              if (getLocalSuccess.length){
                allExForms = getLocalSuccess;
                if ($state.is('app.edit')){
                  allExForms = getLocalSuccess;
                  prepEditScope(getLocalSuccess);
                }
              }
            });
        };
    
    
    var writeLocalData = function(data, currentChrtId){
          cacheFactory.setLocalData(data).then(
            function(setSuccess){
              if (ionic.Platform.isWebView()){
                ERaUtilsFactory.showToast('top', 'short', 'Success: Form is saved.');
              }
              $state.transitionTo('app.edit', {formId: currentChrtId});
              cacheFactory.broadcastCacheEvent('Updated');
            }, function(setFail){}
          );
        },
        sync = function(newData, currentChrtId){
          cacheFactory.getLocalData().then(
            function(getSuccess){
              if (!getSuccess){
                console.log('getSuccess is undefined');
                allExForms.unshift(newData);
                writeLocalData(allExForms, currentChrtId);
              } else {
                console.log('getSuccess is ok');
                allExForms = getSuccess;      
                allExForms.unshift(newData);
                writeLocalData(allExForms, currentChrtId);
              }
            }, function(getFail){}
          );
        },
        setLocalData = function(newData, currentChrtId){
          sync(newData, currentChrtId);
        };



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

    if ($stateParams.formId && $state.is('app.edit')){ 
      getLocalData();
    }

    $scope.$on('CacheUpdate:Save', function(event, args){
      setLocalData(setFormDataFromScope(), $scope.ExaminationForm.id.$viewValue || $scope.ExaminationForm.id.$modelValue);
      rePristineForm();
      setFormPending(false);
    });
    $scope.$on('PageEvent:GoHome', function(event, args){
      $scope.$watch('ExaminationForm.$dirty', function(nu, ol){
        if (nu !== ol){
          ERaUtilsFactory.broadcastPageEvent('GoHome');
        }
      });

      if (!$scope.ExaminationForm.$pending && $scope.ExaminationForm.$dirty){
        alert('you have unsaved changes!');
      } else if (!$scope.ExaminationForm.$pending && $scope.ExaminationForm.$pristine){
        $state.go('app.home');
      } else {
        setLocalData(setFormDataFromScope());
        $state.go('app.home');
      }
    });

})
;

