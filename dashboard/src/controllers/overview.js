angular.module('hsDashboard')
  .controller('OverviewCtrl', function ($scope, $http) {

    $http.get('/converted/1.0.0.5506.json').then(function (response) {
      $scope.cards = response.data;
    });

  });
