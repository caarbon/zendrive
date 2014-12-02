var request = require('request');

var url = 'https://api.zendrive.com';

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
        actualKey === 'start_date' || actualKey === 'end_date' ? [ val.getFullYear(), val.getMonth() + 1, val.getDate() ].join('-') :
        val;
    }

    request({
      url: [url, 'v1', path].join('/'),
      method: 'GET',
      qs: preparedParams,
      json: true
    }, function(err, res, body) {
      console.log(res.statusCode);
      console.log(body);

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

V1.prototype.drivers = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, 'drivers', callback);
};

V1.prototype.driverScore = function(driverId, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, ['driver', driverId, 'score'].join('/'), callback);
};

V1.prototype.driverSessions = function(driverId, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, ['driver', driverId, 'sessions'].join('/'), callback);
};

V1.prototype.driverTrips = function(driverId, params, callback) {
  if (arguments.length < 3) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, ['driver', driverId, 'trips'].join('/'), callback);
};

V1.prototype.globalScore = function(callback) {
  return this.makeRequest({}, 'global_score', callback);
};

V1.prototype.groups = function(callback) {
  return this.makeRequest({}, 'groups', callback);
};

V1.prototype.score = function(params, callback) {
  if (arguments.length < 2) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, 'score', callback);
};

V1.prototype.tripScore = function(driverId, tripId, params, callback) {
  if (arguments.length < 4) {
    callback = params;
    params = {};
  }

  return this.makeRequest(params, ['driver', driverId, 'trip', tripId].join('/'), callback);
};

function zendrive(opts) {
  this.v1 = new V1(opts);
}

module.exports = zendrive;
