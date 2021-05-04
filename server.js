app.post('/sign_up/users', function(req,res){
   	var firstName= req.body.name;
    var lastName = req.body.last;
    var email =req.body.email;
    var password = req.body.password;
    var confirmPass= req.body.confirmPassword;
  
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "email":email,
        "password":password,
        "confirmPass": confirmPass
    }
db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
          
    return res.redirect('Index.html');
})
  