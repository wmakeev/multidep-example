var _ = require('lodash');
var moment = require('moment');

taistApi.log('in addon');

module.exports = 'I use lodash@' + _.VERSION + ', and moment@' + moment.version;