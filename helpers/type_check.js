// HTTP Status Checker

var request = require('request');
var memjs = require('memjs');
var cache = new memjs.Client.create(null, {expires: 3600*4});
var self = this;

this.type = function(url, callback, errback){
  cache.get(url, function(err, val, flag){
    if(!err && val){
      val = JSON.parse(val.toString());
      if(typeof callback === 'function') callback(val.type);
      else if(typeof errback === 'function') errback(val.error, val.statusCode);
    }
    else{
      request.head(url, function(err, res, body){
        if(!err && res.statusCode == 200){
          cache.set(url,
                    JSON.stringify({type: res.headers['content-type']}),
                    function(err, val){
            if(err) console.error('cache set error');
          });
          if(typeof callback === 'function') callback(res.headers['content-type']);
        }
        else{
          var statusCode = (res !== undefined ? res.statusCode : null);
          cache.set(url,
                    JSON.stringify({error: err, statusCode: statusCode}),
                    function(err, val){
            if(err) console.error('cache set error');
          });
          if(typeof errback === 'function') errback(err, statusCode);
        }
      });
    }
  });
};

this.check = function(url, content_type, callback, errback){
  self.type(url, function(res){
    if(typeof callback === 'function') callback(res.match(content_type) !== null);
  }, function(err, code){
    if(typeof errback === 'function') errback(err, code);
  });
};
