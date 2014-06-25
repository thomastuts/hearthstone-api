angular.module('hsDashboard')
  .filter('htmlDecode', function () {

    var entities = {
      '&amp;':  '&',
      '&lt;':   '<',
      '&gt;':   '>',
      '&quot;':  '"',
      '&apos;':  '\''
    };

    return function (content) {
      for (var entity in entities) {
        content = content.replace(entity, entities[entity]);
      }

      return content;
    }

  });
