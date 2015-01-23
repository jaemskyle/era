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
.controller('ChartCtrl', function($scope, cacheFactory, ERaUtilsFactory, $state, isEditMode){
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
.controller('FormCtrl', function($scope, cacheFactory, $timeout, ERaUtilsFactory, $stateParams, $state, erFormDefault){
    var allExForms = [];
    var date, time;
    var physicalExamProblemsCount = 0,
        default_physical_exam_status = true;
    var next = function(fn, paramObj){
      var fn = fn || function(){};
      fn(paramObj);
    };

    $scope.options = erFormDefault.options;
    $scope.resp = erFormDefault.respiratory_exam;
    $scope.abdo = erFormDefault.abdominal_exam;
    $scope.heent = erFormDefault.heent;
    $scope.cardiov = erFormDefault.cardio_vascular;
    $scope.neuro = erFormDefault.neurological_exam;
    
    
    var setDefault = function(){
      date = moment().format('YYYY-MM-DD');
      time = moment().format('h:mm:ss A')

      // set respiratory viewValues and modelValues
      $scope.ExaminationForm.date.$viewValue = date;
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.time.$viewValue = time;
      $scope.ExaminationForm.time.$render();

      $scope.ExaminationForm.good_bilat_a_e.$viewValue = $scope.options[2];
      $scope.ExaminationForm.good_bilat_a_e.$modelValue = $scope.options[2];
      $scope.ExaminationForm.decrease_a_e.$viewValue = $scope.options[1];
      $scope.ExaminationForm.decrease_a_e.$modelValue = $scope.options[1];
      $scope.ExaminationForm.wheezing.$viewValue = $scope.options[1];
      $scope.ExaminationForm.wheezing.$modelValue = $scope.options[1];
      $scope.ExaminationForm.crackle.$viewValue = $scope.options[1];
      $scope.ExaminationForm.crackle.$modelValue = $scope.options[1];

      // render respiratory
      $scope.ExaminationForm.good_bilat_a_e.$render();
      $scope.ExaminationForm.good_bilat_a_e.$$writeModelToScope();
      $scope.ExaminationForm.decrease_a_e.$render();
      $scope.ExaminationForm.decrease_a_e.$$writeModelToScope();
      $scope.ExaminationForm.wheezing.$render();
      $scope.ExaminationForm.wheezing.$$writeModelToScope();
      $scope.ExaminationForm.crackle.$render();
      $scope.ExaminationForm.crackle.$$writeModelToScope();
    };




    var prepPageToPrint = function(){
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.date.$$writeModelToScope();
      $scope.ExaminationForm.time.$render();
      $scope.ExaminationForm.time.$$writeModelToScope();
      $scope.ExaminationForm.id.$render();
      $scope.ExaminationForm.id.$$writeModelToScope();

      $scope.ExaminationForm.good_bilat_a_e.$setViewValue($scope.ExaminationForm.good_bilat_a_e.$viewValue);
      $scope.ExaminationForm.good_bilat_a_e.$commitViewValue();
      $scope.ExaminationForm.good_bilat_a_e.$render();
      $scope.ExaminationForm.good_bilat_a_e.$$writeModelToScope();

      $scope.ExaminationForm.decrease_a_e.$setViewValue($scope.ExaminationForm.decrease_a_e.$viewValue);
      $scope.ExaminationForm.decrease_a_e.$commitViewValue();
      $scope.ExaminationForm.decrease_a_e.$render();
      $scope.ExaminationForm.decrease_a_e.$$writeModelToScope();

      $scope.ExaminationForm.decrease_a_e.$render();
      $scope.ExaminationForm.decrease_a_e.$$writeModelToScope();

      var page = document.getElementById("form");
      return page;
    };
    var print = function(){
      console.log('should print');
      cordova.plugins.printer.print(prepPageToPrint(), 'Document.html', function () {
          alert('printing finished or canceled')
          $scope.apply();
      });
    };

    $scope.showNote = function(val, formItem){
      console.log(val);
      console.log(formItem);
    };

    var writeLocalData = function(data){
        cacheFactory.setLocalData(data).then(
          function(setSuccess){
            if (ionic.Platform.isWebView()){
              ERaUtilsFactory.showToast('top', 'short', 'Success: Form is saved.');
            }
            $state.go('app.home');
            $timeout(function(){
              cacheFactory.broadcastCacheEvent('Updated');
            });
          }, function(setFail){}
        );
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
          respiratory_exam: {
            good_bilat_a_e: $scope.ExaminationForm.good_bilat_a_e.$viewValue,
            decrease_a_e: $scope.ExaminationForm.decrease_a_e.$viewValue,
            wheezing: $scope.ExaminationForm.wheezing.$viewValue,
            crackle: $scope.ExaminationForm.crackle.$viewValue
          },
          cardio_vascular: {
            s1: $scope.ExaminationForm.s1.$viewValue,
            s2: $scope.ExaminationForm.s2.$viewValue,
            ppp: $scope.ExaminationForm.ppp.$viewValue
          },
          abdominal_exam: {
            soft_and_non_tender: $scope.ExaminationForm.soft_and_non_tender.$viewValue,
            bsp: $scope.ExaminationForm.bsp.$viewValue,
            fpp_and_equal: $scope.ExaminationForm.fpp_and_equal.$viewValue,
            distended: $scope.ExaminationForm.distended.$viewValue,
            tender: $scope.ExaminationForm.tender.$viewValue,
            decrease_bowel_sounds: $scope.ExaminationForm.decrease_bowel_sounds.$viewValue
          },
          heent: {
            throat_clear: $scope.ExaminationForm.throat_clear.$viewValue,
            tm: $scope.ExaminationForm.tm.$viewValue,
            neck_supple: $scope.ExaminationForm.neck_supple.$viewValue,
            tm_red_and_bulging: $scope.ExaminationForm.tm_red_and_bulging.$viewValue,
            exudates_on_tonsil: $scope.ExaminationForm.exudates_on_tonsil.$viewValue,
            cervical_adenopathy: $scope.ExaminationForm.cervical_adenopathy.$viewValue
          },
          neurological_exam: {
            cnii_x_ii: $scope.ExaminationForm.cnii_x_ii.$viewValue,
            power: $scope.ExaminationForm.power.$viewValue,
            sensation: $scope.ExaminationForm.sensation.$viewValue,
            tone: $scope.ExaminationForm.tone.$viewValue,
            cl_exam: $scope.ExaminationForm.cl_exam.$viewValue
          },
          notes: $scope.ExaminationForm.notes
        },
        diagnosis: $scope.ExaminationForm.diagnosis,
        discharge_instruction: $scope.ExaminationForm.discharge_instruction
      }
      return formData;
    };

    var updateCharts = function(newChart){
      allExForms.unshift(setFormDataFromScope());
      writeLocalData(allExForms);
    };

    var getLocalData = function(){
        cacheFactory.getLocalData().then(
          function(getLocalSuccess){
            if (angular.isUndefined(getLocalSuccess)){
              next(updateCharts)
            } else {
              allExForms = getLocalSuccess;
              next(updateCharts)
            }
          });
      };
    var prepCharts = function(){
      getLocalData();
    };

    var setPhysicalExamStatus = function(){
      // if (physicalExamProblemsCount === 0){
      //   $scope.ExaminationForm.physical_exam_status.$viewValue = true;
      //   $scope.ExaminationForm.physical_exam_status.$modelValue = true;
      //   $scope.ExaminationForm.physical_exam_status.$render();
      //   $scope.ExaminationForm.physical_exam_status.$$writeModelToScope();
      // } else {
      //   $scope.ExaminationForm.physical_exam_status.$viewValue = false;
      //   $scope.ExaminationForm.physical_exam_status.$modelValue = false;
      //   $scope.ExaminationForm.physical_exam_status.$render();
      //   $scope.ExaminationForm.physical_exam_status.$$writeModelToScope();
      // }
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

    // $scope.$on('PageEvent:Print', function(event, args){
    //   document.addEventListener("deviceready", print, false);
    // });
    // $scope.$on('PageEvent:SaveForm', function(event, args){
    //   prepCharts(setFormDataFromScope())
    // });
    // $scope.$on('PageEvent:UpdateCharts', function(event, args){
    //   initUpdateCharts();
    // });

    // $scope.$on('PageEvent:GoHome', function(event, args){
    //   $scope.$watch('ExaminationForm.$dirty', function(nu, ol){
    //     if (nu !== ol){
    //       $scope.ExaminationForm.$pending = false;
    //     }
    //   });

    //   if (!$scope.ExaminationForm.$pending && $scope.ExaminationForm.$dirty){
    //     alert('you have unsaved changes!');
    //   } else if (!$scope.ExaminationForm.$pending && $scope.ExaminationForm.$pristine){
    //     $state.go('app.home');
    //   } else {
    //     setLocalData(setFormDataFromScope());
    //     $state.go('app.home');
    //   }
    // });

    if ($state.is('default.edit')){

    var reRenderViewValue = function(fn, value){
      do {
        fn.$viewValue = value || '';
        fn.$render();
      } while (fn !== null);
      return fn = null;
    };
    var updateCharts = function(newCharts){
      allExForms.unshift(newCharts);
    };

    var setFormItems = function(dataObj){
      reRenderViewValue($scope.ExaminationForm.id, dataObj.id);
      // $scope.ExaminationForm.id.$viewValue = dataObj.id;
      // $scope.ExaminationForm.id.$render();
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
          respiratory_exam: {
            good_bilat_a_e: $scope.ExaminationForm.good_bilat_a_e.$viewValue,
            decrease_a_e: $scope.ExaminationForm.decrease_a_e.$viewValue,
            wheezing: $scope.ExaminationForm.wheezing.$viewValue,
            crackle: $scope.ExaminationForm.crackle.$viewValue
          },
          cardio_vascular: {
            s1: $scope.ExaminationForm.s1.$viewValue,
            s2: $scope.ExaminationForm.s2.$viewValue,
            ppp: $scope.ExaminationForm.ppp.$viewValue
          },
          abdominal_exam: {
            soft_and_non_tender: $scope.ExaminationForm.soft_and_non_tender.$viewValue,
            bsp: $scope.ExaminationForm.bsp.$viewValue,
            fpp_and_equal: $scope.ExaminationForm.fpp_and_equal.$viewValue,
            distended: $scope.ExaminationForm.distended.$viewValue,
            tender: $scope.ExaminationForm.tender.$viewValue,
            decrease_bowel_sounds: $scope.ExaminationForm.decrease_bowel_sounds.$viewValue
          },
          heent: {
            throat_clear: $scope.ExaminationForm.throat_clear.$viewValue,
            tm: $scope.ExaminationForm.tm.$viewValue,
            neck_supple: $scope.ExaminationForm.neck_supple.$viewValue,
            tm_red_and_bulging: $scope.ExaminationForm.tm_red_and_bulging.$viewValue,
            exudates_on_tonsil: $scope.ExaminationForm.exudates_on_tonsil.$viewValue,
            cervical_adenopathy: $scope.ExaminationForm.cervical_adenopathy.$viewValue
          },
          neurological_exam: {
            cnii_x_ii: $scope.ExaminationForm.cnii_x_ii.$viewValue,
            power: $scope.ExaminationForm.power.$viewValue,
            sensation: $scope.ExaminationForm.sensation.$viewValue,
            tone: $scope.ExaminationForm.tone.$viewValue,
            cl_exam: $scope.ExaminationForm.cl_exam.$viewValue
          },
          notes: $scope.ExaminationForm.notes
        },
        diagnosis: $scope.ExaminationForm.diagnosis,
        discharge_instruction: $scope.ExaminationForm.discharge_instruction
      }
      return $scope.ExaminationForm;
    };
    var prepFormData = function(){
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
          respiratory_exam: {
            good_bilat_a_e: $scope.ExaminationForm.good_bilat_a_e.$viewValue,
            decrease_a_e: $scope.ExaminationForm.decrease_a_e.$viewValue,
            wheezing: $scope.ExaminationForm.wheezing.$viewValue,
            crackle: $scope.ExaminationForm.crackle.$viewValue
          },
          cardio_vascular: {
            s1: $scope.ExaminationForm.s1.$viewValue,
            s2: $scope.ExaminationForm.s2.$viewValue,
            ppp: $scope.ExaminationForm.ppp.$viewValue
          },
          abdominal_exam: {
            soft_and_non_tender: $scope.ExaminationForm.soft_and_non_tender.$viewValue,
            bsp: $scope.ExaminationForm.bsp.$viewValue,
            fpp_and_equal: $scope.ExaminationForm.fpp_and_equal.$viewValue,
            distended: $scope.ExaminationForm.distended.$viewValue,
            tender: $scope.ExaminationForm.tender.$viewValue,
            decrease_bowel_sounds: $scope.ExaminationForm.decrease_bowel_sounds.$viewValue
          },
          heent: {
            throat_clear: $scope.ExaminationForm.throat_clear.$viewValue,
            tm: $scope.ExaminationForm.tm.$viewValue,
            neck_supple: $scope.ExaminationForm.neck_supple.$viewValue,
            tm_red_and_bulging: $scope.ExaminationForm.tm_red_and_bulging.$viewValue,
            exudates_on_tonsil: $scope.ExaminationForm.exudates_on_tonsil.$viewValue,
            cervical_adenopathy: $scope.ExaminationForm.cervical_adenopathy.$viewValue
          },
          neurological_exam: {
            cnii_x_ii: $scope.ExaminationForm.cnii_x_ii.$viewValue,
            power: $scope.ExaminationForm.power.$viewValue,
            sensation: $scope.ExaminationForm.sensation.$viewValue,
            tone: $scope.ExaminationForm.tone.$viewValue,
            cl_exam: $scope.ExaminationForm.cl_exam.$viewValue
          },
          notes: $scope.ExaminationForm.notes
        },
        diagnosis: $scope.ExaminationForm.diagnosis,
        discharge_instruction: $scope.ExaminationForm.discharge_instruction
      }

      updateCharts(formData);
      return formData;
    };
    var findItem = function(paramObj){
      for (var i=0; i<allExForms.length; i++){
        if ($stateParams.formId === allExForms[i].id){
          next(setFormItems, allExForms[i])
        }
      }
    };
    var writeLocalData = function(){
      cacheFactory.setLocalData(allExForms).then(
        function(updateSuccess){
          $state.go('app.home');
          $scope.ExaminationForm.$setPristine();
          $scope.ExaminationForm.$pending = false;
          $timeout(function(){
            cacheFactory.broadcastCacheEvent('Updated');
          })
        }
      );
    };
    var pullLocalData = function(){
      cacheFactory.getLocalData().then(
        function(getSuccess){
          if (angular.isUndefined(getSuccess)){
          } else if (getSuccess.length){
            allExForms = getSuccess;
            next(findItem, {id: $stateParams.formId});
          }
        });
    };
    var pullItemFromLocal = function(){
      allExForms = window._.reject(allExForms, {id: $stateParams.formId});
    };
    var initUpdateCharts = function(){
      next(pullItemFromLocal);
      next(prepFormData);
      next(writeLocalData);
    };

    $timeout(pullLocalData, 1000);
    

    } else if ($state.is('app.form')){
     $timeout(setDefault);
    }
})

.controller('EditCtrl', function($scope, cacheFactory, $timeout, ERaUtilsFactory, $stateParams, $state, $rootScope){
    var allExForms = [];
    var next = function(fn, paramObj){
      var fn = fn || function(){};
      fn(paramObj);
    };
    var reRenderViewValue = function(fn, value){
      do {
        fn.$viewValue = value || '';
        fn.$render();
      } while (fn !== null);
      return fn = null;
    };
    var updateCharts = function(newCharts){
      allExForms.unshift(newCharts);
    };

    var setFormItems = function(dataObj){
      reRenderViewValue($scope.ExaminationForm.id, dataObj.id);
      // $scope.ExaminationForm.id.$viewValue = dataObj.id;
      // $scope.ExaminationForm.id.$render();
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
          respiratory_exam: {
            good_bilat_a_e: $scope.ExaminationForm.good_bilat_a_e.$viewValue,
            decrease_a_e: $scope.ExaminationForm.decrease_a_e.$viewValue,
            wheezing: $scope.ExaminationForm.wheezing.$viewValue,
            crackle: $scope.ExaminationForm.crackle.$viewValue
          },
          cardio_vascular: {
            s1: $scope.ExaminationForm.s1.$viewValue,
            s2: $scope.ExaminationForm.s2.$viewValue,
            ppp: $scope.ExaminationForm.ppp.$viewValue
          },
          abdominal_exam: {
            soft_and_non_tender: $scope.ExaminationForm.soft_and_non_tender.$viewValue,
            bsp: $scope.ExaminationForm.bsp.$viewValue,
            fpp_and_equal: $scope.ExaminationForm.fpp_and_equal.$viewValue,
            distended: $scope.ExaminationForm.distended.$viewValue,
            tender: $scope.ExaminationForm.tender.$viewValue,
            decrease_bowel_sounds: $scope.ExaminationForm.decrease_bowel_sounds.$viewValue
          },
          heent: {
            throat_clear: $scope.ExaminationForm.throat_clear.$viewValue,
            tm: $scope.ExaminationForm.tm.$viewValue,
            neck_supple: $scope.ExaminationForm.neck_supple.$viewValue,
            tm_red_and_bulging: $scope.ExaminationForm.tm_red_and_bulging.$viewValue,
            exudates_on_tonsil: $scope.ExaminationForm.exudates_on_tonsil.$viewValue,
            cervical_adenopathy: $scope.ExaminationForm.cervical_adenopathy.$viewValue
          },
          neurological_exam: {
            cnii_x_ii: $scope.ExaminationForm.cnii_x_ii.$viewValue,
            power: $scope.ExaminationForm.power.$viewValue,
            sensation: $scope.ExaminationForm.sensation.$viewValue,
            tone: $scope.ExaminationForm.tone.$viewValue,
            cl_exam: $scope.ExaminationForm.cl_exam.$viewValue
          },
          notes: $scope.ExaminationForm.notes
        },
        diagnosis: $scope.ExaminationForm.diagnosis,
        discharge_instruction: $scope.ExaminationForm.discharge_instruction
      }
      return $scope.ExaminationForm;
    };
    var prepFormData = function(){
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
          respiratory_exam: {
            good_bilat_a_e: $scope.ExaminationForm.good_bilat_a_e.$viewValue,
            decrease_a_e: $scope.ExaminationForm.decrease_a_e.$viewValue,
            wheezing: $scope.ExaminationForm.wheezing.$viewValue,
            crackle: $scope.ExaminationForm.crackle.$viewValue
          },
          cardio_vascular: {
            s1: $scope.ExaminationForm.s1.$viewValue,
            s2: $scope.ExaminationForm.s2.$viewValue,
            ppp: $scope.ExaminationForm.ppp.$viewValue
          },
          abdominal_exam: {
            soft_and_non_tender: $scope.ExaminationForm.soft_and_non_tender.$viewValue,
            bsp: $scope.ExaminationForm.bsp.$viewValue,
            fpp_and_equal: $scope.ExaminationForm.fpp_and_equal.$viewValue,
            distended: $scope.ExaminationForm.distended.$viewValue,
            tender: $scope.ExaminationForm.tender.$viewValue,
            decrease_bowel_sounds: $scope.ExaminationForm.decrease_bowel_sounds.$viewValue
          },
          heent: {
            throat_clear: $scope.ExaminationForm.throat_clear.$viewValue,
            tm: $scope.ExaminationForm.tm.$viewValue,
            neck_supple: $scope.ExaminationForm.neck_supple.$viewValue,
            tm_red_and_bulging: $scope.ExaminationForm.tm_red_and_bulging.$viewValue,
            exudates_on_tonsil: $scope.ExaminationForm.exudates_on_tonsil.$viewValue,
            cervical_adenopathy: $scope.ExaminationForm.cervical_adenopathy.$viewValue
          },
          neurological_exam: {
            cnii_x_ii: $scope.ExaminationForm.cnii_x_ii.$viewValue,
            power: $scope.ExaminationForm.power.$viewValue,
            sensation: $scope.ExaminationForm.sensation.$viewValue,
            tone: $scope.ExaminationForm.tone.$viewValue,
            cl_exam: $scope.ExaminationForm.cl_exam.$viewValue
          },
          notes: $scope.ExaminationForm.notes
        },
        diagnosis: $scope.ExaminationForm.diagnosis,
        discharge_instruction: $scope.ExaminationForm.discharge_instruction
      }

      updateCharts(formData);
      return formData;
    };
    var findItem = function(paramObj){
      for (var i=0; i<allExForms.length; i++){
        if ($stateParams.formId === allExForms[i].id){
          next(setFormItems, allExForms[i])
        }
      }
    };
    var writeLocalData = function(){
      cacheFactory.setLocalData(allExForms).then(
        function(updateSuccess){
          $state.go('app.home');
          $scope.ExaminationForm.$setPristine();
          $scope.ExaminationForm.$pending = false;
          $timeout(function(){
            cacheFactory.broadcastCacheEvent('Updated');
          })
        }
      );
    };
    var pullLocalData = function(){
      cacheFactory.getLocalData().then(
        function(getSuccess){
          if (angular.isUndefined(getSuccess)){
          } else if (getSuccess.length){
            allExForms = getSuccess;
            next(findItem, {id: $stateParams.formId});
          }
        });
    };
    var pullItemFromLocal = function(){
      allExForms = window._.reject(allExForms, {id: $stateParams.formId});
    };
    var initUpdateCharts = function(){
      next(pullItemFromLocal);
      next(prepFormData);
      next(writeLocalData);
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
      // $scope.ExaminationForm.wheezing = 'No';
      // $scope.ExaminationForm.crackles = 'No';
      // $scope.ExaminationForm.s1 = 'No';
      // $scope.ExaminationForm.s2 = 'No';
      // $scope.ExaminationForm.s3 = 'No';
      // $scope.ExaminationForm.murmur = 'No';
      // $scope.ExaminationForm.peripheral_pulses = 'No';
      // $scope.ExaminationForm.soft = 'No';
      // $scope.ExaminationForm.tender = 'No';
      // $scope.ExaminationForm.bowel_sound_preset = 'No';
      // $scope.ExaminationForm.mass = 'No';
      // $scope.ExaminationForm.organomegaly = 'No';
      // $scope.ExaminationForm.rebound_tenderness = 'No';
      // $scope.ExaminationForm.peritonitis = 'No';
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

    pullLocalData();

    // $scope.$on('PageEvent:UpdateCharts', function(event, args){
    //   initUpdateCharts();
    // });

    // $scope.$on('PageEvent:GoHome', function(event, args){
    //   console.log('PageEvent: should go home')
    //   $scope.$watch('ExaminationForm.$dirty', function(nu, ol){
    //     if (nu !== ol){
    //       $scope.ExaminationForm.$pending = false;
    //     }
    //   });

    //   if (!$scope.ExaminationForm.$pending && $scope.ExaminationForm.$dirty){
    //     alert('you have unsaved changes!');
    //   } else if (!$scope.ExaminationForm.$pending && $scope.ExaminationForm.$pristine){
    //     $state.go('app.home');
    //   } else {
    //     setLocalData(setFormDataFromScope());
    //     $state.go('app.home');
    //   }
    // });

})
;

