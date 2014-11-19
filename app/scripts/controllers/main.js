'use strict';

/**
 * @ngdoc function
 * @name ng32App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ng32App
 */
angular.module('ng32App')
  .controller('MainCtrl', ['$scope', 'PoliFactory', 'googleAPI', '$modal',
    function($scope, PoliFactory, googleAPI, $modal) {

      $scope.states = [{ 'name':'AL'},{ 'name':'AK'},{ 'name':'AZ'},{ 'name':'AR'},{ 'name':'CA'},{ 'name':'CO'},{ 'name':'CT'},{ 'name':'DE'},{ 'name':'FL'},{ 'name':'GA'},{ 'name':'HI'},{ 'name':'ID'},{ 'name':'IL'},{ 'name':'IN'},{ 'name':'IA'},{ 'name':'KS'},{ 'name':'KY'},{ 'name':'LA'},{ 'name':'ME'},{ 'name':'MD'},{ 'name':'MA'},{ 'name':'MI'},{ 'name':'MN'},{ 'name':'MS'},{ 'name':'MO'},{ 'name':'MT'},{ 'name':'NE'},{ 'name':'NV'},{ 'name':'NH'},{ 'name':'NJ'},{ 'name':'NM'},{ 'name':'NY'},{ 'name':'NC'},{ 'name':'ND'},{ 'name':'OH'},{ 'name':'OK'},{ 'name':'OR'},{ 'name':'PA'},{ 'name':'RI'},{ 'name':'SC'},{ 'name':'SD'},{ 'name':'TN'},{ 'name':'TX'},{ 'name':'UT'},{ 'name':'VT'},{ 'name':'VA'},{ 'name':'WA'},{ 'name':'WV'},{ 'name':'WI'},{ 'name':'WY'}];
      $scope.banner = true;

      $scope.getPoliFromState = function(state) {
        clearBanner();
        PoliFactory.fromState(state.name)
          .success(function(data) {
            fetchThumbs(data);
            var poli = [];
            while (data.length) {
              poli.push(data.splice(0, 4));
            }
            $scope.politicians = poli;
          });
      };

      $scope.typeahead = function(val) {
        return PoliFactory.searchDb(val)
          .then(function(res) {
            var poli = [];
            angular.forEach(res.data, function(item) {
              poli.push(item.full_name);
            });
            return poli;
          });
      };

      $scope.searchResults = function(name) {
        clearBanner();
        PoliFactory.getPolitician(name)
          .success(function(data) {
            $scope.politicians = {politician: data};
            fetchThumbs(data);
          });
      };

      $scope.open = function(pol) {
        pol.loading = 'images/spinner.svg';
        var modalInstance = $modal.open({
          templateUrl: 'views/poliModal.html',
          controller: 'ModalInstanceCtrl',
          windowClass: 'large-12 columns pol_modal',
            resolve: {
              politician: function() {
                return PoliFactory.getContributions(pol.id)
                  .success(function(data) {
                  })
              }
            }
        })

        modalInstance.opened.then(function() {
          console.log(pol.loading)
          pol.loading = ' ';
        })

      };


      function clearBanner() {
        $scope.banner = false;
      }


      function fetchThumbs(data) {
        angular.forEach(data, function(item) {
          item.img = '../images/spinner.svg';
          googleAPI.getThumb(item.drive_id)
            .success(function(data) {
              item.img = data.thumbnailLink;
            })
            .error(function() {
              item.img = '../images/nopic.png';
            });
        });
      }

    }
  ]);
