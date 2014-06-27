var descriptions = [
  '&amp;lt;b&amp;gt;Taunt&amp;lt;/b&amp;gt;.&amp;lt;b&amp;gt;Divine Shield&amp;lt;/b&amp;gt;',
  'Deal $1 damage to an enemy character and&amp;lt;b&amp;gt;Freeze&amp;lt;/b&amp;gt;it.',
  '&amp;lt;b&amp;gt;Hero Power&amp;lt;/b&amp;gt;\n Deal 1 damage.'
];

var start = '&amp;lt;b&amp;gt;';
var end = '&amp;lt;/b&amp;gt;';

descriptions.forEach(function (description) {
  var rawEffects = description.split(start);
  var processedEffects = [];

  rawEffects.forEach(function (effect) {
    var processedEffect = effect.replace(end, '');
    if (processedEffect) {
      processedEffect = processedEffect.replace('.', '');
      processedEffects.push(processedEffect);
    }
  });

  console.log(processedEffects);
});


