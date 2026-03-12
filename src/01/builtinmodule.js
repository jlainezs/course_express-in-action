var url = require('url');
// url.parse is deprecated.
var parsedUrl = url.parse('https://www.example.com/path?name=example#hash');

// use URL class instead.
//var parsedUrl = new URL('https://www.example.com/path?name=example#hash');

console.log(`Protocol: ${parsedUrl.protocol}`); // 'https:'
console.log(`Host: ${ parsedUrl.host }`); // 'www.example.com'
console.log(`Pathname: ${parsedUrl.pathname}`); // '/path'
console.log(`Hash: ${parsedUrl.hash}`); // '#hash'
