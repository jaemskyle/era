angular.module('starter.directives', ['starter.factories'])

.directive('erForm', function($timeout, ERaUtilsFactory, erFormDefault, $state, cacheFactory, $stateParams, $log){
    return  function($scope, $elem, $attr, $transclude){
    
    var next = function(fn, paramObj){
      var fn = fn || function(){};
      fn(paramObj);
    };
        
    if ($state.is('default.edit')) {
        console.log('is editting');
    } else if ($state.is('default.form')) {
        console.log('is adding');
    }

    var formFieldDefaults = erFormDefault.formDefaultValues;
    $scope.chart = {};
    $scope.options = erFormDefault.options;
    $scope.resp = erFormDefault.respiratory_exam;
    $scope.abdo = erFormDefault.abdominal_exam;
    $scope.heent = erFormDefault.heent;
    $scope.cardiov = erFormDefault.cardio_vascular;
    $scope.neuro = erFormDefault.neurological_exam;

    $scope.physical_exam_modules = {
      'Respiratory Exam' : erFormDefault.respiratory_exam,
      'Abdominal Exam' : erFormDefault.abdominal_exam,
      'Heent' : erFormDefault.heent,
      'Cardio Vascular' : erFormDefault.cardio_vascular,
      'Neurological Exam' : erFormDefault.neurological_exam
    };

    var formValueSetter = function(dataObj, flag, tagType){
        console.log(dataObj)
        if (flag === 'status') {
            return 0;
        } else if (flag === 'textarea') {
            return '';
        } else if (flag === 'checkbox') {
            return false;
        }
    };

    var getSavedFieldValue = function(savedValues, flag, tagType, cat_name){
        if (angular.isObject(savedValues) && !_.isEmpty(savedValues)) {
                if (!tagType){
                    return savedValues[flag];
                } else if (tagType === 'input'){
                    return _.pick(savedValues, flag)[flag];
                } else if (tagType === 'checkbox') {
                    if (!savedValues[flag]) return false;
                    else return savedValues[flag];
                } else if (tagType === 'textarea') {
                    if (!savedValues[flag]) return '';
                    else return savedValues[flag];
                }
        }
        else return formValueSetter(null, 'status');
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

    var setScopeViewValue = function(cat_name){
        console.log($scope.chart[cat_name+'_status']);
    };

    var allExForms=[], date, time, setDefault = function(state_data){
      date = moment().format('YYYY-MM-DD');
      time = moment().format('hh:mm: A');

      $scope.ExaminationForm.date.$viewValue = date;
      $scope.ExaminationForm.time.$viewValue = time;
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
                        return getSavedFieldValue(state_data[$scope[list[i]].cat_name], 'status', 'input', $scope[list[i]].cat_name)
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

      // set notes:heent
      // $scope.ExaminationForm.throat_clear_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.heent, 'throat_clear_note', 'textarea') : getSavedFieldValue(state_data.heent, 'throatClearNote', 'textarea');
      // $scope.ExaminationForm.tm_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.heent, 'tm_note', 'textarea') : getSavedFieldValue(state_data.heent, 'tmNote', 'textarea');
      // $scope.ExaminationForm.neck_supple_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.heent, 'neck_supple_note', 'textarea') : getSavedFieldValue(state_data.heent, 'neckSuppleNote', 'textarea');
      // $scope.ExaminationForm.tm_red_and_bulging_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.heent, 'tm_red_and_bulging_note', 'textarea') : getSavedFieldValue(state_data.heent, 'tmRedAndBulgingNote', 'textarea');
      // $scope.ExaminationForm.exudates_on_tonsil_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.heent, 'exudates_on_tonsil_note', 'textarea') : getSavedFieldValue(state_data.heent, 'exudatesOnTonsilNote', 'textarea');
      // $scope.ExaminationForm.cervical_adenopathy_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.heent, 'cervical_adenopathy_note', 'textarea') : getSavedFieldValue(state_data.heent, 'cervicalAdenopathyNote', 'textarea');
      // $scope.ExaminationForm.throat_clear_note.$render();
      // $scope.ExaminationForm.tm_note.$render();
      // $scope.ExaminationForm.neck_supple_note.$render();
      // $scope.ExaminationForm.tm_red_and_bulging_note.$render();
      // $scope.ExaminationForm.exudates_on_tonsil_note.$render();
      // $scope.ExaminationForm.cervical_adenopathy_note.$render();
      // $scope.ExaminationForm.throat_clear_note.$commitViewValue();
      // $scope.ExaminationForm.tm_note.$commitViewValue();
      // $scope.ExaminationForm.neck_supple_note.$commitViewValue();
      // $scope.ExaminationForm.tm_red_and_bulging_note.$commitViewValue();
      // $scope.ExaminationForm.exudates_on_tonsil_note.$commitViewValue();
      // $scope.ExaminationForm.cervical_adenopathy_note.$commitViewValue();
        
        // set notes:abdominal exam
      // $scope.ExaminationForm.soft_and_non_tender_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.abdominal_exam, 'soft_and_non_tender_note', 'textarea') : getSavedFieldValue(state_data.abdominal_exam, 'softAndNonTenderNote', 'textarea');
      // $scope.ExaminationForm.bsp_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.abdominal_exam, 'bsp_note', 'textarea') : getSavedFieldValue(state_data.abdominal_exam, 'bspNote', 'textarea');
      // $scope.ExaminationForm.fpp_and_equal_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.abdominal_exam, 'fpp_and_equal_note', 'textarea') : getSavedFieldValue(state_data.abdominal_exam, 'fppAndEqualNote', 'textarea');
      // $scope.ExaminationForm.distended_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.abdominal_exam, 'distended_note', 'textarea') : getSavedFieldValue(state_data.abdominal_exam, 'distendedNote', 'textarea');
      // $scope.ExaminationForm.tender_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.abdominal_exam, 'tender_note', 'textarea') : getSavedFieldValue(state_data.abdominal_exam, 'tenderNote', 'textarea');
      // $scope.ExaminationForm.decrease_bowel_sounds_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.abdominal_exam, 'decrease_bowel_sounds_note', 'textarea') : getSavedFieldValue(state_data.abdominal_exam, 'decreaseBowelSoundsNote', 'textarea');
      // $scope.ExaminationForm.soft_and_non_tender_note.$render();
      // $scope.ExaminationForm.bsp_note.$render();
      // $scope.ExaminationForm.fpp_and_equal_note.$render();
      // $scope.ExaminationForm.distended_note.$render();
      // $scope.ExaminationForm.tender_note.$render();
      // $scope.ExaminationForm.decrease_bowel_sounds_note.$render();
      // $scope.ExaminationForm.soft_and_non_tender_note.$commitViewValue();
      // $scope.ExaminationForm.bsp_note.$commitViewValue();
      // $scope.ExaminationForm.fpp_and_equal_note.$commitViewValue();
      // $scope.ExaminationForm.distended_note.$commitViewValue();
      // $scope.ExaminationForm.tender_note.$commitViewValue();
      // $scope.ExaminationForm.decrease_bowel_sounds_note.$commitViewValue();
        // set notes:respiratory
      // $scope.ExaminationForm.good_bilat_a_e_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.respiratory_exam, 'good_bilat_a_e_note', 'textarea') : getSavedFieldValue(state_data.respiratory_exam, 'goodBilatAENote', 'textarea');
      // $scope.ExaminationForm.decrease_a_e_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.respiratory_exam, 'decrease_a_e_note', 'textarea') : getSavedFieldValue(state_data.respiratory_exam, 'decreaseAENote', 'textarea');
      // $scope.ExaminationForm.wheezing_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.respiratory_exam, 'wheezing_note', 'textarea') : getSavedFieldValue(state_data.respiratory_exam, 'wheezingNote', 'textarea');
      // $scope.ExaminationForm.crackle_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.respiratory_exam, 'crackle_note', 'textarea') : getSavedFieldValue(state_data.respiratory_exam, 'crackleNote', 'textarea');
      // $scope.ExaminationForm.good_bilat_a_e_note.$render();
      // $scope.ExaminationForm.decrease_a_e_note.$render();
      // $scope.ExaminationForm.wheezing_note.$render();
      // $scope.ExaminationForm.crackle_note.$render();
      // $scope.ExaminationForm.good_bilat_a_e_note.$commitViewValue();
      // $scope.ExaminationForm.decrease_a_e_note.$commitViewValue();
      // $scope.ExaminationForm.wheezing_note.$commitViewValue();
      // $scope.ExaminationForm.crackle_note.$commitViewValue();
        //set notes:cardio vascular
      // $scope.ExaminationForm.s1_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.cardio_vascular, 's1_note', 'textarea') : getSavedFieldValue(state_data.cardio_vascular, 's1Note', 'textarea');
      // $scope.ExaminationForm.s2_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.cardio_vascular, 's2_note', 'textarea') : getSavedFieldValue(state_data.cardio_vascular, 's2Note', 'textarea');
      // $scope.ExaminationForm.ppp_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.cardio_vascular, 'ppp_note', 'textarea') : getSavedFieldValue(state_data.cardio_vascular, 'pppNote', 'textarea');
      //   $scope.ExaminationForm.s1_note.$render();
      //   $scope.ExaminationForm.s2_note.$render();
      //   $scope.ExaminationForm.ppp_note.$render();
      //   $scope.ExaminationForm.s1_note.$commitViewValue();
      //   $scope.ExaminationForm.s2_note.$commitViewValue();
      //   $scope.ExaminationForm.ppp_note.$commitViewValue();
        // set notes:neuro
      // $scope.ExaminationForm.cnii_x_ii_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.neurological_exam, 'cnii_x_ii_note', 'textarea') : getSavedFieldValue(state_data.neurological_exam, 'cniixiiNote', 'textarea');
      // $scope.ExaminationForm.power_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.neurological_exam, 'power_note', 'textarea') : getSavedFieldValue(state_data.neurological_exam, 'powerNote', 'textarea');
      // $scope.ExaminationForm.sensation_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.neurological_exam, 'sensation_note', 'textarea') : getSavedFieldValue(state_data.neurological_exam, 'sensationNote', 'textarea');
      // $scope.ExaminationForm.tone_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.neurological_exam, 'tone_note', 'textarea') : getSavedFieldValue(state_data.neurological_exam, 'toneNote', 'textarea');
      // $scope.ExaminationForm.cl_exam_note.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.neurological_exam, 'cl_exam_note', 'textarea') : getSavedFieldValue(state_data.neurological_exam, 'clExamNote', 'textarea');
      // $scope.ExaminationForm.cnii_x_ii_note.$render();
      // $scope.ExaminationForm.power_note.$render();
      // $scope.ExaminationForm.sensation_note.$render();
      // $scope.ExaminationForm.tone_note.$render();
      // $scope.ExaminationForm.cl_exam_note.$render();
      // $scope.ExaminationForm.cnii_x_ii_note.$commitViewValue();
      // $scope.ExaminationForm.power_note.$commitViewValue();
      // $scope.ExaminationForm.sensation_note.$commitViewValue();
      // $scope.ExaminationForm.tone_note.$commitViewValue();
      // $scope.ExaminationForm.cl_exam_note.$commitViewValue();
        

      // set respiratory viewValues and modelValues
      // $scope.ExaminationForm.good_bilat_a_e.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.respiratory_exam, 'good_bilat_a_e', 'input') : getSavedFieldValue(state_data.respiratory_exam, 'goodBilatA_E', 'input');
      // $scope.ExaminationForm.decrease_a_e.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.respiratory_exam, 'decrease_a_e', 'input') : getSavedFieldValue(state_data.respiratory_exam, 'decreaseA_E', 'input');
      // $scope.ExaminationForm.wheezing.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.respiratory_exam, 'wheezing', 'input') : getSavedFieldValue(state_data.respiratory_exam, 'wheezing', 'input');
      // $scope.ExaminationForm.crackle.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.respiratory_exam, 'crackle', 'input') : getSavedFieldValue(state_data.respiratory_exam, 'crackle', 'input');

      // // set cardio values
      // $scope.ExaminationForm.s1.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.cardio_vascular, 's1', 'input') : getSavedFieldValue(state_data.cardio_vascular, 's1', 'input');
      // $scope.ExaminationForm.s2.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.cardio_vascular, 's2', 'input') : getSavedFieldValue(state_data.cardio_vascular, 's2', 'input');
      // $scope.ExaminationForm.ppp.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.cardio_vascular, 'ppp', 'input') : getSavedFieldValue(state_data.cardio_vascular, 'ppp', 'input');

      // // set abdominal
      // $scope.ExaminationForm.soft_and_non_tender.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.abdominal_exam, 'soft_and_non_tender', 'input') : getSavedFieldValue(state_data.abdominal_exam, 'softAndNonTender', 'input');
      // $scope.ExaminationForm.bsp.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.abdominal_exam, 'bsp', 'input') : getSavedFieldValue(state_data.abdominal_exam, 'bsp', 'input');
      // $scope.ExaminationForm.fpp_and_equal.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.abdominal_exam, 'fpp_and_equal', 'input') : getSavedFieldValue(state_data.abdominal_exam, 'fppAndEqual', 'input');
      // $scope.ExaminationForm.distended.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.abdominal_exam, 'distended', 'input') : getSavedFieldValue(state_data.abdominal_exam, 'distended', 'input');
      // $scope.ExaminationForm.tender.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.abdominal_exam, 'tender', 'input') : getSavedFieldValue(state_data.abdominal_exam, 'tender', 'input');
      // $scope.ExaminationForm.decrease_bowel_sounds.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.abdominal_exam, 'decrease_bowel_sounds', 'input') : getSavedFieldValue(state_data.abdominal_exam, 'decreaseBowelSounds', 'input');

      
      // // set heent
      // $scope.ExaminationForm.throat_clear.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.heent, 'throat_clear', 'input') : getSavedFieldValue(state_data.heent, 'throatClear', 'input');
      // $scope.ExaminationForm.tm.$viewValue = angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.heent, 'tm', 'input') : getSavedFieldValue(state_data.heent, 'tm', 'input');
      // $scope.ExaminationForm.neck_supple.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.heent, 'neck_supple', 'input') : getSavedFieldValue(state_data.heent, 'neckSupple', 'input');
      // $scope.ExaminationForm.tm_red_and_bulging.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.heent, 'tm_red_and_bulging', 'input') : getSavedFieldValue(state_data.heent, 'tmRedAndBulging');
      // $scope.ExaminationForm.exudates_on_tonsil.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.heent, 'exudates_on_tonsil', 'input') : getSavedFieldValue(state_data.heent, 'exudatesOnTonsil', 'input');
      // $scope.ExaminationForm.cervical_adenopathy.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.heent, 'cervical_adenopathy', 'input') : getSavedFieldValue(state_data.heent, 'cervicalAdenopathy', 'input');

      // // set neuro
      // $scope.ExaminationForm.cnii_x_ii.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.neurological_exam, 'cnii_x_ii', 'input') : getSavedFieldValue(state_data.neurological_exam, 'cnii_x_ii', 'input');
      // $scope.ExaminationForm.power.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.neurological_exam, 'power', 'input') : getSavedFieldValue(state_data.neurological_exam, 'power', 'input');
      // $scope.ExaminationForm.sensation.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.neurological_exam, 'sensation', 'input') : getSavedFieldValue(state_data.neurological_exam, 'sensation', 'input');
      // $scope.ExaminationForm.tone.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.neurological_exam, 'tone', 'input') : getSavedFieldValue(state_data.neurological_exam, 'tone', 'input');
      // $scope.ExaminationForm.cl_exam.$viewValue =angular.isString(state_data) || !state_data?
      //     formValueSetter(formFieldDefaults.physical_exam.neurological_exam, 'cl_exam', 'input') : getSavedFieldValue(state_data.neurological_exam, 'clExam', 'input');

      // // render respiratory
      // $scope.ExaminationForm.good_bilat_a_e.$render();
      // $scope.ExaminationForm.good_bilat_a_e.$commitViewValue();
      // $scope.ExaminationForm.decrease_a_e.$render();
      // $scope.ExaminationForm.decrease_a_e.$commitViewValue();
      // $scope.ExaminationForm.wheezing.$render();
      // $scope.ExaminationForm.wheezing.$commitViewValue();
      // $scope.ExaminationForm.crackle.$render();
      // $scope.ExaminationForm.crackle.$commitViewValue();

      // //render cardio values
      // $scope.ExaminationForm.s1.$render();
      // $scope.ExaminationForm.s1.$commitViewValue();
      // $scope.ExaminationForm.s2.$render();
      // $scope.ExaminationForm.s2.$commitViewValue();
      // $scope.ExaminationForm.ppp.$render();
      // $scope.ExaminationForm.ppp.$commitViewValue();

      // // render abdo
      // $scope.ExaminationForm.soft_and_non_tender.$render();
      // $scope.ExaminationForm.soft_and_non_tender.$commitViewValue();
      // $scope.ExaminationForm.bsp.$render();
      // $scope.ExaminationForm.bsp.$commitViewValue();
      // $scope.ExaminationForm.fpp_and_equal.$render();
      // $scope.ExaminationForm.fpp_and_equal.$commitViewValue();
      // $scope.ExaminationForm.distended.$render();
      // $scope.ExaminationForm.distended.$commitViewValue();
      // $scope.ExaminationForm.tender.$render();
      // $scope.ExaminationForm.tender.$commitViewValue();
      // $scope.ExaminationForm.decrease_bowel_sounds.$render();
      // $scope.ExaminationForm.decrease_bowel_sounds.$commitViewValue();

      // // render heent
      // $scope.ExaminationForm.throat_clear.$render();
      // $scope.ExaminationForm.throat_clear.$commitViewValue();
      // $scope.ExaminationForm.tm.$render();
      // $scope.ExaminationForm.tm.$commitViewValue();
      // $scope.ExaminationForm.neck_supple.$render();
      // $scope.ExaminationForm.neck_supple.$commitViewValue();
      // $scope.ExaminationForm.tm_red_and_bulging.$render();
      // $scope.ExaminationForm.tm_red_and_bulging.$commitViewValue();
      // $scope.ExaminationForm.exudates_on_tonsil.$render();
      // $scope.ExaminationForm.exudates_on_tonsil.$commitViewValue();
      // $scope.ExaminationForm.cervical_adenopathy.$render();
      // $scope.ExaminationForm.cervical_adenopathy.$commitViewValue();

      // // set neuro
      // $scope.ExaminationForm.cnii_x_ii.$render();
      // $scope.ExaminationForm.cnii_x_ii.$commitViewValue();
      // $scope.ExaminationForm.power.$render();
      // $scope.ExaminationForm.power.$commitViewValue();
      // $scope.ExaminationForm.sensation.$render();
      // $scope.ExaminationForm.sensation.$commitViewValue();
      // $scope.ExaminationForm.tone.$render();
      // $scope.ExaminationForm.tone.$commitViewValue();
      // $scope.ExaminationForm.cl_exam.$render();
      // $scope.ExaminationForm.cl_exam.$commitViewValue();
    };

    var prepFormData = function(){
      return formData;
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
          $scope.apply();
      });
    };

    var updateCharts = function(){
        console.log($scope.chart);
      allExForms.unshift(angular.extend($scope.chart, {
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('hh:mm: A')
      }));
    };

    // INIT SAVE
    var writeLocalData = function(param_data){
      if (angular.isObject(param_data)) {
        cacheFactory.setLocalData(param_data).then(
          function(setSuccess){
            // console.log(setSuccess)
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


    var initSaveChart = function(){
        cacheFactory.getLocalData().then(
          function(getLocalSuccess){
            if (angular.isUndefined(getLocalSuccess)){
              next(updateCharts)
            } else {
              allExForms = getLocalSuccess;
              next(updateCharts)
            }
          }).then(function(){
            
            writeLocalData(allExForms);
          });
      };

    // INIT EDIT


    var initEditChart = function(){
      cacheFactory.getLocalData().then(
        function(getSuccess){
          if (angular.isUndefined(getSuccess)){
          } else if (getSuccess.length){
            allExForms = getSuccess;
          }
        }).then(function(){
          // console.log(allExForms);
          angular.forEach(allExForms, function(value, key){
            if ($stateParams.formId === value.id){
                console.log(value);
                return setDefault(value);
            } 
          });
        });
    };
    var initUpdateCharts = function(){
      allExForms = window._.reject(allExForms, {'id': $stateParams.formId});
      next(updateCharts);
      next(function(){writeLocalData('update')});
    };
    var checkFormValues = function(){
      if ($scope.ExaminationForm.$pristine){
        $log.info('Form is pristine');
        // setDefault();
        return true;
      } else if ($scope.ExaminationForm.$dirty && $scope.ExaminationForm.$valid){
        $log.info('form is dirty & valid')
        // setDefault();
        return true;
      }
    };
    $scope.toggleNote = function(param, cat){
        console.log($scope)
        // console.log($scope.chart[cat].status);
      // console.log(param);
      // console.log(cat);
      // console.log($scope.chart[param.cat][param.model]);
      
      // $scope[param.name+'_note_flag'] = !$scope[param.name+'_note_flag']; 
      // if ($scope.chart[param.cat][param.model].label  !== 'Abnormal'){
      //   $scope.ExaminationForm[param.name+'_note'].$viewValue = '';
      //   $scope.ExaminationForm[param.name+'_note'].$render();
      // }
    };

    $scope.$on('PageEvent:Print', function(event, args){
//      console.log('Event@erForm:: PageEvent:Print')
      document.addEventListener("deviceready", print, false);
    });
    $scope.$on('PageEvent:SaveChart', function(event, args){
//      console.log('Event@erForm:: PageEvent:SaveChart')
      initSaveChart($scope.chart)
    });
    $scope.$on('PageEvent:UpdateChart', function(event, args){
//      console.log('Event@erForm:: PageEvent:UpdateChart')
      initUpdateCharts();
    });
    $scope.$on('PageEvent:GoHome', function(event, args){
//      console.log('Event@erForm:: PageEvent:GoHome')
      //if checkFormValues(getFormValues())  // boolean. check for unsaved
      if (checkFormValues()){
        $state.go('default.home');
      }
    });
    $scope.$on('PageEvent:isAdd', function(){
//      console.log('PageEvent:isAdd');
      $timeout(function(){
          setDefault('default');
      });
    });
    $scope.$on('PageEvent:isEdit', function(){
//      console.log('PageEvent:isEdit');
      initEditChart();
    });


  };
})
.directive('erToggleNote', function($timeout, $rootScope){
  var linkFn = function($scope, $elem, $attr) {
    $timeout(function(){
        // console.log($scope.erToggleNote);
        console.log($scope.erNoteModel + ' ' + angular.toJson($scope.erToggleNote) + ' ' + $attr.name);
      if ( angular.isString($scope.erNoteModel) && !_.isEmpty($scope.erNoteModel) ){
        $scope.$parent.$parent[$scope.erToggleNoteFlag] = true;
      } else {
        $scope.$parent.$parent[$scope.erToggleNoteFlag] = false;
      } 
    });
  };
  return {
    scope: {
      erToggleNote: '=',
      erNoteModel: '=',
      erToggleNoteFlag: '@'
    },
    link: linkFn
  }
})
;
