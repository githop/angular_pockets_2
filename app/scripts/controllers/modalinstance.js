'use strict';

/**
 * @ngdoc function
 * @name ng32App.controller:ModalinstancectrlCtrl
 * @description
 * # ModalinstancectrlCtrl
 * Controller of the ng32App
 */
angular.module('ng32App')
  .controller('ModalInstanceCtrl', ['$scope', '$timeout', 'politician', '$modalInstance',
    function($scope, $timeout, politician, $modalInstance) {
      $scope.pol = politician.data;

      $scope.ok = function() {
        $modalInstance.close();
      };

      $scope.drawChart = function() {
        $scope.$broadcast('highchartsng.reflow');
      };

      $timeout($scope.drawChart,20);

      function prepChartsData() {
        var categoriesInd = [];
        var dataInd = [];
        var categoriesOrg = [];
        var empTotal = [];
        var directTotal = [];
        var categoriesWord = [];
        var wordTotal = [];

        angular.forEach($scope.pol.contribution.industries, function(item) {
          categoriesInd.push(item.name);
          dataInd.push(item.total);
        });

        angular.forEach($scope.pol.contribution.organizations, function(item) {
          categoriesOrg.push(item.name);
          empTotal.push(item.employee_total);
          directTotal.push(item.direct_total);
        });

        angular.forEach($scope.pol.contribution.word_counts, function(item) {
          categoriesWord.push(item.word);
          wordTotal.push(item.count);
        });

        $scope.pol.charts = {
          sectorChart: {
            categories: categoriesInd,
            data: dataInd
          },
          orgChart: {
            categories: categoriesOrg,
            data: [empTotal, directTotal]
          },
          wordChart: {
            categories: categoriesWord,
            data: wordTotal
          }
        };

      }

      prepChartsData();

      $scope.orgChartConfig = {
        options: {
          chart: {
            type: 'column'
          },
          plotOptions: {
            series: {
              stacking: 'enabled'
            }
          },
          xAxis: {
            categories: $scope.pol.charts.orgChart.categories,
            labels: {
                formatter: function() {
                  return this.value.substring(0,16);
                },
                style: {
                    fontSize: '6px',
                    width: '10px',
                    fontFamily: 'Verdana, sans-serif',
                }
            }
          }
        },
        series: [{
          name: 'Employee Contributions',
          data: $scope.pol.charts.orgChart.data[0]
        }, {
          name: 'Company Contributions',
          data: $scope.pol.charts.orgChart.data[1]
        }],
        title: {
          text: 'Contributions by Organization'
        },
        func: function(chart) {
          $scope.$evalAsync(function() {
            chart.reflow()
          })
        }
      };

      $scope.sectorChartConfig = {
        options: {
          chart: {
            type: 'column'
          },
          xAxis: {
            categories: $scope.pol.charts.sectorChart.categories
          }
        },
        series: [{
          name: 'Total',
          data: $scope.pol.charts.sectorChart.data
        }],
        title: {
          text: 'Contributions by Sector of Economy'
        }
      };

      $scope.wordChartConfig = {
        options: {
          chart: {
            type: 'column'
          },
          xAxis: {
            categories: $scope.pol.charts.wordChart.categories
          }
        },
        series: [{
          name: 'words',
          data: $scope.pol.charts.wordChart.data
        }],
        title: {
          text: 'Most and Least Words Spoken'
        }
      };

    }
  ]);
