angular.module('ERChart').factory('cache',function($localForage, $rootScope) {

	var cache = {
        getStoreLength: function () {
            return $localForage.length();
        },
        getStoreKeys: function () {
            return $localForage.keys();
        },
        writeLocalData: function (data) {
            return $localForage.setItem('ExForms', data);
        },
        getLocalData: function () {
            return $localForage.getItem('ExForms');
        },
        clearCachedItem: function (item) {
            return $localForage.removeItem(item);
        },
        clearAllCached: function () {
            return $localForage.clear();
        },
        broadcastCacheEvent: function (eventType) {
            console.log('broadcasting: ' + eventType);
            $rootScope.$broadcast('CacheUpdate:' + eventType);
        }
    };

	return cache;
});
