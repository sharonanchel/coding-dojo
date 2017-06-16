// Require the Express Module
var express = require('express');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/intro_to_mongoose')
mongoose.Promise = global.Promise

var UserSchema = new mongoose.Schema({
	name: String,
	age: Number
})
mongoose.model('User', UserSchema)
var User = mongoose.model('User')
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Routes
// Root Request
app.get('/', function(req, res) {
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
    User.find({}, function(err, users){
    	
    })
    res.render('index');
})
// Add User Request 
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    // This is where we would add the user from req.body to the database.
    var user = new User({name: req.body.name, age: req.body.age})
    user.save(function(err){
    	if(err){
    		console.log('something went wrong')
    	} else {
    		console.log('sucessfully added a user!')
    		res.redirect('/')
    	}
    })
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
