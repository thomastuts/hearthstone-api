var Table = require('cli-table');

function logBreak(width) {
  console.log('\n');
  console.log(Array(width + 4).join('-'));
  console.log('\n');
}

module.exports = {
  full: function (card) {
    var table = new Table({
      colWidths: [10, 50]
    });

    for (var key in card) {
      var obj = {};
      if (typeof card[key] === 'string') {
        obj[key] = card[key];
      }
      else {
        obj[key] = JSON.stringify(card[key]);
      }

      table.push(obj);
    }

    logBreak(60);

    console.log(table.toString());
  }
};
