// A $( document ).ready() block.
$( document ).ready(function() {
    // console.log( "ready!" );
    // user = getParameterByName('username');
    // var location = getParameterByName('location');
    // console.log( user );
    // location = location.replace("%3B", ";");
    // var location = location.split(";");
    // console.log( location );
 //    var mapOptions = {
 //    	center: {lat: -34.397, lng: 150.644},
 //    	zoom: 8
 //    };
 //    var map = new google.maps.Map(document.getElementById('map-canvas'),
 //            mapOptions);

 //    var myLatlng = new google.maps.LatLng(-25.363882,131.044922);

 //    var marker = new google.maps.Marker({
	//     position: myLatlng,
	//     map: map,
	//     title:"Hello World!"
	// });

	var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
	var mapOptions = {
	  zoom: 4,
	  center: myLatlng
	}
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	// To add the marker to the map, use the 'map' property
	var marker = new google.maps.Marker({
	    position: myLatlng,
	    map: map,
	    title:"Hello World!"
	});

    google.maps.event.addDomListener(window, 'load', initialize);
}



function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}