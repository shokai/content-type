// HTTP Status Checker

var request = require('request');
var memjs = require('memjs');
var cache  = new memjs.Client.create(null, {expires: 60*60*4});

var self = this;

this.type = function(url, callback, errback){
    var cache_key = 'type_'+url;
    cache.get(cache_key, function(type){
        if(type) callback(type.toString());
        else{
            request.head(url, function (err, res, body) {
                if (!err && res.statusCode == 200) {
                    cache.set(cache_key, res.headers['content-type']);
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
