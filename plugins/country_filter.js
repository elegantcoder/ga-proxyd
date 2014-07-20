// This product includes GeoLite data created by MaxMind, available from
//  <a href="http://www.maxmind.com">http://www.maxmind.com</a>.

var fs = require('fs');
var debug = require('debug')('gaproxyd:plugin:country_filter');
var error = require('debug')('gaproxyd:plugin:country_filter');
error.log = console.error.bind(console);

var getCountryCodeByIp = function (ipAddress) {
  var maxmind = require('maxmind');
  maxmind.init('geoIP/GeoIP.dat');
  var country = maxmind.getCountry(ipAddress) || {code: 'N/A'};
  return country.code;
}

module.exports = function (app, options) {
  app.use('/analytics.js', function (req, res, next) {
    var fileName = 'public/analytics-original.js'
      , ipAddress = req.connection.remoteAddress;

    if (!!~options.blackList.indexOf(getCountryCodeByIp(ipAddress))) {
      fileName = 'public/analytics-modified.js';
    }

    fs.readFile(fileName, {encoding: 'utf-8'}, function (err, data) {
      if (err) {
        error(err);
        next(err);
      }
      res.write(data);
      res.end();
    });
  });
}