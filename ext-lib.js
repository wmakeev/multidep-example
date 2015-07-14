// Require external modules (will not be bundled, but required in runtime on client)
var _ = require('lodash');
var moment = require('moment');

module.exports = function (prefix) {
  // Use global taistApi object
  taistApi.log(prefix + ': I use lodash@' + _.VERSION + ', and moment@' + moment.version);
};