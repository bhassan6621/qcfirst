const express = require('express');
var env = require('dotenv').config()
var ejs = require('ejs');
var path = require('path');
var bcrypt = require('bcrypt');
const mongoose = require('mongoose');
var session = require('express-session');
const app = express();
var http = require('http');
const bodyParser = require('body-parser');
const { connect } = require('mongodb');
var MongoStore = require('connect-mongo')(session);
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 3000;
const url = 'mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
let db;

MongoClient.connect(url, {
  useUnifiedTopology: true
}, (err, database) => {
  if (err) {
    return console.log(err);
  }
  db = database.db("myFirstDatabase");
  // start the express web server listening on 8080
  app.listen(3000, '0.0.0.0');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.static('views'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.set('/view', path.join(__dirname, '/src/view'));

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  })
}));

app.get('/', (req, res) => {
  res.render(__dirname + '/view/Index', {valid: ""});
});

app.get('/Index', (req, res) => {
  res.render(__dirname + '/view/Index', {valid: ""});
});

app.get('/Login_student', (req, res) => {
  res.render(__dirname + '/view/Login_student', { valid: "" });
});

app.get('/Login_professor', (req, res) => {
  res.render(__dirname + '/view/Login_professor', {valid:""});
});

app.get('/Login_admin', (req, res) => {
  res.render(__dirname + '/view/Login_admin', {valid:""});
});

app.get('/Sign_up', (req, res) => {
  res.render(__dirname + '/view/Sign_up', {valid: ""});
});

app.get('/Admin_page', (req, res) => {
  res.render(__dirname + '/view/Admin_page');
});

app.get('/professor_homepage', (req, res) => {
  res.render(__dirname + '/view/professor_homepage', {print: null});
});

app.get('/Add_course', (req, res) => {
  res.render(__dirname + '/view/Add_course', {alertUser: ""});
});

app.get('/Student_searchClass', (req, res) => {
  res.render(__dirname + '/view/Student_searchClass', {print: null});
});

app.get('/student_homepage', (req, res) => {
  res.render(__dirname + '/view/student_homepage', {print: null});
});

app.get('/roster', (req,res) => {
  res.render(__dirname + '/view/roster', {students: null});
});

app.get('/admin_user', (req,res) => {
  res.render(__dirname + '/view/admin_user', {user: null});
});

app.get('/admin_course', (req,res) => {
  res.render(__dirname + '/view/admin_course', {course: null});
});

app.get('/admin_session', (req,res) => {
  res.render(__dirname + '/view/admin_session', {course: null});
});

// user Sign up btn to DB
var Schema = mongoose.Schema;

userSchema = new Schema({
  unique_id: Number,
  email: {
    type: String,
    required: true,
    format: "Email",
  },
  name: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String
  },
  courses: {
    type: [String] 
  }
});

User = mongoose.model('User', userSchema);

classSchema = new Schema({
    courseName: {
      type: String
    },
    courseId: {
      type: String
    },
    semester: {
      type: String
    },
    department: {
      type: String
    },
    instructor: {
      type: String
    },
    start: {
      type: String
    },
    end: {
      type: String
    },
    days: {
      type: String
    },
    enrollDead: {
      type: String
    },
    capacity: {
      type: Number
    },
    description: {
      type: String
    },
    students: {
      type: [String]
    }  
});

Course = mongoose.model('Course', classSchema);

//the Cache-control headers to no-cache conditionally for logged out users as per code below to force the browser to obtain new copy of the page even when they hit "back"
app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.post('/sign_up', function (req, res, next) {
  console.log(req.body);
  var personInfo = req.body;

  if (!personInfo.email || !personInfo.name || !personInfo.last || !personInfo.password || !personInfo.confirmPassword) {
    return res.render(__dirname + "/view/Sign_up", { valid: "Fill all the required fields!" });
  }
  else {
    if (personInfo.password == personInfo.confirmPassword) {
      User.findOne({ email: personInfo.email }, function (err, data) {
        if (!data) {
          var c;
          User.findOne({}, function (err, data) {
            if (data) {
              console.log("if");
              c = data.unique_id + 1;
            } else {
              c = 1;
            }
            var newPerson = new User({
              unique_id: c,
              email: personInfo.email,
              name: personInfo.name,
              last: personInfo.last,
              userType: personInfo.userType,
              password: personInfo.password,
              confirmPassword: personInfo.confirmPssword,
              courses: [""]
            });
            newPerson.save(function (err, Person) {
              if (err)
                console.log(err);
              else
                console.log('Success');
            });
          }).sort({ _id: -1 }).limit(1);
          return res.render(__dirname + "/view/Index", { valid: "Sucess!" });
        } else {
          return res.render(__dirname + "/view/Sign_up", { valid: "Email is already in use!" });
        }
      });
    } else {
      return res.render(__dirname + "/view/Sign_up", { valid: "Password not matched!" });
    }
  }
});

// Retrieves courses students are enrolled in and teachers are teaching
function getEnrolledCourses(user, goto, res) {
        // get user enrolled classes
        var user_classes = user.courses;
        var class_details = [];
        var returnObj;

        // create query to link userClasses with courses model to get class info
        user_classes.forEach(course => {
          class_details.push(course);
        });

        db.collection('courses').find({courseId: {"$in":class_details}}).toArray(function (err, result) {
            returnObj = result;
            var gotoUrl = "/view/" + goto +"";
            return res.render(__dirname + gotoUrl, {print:result});
        });
}

app.post('/login_stu', function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      return res.render(__dirname + "/view/Login_student", { valid: "User Not Found!" });
    }
    else {
      if (req.body.password === user.password && user.userType == "student") {
        req.session.userId = user.unique_id;
        getEnrolledCourses(user, 'student_homepage', res);
      }
      else {
        return res.render(__dirname + "/view/Login_student", { valid: "Incorrect email or password" });
      }
    }
  });
});

app.post('/back_stud', function(req, res, next) {
  User.findOne({unique_id: req.session.userId}, function(err, user) {
      getEnrolledCourses(user, 'student_homepage', res)
  });
});

app.post('/back_prof',function(req, res, next) {
  User.findOne({unique_id: req.session.userId}, function(err, user) {
      getEnrolledCourses(user, 'professor_homepage', res)
  });
});

app.post('/login_prof', function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      return res.render(__dirname + "/view/Login_professor", { valid: "User not Found!" });
    }
    else {
      if (req.body.password === user.password && user.userType == "instructor") {
        req.session.userId = user.unique_id;
        getEnrolledCourses(user, 'professor_homepage', res);
        // return res.render(__dirname + '/view/professor_homepage', {details: null});
      }
      else {
        console.log("Incorrect Email or password!");
        return res.render(__dirname + "/view/Login_professor", { valid: "Incorrect email or password" });
      }
    }
  });

});

app.post('/login_adm', function (req, res, next) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) {
      return res.render(__dirname + "/view/Login_admin", { valid: "User Not Found!" });
    }
    else {
      if (req.body.password === user.password && user.userType == "admin") {
        req.session.userId = user.unique_id;
        return res.render(__dirname + '/view/Admin_page', {valid: null, title:null});
      }
      else {
        return res.render(__dirname + "/view/Login_admin", { valid: "Incorrect email or password" });
      }
    }
  });
});

// send everything in Database to front end ADMIN table
 app.post('/admin_user', (req, res, next) => {
  db.collection('users').find({}).toArray(function(err, results) {
    if(err) {
      throw err;
    }
    else {
      var obj = {user: results}
      res.render(__dirname+ '/view/admin_user', obj);
    }
  });
});

 app.post('/admin_user_courses', (req, res, next) => {
  db.collection('users').find({"userType": "student"}).toArray(function(err, results) {
    if(err) {
      throw err;
    }
    else {
      var obj = {enrollCourse: results}
      res.render(__dirname+ '/view/admin_user_courses', obj);
    }
  });
});


 app.post('/admin_course', (req, res, next) => {
  db.collection('courses').find({}).toArray(function(err, results) {
    if(err) {
      throw err;
    }
    else {
      var obj = {course: results}
      res.render(__dirname+ '/view/admin_course', obj);
    }
  });
});

app.post('/admin_prof_addCourse', (req, res, next) => {
  
  db.collection('users').find({"userType": "instructor"}).toArray(function(err, results) {
    if(err) {
      throw err;
    }
    else {
      var obj = {addedCourse: results}
      res.render(__dirname+ '/view/admin_prof_addCourse', obj);
    }
  });
});

 app.post('/admin_session', (req, res, next) => {
  db.collection('sessions').find({}).toArray(function(err, results) {
    if(err) {
      throw err;
    }
    else {
      var obj = {session: results}
      res.render(__dirname+ '/view/admin_session', obj);
    }
  });
});

 //clear cookies on the browser and destroy session when use hit sign out to log out
app.post('/signOut', function(req, res){
  sess=req.session;
    sess.destroy(function(err) {
        if(err){
            console.log("Error Logging out!")
            return res.render(__dirname + "back", { valid: "Logout Session failed" }); // if failed stay on same page
        }else{
            console.log("Session Destroyed successfully");
        return res.render(__dirname + "/view/Index", { valid: "Session logged out successfully" }); // if successful go to homepage
        }
    });
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
  
  var newCourse = new Course({
    courseName: courseName,
    courseId: courseId,
    semester: semester,
    department: department,
    instructor: instructor,
    start: start,
    end: end,
    days: days,
    enrollDead: enrollDead,
    capacity: capacity,
    description: description
  });

  newCourse.save(function(err, Course) {
    if (err)
      console.log(err);
    else
      console.log('Success');
  });


  User.findOne({unique_id: req.session.userId }, function (err, user) {

      // push class into classes array in user object
        console.log(user);
        user.courses.push(courseId);
        user.save(function (err, Person) {
          if (err)
            console.log(err);
          else
            console.log('Success');
        });
      
        var user_classes = user.courses;
        var class_details = [];
        var returnObj;

        // create query to link userClasses with courses model to get class info
        user_classes.forEach(course => {
          class_details.push(course);
        });

        db.collection('courses').find({courseId: {"$in":class_details}}).toArray(function (err, result) {
            returnObj = result;
            res.render(__dirname + '/view/professor_homepage', {print: result});
        });

      
  });
    
});

app.post('/prof_roster', (req, res) => {
  // get roster from class.
  console.log(req.body.roster);
  var classId = req.body.roster;
  var section= req.body.deleteButn;
  
  console.log("roster: " + req.body.roster);
  if(req.body.roster == null) {
    console.log("in: " + req.body.roster);
  }
  if(req.body.roster != null) {
  Course.findOne({courseId: classId}, function(err, course) {
    if (course == null) {
      res.render(__dirname + '/view/professor_homepage', {print: null});
    }
    else {
      //get student array from course and create student object to pass it
      var class_students = course.students;
      var student_details = [];
      var returnObj;

      // create query to link students[] in Courses with students in user
        class_students.forEach(course => {
          student_details.push(Number(course));
        });
        db.collection('users').find({unique_id: {"$in":student_details}}).toArray(function (err, result) {
          res.render(__dirname + '/view/roster', {students: result});
        });
    }
  });
}
else if (req.body.deleteButn != null ) {
   db.collection('courses').deleteOne({courseId: section}).then(function() {
        console.log("data deleted");
      }).catch(function(error) {
        console.log(error);
      });
  User.findOne({ unique_id: req.session.userId}, function (err, user) {
    getEnrolledCourses(user, 'professor_homepage', res);
  });
}
});

// Query for when a student searches for a course
app.post('/searchClass', (req, res) => {
  var Input_courseName = req.body.courseName;
  var Input_courseNum = req.body.courseNum;
  var Input_semester = req.body.semester;

  // queries for classes that have the same name, number and semester OR just has the same name
  var query = {
    courseName: Input_courseName,
    courseId: Input_courseNum,
    semester: Input_semester
  }
  db.collection('courses').find({courseName: Input_courseName}).toArray(function (err, results) {
    if(err) { 
      throw err; 
    } 
    else {
      obj = {print: results};
      res.render(__dirname + '/view/Student_searchClass', obj);
    }
  });
});

// Enrolls Student to Class & Add student selected class to user 
app.post('/queriedClasses', (req, res) => {
  // find student: 
  User.findOne({ unique_id: req.session.userId, courses: {$ne: req.body.isEnroll} }, function (err, user) {
    if(user == null ) {
      // class already enrolled
      res.render(__dirname + '/view/Student_searchClass', {print: null});
    }
    else {
      // push class into classes array in user object
      user.courses.push(req.body.isEnroll);
      user.save(function (err, Person) {
          if (err)
            console.log(err);
          else
            console.log('Success');
      });
      // push student to course roster in courses model
      Course.findOne({courseId: req.body.isEnroll}, function (err,course) {
        course.students.push(req.session.userId);
        course.save(function (err, Course) {
          if (err)
            console.log(err);
          else
            console.log('Success');
        });
      });
    }
  });
  return res.render(__dirname + '/view/Student_searchClass', {print: null});
});
