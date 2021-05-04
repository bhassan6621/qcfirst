const express = require('express');
const mongoose = require('mongoose');
const app = express();
var http = require('http');
const bodyParser = require('body-parser');
const { connect } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8080;
const url='mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 
let db;

MongoClient.connect(url, (err, database) => {
    if(err) {
        return console.log(err);
    }
    db = database.db("myFirstDatabase");
    // start the express web server listening on 8080
    app.listen(8080 , '0.0.0.0');
});

// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end('Hello World\n');
// }).listen(8080, "0.0.0.0");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('view'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

app.post('/addClass', (req, res) => {
    var courseName = req.body.name;
    var courseId = req.body.id;
    var semester = req.body.semester;
    var department = req.body.department;
    var instructor = req.body.instructor;
    var start = req.body.startTime;
    var end = req.body.endTime;
    var days = req.body.day;
    var enrollDead = req.body.enroll;
    var capacity = req.body.capacity;
    var description = req.body.description;

    console.log(courseName);

    var data = {
        "courseName" : courseName,
        "courseId": courseId,
        "semester": semester,
        "department": department,
        "instructor": instructor,
        "start": start,
        "end": end,
        "days": days,
        "enrollDead": enrollDead,
        "capacity": capacity,
        "description": description
    }

    db.collection('courses').insertOne(data, function(err, collection) {
        if(err) throw err;
        console.log("Record inserted successfully");
    });
    return res.redirect("professor_homepage.html")
});