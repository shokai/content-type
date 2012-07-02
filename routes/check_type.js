var checker = require(process.env.PWD+'/helpers/type_check');

process.app.get(/^\/type\/(https?:\/\/.+)/, function(req, res){
  var url = req.params[0];
  checker.type(url, function(content_type){
    res.send(content_type, 200);
  }, function(err, code){
    res.send('error('+code+')', 500);
  });
});


process.app.get(/^\/type\/(.+)\/(https?:\/\/.+)/, function(req, res){
  var app_root = (req.connection.encrypted ? 'https' : 'http') + '://' + req.headers['host'];

  var type = req.params[0];
  var url = req.params[1];
  checker.check(url, new RegExp('^'+type), function(ok){
    if(ok) res.redirect(url);
    else{
      if(type.match(/^image/i)) res.redirect(app_root+'/images/invalid.png');
      else res.send('content type error', 415);
    }
  }, function(err, code){
    if(type.match(/^image/i)) res.redirect(app_root+'/images/invalid.png');
    else res.send('error('+code+')', 500);
  });
});
