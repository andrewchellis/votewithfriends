var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('votewithfriends.db');

db.serialize(function() {
    db.run("CREATE TABLE lorem (info TEXT)");
    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for(var i=0;i<10;i++){
        stmt.run("Ipsum "+i);
    }
    stmt.finalize();
    db.each("SELECT rowid as id, info FROM lorem", function(err, row) {
        if(err){
            console.log('err');
        }
        console.log(row.id+": " + row.info);
    });
});
db.close();

const port = '80';

app.get('/',function(req,res){
    console.log('Get request from '+req.ip);
    res.sendfile('index.html');
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