// HTTP Status Checker

var request = require('request');
var memcache = require('memcache');
var cache = new memcache.Client(11211, 'localhost');
cache.connect();

var self = this;

this.type = function(url, callback, errback){
    var cache_key = 'type_'+url;
    cache.get(cache_key, function(err, type){
        if(!err && type) callback(type);
        else{
            request.head(url, function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    cache.set(cache_key, res.headers['content-type'],
                              function(err, val){}, 60*60*4);
                    if(typeof callback === 'function') callback(res.headers['content-type']);
                }
                else{
                    if(typeof errback === 'function') errback(err, res !== undefined ? res.statusCode : null);
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
