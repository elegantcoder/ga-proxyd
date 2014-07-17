var debug = require('debug')('ga-proxy:plugin:no_favicon');
module.exports = function (app, options) {
  app.use('/favicon.ico', function (req, res, next) {
    debug('sent 404 Not Found');
    res.statusCode = 404;
    res.end('');
  })
}