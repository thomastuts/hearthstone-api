angular.module('hsDashboard')
  .filter('localized', function () {

    var defaultLocale = 'enUS';

    return function (input) {
      return input[defaultLocale];
    }

  });
