angular.module('starter.directives', ['starter.factories'])

.directive('erForm', function($timeout, ERaUtilsFactory, erFormDefault, $state, cacheFactory, $stateParams){
    return  function($scope, $elem, $attr, $transclude){

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

    var allExForms=[], date, time, setDefault = function(){
      date = moment().format('YYYY-MM-DD');
      time = moment().format('hh:mm: A');

      $scope.ExaminationForm.date.$viewValue = date;
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.time.$viewValue = time;
      $scope.ExaminationForm.time.$render();

      // set respiratory viewValues and modelValues
      $scope.ExaminationForm.good_bilat_a_e.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.good_bilat_a_e.index];
      $scope.ExaminationForm.good_bilat_a_e.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.good_bilat_a_e.index];
      $scope.ExaminationForm.decrease_a_e.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.decrease_a_e.index];
      $scope.ExaminationForm.decrease_a_e.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.decrease_a_e.index];
      $scope.ExaminationForm.wheezing.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.wheezing.index];
      $scope.ExaminationForm.wheezing.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.wheezing.index];
      $scope.ExaminationForm.crackle.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.crackle.index];
      $scope.ExaminationForm.crackle.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.respiratory_exam.crackle.index];

      // set cardio values
      $scope.ExaminationForm.s1.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.cardio_vascular.s1.index];
      $scope.ExaminationForm.s1.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.cardio_vascular.s1.index];
      $scope.ExaminationForm.s2.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.cardio_vascular.s2.index];
      $scope.ExaminationForm.s2.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.cardio_vascular.s2.index];
      $scope.ExaminationForm.ppp.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.cardio_vascular.ppp.index];
      $scope.ExaminationForm.ppp.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.cardio_vascular.ppp.index];

      // set abdominal
      $scope.ExaminationForm.soft_and_non_tender.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.soft_and_non_tender.index]
      $scope.ExaminationForm.soft_and_non_tender.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.soft_and_non_tender.index]
      $scope.ExaminationForm.bsp.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.bsp.index]
      $scope.ExaminationForm.bsp.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.bsp.index]
      $scope.ExaminationForm.fpp_and_equal.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.fpp_and_equal.index]
      $scope.ExaminationForm.fpp_and_equal.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.fpp_and_equal.index]
      $scope.ExaminationForm.distended.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.distended.index]
      $scope.ExaminationForm.distended.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.distended.index]
      $scope.ExaminationForm.tender.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.tender.index]
      $scope.ExaminationForm.tender.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.tender.index]
      $scope.ExaminationForm.decrease_bowel_sounds.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.decrease_bowel_sounds.index]
      $scope.ExaminationForm.decrease_bowel_sounds.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.abdominal_exam.decrease_bowel_sounds.index]

      // set heent
      $scope.ExaminationForm.throat_clear.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.throat_clear.index];
      $scope.ExaminationForm.throat_clear.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.throat_clear.index];
      $scope.ExaminationForm.tm.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.tm.index];
      $scope.ExaminationForm.tm.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.tm.index];
      $scope.ExaminationForm.neck_supple.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.neck_supple.index];
      $scope.ExaminationForm.neck_supple.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.neck_supple.index];
      $scope.ExaminationForm.tm_red_and_bulging.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.tm_red_and_bulging.index];
      $scope.ExaminationForm.tm_red_and_bulging.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.tm_red_and_bulging.index];
      $scope.ExaminationForm.exudates_on_tonsil.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.exudates_on_tonsil.index];
      $scope.ExaminationForm.exudates_on_tonsil.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.exudates_on_tonsil.index];
      $scope.ExaminationForm.cervical_adenopathy.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.cervical_adenopathy.index];
      $scope.ExaminationForm.cervical_adenopathy.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.heent.cervical_adenopathy.index];
      
      // set neuro
      $scope.ExaminationForm.cnii_x_ii.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.cnii_x_ii.index];
      $scope.ExaminationForm.cnii_x_ii.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.cnii_x_ii.index];
      $scope.ExaminationForm.power.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.power.index];
      $scope.ExaminationForm.power.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.power.index];
      $scope.ExaminationForm.sensation.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.sensation.index];
      $scope.ExaminationForm.sensation.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.sensation.index];
      $scope.ExaminationForm.tone.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.tone.index];
      $scope.ExaminationForm.tone.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.tone.index];
      $scope.ExaminationForm.cl_exam.$viewValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.cl_exam.index];
      $scope.ExaminationForm.cl_exam.$modelValue = $scope.options[erFormDefault.formDefaultValues.physical_exam.neurological_exam.cl_exam.index];

      // render respiratory
      $scope.ExaminationForm.good_bilat_a_e.$render();
      $scope.ExaminationForm.good_bilat_a_e.$$writeModelToScope();
      $scope.ExaminationForm.decrease_a_e.$render();
      $scope.ExaminationForm.decrease_a_e.$$writeModelToScope();
      $scope.ExaminationForm.wheezing.$render();
      $scope.ExaminationForm.wheezing.$$writeModelToScope();
      $scope.ExaminationForm.crackle.$render();
      $scope.ExaminationForm.crackle.$$writeModelToScope();

      //render cardio values
      $scope.ExaminationForm.s1.$render();
      $scope.ExaminationForm.s1.$$writeModelToScope();
      $scope.ExaminationForm.s2.$render();
      $scope.ExaminationForm.s2.$$writeModelToScope();
      $scope.ExaminationForm.ppp.$render();
      $scope.ExaminationForm.ppp.$$writeModelToScope();

      // render abdo
      $scope.ExaminationForm.soft_and_non_tender.$render();
      $scope.ExaminationForm.soft_and_non_tender.$$writeModelToScope();
      $scope.ExaminationForm.bsp.$render();
      $scope.ExaminationForm.bsp.$$writeModelToScope();
      $scope.ExaminationForm.fpp_and_equal.$render();
      $scope.ExaminationForm.fpp_and_equal.$$writeModelToScope();
      $scope.ExaminationForm.distended.$render();
      $scope.ExaminationForm.distended.$$writeModelToScope();
      $scope.ExaminationForm.tender.$render();
      $scope.ExaminationForm.tender.$$writeModelToScope();
      $scope.ExaminationForm.decrease_bowel_sounds.$render();
      $scope.ExaminationForm.decrease_bowel_sounds.$$writeModelToScope();
      
      // render heent
      $scope.ExaminationForm.throat_clear.$render();
      $scope.ExaminationForm.throat_clear.$$writeModelToScope();
      $scope.ExaminationForm.tm.$render();
      $scope.ExaminationForm.tm.$$writeModelToScope();
      $scope.ExaminationForm.neck_supple.$render();
      $scope.ExaminationForm.neck_supple.$$writeModelToScope();
      $scope.ExaminationForm.tm_red_and_bulging.$render();
      $scope.ExaminationForm.tm_red_and_bulging.$$writeModelToScope();
      $scope.ExaminationForm.exudates_on_tonsil.$render();
      $scope.ExaminationForm.exudates_on_tonsil.$$writeModelToScope();
      $scope.ExaminationForm.cervical_adenopathy.$render();
      $scope.ExaminationForm.cervical_adenopathy.$$writeModelToScope();
      
      // set neuro
      $scope.ExaminationForm.cnii_x_ii.$render();
      $scope.ExaminationForm.cnii_x_ii.$$writeModelToScope();
      $scope.ExaminationForm.power.$render();
      $scope.ExaminationForm.power.$$writeModelToScope();
      $scope.ExaminationForm.sensation.$render();
      $scope.ExaminationForm.sensation.$$writeModelToScope();
      $scope.ExaminationForm.tone.$render();
      $scope.ExaminationForm.tone.$$writeModelToScope();
      $scope.ExaminationForm.cl_exam.$render();
      $scope.ExaminationForm.cl_exam.$$writeModelToScope();
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
    // INIT PRINT
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
      // TODO set the rest

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


    // INIT SAVE
    var writeLocalData = function(param_data){
      if (angular.isObject(param_data)) {
        cacheFactory.setLocalData(param_data).then(
          function(setSuccess){
            console.log(setSuccess)
            if (ionic.Platform.isWebView()){
              ERaUtilsFactory.showToast('top', 'short', 'Success: Form is saved.');
            }
          });
      } else if (angular.isString(param_data)) {
          cacheFactory.setLocalData(allExForms).then(
            function(updateSuccess){
              $scope.ExaminationForm.$setPristine();
              $scope.ExaminationForm.$pending = false;
              if (ionic.Platform.isWebView()){
                ERaUtilsFactory.showToast('top', 'short', 'Success: Form is saved.');
              }
            });
      }

      $state.go('default.home');
      $timeout(function(){
        setDefault();
        cacheFactory.broadcastCacheEvent('Updated');
      });
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
      console.log(formData);
    }
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
    var initSaveChart = function(){
      getLocalData();
    };

    // INIT EDIT
    var setOptionValue =  function(fieldName, value){
      return $scope.options[value];
    };
    var setFormItems = function(dataObj){
      console.log(dataObj);
      $scope.ExaminationForm.id.$viewValue = dataObj.id;
      $scope.ExaminationForm.id.$render();
      
      $scope.ExaminationForm.date.$viewValue = dataObj.date;
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.time.$viewValue = dataObj.time;
      $scope.ExaminationForm.time.$render();

      $scope.ExaminationForm.throat_clear.$viewValue = setOptionValue('throat_clear', dataObj.physical_exam.heent.throat_clear.value);





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
    var findItem = function(paramObj){
      for (var i=0; i<allExForms.length; i++){
        if ($stateParams.formId === allExForms[i].id){
          next(setFormItems, allExForms[i])
        }
      }
    };
    var pullItemFromLocal = function(){
      allExForms = window._.reject(allExForms, {id: $stateParams.formId});
    };
    var initEditChart = function(){
      cacheFactory.getLocalData().then(
        function(getSuccess){
          if (angular.isUndefined(getSuccess)){
          } else if (getSuccess.length){
            allExForms = getSuccess;
          }
        }).then(function(){
          next(findItem, {id: $stateParams.formId});
        });
    };
    var initUpdateCharts = function(){
      next(pullItemFromLocal);
      next(prepFormData);
      next(function(){writeLocalData('update')})
    };

    $scope.$on('PageEvent:Print', function(event, args){
      console.log('Event@erForm:: PageEvent:Print')
      document.addEventListener("deviceready", print, false);
    });
    $scope.$on('PageEvent:SaveChart', function(event, args){
      console.log('Event@erForm:: PageEvent:SaveChart')
      initSaveChart(setFormDataFromScope())
    });
    $scope.$on('PageEvent:UpdateChart', function(event, args){
      console.log('Event@erForm:: PageEvent:UpdateChart')
      initUpdateCharts();
    });
    $scope.$on('PageEvent:GoHome', function(event, args){
      console.log('Event@erForm:: PageEvent:GoHome')

      //if checkFormValues(getFormValues())  // boolean. check for unsaved
      $state.go('default.home');
    });
    $scope.$on('PageEvent:isAdd', function(){
      console.log('PageEvent:isAdd');
      $timeout(setDefault);
    });
    $scope.$on('PageEvent:isEdit', function(){
      console.log('PageEvent:isEdit');
      initEditChart();
    });
    
  };
});

