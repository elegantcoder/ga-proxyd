module.exports = require('../config');
var path = require('path');
if (require('fs').existsSync(path.resolve(__dirname+'/../config.local.js'))) {
  var override = require('../config.local.js');
  for (var i in override)
    module.exports[i] = override[i];
}
