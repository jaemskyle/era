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
    console.log($scope.options[erFormDefault.values.good_bilat_a_e.index])

    var date, time, setDefault = function(){
      date = moment().format('YYYY-MM-DD');
      time = moment().format('h:mm:ss A');

      // set respiratory viewValues and modelValues
      $scope.ExaminationForm.date.$viewValue = date;
      $scope.ExaminationForm.date.$render();
      $scope.ExaminationForm.time.$viewValue = time;
      $scope.ExaminationForm.time.$render();

      $scope.ExaminationForm.good_bilat_a_e.$viewValue = $scope.options[erFormDefault.values.good_bilat_a_e.index];
      // $scope.ExaminationForm.good_bilat_a_e.$modelValue = $scope.options[2];
      // $scope.ExaminationForm.decrease_a_e.$viewValue = $scope.options[1];
      // $scope.ExaminationForm.decrease_a_e.$modelValue = $scope.options[1];
      // $scope.ExaminationForm.wheezing.$viewValue = $scope.options[1];
      // $scope.ExaminationForm.wheezing.$modelValue = $scope.options[1];
      // $scope.ExaminationForm.crackle.$viewValue = $scope.options[1];
      // $scope.ExaminationForm.crackle.$modelValue = $scope.options[1];

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

