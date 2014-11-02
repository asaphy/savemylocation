// var mongoose = require ('mongoose');
// var data = new Array();
// var uristring = "mongodb://asaphyuan:ASAph993@ds047940.mongolab.com:47940/iapproveyo";

// mongoose.connect(uristring, function (err, res) {
//       if (err) {
//       console.log ('ERROR connecting to: ' + uristring + '. ' + err);
//       } else {
//       console.log ('Succeeded connected to: ' + uristring);
//       }
// });

//     User.count({ name: "ASAPHY" }, function (err, count) {
//           if (err) return;
//           docCount = count;
//           console.log(docCount);
//           if (docCount == 0){
//             console.log("User not found.");
//           } else {
//                 console.log("1");
//                 User.findOneAndUpdate({ name: "ASAPHY" }, { name: "ASAPHY" }, function (err, user) {
//                 if (err) return handleError(err);
//                     data = user.coordinates;
//                     module.exports = data;
//                     console.log (data);
//                     console.log (module.exports);
//                 })
//           }
//           res.render('ASAPHY', { title: "ASAPHY's Yo Coin Map" });
//      });