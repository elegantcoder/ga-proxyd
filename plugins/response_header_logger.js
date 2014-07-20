var debug = require('debug')('gaproxyd:plugin:responseHeaderLogger');
module.exports = function (app, options) {
  app.use(function(req, res, next) {
    res.on('finish', function () {
      debug(res._header);
    });
    next();
  });
};