var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('votewithfriends.db');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

const port = '80';

app.get('/',function(req,res){
    console.log('Get request from '+req.ip);
    res.sendFile(__dirname+'/index.html');
});
app.get('/fbScripts.js',function(req,res){
    console.log('Send fbscripts');
    res.sendFile(__dirname+'/fbScripts.js');
});
app.get('/googScripts.js',function(req,res){
    console.log('Send googScripts');
    res.sendFile(__dirname+'/googScripts.js');
});

app.get('/googleAPI',function(req,res){
    console.log('Test googleapi');
    res.sendFile(__dirname+'/findLocation.html');
});

app.post('/api/pollingLocations',function(req,res){
    res.send('List of pollingLocations');
});

app.post('/api/pollingLocations/add',function(req,res){
    res.send('Add pollingLocations');
});

app.post('/api/drivers',function(req,res){
    res.send('List of drivers')
});

app.post('/api/drivers/add',function(req,res){
    res.send('Add a driver');
});





app.get('*',function(req,res){
    res.status(404)
        .send('No page here');
});

app.post('*',function(req,res){
    console.log('Post request from'+req.ip);
    res.send('Post vote with friends!');
});

app.listen(port);
console.log('Listening on', port);