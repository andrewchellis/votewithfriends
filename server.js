var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
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
    res.sendFile(__dirname+'/getLocation.html');
});

app.get('/style.css',function(req,res){
    console.log('Load styles');
    res.sendFile(__dirname+'/style.css');
});

app.post('/api/pollingLocations',function(req,res){
    res.send('List of pollingLocations');
});

app.post('/api/pollingLocations/add',function(req,res){
    res.send('Add pollingLocations');
});

app.post('/api/drivers',function(req,res){
    db.all("SELECT * FROM drivers",function(err,rows){
        if(!err){
            res.json(rows);
        }
        else{
            console.log("Failed to get drivers");
        }
    });
});

app.post('/api/drivers/add',function(req,res){
    db.run("INSERT OR IGNORE INTO drivers (ID, NAME, POLLINGLOC, TIME, SEATS) VALUES ($ID,$NAME,$POLLINGLOC,$TIME,$SEATS)",{
        $ID: req.id,
        $NAME: req.name,
        $POLLINGLOC: req.loc,
        $TIME: req.time,
        $SEATS: req.seats
    });
});

app.post('/api/friends',function(req,res){
    res.send('List of friends!');
});

app.post('/api/friends/add',function(req,res){
    db.run("INSERT OR IGNORE INTO friends (ID, NAME, DRIVER) VALUES ($ID,$NAME,$DRIVER)",{
        $ID: req.id,
        $NAME: req.name,
        $DRIVER: req.driver
    });
});

app.post('/api/checkRide',function(req,res){
    var possibleDrivers = [];
    for each(var id in req.friendIDs){
        db.get("SELECT * FROM drivers WHERE ID=$ID",{
            $ID: id
        }, function(err,row){
            if(!err){
                possibleDrivers.push(row);
            }
        });
    }
    res.json(possibleDrivers);
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