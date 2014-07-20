var debug = require('debug')('gaproxyd:plugin:no_favicon');
module.exports = function (app) {
  app.use('/favicon.ico', function (req, res) {
    debug('sent 404 Not Found');
    res.statusCode = 404;
    res.end('');
  });
};