var debug = require('debug')('gaproxyd:plugin:request_header_logger');
module.exports = function (app) {
  app.use(function (req, res, next) {
    debug(req.headers);
    next();
  });
};