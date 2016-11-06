var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('votewithfriends.db');

db.serialize(function() {
    db.run("CREATE TABLE drivers (ID INTEGER PRIMARY KEY,NAME TEXT, POLLINGLOC TEXT, TIME INTEGER, SEATS INTEGER)");
    db.run("CREATE TABLE friends (ID INTEGER PRIMARY KEY,NAME TEXT,DRIVER TEXT, FOREIGN KEY(DRIVER) REFERENCES drivers(NAME))");
    db.run("CREATE TABLE locations (location TEXT, startTime INTEGER, stopTime Integer)");
    //var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    //for(var i=0;i<10;i++){
    //    stmt.run("Ipsum "+i);
    //}
    //stmt.finalize();
    //db.each("SELECT rowid as id, info FROM lorem", function(err, row) {
    //    if(err){
    //        console.log('err');
    //    }
    //    console.log(row.id+": " + row.info);
    //});
});
db.close();