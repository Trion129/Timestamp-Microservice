'use strict';

var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("<h2>Usage is https://project1-trion129-2.c9users.io/December%2015,%202015<br>or<br>https://project1-trion129-2.c9users.io/1450137600</h2>");
    res.end();
})

app.get("/:time",function(req,res){
    var natural;
    var date;
    var unixTime;
    if(req.params.time.match(/[A-Z]+ [0-9]+\, [0-9]+/gi)){
        natural = req.params.time;
        unixTime = Date.parse(req.params.time)/1000;
    }
    else if(req.params.time.match(/[0-9]+/gi)){
        var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        unixTime = req.params.time;
        date = new Date(Number(unixTime) * 1000);
        natural = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    }
    else{
        res.write("null");
        res.end();
    }
    res.write(JSON.stringify(
       {
           unix: unixTime,
           natural: natural
        }));
    res.end();
});


var port = process.env.PORT || 8080;

app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});
