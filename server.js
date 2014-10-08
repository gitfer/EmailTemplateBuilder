var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    next();
});

var url = 'mongodb://localhost:27017/EmailTemplateBuilder';
var insertTemplates = function(db, template, callback) {
  var collection = db.collection('templates');
  collection.insert({html: JSON.parse(template)}, function(err, result) {
    console.log("------------ Inserted template ------------", result);
    callback(result);
  });
}

app.post('/', bodyParser.json(), function(req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log('Getting posted data...')
    console.log(JSON.parse(req.body.data))

	MongoClient.connect(url, function(err, db) {
	    console.log("Connected correctly to DB server");
	    insertTemplates(db, req.body.data, function() {
	        db.close();
    		res.send('welcome, ' + req.body)
	    });
	});

});
app.listen(3000)
