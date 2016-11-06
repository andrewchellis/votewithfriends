var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('votewithfriends.db');

db.serialize(function() {
    db.run("CREATE TABLE drivers (ID INTEGER,NAME TEXT, POLLINGLOC TEXT, TIME INTEGER, SEATS INTEGER, PRIMARY KEY(ID) ON CONFLICT FAIL)");
    db.run("CREATE TABLE friends (ID INTEGER,NAME TEXT,DRIVER INTEGER, PRIMARY KEY(ID) ON CONFLICT FAIL, FOREIGN KEY(DRIVER) REFERENCES drivers(ID))");
    db.run("CREATE TABLE locations (location TEXT, startTime INTEGER, stopTime Integer, PRIMARY KEY(location) ON CONFLICT FAIL)");
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