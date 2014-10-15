var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');

var app = express();

var url = 'mongodb://localhost:27033/EmailTemplateBuilder';

var insertData = function(collectionName, data, callback) {
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to DB server");
        var collection = db.collection(collectionName);
        collection.insert(data, function(err, result) {
            console.log("------------ Inserted data ------------");
            callback(result);
        });
    });
};
var getTemplate = function(filename, callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('templates');
        collection.find({tmpl: filename}).toArray(function(err, docs) {
            console.log(docs.length + ' found on DB...');
            db.close();
            callback(docs);
        });
    });
};
var getTemplates = function(callback) {
    MongoClient.connect(url, function(err, db) {
        var collection = db.collection('templates');
        collection.find({}).toArray(function(err, docs) {
            console.log(docs.length + ' found on DB...');
            db.close();
            callback(docs);
        }); 
    });
};
var saveFile = function(content, filename) {
    fs.writeFile(content, filename, function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The file " + filename + " was saved!");
        }
    });
};

app.all('/*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    next();
});
app.get('/templates', bodyParser.json(), function(req, res) {
    var filename = req.query.filename || '';
    if( filename !== ''){
        getTemplate(filename, function(docs) {
            res.json(docs);
        });   
    }else{
        getTemplates(function(docs) {
            res.json(docs);
        });   
    }
});

app.post('/staticHtml', bodyParser.json(), function(req, res) {
    if (!req.body) return res.sendStatus(400)
    var date = new Date().toISOString()
        .replace(/T/, ' ')
        .replace(/ /, '_');
    var template = {
        name: date,
        tmpl: date + '.html',
        html: JSON.parse(req.body.data)
    };
    saveFile("app/static_generated_templates/" + template.tmpl, template.html);
});
app.post('/templates', bodyParser.json(), function(req, res) {
    if (!req.body) return res.sendStatus(400)
    var date = new Date().toISOString()
        .replace(/T/, ' ')
        .replace(/ /, '_');
    var template = {
        name: date,
        tmpl: date + '.html',
        html: JSON.parse(req.body.data),
        model: JSON.parse(req.body.model)
    };
    saveFile("app/views/templates/" + template.tmpl, template.html);
    insertData('templates', template, function() {});
});
app.listen(5000)
