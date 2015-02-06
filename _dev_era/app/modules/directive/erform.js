angular.module('ERChart').directive('erform', function($state, constants, $timeout, cache, $log, $stateParams, $ionicPopup, $q, erutils) {
    return  function($scope, $elem, $attr, $transclude){
    var currentChart = {}; 
    var allCharts = []; 

    var navigateToHome = function(){
      $state.go('root.home');
      $timeout(function(){
        setDefault();
        cache.broadcastCacheEvent('Updated');
      });
    };

    var showDiscardChartConfirm = function() {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Discard New Chart?',
         template: 'Are you sure you want to navigate away from this page?'
       });
       confirmPopup.then(function(res) {
         if(res) {
             navigateToHome();
           // console.log('You are sure');
         } else {
             return false;
           // console.log('You are not sure');
         }
       });
     };

    var showPatientIdPopup = function(){
      return $ionicPopup.show({
        template: '<input type="text" ng-model="chart.id">',
        title: 'Please enter a patient id.',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.chart.id) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.chart.id;
              }
            }
          }]
      });
    };

    var _showPatientIdPopup = function() {
      $scope.chart.id = '';

      var patientIdPopup = $ionicPopup.show({
        template: '<input type="text" ng-model="chart.id">',
        title: 'Please enter a patient id.',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>Save</b>',
            type: 'button-positive',
            onTap: function(e) {
              if (!$scope.chart.id) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.chart.id;
              }
            }
          }]
      });

      patientIdPopup.then(function(res) {
        console.log('Tapped!', res);
        if (!res){
          $state.go('root.home');
        } else {
          // initAddChart();
        }
      });
     };
  
    var formFieldDefaults = constants.values;
    $scope.chart = {};
    $scope.options = constants.options;
    $scope.resp = constants.respiratory_exam;
    $scope.abdo = constants.abdominal_exam;
    $scope.heent = constants.heent;
    $scope.cardiov = constants.cardio_vascular;
    $scope.neuro = constants.neurological_exam;

    $scope.physical_exam_modules = {
      'Respiratory Exam' : constants.respiratory_exam,
      'Abdominal Exam' : constants.abdominal_exam,
      'Heent' : constants.heent,
      'Cardio Vascular' : constants.cardio_vascular,
      'Neurological Exam' : constants.neurological_exam
    };

    var formValueSetter = function(dataObj, flag, tagType){
        // console.log(dataObj)
        if (flag === 'status') {
            return 0;
        } else if (flag === 'textarea') {
            return '';
        } else if (flag === 'checkbox') {
            return false;
        } else if (flag === 'date') {
          return moment().format('YYYY-MM-DD');
        } else if (flag === 'time') {
          return moment().format('hh:mm: A');
        }
    };

    var getSavedFieldValue = function(savedValues, flag, tagType, cat_name){
        if (angular.isObject(savedValues) && !_.isEmpty(savedValues)) {
                if (!tagType){
                    return savedValues[flag];
                } else if (tagType === 'input'){
                    return _.pick(savedValues, flag)[flag];
                } else if (tagType === 'checkbox') {
                    if (!savedValues[flag]) {
                        return false;
                    } else {
                        return savedValues[flag];
                    } 
                } else if (tagType === 'textarea') {
                    if (!savedValues[flag]) {
                        return '';
                    } else {
                        return savedValues[flag];
                    }
                }
        } else {
            return formValueSetter(null, 'status');
        }
    };

    var setModuleStatus = function(cat, state, param_data, fn){
        if (cat) {
            $scope.ExaminationForm[cat+'_status'].$modelValue = angular.isString(param_data) || !param_data?
              formValueSetter(null, 'status') : getSavedFieldValue(param_data[cat], 'status');
            $scope.ExaminationForm[cat+'_status'].$$writeModelToScope();
            $scope.ExaminationForm[cat+'_status'].$render();
        }
    };
    var setCheckBoxState = function(fieldName, cat, param_data){
        $scope.ExaminationForm[fieldName.name].$viewValue = angular.isString(param_data) || !param_data?
          formValueSetter(formFieldDefaults.physical_exam[cat], 'checkbox') : 
          getSavedFieldValue(param_data[cat], fieldName.model, 'checkbox');
        $scope.ExaminationForm[fieldName.name].$render();
        $scope.ExaminationForm[fieldName.name].$commitViewValue();
    };
    var setNoteState = function(field, param_data){
        if ($scope.ExaminationForm[field.name]) {
            $scope.ExaminationForm[field.name].$viewValue = angular.isString(param_data) || !param_data?
              formValueSetter(formFieldDefaults.physical_exam[field.module][field.name], 'textarea') : 
              getSavedFieldValue(param_data[field.module], field.model, 'textarea', field.module);
            $scope.ExaminationForm[field.name].$render();
            $scope.ExaminationForm[field.name].$commitViewValue();
        }
    };

    var setDefault = function(state_data){
      var deferred = $q.defer();

      $scope.ExaminationForm.date.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults, 'date') : getSavedFieldValue(state_data, 'date', 'input');
      $scope.ExaminationForm.time.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults, 'time') : getSavedFieldValue(state_data, 'time', 'input');
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.date.$commitViewValue();
      $scope.ExaminationForm.time.$render();
      $scope.ExaminationForm.time.$commitViewValue();

      $scope.ExaminationForm.id.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults, 'id', 'input') : getSavedFieldValue(state_data, 'id', 'input');
      $scope.ExaminationForm.id.$render();
      $scope.ExaminationForm.id.$commitViewValue();
        
        for (var i = 0, list = ['heent', 'resp', 'abdo', 'cardiov', 'neuro'], listLen = list.length; i<listLen; i++){
            setModuleStatus($scope[list[i]].cat_name, 
                function() {
                    if (angular.isObject(state_data)){
                        // get saved data when editting
                        return getSavedFieldValue(state_data[$scope[list[i]].cat_name], 'status', 'input', $scope[list[i]].cat_name);
                    } else {
                        // set module:default
                        return setModuleStatus(list[i], 'status', 'default');
                    }
                },
                state_data
                );
        };
        // resp
        for (var i = 0, 
            list = [
                {name: 'good_bilat_a_e', model: 'goodBilatA_E'},
                {name: 'wheezing', model: 'wheezing'},
                {name: 'crackle', model: 'crackle'}
            ], listLen = list.length; i<listLen; i++) {
                setCheckBoxState(list[i], 'respiratory_exam', state_data);
            }
        // heent
        for (var i = 0, 
            list = [
                {name: 'throat_clear', model: 'throatClear'},
                {name: 'tm', model: 'tm'},
                {name: 'neck_supple', model: 'neckSupple'}
            ], listLen = list.length; i<listLen; i++) {
                setCheckBoxState(list[i], 'heent', state_data);
            }
        // abdo
        for (var i = 0, 
            list = [
                {name: 'soft_and_non_tender', model: 'softAndNonTender'},
                {name: 'bsp', model: 'bsp'},
                {name: 'mass', model: 'mass'},
                {name: 'organomegaly', model: 'organomegaly'},
                {name: 'no_sign_of_peritonitis', model: 'noSignOfPeritonitis'},
                {name: 'fpp_and_equal', model: 'fppAndEqual'}
            ], listLen = list.length; i<listLen; i++) {
                setCheckBoxState(list[i], 'abdominal_exam', state_data);
            }

        // cardio
        for (var i = 0, 
            list = [
                {name: 's1_s2_present', model: 's1S2Present'},
                {name: 's3', model: 's3'},
                {name: 's4', model: 's4'},
                {name: 'murmur', model: 'murmur'},
                {name: 'ppp', model: 'ppp'},
                {name: 'jvd', model: 'jvd'}
            ], listLen = list.length; i<listLen; i++) {
                setCheckBoxState(list[i], 'cardio_vascular', state_data);
            }
        
        // neuro
        for (var i = 0, 
            list = [
                {name: 'cerebellum_exam', model: 'cerebellumExam'},
                {name: 'power', model: 'power'},
                {name: 'sensation', model: 'sensation'},
                {name: 'tone', model: 'tone'},
                {name: 'reflex', model: 'reflex'},
                {name: 'cnii_x_ii', model: 'cniixii'}
            ], listLen = list.length; i<listLen; i++) {
                setCheckBoxState(list[i], 'neurological_exam', state_data);
            }
        // module notes
        for (var i = 0, 
            list = [
                {name: 'heent_note', model: 'heentNote', module: 'heent'},
                {name: 'respiratory_exam_note', model: 'respiratoryExamNote', module: 'respiratory_exam'},
                {name: 'abdominal_exam_note', model: 'abdominalExamNote', module: 'abdominal_exam'},
                {name: 'cardio_vascular_note', model: 'cardioVascularNote', module: 'cardio_vascular'},
                {name: 'neurological_exam_note', model: 'neurologicalExamNote', module: 'neurological_exam'},
            ], listLen = list.length; i<listLen; i++) {
                setNoteState(list[i], state_data);
            }

      // set notes and render
      $scope.ExaminationForm.hpi.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults.er_card, 'hpi', 'textarea') : getSavedFieldValue(state_data, 'hpi', 'textarea');
      $scope.ExaminationForm.pmhx.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults.er_card, 'pmhx', 'textarea') : getSavedFieldValue(state_data, 'pmhx', 'textarea');
      $scope.ExaminationForm.medication.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults.er_card, 'medication', 'textarea') : getSavedFieldValue(state_data, 'medication', 'textarea');
      $scope.ExaminationForm.allergies.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults.er_card, 'allergies', 'textarea') : getSavedFieldValue(state_data, 'allergies', 'textarea');
      $scope.ExaminationForm.notes.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults.physical_exam, 'notes', 'textarea') : getSavedFieldValue(state_data, 'notes', 'textarea');
      $scope.ExaminationForm.diagnosis.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults, 'diagnosis', 'textarea') : getSavedFieldValue(state_data, 'diagnosis', 'textarea');
      $scope.ExaminationForm.discharge_instruction.$viewValue = angular.isString(state_data) || !state_data?
          formValueSetter(formFieldDefaults, 'discharge_instruction', 'textarea') : getSavedFieldValue(state_data, 'discharge_instruction', 'textarea');
      $scope.ExaminationForm.hpi.$render();
      $scope.ExaminationForm.pmhx.$render();
      $scope.ExaminationForm.medication.$render();
      $scope.ExaminationForm.allergies.$render();
      $scope.ExaminationForm.notes.$render();
      $scope.ExaminationForm.diagnosis.$render();
      $scope.ExaminationForm.discharge_instruction.$render();
      $scope.ExaminationForm.hpi.$commitViewValue();
      $scope.ExaminationForm.pmhx.$commitViewValue();
      $scope.ExaminationForm.medication.$commitViewValue();
      $scope.ExaminationForm.allergies.$commitViewValue();
      $scope.ExaminationForm.notes.$commitViewValue();
      $scope.ExaminationForm.diagnosis.$commitViewValue();
      $scope.ExaminationForm.discharge_instruction.$commitViewValue();

      deferred.resolve($scope.ExaminationForm);
      return deferred.promise;
    };

    var checkChart = function(){
      var deferred = $q.defer();
      if (!$scope.chart.id || $scope.chart.id === ''){
        deferred.reject('req:id');
      } else {
        deferred.resolve($scope.chart);
      }
      return deferred.promise;
    };

    var addChart = function(){
      var deferred = $q.defer();
      allCharts.unshift(angular.extend($scope.chart, {
        _erid: new Date() + $scope.chart.id,
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('hh:mm: A')
      }));
      deferred.resolve(allCharts);
      return deferred.promise;
    };
    var filterCharts = function(){
      var deferredFilteredCharts = $q.defer();
      allCharts = erutils.filterCharts(allCharts, $stateParams.formId);
      deferredFilteredCharts.resolve(allCharts);
      return deferredFilteredCharts.promise;
    };

    var initNewChart = function(chartStatus){
      cache.getLocalData().then(function(successData){
        if (!successData) {
          allCharts = []
        } else {
          allCharts = successData;
        }
      }).then(function(){
        if (angular.isObject(chartStatus)) {
          
        } else {
          showPatientIdPopup().then(function(popUpResult){
            if (!popUpResult){
              $state.go('root.home');
            } else {
              addChart().then(function(newChartsArray){
                cache.writeLocalData(newChartsArray).then(function(){
                  navigateToHome();
                });
              });
            }
          })
        }
      })
    };
    var initEditChart = function(){
      cache.getLocalData().then(function(successData){
        if (!successData) {
          allCharts = []
        } else {
          allCharts = successData;
        }
      }).then(function(){
        angular.forEach(allCharts, function(chart, key){
          if ($stateParams.formId === chart.id) {
            setDefault(chart).then(function(formScope){
              formScope.$setPristine();
              formScope.$setUntouched();
            });
            currentChart = chart;
          }
        });
      });
    };
    var initSaveChart = function(){
      if ($state.is('root.form')){
        checkChart().then(function(chartStatus){
          initNewChart(chartStatus);
        }, function(reason){
          initNewChart(reason)
        });
      } else {
        filterCharts().then(function(newChartsArray){
          allCharts = newChartsArray;
          addChart().then(function(updatedCharts){
            cache.writeLocalData(updatedCharts).then(function(){
            }).finally(function(){
              navigateToHome();
            });
          });
        });
      }
    };

    // INIT PRINT
    var prepPageToPrint = function(){
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.date.$commitViewValue();
      $scope.ExaminationForm.time.$render();
      $scope.ExaminationForm.time.$commitViewValue();

      $scope.ExaminationForm.heent_note.$render();
      $scope.ExaminationForm.heent_note.$commitViewValue();
      $scope.ExaminationForm.respiratory_exam_note.$render();
      $scope.ExaminationForm.respiratory_exam_note.$commitViewValue();
      $scope.ExaminationForm.abdominal_exam_note.$render();
      $scope.ExaminationForm.abdominal_exam_note.$commitViewValue();
      $scope.ExaminationForm.cardio_vascular_note.$render();
      $scope.ExaminationForm.cardio_vascular_note.$commitViewValue();
      $scope.ExaminationForm.neurological_exam_note.$render();
      $scope.ExaminationForm.neurological_exam_note.$commitViewValue();


      $scope.ExaminationForm.id.$render();
      $scope.ExaminationForm.id.$commitViewValue();

      $scope.ExaminationForm.good_bilat_a_e.$render();
      $scope.ExaminationForm.good_bilat_a_e.$commitViewValue();
      $scope.ExaminationForm.wheezing.$render();
      $scope.ExaminationForm.wheezing.$commitViewValue();
      $scope.ExaminationForm.crackle.$render();
      $scope.ExaminationForm.crackle.$commitViewValue();

      //render cardio values
      $scope.ExaminationForm.s1_s2_present.$render();
      $scope.ExaminationForm.s1_s2_present.$commitViewValue();
      $scope.ExaminationForm.s3.$render();
      $scope.ExaminationForm.s3.$commitViewValue();
      $scope.ExaminationForm.s4.$render();
      $scope.ExaminationForm.s4.$commitViewValue();
      $scope.ExaminationForm.ppp.$render();
      $scope.ExaminationForm.ppp.$commitViewValue();
      $scope.ExaminationForm.murmur.$render();
      $scope.ExaminationForm.murmur.$commitViewValue();
      $scope.ExaminationForm.jvd.$render();
      $scope.ExaminationForm.jvd.$commitViewValue();

      // render abdo
      $scope.ExaminationForm.soft_and_non_tender.$render();
      $scope.ExaminationForm.soft_and_non_tender.$commitViewValue();
      $scope.ExaminationForm.bsp.$render();
      $scope.ExaminationForm.bsp.$commitViewValue();
      $scope.ExaminationForm.fpp_and_equal.$render();
      $scope.ExaminationForm.fpp_and_equal.$commitViewValue();
      $scope.ExaminationForm.organomegaly.$render();
      $scope.ExaminationForm.organomegaly.$commitViewValue();
      $scope.ExaminationForm.no_sign_of_peritonitis.$render();
      $scope.ExaminationForm.no_sign_of_peritonitis.$commitViewValue();

      // render heent
      $scope.ExaminationForm.throat_clear.$render();
      $scope.ExaminationForm.throat_clear.$commitViewValue();
      $scope.ExaminationForm.tm.$render();
      $scope.ExaminationForm.tm.$commitViewValue();
      $scope.ExaminationForm.neck_supple.$render();
      $scope.ExaminationForm.neck_supple.$commitViewValue();

      // set neuro
      $scope.ExaminationForm.cerebellum_exam.$render();
      $scope.ExaminationForm.cerebellum_exam.$commitViewValue();
      $scope.ExaminationForm.power.$render();
      $scope.ExaminationForm.power.$commitViewValue();
      $scope.ExaminationForm.sensation.$render();
      $scope.ExaminationForm.sensation.$commitViewValue();
      $scope.ExaminationForm.tone.$render();
      $scope.ExaminationForm.tone.$commitViewValue();
      $scope.ExaminationForm.reflex.$render();
      $scope.ExaminationForm.reflex.$commitViewValue();

      var page = document.getElementById("form");
      return page;
    };

    var print = function(){
      var printPage = prepPageToPrint();
      cordova.plugins.printer.print(printPage, 'Document.html', function () {
          alert('printing finished or canceled')
          $scope.$apply(function(){
            $scope.chart.printed = true;
            initSaveChart();
          });
      });
    };

    $scope.$on('PageEvent:Print', function(event, args){
     // console.log('Event@erForm:: PageEvent:Print')
      document.addEventListener("deviceready", print, false);
    });
    $scope.$on('PageEvent:SaveChart', function(event, args){
     console.log('Event@erForm:: PageEvent:SaveChart')
     initSaveChart();
    });
    $scope.$on('PageEvent:UpdateChart', function(event, args){
     // console.log('Event@erForm:: PageEvent:UpdateChart')
    });
    $scope.$on('PageEvent:GoHome', function(event, args){
     // console.log('Event@erForm:: PageEvent:GoHome')

     if ($scope.ExaminationForm.$pristine && !$scope.ExaminationForm.$dirty){
       // if form is untouched and user decided not to continue filling the form: 
       $state.go('root.home');
      } else if (!$scope.ExaminationForm.$invalid && $state.is('root.edit')){
        // if editting current chart and form became invalid (id is missing) :
        initSaveChart()
      } else if ($scope.ExaminationForm.$invalid && $state.is('root.form')){
        // if creating new chart and user forgot to provide patient id:
        initSaveChart()
      }
    });
    $scope.$on('PageEvent:isAdd', function(){
     // console.log('PageEvent:isAdd');
      $timeout(function(){
          setDefault('default').then(function(formScope){
            formScope.$setPristine();
            formScope.$setUntouched();
          });
      });

    });
    $scope.$on('PageEvent:isEdit', function(){
     // console.log('PageEvent:isEdit');
      initEditChart();
    });


  };
});
