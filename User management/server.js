// https://qcfirst-1.navsangeet.repl.co

var express = require('express');
var env = require('dotenv').config()
var ejs= require('ejs');
var path = require('path');
var app = express();
var bcrypt= require ('bcrypt');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb+srv://bibi:hassan123@qcfirst.h0nic.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  })
}));

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

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('img'));
app.use(express.static('css'));
app.use('/img', express.static(__dirname + '/scr/img'));
app.use('/css', express.static(__dirname + '/src/css/Login'));
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));





app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/view/Sign_up.html');
});

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
  /*cunyid:{
    type: Number,
    minLength: 8,
    maxLength:8
  },*/
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


	if(!personInfo.email || !personInfo.name || !personInfo.last || !personInfo.password || !personInfo.confirmPassword){ // if something is empty
		res.send({"Error":"Please fill in all fields!."});
	} 
    else {
		if (personInfo.password == personInfo.confirmPassword) {

			User.findOne({email:personInfo.email},function(err,data){ // find if it exists
				if(!data){
					var c;
					User.findOne({},function(err,data){ 

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}
            /*bcrypt.hash(personInfo.password, 6).then((hash)=>{})*/
						var newPerson = new User({ 
							unique_id:c,
							email:personInfo.email,
							name: personInfo.name,
              last: personInfo.last,
							password: personInfo.password,
							confirmPassword: personInfo.confirmPssword
						});

						newPerson.save(function(err, Person){ // save user
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1); // sort with ids
					res.send({"Success":"You are registered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});

//student log in

app.get('/login_stu', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/view/Login_student.html'));
});

app.post('/login_stu', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email },function(err,user){ // check if email stored matches with email provided
		if(!user){
    res.send({"Error":"Email not found"});
			
    }
    else{
      if(req.body.password===user.password){ // check if password stored matches with password provided during login
        req.session.userId = user.unique_id; // populates session
       return res.send({"Success":"Sucess"});
			
      }
      else{
      return res.send({'Error':'Invalid password'});
      }
    }
  });
  //return res.redirect('/src/view/student_homepage.html');
});


// professor log in
app.get('/login_prof', (req, res) => {
    res.sendFile(path.join(__dirname + '/src/view/Login_professor.html'));
});

app.post('/login_prof', function (req, res, next) {
	//console.log(req.body);
	User.findOne({email:req.body.email },function(err,user){
		if(!user){
    res.send({"Error":"Email not found"});
			
    }
    else{
      if(req.body.password===user.password){
        req.session.userId = data.unique_id;
       return res.send({"Success":"Sucess"});
			
      }
      else{
      return res.send({'Error':'Invalid password'});
      }
    }
  });
  //return res.redirect('/src/view/student_homepage.html');
});




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is listening on '+PORT);

});


/* 

-------- media screen for logos and tables


--------for sign up instructor and stu who's who 


---------hashing for passwords



---------add Validators for inputs
else if(personInfo.cunyid.length !=8){
          return res.status(400).json({
          status: 'error',
          error: 'Id must have 8 digits.',
          });
      }*/
      /*else if(personInfo.name.length<5 && personInfo.name.length>50){
          return res.status(400).json({
          status: 'error',
          error: 'First name should be between 5 and 50 characters.',
          });
      }else if(personInfo.last<2 && personInfo.last>20){
            return res.status(400).json({
              status: 'error',
              error: 'Last name should be between 2 and 20 characters.',
            });
      }else if(personInfo.email.pattern != '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@qmail.cuny.edu$'){
              return res.status(400).json({
              status: 'error',
              error: 'Email should be in suggested format',
              });
      }
    else {
      if(personInfo.password.length < 6 ) {
        return res.status(400).json({
          status: 'error',
          error: 'Password must be atleast 6 characters.',
        });
      } */
