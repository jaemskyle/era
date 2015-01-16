angular.module('starter.factories', [])

.factory('cacheFactory', function($rootScope, $localForage){
    var allExForms = [];

    var sync = function(newItem, successCallback){
      $localForage.getItem('ExForms').then(function(getSuccess){
        if (!getSuccess){
          allExForms.push(newItem);
          $localForage.setItem('ExForms', allExForms).then(function(setSuccess){
            if (ionic.Platforms.isWebView()){
              window.plugins.toast.showShortTop('Success: Form is saved.');
            }
          })
        } else {
          allExForms = getSuccess;
          allExForms.push(newItem);
          $localForage.setItem('ExForms', allExForms).then(function(setSuccess){
            if (ionic.Platforms.isWebView()){
              window.plugins.toast.showShortTop('Success: Form is saved.');
            }
            $localForage.getItem('ExForms', function(getSuccess){
            })
          })
        }
      });

      return allExForms = [];
    };
    return {
      getStoreLength: function(){
        return $localForage.length();
      },
      getStoreKeys: function(){
        return $localForage.keys();
      },
      setLocalData: function(data){
        return $localForage.setItem('ExForms', data );
      },
      getLocalData: function(){
        return $localForage.getItem('ExForms');
      },
      clearCachedItem: function(item){
        return $localForage.removeItem(item);
      },
      clearAllCached: function(){
        return $localForage.clear();
      },
      broadcastCacheEvent: function(eventType){
        console.log('broadcasting: '+eventType);
        $rootScope.$broadcast('CacheUpdate:'+eventType)
      }
    };
})
.factory('ERaUtilsFactory', function($rootScope){
  return {
    showToast: function(position, duration, message){
      if (position === 'top') {
        if (duration === 'short'){
          window.plugins.toast.showShortTop(message);
        } else {
          window.plugins.toast.showLongTop(message);
        }
      } else if (position === 'bottom') {
        if (duration === 'short'){
          window.plugins.toast.showShortBottom(message);
        } else {
          window.plugins.toast.showLongBottom(message);
        }
      } else if (position === 'center')
        if (duration === 'short') {
         window.plugins.toast.showShortTop(message);
        } else {
         window.plugins.toast.showLongTop(message);
        }
    },
    broadcastPageEvent: function(eventName){
      console.log('broadcasting: '+eventName);
      $rootScope.$broadcast('PageEvent:'+eventName);
    }
  }
})
;
