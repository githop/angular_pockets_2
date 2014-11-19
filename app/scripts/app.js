'use strict';

/**
 * @ngdoc overview
 * @name ng32App
 * @description
 * # ng32App
 *
 * Main module of the application.
 */
angular
  .module('ng32App', [
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mm.foundation',
    'ngGeolocation',
    'highcharts-ng'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
