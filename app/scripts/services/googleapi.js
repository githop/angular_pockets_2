'use strict';

/**
 * @ngdoc service
 * @name ng32App.googleAPI
 * @description
 * # googleAPI
 * Factory in the ng32App.
 */
angular.module('ng32App')
  .factory('googleAPI', ['$http', function($http) {

    var APIKey = 'AIzaSyB_Gu6uDOCsvVNawWd7WT05F7pqMAnE2O4';
    var driveUrl = 'https://www.googleapis.com/drive/v2/files/';
    var geoUrl = 'https://maps.googleapis.com/maps/api/geocode/json';

    var googleApiFactory = {};

    googleApiFactory.getZip = function(geo) {
      return $http.get(geoUrl, {
        params: {
          latlng: geo.toString(),
          key: APIKey,
          result_type: 'postal_code'
        }
      });
    };

    googleApiFactory.getThumb = function(fileId) {
      return $http.get(driveUrl + fileId, {
        params: {
          fields: 'thumbnailLink',
          key: APIKey
        }
      });
    };

    return googleApiFactory;
  }]);
