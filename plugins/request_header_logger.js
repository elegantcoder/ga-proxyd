var debug = require('debug')('ga-proxy:plugin:request_header_logger');
module.exports = function (app, options) {
  app.use(function (req, res, next) {
    debug(req.headers);
    next();
  });
};