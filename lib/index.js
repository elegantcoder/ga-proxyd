var http = require('http')
  , connect = require('connect')
  , url = require('url')
  , proxy = require('proxy-middleware')
  , serveStatic = require('serve-static')
  , url = require('url')
  , debug = require('debug')('ga-proxyd')
  , error = require('debug')('ga-proxyd');
error.log = console.error.bind(console);

var publicDir = 'public';
var config = require('./config.js');

var app = connect();

var downloadGaJS = function downloadGaJs () {
  var request = require('request')
    , fs = require('fs');

  var gaOriginalFilePath = publicDir + '/ga-original.js';
  var gaModifiedFilePath = publicDir + '/ga-modified.js';

  var _setExpires = function (res) {
    var expires = new Date(res.headers.expires);
    var now = new Date(res.headers.date);
    setTimeout(downloadGaJs, expires - now);
  };

  var _replace = function (gaJs) {
    fs.writeFileSync(gaOriginalFilePath, gaJs);
    fs.writeFileSync(gaModifiedFilePath, gaJs.replace('www.google-analytics.com', config.server.host));
  };

  request('http://google-analytics.com/ga.js', function (err, res, body) {
    if (err) {
      error('downloadGaJs: %j', err);
      if (!fs.existsSync(gaOriginalFilePath) || !fs.existsSync(gaModifiedFilePath)) {
        throw new Error('http://google-analytics.com/ga.js cannot be downloaded. Stop.');
      }
    }
    debug('downloadGaJs: %j', res.headers);
    _setExpires(res);
    _replace(body);
  });
};

var createServer = function (options) {
  var base = options.base
    , target = options.target
    , port = options.port
    , bindAddress = options.bindAddress;

  app.use(base, serveStatic(publicDir+'/'));
  app.use(base, proxy(url.parse(target)));
  http.createServer(app).listen(port, bindAddress);
};

var setUserIP = function () {
  app.use(function (req, res, next) {
    var parseResult = url.parse(req.url, true);
    if (!!~parseResult.href.indexOf('collect')) {
      parseResult.query.uip = req.connection.remoteAddress;
      parseResult.search = ''; // query will only be used if search is absent
      req.url = url.format(parseResult);
      debug('request url %s', req.url);
    }
    next();
  });
};

var loadPlugins = function (config) {
  config.plugins.forEach(function (pluginData) {
    var name, options;
    if (typeof pluginData === 'string') {
      name = pluginData;
      options = {};
    } else {
      name = pluginData.name;
      options = pluginData.options || {};
    }

    require('../plugins/'+name)(app, options);
  });
};

downloadGaJS();
setUserIP();
loadPlugins(config);
createServer(config.server);