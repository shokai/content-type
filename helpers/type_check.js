// HTTP Status Checker

var request = require('request');
var self = this;

this.type = function(url, callback, errback){
    request.head(url, function (err, res, body) {
        if (!err && res.statusCode == 200) {
            if(typeof callback === 'function') callback(res.headers['content-type']);
        }
        else{
            if(typeof errback === 'function') errback(err, res !== undefined ? res.statusCode : null);
        }
    })
};

this.check = function(url, content_type, callback, errback){
    self.type(url, function(res){
        if(typeof callback === 'function') callback(res.match(content_type) !== null);
    }, function(err, code){
        if(typeof errback === 'function') errback(err, code);
    });
};
