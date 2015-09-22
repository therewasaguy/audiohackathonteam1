var express = require('express');

var port = process.env.PORT || 9001;
var app = express();

process.env.PWD = process.cwd();
console.log('pwd: ' + process.env.PWD);
app.use(express.static(process.env.PWD + '/dist/'));

// app.get('/*', function(req, res) {
// 	res.send('hello world');
// });

app.get('/*', function(req, res) {
	res.sendFile(process.env.PWD + '/dist/index.html');
});

app.listen(port, function(err) {
	console.log('Running on port ' + port);
});