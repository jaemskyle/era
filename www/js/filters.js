angular.module('starter.filters', [])

.filter('formatText', function(){
  return function(input){
    if (input){
      return 'Normal';
    } else if (!input){
      return 'Abnormal';
    }
  };
});
