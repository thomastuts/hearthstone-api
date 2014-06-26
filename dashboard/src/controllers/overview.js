angular.module('hsDashboard')
  .controller('OverviewCtrl', function ($scope, $http) {

    $http.get('/processed/1.0.0.5506/cards/1.0.0.5506.json').then(function (response) {
      $scope.cards = response.data;
    });

  });
