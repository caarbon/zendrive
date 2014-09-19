var request = require('request');
var ApiErr = require('./ApiErr.js');
var url = 'http://api.zendrive.com';

function v1(opts) {
  this.makeRequest = function(params, path, callback) {
    var preparedParams = {
      apikey: opts.key
    };
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
      method: 'GET',
      qs: preparedParams,
      json: true
    }, function(err, res, body) {
      if (body && body.fault) {
        return callback(new ApiErr(body.fault.faultstring || 'An error occurred', body.fault));
      }

      callback(err, body);
    });

    return this;
  };
}

v1.prototype.users = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, 'users', callback);
};

v1.prototype.score = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }
  
  return this.makeRequest(params, 'score', callback);
};

v1.prototype.globalScore = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }
  
  return this.makeRequest(params, 'global_score', callback);
};

v1.prototype.userScore = function(id, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }
  
  return this.makeRequest(params, ['user', id, 'score'].join('/'), callback);
};

v1.prototype.userTrips = function(id, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }
  
  return this.makeRequest(params, ['user', id, 'trips'].join('/'), callback);
};

function zendrive(opts) {
  this.v1 = new v1(opts);
}

module.exports = zendrive;
