'use strict';

/**
 * @ngdoc service
 * @name ng32App.PoliFactory
 * @description
 * # PoliFactory
 * Factory in the ng32App.
 */
angular.module('ng32App')
  .factory('PoliFactory', ['$http', function($http) {
    var baseUrl = 'http://localhost:3000/politicians';
    // var baseUrl = '/politicians';
    var poliFactory = {};

    poliFactory.getPoliticians = function() {
      return $http.get(baseUrl);
    };

    poliFactory.getPolitician = function(full_name) {
      return $http.get(baseUrl, {
        params: {
          full_name: full_name
        }
      });
    };

    poliFactory.searchDb = function(name) {
      return $http.get(baseUrl, {
        params: {
          q: name
        }
      });
    };

    poliFactory.fromState = function(state) {
      return $http.get(baseUrl, {
        params: {
          state: state
        }
      });
    };

    poliFactory.getContributions = function(pid) {
      return $http.post(baseUrl + '/' + pid +'/contributions');
    };

    return poliFactory;
  }]);
