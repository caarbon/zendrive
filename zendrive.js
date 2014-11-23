var request = require('request');
var url = 'http://api.zendrive.com';

function V1(opts) {
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
      if (body && body.fault && body.fault.faultstring) {
        return callback(new Error(body.fault.faultstring));
      } else if (typeof body !== 'object') {
        return callback(new Error('An error occurred'));
      } else if (body.error && typeof body.error === 'string') {
        return callback(new Error(body.error));
      }

      callback(err, body);
    });

    return this;
  };
}

V1.prototype.users = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, 'users', callback);
};

V1.prototype.score = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, 'score', callback);
};

V1.prototype.globalScore = function(callback) {
  return this.makeRequest({}, 'global_score', callback);
};

V1.prototype.userScore = function(id, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, ['user', id, 'score'].join('/'), callback);
};

V1.prototype.userTrips = function(id, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, ['user', id, 'trips'].join('/'), callback);
};

V1.prototype.tripScore = function(id, tripId, params, callback) {
  if (arguments.length < 4) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, ['user', id, 'trip', tripId].join('/'), callback);
};

function zendrive(opts) {
  this.v1 = new V1(opts);
}

module.exports = zendrive;
