var Mustache = require('mustache');

var template = 'Hello {{name}}!';
var rendered = Mustache.render(template, { name: 'World' });
console.log(rendered); // 'Hello World!'