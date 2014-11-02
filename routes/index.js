var express = require('express');
var request = require("request");
var fs = require('fs');

var GooglePlaces = require("googleplaces");
var googlePlaces = new GooglePlaces("AIzaSyBUi4LE_Fx7e47-niKQnCbfDXzT1snVAP0", "json");
var parameters;

var app = express();

var data = new Array();

var myData = {
  name:'test',
  version:'1.0'
}

var outputFilename = 'public/javascripts/tmp.json';

var router = express.Router();
var connect = require('connect');
var mongo = require('mongodb');
var database = null;
var uristring = "mongodb://asaphyuan:ASAph993@ds047940.mongolab.com:47940/iapproveyo";
var mongoose = require ("mongoose");
var MongoClient = require('mongodb').MongoClient;
var userSchema = new mongoose.Schema({
  name: { type: String},
  location: { type: [String]},
  coordinates: { type: [String]},
  yoCoins: {type: Number}
});

var User = mongoose.model('usercollections', userSchema);

// Creating one user.


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET map. */
router.get('/map', function(req, res) {
    inputuser = req.query['username'];
    mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

    User.count({ name: inputuser }, function (err, count) {
          if (err) return;
          docCount = count;
          console.log(docCount);
          if (docCount == 0){
            console.log("User not found.");
          } else {
                console.log("1");
                User.findOneAndUpdate({ name: inputuser }, { name: inputuser }, function (err, user) {
                if (err) return handleError(err);
                
                var queriedusers = {
                    coordinates: []
                };
                for(i = 0; i < user.coordinates.length; i += 2) {
                    queriedusers.coordinates.push({ 
                        "lat" : user.coordinates[i],
                        "lng" : user.coordinates[i+1]
                    });
                }
                
                fs.writeFile(outputFilename, JSON.stringify(queriedusers, null, 4), function(err) {
                    if(err) {
                      console.log(err);
                    } else {
                      console.log("JSON saved to " + outputFilename);
                    }
                }); 
                    res.render("map", {
                        data: JSON.stringify(user.coordinates),
                    });
                })
          }
     });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
    user = req.query['username'];
    location = req.query['location'];
    location = location.replace("%3B", ";");
    var location = location.split(";");
    var coordinates = location;
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
        
        var query = { name: user };
        var docCount = 0;

        User.count({ name: user }, function (err, count) {
          if (err) return;
          docCount = count;
          console.log(docCount);
          if (docCount == 0){
            console.log("0");
            var newDoc = new User ({
              name: user,
              location: location,
              coordinates: coordinates,
              yoCoins: 10
            });
            newDoc.save(function (err) {if (err) console.log ('Error on save!')});
          } else {
                console.log("1");
                User.findOneAndUpdate(query, { name: user }, function (err, user) {
                if (err) return handleError(err);
                user.location.push(location);
                console.log(coordinates[0]);
                user.coordinates.push(coordinates[0]);
                user.coordinates.push(coordinates[1]);
                console.log('%s is at %s.', user.name, user.location)
                user.save(function (err) {if (err) console.log ('Error on save!')});
                })
          }
        });  
    });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var query = { name: 'ASAPHY' };
    User.findOneAndUpdate(query, { name: 'YO' }, function (err, user) {
      if (err) return handleError(err);
      console.log('%s is at %s.', user.name, user.location) // Space Ghost is a talk show host.
    })
    // console.log(User);
    // var test = User.findOne({ 'name': 'ASAPHY' }, 'name location', function (err, user) {
    //   console.log('test');
    //   if (err) return handleError(err);
    //   console.log('%s is at %s.', user.name, user.location) // Space Ghost is a talk show host.
    // })

    // User.find({}).exec(function(err, result) {
    //     console.log("here");
    //     if (!err) {

    //       // // Let's see if there are any senior citizens (older than 64) with the last name Doe using the query constructor
    //       // var query = PUser.find({'name': username}); // (ok in this example, it's all entries)
    //       // query.exec(function(err, result) {
    //       //   if (!err) {
    //       //       console.log(result);
    //       //   } else {
    //       //     res.end('Error in second query. ' + err)
    //       //   }
    //       // });
    //       console.log(result);
    //     } else {
    //       res.end('Error in first query. ' + err)
    //     };
    // });

    // var collection = uristring.get('usercollection');
    // console.log(collection);
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
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