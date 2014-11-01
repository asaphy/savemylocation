var express = require('express');
var request = require("request");

var GooglePlaces = require("googleplaces");
var googlePlaces = new GooglePlaces("AIzaSyBUi4LE_Fx7e47-niKQnCbfDXzT1snVAP0", "json");
var parameters;

var app = express();

var router = express.Router();
var connect = require('connect');
var mongo = require('mongodb');
var database = null;
var uristring = "mongodb://asaphyuan:ASAph993@ds047940.mongolab.com:47940/iapproveyo";
var mongoose = require ("mongoose");
var MongoClient = require('mongodb').MongoClient;
var userSchema = new mongoose.Schema({
  name: { type: String},
  location: { type: String}
});

var User = mongoose.model('usercollection', userSchema);

// Creating one user.


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    console.log("helloworld");
    res.render('helloworld', { title: 'Hello, World!' })
    user = req.query['username'];
    console.log( user );
    location = req.query['location'];
    location = location.replace("%3B", ";");
    var location = location.split(";");
    console.log( location[0] );
    console.log( location[1] );

    parameters = {
      location:[location[0], location[1]],
      radius: "1"
    };

    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
    googlePlaces.placeSearch(parameters, function (response) {
        location = response.results[0].name
        console.log(user);
        console.log(location);
        var johndoe = new User ({
          name: user,
          location: location
        });

        johndoe.save(function (err) {if (err) console.log ('Error on save!')});
    });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    // var db = req.db;

    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

    var username = req.query['username'];
    var userlocation = req.query['location'];
    console.log(username);
    console.log(userlocation);
    var johndoe = new User ({
      name: username,
      location: userlocation
    });

    johndoe.save(function (err) {if (err) console.log ('Error on save!')});

    // var db = "mongodb://asaphy:ASAph993@ds047940.mongolab.com:47940/iapproveyo"
    // var collection = db.get('usercollection');
    // collection.find({},{},function(e,docs){
    //     res.render('userlist', {
    //         "userlist" : docs
    //     });
    // });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

    var username = req.query['username'];
    var userlocation = req.query['location'];
    console.log(username);
    console.log(userlocation);
    var johndoe = new User ({
      name: username,
      location: userlocation
    });

    johndoe.save(function (err) {if (err) console.log ('Error on save!')});

});


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

module.exports = router;