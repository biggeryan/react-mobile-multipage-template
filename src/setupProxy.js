const proxy = require('http-proxy-middleware');

// https://github.com/chimurai/http-proxy-middleware#context-matching
module.exports = function (app) {
  app.use(proxy(['/system', '/api'], { target: 'http://localhost:3000' }));
};
