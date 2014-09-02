var request = require('request');
var url = 'http://api.zendrive.com';

function v1(opts) {
  this.key = opts.key;
}

v1.prototype.users = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }

  makeRequest(params, 'users', callback);
};

v1.prototype.score = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }
  
  makeRequest(params, 'score', callback);
};

v1.prototype.globalScore = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }
  
  makeRequest(params, 'global_score', callback);
};

v1.prototype.userScore = function(id, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }
  
  makeRequest(params, ['user', id, 'score'].join('/'), callback);
};

function makeRequest(params, path, callback) {
  var preparedParams = {};
  var key, actualKey, val;

  for (key in params) {
    val = params[key];

    actualKey = key === 'start' || key === 'end' ? key + '_date' : key;

    preparedParams[actualKey] = Array.isArray(val) ? val.join(',') :
      key === 'start' || key === 'end' ? [ val.getFullYear(), val.getMonth() + 1, val.getDate() ].join('-') :
      val;
  }

  request({
    url: [url, 'v1', path].join('/'),
    method: 'get',
    qs: preparedParams
  });
}

function zendrive(opts) {
  this.v1 = new v1(opts);

  for (var key in this.v1) {
    this[key] = this[key] || this.v1[key];
  }
}

module.exports = zendrive;
