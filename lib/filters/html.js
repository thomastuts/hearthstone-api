// This should remove an incoming string's nasty HTML entities and replace the ones that need replacing (i.e. apostrophes).
// Maybe it should also filter out spell damage and healing? (i.e. remove the $ in front of the numbers)

//raw: 'Draw a card. That card costs &amp;&#35;40;3&#41; less.',
// &lt;b&gt;Stealth&lt;/b&gt;. At the end of your turn, give another random friendly minion +1 Health.

var _s = require('underscore.string');

var replaceEntities = [
  {
    pattern: '&amp;lt;b&amp;gt;',
    replacement: ''
  },
  {
    pattern: '&amp;lt;/b&amp;gt;',
    replacement: ' '
  },
  {
    pattern: ' \\n',
    replacement: ':'
  },
  {
    pattern: '&lt;b&gt;',
    replacement: ''
  },
  {
    pattern: '&lt;/b&gt;',
    replacement: ''
  },
  {
    pattern: '&amp;&#35;40;',
    replacement: '('
  },
  {
    pattern: '&#41;',
    replacement: ')'
  },
  {
    pattern: '&apos;',
    replacement: '\''
  }
];

module.exports = function (string) {

  // Replace all matches entities with their replacement strings
  replaceEntities.forEach(function (replaceEntity) {
    string = string.split(replaceEntity.pattern).join(replaceEntity.replacement);
  });

  // Trim any excess whitespace

  string = _s.trim(string);

  return string;
};
