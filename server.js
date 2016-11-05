var express = require('express');
var app = express();

const port = 80;

app.get('*',function(req,res){
    console.log('Get request from '+req.ip);
    res.send('Vote with friends!');
});

app.post('*',function(req,res){
    console.log('Post request from'+req.ip);
    res.send('Post vote with friends!');
});

app.listen(port);
console.log('Listening on', port);