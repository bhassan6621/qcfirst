// https://qcfirst-1.navsangeet.repl.co

const express = require('express');
var env = require('dotenv').config()
var ejs= require('ejs');
var path = require('path');
var bcrypt= require ('bcrypt');
const mongoose = require('mongoose');
var session = require('express-session');
const app = express();
var http = require('http');
const bodyParser = require('body-parser');
const { connect } = require('mongodb');
var MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8080;
const url = 'mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db;

MongoClient.connect(url, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database.db("myFirstDatabase");
  // start the express web server listening on 8080
  app.listen(8080, '0.0.0.0');
});

mongoose.connect('mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}, (err) => {
  if (!err) {
    console.log('MongoDB Connection Succeeded.');
  } else {
    console.log('Error in DB connection : ' + err);
  }
});

var dbo = mongoose.connection;
dbo.on('error', console.error.bind(console, 'connection error:'));
dbo.once('open', function () {
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('File Not Found');
//   err.status = 404;
//   next(err);
// });

// // error handler
// // define as the last app.use callback
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500);
//   res.send(err.message);
// });


// const PORT = process.env.PORT || 3000;
// app.listen(PORT, function () {
//   console.log('Server is listening on '+PORT);

// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('view'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.set('/view', path.join(__dirname, 'view'));
app.use(express.static(__dirname + "/view"));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  })
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/Index.html');
});
 
// user Sign up btn to DB
var Schema = mongoose.Schema;

userSchema = new Schema( {
	unique_id: Number,
	email: {
    type: String,
    required: true,
    format: "Email",
    //unique: true
  },
	name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  last: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
	confirmPassword: {
    type: String
  }
}),
User = mongoose.model('User', userSchema);

app.post('/sign_up', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if(!personInfo.email || !personInfo.name || !personInfo.last || !personInfo.password || !personInfo.confirmPassword){
		res.send({"Error":"Please fill in all fields!."});
	} 
    else {
		if (personInfo.password == personInfo.confirmPassword) {
			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){
						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}
						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							name: personInfo.name,
              last: personInfo.last,
							password: personInfo.password,
							confirmPassword: personInfo.confirmPssword
						});
						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});
					}).sort({_id: -1}).limit(1);
					res.res.sendFile(__dirname + '/view/Index.html');;
				}else{
					res.send({"Success":"Email is already used."});
				}
			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

// app.get('/login_stu', (req, res) => {
//     res.sendFile(path.join(__dirname + '/src/view/Login_student.html'));
// });

app.post('/login_stu',function (req, res, next) {
	User.findOne({email:req.body.email },function(err,user){
		if(!user){
    res.send({"Error":"Email not found"});
			
    }
    else{
      if(req.body.password===user.password){
        req.session.userId = user.unique_id;
        return res.sendFile(__dirname + '/view/student_homepage.html');
      }
      else{
        return res.send({'Error':'Invalid password'});
      }
    }
  });
});

app.post('/login_prof', function (req, res, next) {
	User.findOne({email:req.body.email },function(err,user){
		if(!user){
    res.send({"Error":"Email not found"});
			
    }
    else{
      if(req.body.password===user.password){
        req.session.userId = user.unique_id;
        return res.sendFile(__dirname + '/view/professor_homepage.html');
      }
      else{
        return res.send({'Error':'Invalid password'});
      }
    }
  });
  //return res.redirect('/src/view/student_homepage.html');
});

// Prof add course to DB
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
    "courseName": courseName,
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
    if (err) throw err;
    console.log("Record inserted successfully");
  });
  return res.redirect("professor_homepage.html")
});