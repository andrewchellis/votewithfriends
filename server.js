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

app.get('/style.css',function(req,res){
    console.log('Load styles');
    res.sendFile(__dirname+'/style.css');
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
    db.run("INSERT INTO drivers (ID, NAME, POLLINGLOC, TIME, SEATS) VALUES ($ID,$NAME,$POLLINGLOC,$TIME,$SEATS)",{
        $ID: req.body.id,
        $NAME: req.body.name,
        $POLLINGLOC: req.body.loc,
        $TIME: req.body.time,
        $SEATS: req.body.seats
    },function(err){
        if(err){
            res.send("Failed to add row."+err);
        }
        else{
            res.send("Row added!");
        }
    });
});

app.post('/api/friends',function(req,res){
    db.all("SELECT * FROM friends",function(err,rows){
        if(!err){
            res.json(rows);
        }
        else{
            console.log("Failed to get friends");
        }
    });
});

app.post('/api/friends/add',function(req,res){
    db.run("INSERT OR IGNORE INTO friends (ID, NAME, DRIVER) VALUES ($ID,$NAME,$DRIVER)",{
        $ID: req.body.id,
        $NAME: req.body.name,
        $DRIVER: req.body.driver
    });
});

app.post('/api/checkRide',function(req,res){
    var possibleDrivers = []
    db.all("SELECT * FROM drivers",function(err,rows){
        if(!err){
            rows.forEach(function(row){
                if(row.POLLINGLOC===req.body.loc){
                    if(req.body.friendIDS!==undefined){
                        req.body.friendIDS.forEach(function(id){
                            if(id==row.ID){;
                                possibleDrivers.push(row);
                            }
                        });
                    }
                }
            });
            res.json(possibleDrivers);
        }
        else{
            console.log("Failed to get drivers");
        }
    });
    /**
    var possibleDrivers = [];
    console.log(req.body);
    db.each("SELECT * FROM drivers WHERE POLLINGLOC=$LOC",{
        $LOC: req.body.loc
    },function(err,row){
        if(row!==undefined){
            if(req.body.friendIDS.indexOf(row.ID)>0){
                possibleDrivers+=row;
            }
        }
    },function(err,rows){
        console.log(possibleDrivers);
        res.json(possibleDrivers);
    });
    */

    /**
    db.all("SELECT * FROM drivers WHERE ID IN $IDS AND POLLINGLOC=$LOC",
    {$IDS: req.body.friendIDS,
        $LOC: req.body.loc
    },function(err,rows){
        rows.forEach(function(row){
            if(row!===undefined){
                possibleDrivers.push(row);
            }
        });
        console.log(possibleDrivers);
        res.json(possibleDrivers);
    });
    */
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
