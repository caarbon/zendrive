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

### Users

request parameters | type | description
--- | --- | ---
start | Date | Response will contain active users between start and end dates [ both inclusive ]
end | Date | Response will contain active users between start and end dates [ both inclusive ]
fields | String | `info`: Returns only information about user, `score`: Returns driving behavior scores
limit | Number | pagination limit
offset | Number | pagination offset
ids | Array of Strings | list of user ids for which data should be returned - Will return these users even if they were not active between start and end date

response field | description
--- | ---
start_date | same as requested, else start of last week
end_date | same as requested, else today
next_offset | value that should passed for next page of results (if undefined, implies end of results)
users | array of user results

```js
zd.v1.users(function(err, data) {
  console.log(data);
});

// or

zd.v1.users({
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score',
  limit: 10,
  offset: 0
}, function(err, data) {
  console.log(data);
});
```

### Score Statistics

request parameters | type | description
--- | --- | ---
start | Date | Statistics that are computed based on data from start to end dates [ both inclusive ]
end | Date | Statistics that are computed based on data from start to end dates [ both inclusive ]
fields | String | `info`: Returns only information about user, `score`: Returns driving behavior scores
limit | Number | pagination limit
offset | Number | pagination offset
ids | Array of Strings | list of user ids for which data should be returned - Will return these users even if they were not active between start and end date

response field | description
--- | ---
start_date | same as requested, else start of last week
end_date | same as requested, else today
score.fuel_efficiency_score | Average economical driving score for entire fleet over the duration requested - A 1.0 implies 100% efficiency
score.lawful_score | Average law abiding score for entire fleet over the duration requested
score.cautious_score | Average cautious score for entire fleet over the duration requested
score.zendrive_score | Average overall Zendrive score for entire fleet over the duration requested

```js
zd.v1.score(function(err, data) {
  console.log(data);
});

// or

zd.v1.score({
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score',
  limit: 10,
  offset: 0
}, function(err, data) {
  console.log(data);
});
```

### Global Score

This doesn't take any paramaters

This is for the global Zendrive score information.

response field | description
--- | ---
distribution | Score distribution for each type of score over global population of drivers known to Zendrive

```js
zd.v1.globalScore(function(err, data) {
  console.log(data);
});
```

### User Score

request parameters | type | description
--- | --- | ---
start | Date | Statistics that are computed based on data from start to end dates [ both inclusive ]
end | Date | Statistics that are computed based on data from start to end dates [ both inclusive ]
fields | String | `info`: Returns only information about user, `score`: Returns driving behavior scores

response field | description
--- | ---
start_date | same as requested, else start of last week
end_date | same as requested, else today
score.fuel_efficiency_score | Average economical driving score for user over the duration requested - A 1.0 implies 100% efficiency
score.lawful_score | Average law abiding score for user over the duration requested
score.cautious_score | Average cautious score for user over the duration requested
score.zendrive_score | Average overall Zendrive score for user over the duration requested

```js
zd.v1.userScore(userId, function(err, data) {
  console.log(data);
});

// or

zd.v1.userScore(userId, {
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score'
}, function(err, data) {
  console.log(data);
});
```

### User Trips

request parameters | type | description
--- | --- | ---
start | Date | Statistics that are computed based on data from start to end dates [ both inclusive ]
end | Date | Statistics that are computed based on data from start to end dates [ both inclusive ]
fields | String | `info`: Returns only information about user, `score`: Returns driving behavior scores

response field | description
--- | ---
start_date | same as requested, else start of last week
end_date | same as requested, else today
trips | list of trips for the user

```js
zd.v1.userTrips(userId, function(err, data) {
  console.log(data);
});

// or

zd.v1.userTrips(userId, {
  start: new Date(1409960880396),
  end: new Date(),
  fields: 'score'
}, function(err, data) {
  console.log(data);
});
```

### Trip Score

request parameters | type | description
--- | --- | ---
fields | String | `info`: Returns only information about user, `score`: Returns driving behavior scores

response field | description
--- | ---
score.fuel_efficiency_score | Average economical driving score for user over the duration of trip. A fuel_efficiency_score of 0.7 implies driver is operating at 70% of maximum fuel efficiency possible.
score.lawful_score | Average law abiding score for user over the duration of trip.
score.cautious_score | Average cautious score for user over the duration of trip.
score.zendrive_score | Average overall Zendrive score for user over the duration of trip.
info.distance_km | Total distance in km logged by user during the specified date range.
info.drive_time_hours | Total drive time over all of users trips during the specified date range.
info.start_time | Start time of trip in ISO format.
info.end_time | End time of trip in ISO format.

```js
zd.v1.tripScore(userId, tripId, function(err, data) {
  console.log(data);
});

// or

zd.v1.tripScore(userId, tripId, {
  fields: 'score'
}, function(err, data) {
  console.log(data);
});
```
