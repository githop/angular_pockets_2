'use strict';

/**
 * @ngdoc function
 * @name ng32App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ng32App
 */
angular.module('ng32App')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
