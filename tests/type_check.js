
var checker = require(__dirname+'/../helpers/type_check.js');

var urls = ['http://localhost:5000', 'http://localhost:5000/images/shokai.png', 'http://localhost:5000/not_found'];

for(var i = 0; i < urls.length; i++){
    (function(url){
        checker.type(url, function(res){
            console.log(url + ' => content-type : '+res);
        }, function(err, code){
            console.error(url + ' => response error!  status : ' + code);
            console.error('error : '+err);
        });
        
        checker.check(url, /^image\/.+/, function(res){
            console.log(url + ' => is ' + (res ? 'image' : 'not image'));
        }, function(err, code){
            console.error(url + ' => response error!  status : ' + code);
            console.error('error : '+err);
        });
    })(urls[i]);
};