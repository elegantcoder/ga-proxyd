var debug = require('debug')('gaproxyd:plugin:responseHeaderLogger');
module.exports = function (app) {
  app.use(function(req, res, next) {
    res.on('finish', function () {
      debug(res._header);
    });
    next();
  });
};