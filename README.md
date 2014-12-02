# Zendrive API

This wrapper is set up to support multiple version of the API.

Currently the only version available is v1.

## Using the API

```js
var Zendrive = require('zendrive');
var zd = new Zendrive({
  key: '{your-key}'
});

// methods available on zd.v1
```

## API

For full documentation, check out the official [Zenrive API docs](http://developers.zendrive.com/docs/api/reference/).

### Drivers

_list drivers in a fleet_

```js
zd.v1.drivers(function(err, data) {
  console.log(data);
});

// or

zd.v1.drivers({
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score',
  limit: 10,
  offset: 0
}, function(err, data) {
  console.log(data);
});
```

### Driver Score

```js
zd.v1.driverScore(191, function(err, data) {
  console.log(data);
});

// or

zd.v1.driverScore(191, {
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score'
}, function(err, data) {
  console.log(data);
});
```

### Driver Sessions

```js
zd.v1.driverSessions(230, function(err, data) {
  console.log(data);
});

// or

zd.v1.driverSessions(230, {
  start: new Date(1409960880396),
  end: new Date(),
  limit: 10,
  offset: 0
}, function(err, data) {
  console.log(data);
});
```

### Driver Trips

```js
zd.v1.driverTrips(761, function(err, data) {
  console.log(data);
});

// or

zd.v1.driverTrips(761, {
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score',
  limit: 10,
  offset: 0
}, function(err, data) {
  console.log(data);
});
```

### Glboal Score Distribution

```js
zd.v1.globalScore(function(err, data) {
  console.log(data);
});
```

### Groups

_List Driver Groups in a Fleet_

```js
zd.v1.groups(function(err, data) {
  console.log(data);
});
```

### Fleet Scores

```js
zd.v1.score(function(err, data) {
  console.log(data);
});

// or

zd.v1.score({
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score'
}, function(err, data) {
  console.log(data);
});
```

### Trip Score

_Trip Score for a given Driver and Trip_

```js
var driverId = 554;
var tripId = 1089;

zd.v1.tripScore(driverId, tripId, function(err, data) {
  console.log(data);
});

// or

zd.v1.tripScore(driverId, tripId, {
  fields: 'info'
}, function(err, data) {
  console.log(data);
});
```
