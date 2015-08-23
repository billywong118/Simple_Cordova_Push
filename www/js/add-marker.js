var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers = [];

Parse.initialize('M1ifyaGlqMi0qLtPDMcdr5vl75mCxon6FizGfEdJ','UOnRWMWcLfmFC8fsD0IYAnp46DLiUfEu9nGwbIzx');
var UserObject = Parse.Object.extend("Users");

/*PUT CODE HERE TO RETRIEVE USER-SET LOCATIONS*/


function initialize2() {

  // This event listener calls addMarker() when the map is clicked.
  google.maps.event.addListener(map, 'click', function(event) {
	if (document.getElementById("add-marker").innerHTML.match('TAP TO EXIT LOCATION ADDING MODE')) {
    addMarker(event.latLng, map);}
});
}

// Adds a marker to the map.
function addMarker(location) {
	var image = {
	url: 'pink_MarkerO.png'}
  var marker = new google.maps.Marker({
    position: location,
    map: map,
	//Icon does not work on emulator
	icon: image,
	title: prompt('Enter name for this location')
  });
  /*marker.myID = prompt('Enter name for this location');*/
  markers.push(marker);
  /*console.log(markers[0].title);*/
  /*updateLocations(markers)*/;
}

function updateLocations(new_locations) {
	var object;
	var query = new Parse.Query(UserObject);
	query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			object = results[i];		
		}
		object.set('locations',new_locations);
		object.save(null, {
		success: function(object) {
		alert('Locations updated!');
  }
});
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	})
}


// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function deleteMarker() {
  clearMarkers();
  markers.pop();
	showMarkers();
}

google.maps.event.addDomListener(window, 'load', initialize2);

function addlocation() {
	var add = document.getElementById("add-marker");
	if (add.innerHTML.match('ADD SPECIAL LOCATIONS FOR ALERT')) {
		add.innerHTML = 'TAP TO EXIT LOCATION ADDING MODE';
	}
	else {
		add.innerHTML = 'ADD SPECIAL LOCATIONS FOR ALERT'
	}
}
