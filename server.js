var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

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
    collection.insert(template, function(err, result) {
        console.log("------------ Inserted template ------------");
        callback(result);
    });
}
var getTemplates = function(db, callback) {
    var collection = db.collection('templates');
    collection.find({}).toArray(function(err, docs) {
        console.log(docs.length + ' found on DB...');
        callback(docs);
    });
}
app.get('/templates', bodyParser.json(), function(req, res) {
    console.log('Getting persisted templates...')

    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to DB server");
        getTemplates(db, function(docs) {
            db.close();
            res.json(docs);
        });
    });

});

app.post('/', bodyParser.json(), function(req, res) {
    if (!req.body) return res.sendStatus(400)
    console.log('Getting posted data...')
    var date = new Date().toISOString()
        .replace(/T/, ' ')
        .replace(/ /, '_');
    var template = {
        name: date,
        tmpl: date + '.html',
        html: JSON.parse(req.body.data)
    };

    fs.writeFile("app/views/templates/" + template.tmpl, template.html, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The template " + template.tmpl + " was saved!");
        }
    });
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to DB server");
        insertTemplates(db, template, function() {
            db.close();
        });
    });

});
app.listen(3000)
