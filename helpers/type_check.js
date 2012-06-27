// HTTP Status Checker

var request = require('request');
var cache = require('memory-cache');
var self = this;

this.type = function(url, callback, errback){
    var type = cache.get(url);
    if(type) callback(type);
    else{
        request.head(url, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                cache.put(url, res.headers['content-type'], 3600*4*1000);
                if(typeof callback === 'function') callback(res.headers['content-type']);
            }
            else{
                if(typeof errback === 'function') errback(err, res !== undefined ? res.statusCode : null);
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
