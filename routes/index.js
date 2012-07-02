
process.app.get('/', function(req, res){
  var app_root = (req.connection.encrypted ? 'https' : 'http') + '://' + req.headers['host'];
  res.render('index', { title: 'Content-Type', app_root : app_root })
});
