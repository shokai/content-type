var checker = require(process.env.PWD+'/helpers/type_check');

exports.get_type = function(req, res){
    var url = req.params[0];
    checker.type(url, function(content_type){
        res.send(content_type, 200);
    }, function(err, code){
        res.send('error('+code+')', 500);
    });
};

exports.check_type = function(req, res){
    var app_root = (req.connection.encrypted ? 'https' : 'http') + '://' + req.headers['host'];

    var type = req.params[0];
    var url = req.params[1];
    checker.check(url, new RegExp('^'+type), function(ok){
        if(ok) res.redirect(url);
        else res.redirect(app_root+'/images/invalid.png')
    }, function(err, code){
        res.redirect(app_root+'/images/invalid.png')
    });
};
