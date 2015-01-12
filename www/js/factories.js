angular.module('starter.factories', [])

.factory('cacheFactory', function($rootScope, $localForage){
    var allExForms = [];
    return {
      getStoreLength: function(){
        return $localForage.length();
      },
      getStoreKeys: function(){
        return $localForage.keys();
      },
      setLocalData: function(data){
        return $localForage.setItem('ExForms', data)
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
});
