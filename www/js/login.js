Parse.initialize('M1ifyaGlqMi0qLtPDMcdr5vl75mCxon6FizGfEdJ','UOnRWMWcLfmFC8fsD0IYAnp46DLiUfEu9nGwbIzx');
var UserObject = Parse.Object.extend("Users");

function login() {
var userObject = new UserObject();

var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
var object;
var passcheck;


var query = new Parse.Query(UserObject);
query.equalTo("username", email);
query.find({
  success: function(results) {
    if (results.length >= 1) {
		 for (var i = 0; i < results.length; i++) {
		passcheck = results[i].get("password");
		if (passcheck === password) {
			window.localStorage.clear();
			window.localStorage.setItem("User", email);
			alert("You have successfully logged in");
			window.location.href = 'index.html';
		}
		else {
			alert ("Incorrect password");
		};
		
		
		}
	}
	else {
		alert('There are no registered users with that email.')
	}
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
event.preventDefault();

}