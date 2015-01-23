angular.module('starter.directives', ['starter.factories'])

.directive('erForm', function($timeout, ERaUtilsFactory, erFormDefault){
  var linkFn = function($scope, elem, attr){

    var formDefaults = erFormDefault;

    $scope.options = erFormDefault.options;
    $scope.resp = erFormDefault.respiratory_exam;
    $scope.abdo = erFormDefault.abdominal_exam;
    $scope.heent = erFormDefault.heent;
    $scope.cardiov = erFormDefault.cardio_vascular;
    $scope.neuro = erFormDefault.neurological_exam;

    var date, time, setDefault = function(){
      date = moment().format('YYYY-MM-DD');
      time = moment().format('h:mm:ss A');

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
    };

    //methods
    //getdefaultValues
    //getSavedValues
    //fillFormFields

    //events:
    // save
    // print

    //states:
    //edit:
    //  getSavedValues()
    //  fillFormFields()
    //
    //create:
    //  getFormValues()
    //  save
    $scope.$on('PageEvent:Print', function(event, args){
      console.log('Event@erForm:: PageEvent:Print')
    });
    $scope.$on('PageEvent:SaveChart', function(event, args){
      console.log('Event@erForm:: PageEvent:SaveChart')
    });
    $scope.$on('PageEvent:UpdateChart', function(event, args){
      console.log('Event@erForm:: PageEvent:UpdateChart')
    });
    $timeout(setDefault);
  };
  return {
    link: linkFn
  }
});

