Parse.initialize('M1ifyaGlqMi0qLtPDMcdr5vl75mCxon6FizGfEdJ','UOnRWMWcLfmFC8fsD0IYAnp46DLiUfEu9nGwbIzx');
var UserObject = Parse.Object.extend("Users");
var userObject = new UserObject();


function create() {
/*var first_name = $("#first_name").val();
var last_name = $("#last_name").val();
var email = $("#email").val();
var email2 = $("#email2").val();
var user = $("#user").val();
var password = $("#password").val();
var password2 = $("#password2").val();*/

var full_name = document.getElementById("full_name").value;
var email = document.getElementById("email").value;
var password = document.getElementById("password").value;
var password2 = document.getElementById("password2").value;
var email_used;

var query = new Parse.Query(UserObject);
query.equalTo("username", email);
query.find({
  success: function(results) {
    if (results.length >= 1) {
		var email_used = true;
		alert("The email is currently being used. Please use another one");
		 /*for (var i = 0; i < results.length; i++) {
		var object = results[i];
		alert(object.id)
		};*/
	}
	else {
		email_used = false;
	}
  },
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});


if (password === password2 && full_name.length !== 0 && email.length !== 0 && password.length !== 0 && !email_used) {
userObject.set("full_name", full_name);
userObject.set("username", email);
userObject.set("password", password);
userObject.set("balance", 0);
userObject.set("goals", []);
userObject.set("alerts", ["Y","N","N"]);

userObject.save(null, {
  success: function(userObject) {
    // Execute any logic that should take place after the object is saved.
    alert('New account for ' + email + ' created!');
	window.localStorage.setItem("User", email);
	alert("You have successfully logged in");
	window.location.href = 'index.html';
  },
  error: function(userObject, error) {
    // Execute any logic that should take place if the save fails.
    // error is a Parse.Error with an error code and message.
    //alert('Failed to create new object, with error code: ' + error.message);
  }
});

event.preventDefault();}

else if (password !== password2){
	alert('Please make sure your passwords are the same!')
}

else if (full_name.length == 0 || email.length == 0 || password.length == 0) {
	alert('Please make sure all fields are filled!')
}

}


	
