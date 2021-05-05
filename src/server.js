const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
var http = require('http');
const bodyParser = require('body-parser');
const { connect } = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8080;
const path = require('path');
const { request } = require('express');
const url='mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'; 
let db;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

MongoClient.connect(url, (err, database) => {
    if(err) {
        return console.log(err);
    }
    db = database.db("myFirstDatabase");
    // start the express web server listening on 8080
    app.listen(8080 , '0.0.0.0');
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('view'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// when professor adds a course -> makes a new record into the courses model
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


// Query for when a student searches for a course
app.post('/searchClass', (req, res) => {
    var Input_courseName = req.body.courseName;
    var Input_courseNum = req.body.courseNum;
    var Input_semester = req.body.semester;

    // queries for classes that have the same name, number and semester OR just has the same name
    var query = {$or: [{courseName: Input_courseName,
                 courseId: Input_courseNum,
                 semester: Input_semester}, 
                {courseName: Input_courseName}
                ]}
    // MongoClient.connect(url, function(err, db) {
    //     if(err) throw err;
    //     var dbo = db.db("myFirstDatabase");
    //     dbo.collection("courses").findOne({courseName: Input_courseName},
    //         function(err, result) {
    //             if(err) throw err;
    //             console.log(result);
    //             res.json(result);
    //             db.close();
    //         })
    // });
    
    db.collection('courses').find(query).toArray(function(err, results) {
        if(err) throw err;
        console.log("course: " + results);
        var table="";
        results.forEach(function(result) {
        // table = result.instructor + word;
            table += "<tr class='row'>" + 
                    "<td class='col'>" + result.courseId.toString() + "</td>" +
                    "<td class='col'>" + result.days.toString() + "</td>" +
                    "<td class='col'>" + result.start.toString() + " - " + result.end.toString() + "</td>" +
                    "<td class='col'>" + result.instructor.toString() + "</td>" +
                    "<td class='col'>" + result.capacity.toString() + "</td>" +
                    "<td class='col'>" + result.enrollDead.toString() + "</td>" +
                    "</tr>";
        });
        // var k = pagelist(result);
        // console.log("result: " + JSON.stringify(pagelist(result)));
        // res.send(JSON.stringify(pagelist(result)));
        console.log("table: " + JSON.stringify(table));
        res.write(JSON.stringify(table));
    });

});
// Makes the table for the classes returned from the search class query
function pagelist(results) {
    var table="";
    results.forEach(function(result) {
        // table = result.instructor + word;
        table += "<tr class='row'>" + 
                "<td class='col'>" + result.courseId + "</td>" +
                "<td class='col'>" + result.days + "</td>" +
                "<td class='col'>" + result.start + " - " + result.end + "</td>" +
                "<td class='col'>" + result.instructor + "</td>" +
                "<td class='col'>" + result.capacity + "</td>" +
                "<td class='col'>" + result.enrollDead + "</td>" +
                "</tr>";
    });
    return table;
}
// function pagelist(results) {
//     var table = "{";
//     results.forEach(function(result) {
//         console.log("id: "+ result.courseId);
//         table.push({
//             "CourseId": result.courseId,
//             "days": result.days,
//             "start": result.start,
//             "instructor": result.instructor,
//             "capacity": result.capacity,
//             "enrollDead": result.enrollDead
//         });
//     });

//     console.log("table : " + JSON.stringify(table));
//     return JSON.stringify(table);
// }