var checker = require(__dirname+'/../helpers/type_check.js');

var urls = ['http://shokai.org', 'http://twiticon.herokuapp.com/shokai'];
console.log('check ' + urls.join(', '));


for(var i = 0; i < urls.length; i++){
    (function(url){
        checker.type(url, function(res){
            console.log(url + ' => content-type : '+res);
        }, function(err, code){
            console.error(url + ' => response error!  status : ' + code);
            console.error('error : '+err);
        });
        
        checker.check(url, /^image\/.+/, function(ok){
            console.log(url + ' => is ' + (ok ? 'image' : 'not image'));
        }, function(err, code){
            console.error(url + ' => response error!  status : ' + code);
            console.error('error : '+err);
        });
    })(urls[i]);
};
