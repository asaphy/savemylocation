// var user;
// // A $( document ).ready() block.
// $( document ).ready(function() {
//     console.log( "ready!" );
//     user = getParameterByName('username');
//     var location = getParameterByName('location');
//     console.log( user );
//     location = location.replace("%3B", ";");
//     var location = location.split(";");
//     console.log( location );
//     var url = ('https://maps.googleapis.com/maps/api/place/search/json?location=37.787941,-122.4074990&radius=1&key=AIzaSyBUi4LE_Fx7e47-niKQnCbfDXzT1snVAP0');
//     var map = new google.maps.Map(document.getElementById('map'), {
//       center: pyrmont
//     });
//     var pyrmont = new google.maps.LatLng(location[0],location[1]);
//     var request = {
// 	  location: pyrmont,
//       radius: '1'
// 	  };
// 	  var service = new google.maps.places.PlacesService(map);
//   	  service.nearbySearch(request, callback);
// });

// function callback(results, status) {
//   if (status == google.maps.places.PlacesServiceStatus.OK) {
//         console.log( user );
// 	  	console.log(results[0].name);
//     $.get("userlist",
// 	  {
// 	    username:user,
// 	    location:results[0].name
// 	  },
// 	  function(data,status){
// 	    alert("Data: " + data + "\nStatus: " + status);
// 	});
//   }
// }

// function getParameterByName(name) {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//         results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }



