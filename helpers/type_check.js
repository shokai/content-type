// HTTP Status Checker

var request = require('request');
var cache = require('memory-cache');
var self = this;

this.type = function(url, callback, errback){
  var val = cache.get(url);
  if(val){
    if(val.type && typeof callback === 'function') callback(val.type);
    else if(typeof errback === 'function') errback(val.error, val.statusCode);
  }
  else{
    request.head(url, function (err, res, body) {
      if (!err && res.statusCode == 200) {
        cache.put(url, {type: res.headers['content-type']}, 3600*4*1000);
        if(typeof callback === 'function') callback(res.headers['content-type']);
      }
      else{
        var statusCode = res !== undefined ? res.statusCode : null;
        cache.put(url, {error: err, statusCode: statusCode}, 600*1000);
        if(typeof errback === 'function') errback(err, statusCode);
      }
    });
  }
};

this.check = function(url, content_type, callback, errback){
  self.type(url, function(res){
    if(typeof callback === 'function') callback(res.match(content_type) !== null);
  }, function(err, code){
    if(typeof errback === 'function') errback(err, code);
  });
};
