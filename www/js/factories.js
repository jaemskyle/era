angular.module('starter.factories', [])

.factory('cacheFactory', function($rootScope, $localForage){
  
    return {
      setLocalData: function(data){
        return console.log(data);
        // return $localForage.setItem('forms', data );
      },
      getLocalData: function(){
        return $localForage.getItem('forms');
      },
      clearCachedItem: function(item){
        return $localForage.removeItem(item);
      },
      broadcastCacheEvent: function(eventType){
        console.log('broadcasting: '+eventType);
        $rootScope.$broadcast('CacheUpdate:'+eventType)
      }
    };
});
