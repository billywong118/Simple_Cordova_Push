Parse.initialize('M1ifyaGlqMi0qLtPDMcdr5vl75mCxon6FizGfEdJ','UOnRWMWcLfmFC8fsD0IYAnp46DLiUfEu9nGwbIzx');
var UserObject = Parse.Object.extend("Users");

var email = window.localStorage.getItem("User");
var object;

function get_balance() {
	
	var balance;
	var query = new Parse.Query(UserObject);
	query.select('username','balance');
	query.find({
	success: function(results) {
		/*alert("Successfully retrieved " + results.length + " scores.");*/
		// Do something with the returned Parse.Object values
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			balance = results[i].get("balance");
			}
		}
		document.getElementById("balance").innerHTML = '$' + balance.toFixed(2).toString();
		window.localStorage.setItem("Balance", balance);
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	});
	
}

function get_goals() {
	var goals;
	var today = new Date().getFullYear().toString() + '-' + (new Date().getMonth()+1).toString() + '-' + new Date().getDate().toString();
	var query = new Parse.Query(UserObject);
	var Balance = window.localStorage.getItem("Balance");
	query.select('username','goals');
	query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			goals = results[i].get("goals");
			}
		}
		for (var i = 0; i < goals.length; i++) {
		var goals_holder = document.getElementById("current_goals");
		var row = goals_holder.insertRow(-1);
		var cell = row.insertCell();
		var timeDiff = Math.abs(new Date((goals[i])[2]).getTime() - new Date(today).getTime());
		var diffDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
		
		var replaced = (goals[i])[0];
		
		
		for (var h = 0; h < 100; h++) {
		replaced = replaced.replace(' ', '--');
		}
		
		var name_of_goal = replaced + "_expand";
		
		var name_to_show = (goals[i])[0];
		
		if (name_to_show.length > 18) {
			name_to_show = name_to_show.substring(0,18) + "...";
		}
		
		var delbutton_name = replaced + "_delete";
		var money_need = ((goals[i])[1] - Balance).toFixed(2);
		var money_percent = (Balance / (goals[i])[1]);
		if (money_percent > 1) {
			money_percent = 1
		};
		cell.innerHTML = "<div><table class='goal-table'><tr><td><paper-button class='clickopen' onclick='expand(this)' id=" + replaced +">" + name_to_show + "</paper-button></td><td class='delete_button'><paper-fab id='trash' mini icon='delete' onclick='delete_goal(this)' id=" + delbutton_name + "></paper-fab></td></tr><tr><td colspan='2'><div class='current_goal' id=" + name_of_goal +">Cost:</br>$" + (goals[i])[1] + "</br></br>Time Left to Complete Goal:</br>" + diffDays + " days</br></br>Money Saved:</br><div style='display: inline-block'>$" + Balance +"</div><div class='progress'><div class='progress_part' style='border-right: 1px solid black; text-align: center; border-radius: 15%; width:" + (29.411 * money_percent).toString() + "vw; background-color: #98ff98'>" + Math.round(money_percent * 100) + "%</div></div></br></br>Money Needed:</br><div class='money_need' style='display: inline-block'>$" + money_need + "</div></br></div></td></tr></table></div>";
		}
		checkdone();
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	});
	
}

function expand(thing) {	
	x = document.getElementById(thing.id + "_expand");
	if (x.style.display.match("none")) {
		var all_goals = document.getElementsByClassName("current_goal");
		for (var i=0; i < all_goals.length; i++) {
			all_goals[i].style.display = "none"
		}

		x.style.display = "block";
	}
	else {
	x.style.display = "none";
	}
}

function checkdone() {
	var money_need = document.getElementsByClassName("money_need");
	for (var i = 0; i < money_need.length; i++) {
		if ( (Number(money_need[i].innerHTML.substring(1))) <= 0 ) {
			money_need[i].innerHTML = "DONE!   <img src='smiley.png'/>";
			money_need[i].style.color = "red";
		}
	}
}

function delete_goal(to_del) {
	var goals;
	var del_or_no = confirm("Would you like to delete this goal? This goal cannot be recovered once it is deleted.");
	
	/*var del_or_no = prompt ("Would you like to delete this goal? This goal cannot be recovered once it is deleted. Please enter 'Yes or 'No'").toUpperCase();
	while (del_or_no !== 'YES' && del_or_no !== 'NO') {
		var del_or_no = prompt ("Please enter 'Yes or 'No'").toUpperCase();
	}*/
	
	var goal_to_del = to_del.id.substring( 0, to_del.id.indexOf( "_" ) );;
	
	if (del_or_no) {
	var query = new Parse.Query(UserObject);
	query.select('username','goals');
	query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			goals = results[i].get("goals");
			}
		};


		for (var i = 0; i < goals.length; i++) {

				var replaced = (goals[i])[0];


				for (var h = 0; h < 100; h++) {
					replaced = replaced.replace(' ', '--');
				};

			if (replaced === goal_to_del) {
				goals.splice(i, 1);
				i -= 1;
			}
		};

		query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			object = results[i];
			}		
		}
		object.set('goals',goals);
		object.save(null, {
		success: function(object) {
		alert('Goal deleted!');
		window.location.href = "goals.html";
  }
});
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	})
	
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	});}
	event.preventDefault();
}

function create_goal() {
	var goals;
	var exist = false;
	var goal_name = document.getElementById("goal_name").value;
	var goal_cost = document.getElementById("goal_cost").value;
	var goal_date = document.getElementById("goal_date").value;
	var query = new Parse.Query(UserObject);
	query.select('username','goals');
	query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			goals = results[i].get("goals");
			}
		}
	
	for (var i = 0; i < goals.length; i++) {
		if ((goals[i])[0] === goal_name) {
			exist = true;
		}
	}
				
		if (!exist && (goal_name.length !== 0 && goal_cost.length !== 0 && goal_date.length !== 0)) {
		goals.unshift([goal_name, goal_cost, goal_date]);
		
		query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			object = results[i];
			}		
		}
		object.set('goals',goals);
		object.save(null, {
		success: function(object) {
		alert('Goals updated!');
		window.location.href = "goals.html";
  }
});
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	})
		}
	else if (goal_name.length == 0 || goal_cost.length == 0 || goal_date.length == 0) {
		alert("Please make sure all of the fields are filled!")
	}
	else {
		alert("Please use another name! The selected name has already been used for one of your goals.");
	}
	
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	});
	event.preventDefault();
}


function updatePassword() {
	
	var email = window.localStorage.getItem("User");

	var current_pass = document.getElementById("current_pass").value;
	var new_pass_one = document.getElementById("resetpass1").value;
	var new_pass_two = document.getElementById("resetpass2").value;
	var password;
	var correct = false;
	
	var query = new Parse.Query(UserObject);
	query.equalTo("username", email);
	query.find({
	success: function(results) {
		if (results.length >= 1) {
			for (var i = 0; i < results.length; i++) {
			password = results[i].get("password");
			if (password === current_pass) {
				correct = true;
			};
		if (correct && new_pass_one === new_pass_two && password !== new_pass_one) {
			var object;
			query.find({
			success: function(results) {
				for (var i = 0; i < results.length; i++) {
					if (results[i].get("username") === email) {
					object = results[i];}		
				}
				object.set('password',new_pass_one);
				object.save(null, {
				success: function(object) {
				alert('Password updated!');
				window.location.href = "settings.html";
		}
		});
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
			})
		}
		else if (new_pass_one !== new_pass_two) {
			alert("The two passwords did not match. Please check and re-enter them.")
		}
		else if (password !== current_pass){
			alert("The current password you entered is not correct. Please try again");
			window.location.href = "settings.html";
		}
		else if (password === new_pass_one) {
			alert("The new password you entered is the current one. Please enter a new password!");
			window.location.href = "settings.html";
		}
		else {
			alert("Oh no! The app has malfunctioned!")
		}
		event.preventDefault();	
				}
			}
		},
  error: function(error) {
    alert("Error: " + error.code + " " + error.message);
  }
});
	
}


function updateAlerts() {
	
	var alerts;
	
	var switcher = document.getElementById("myonoffswitch");
	var goal_status = document.getElementById("goals-status");
	var checkin_status = document.getElementById("checkin-status");	
	
	var query = new Parse.Query(UserObject);
	query.select('username','alerts');
	query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			alerts = results[i].get("alerts");
			}
		};
				
		if (switcher.checked) {
			alerts[0] = "Y";
		}
		else {
			alerts[0] = "N";
		}
		
		
		if (goal_status.checked) {
			alerts[1] = "Y";
		}
		else {
			alerts[1] = "N";
		}
		
		if (checkin_status.checked) {
			alerts[2] = "Y";
		}
		else {
			alerts[2] = "N";
		}
		
		console.log(alerts);
			
		query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			object = results[i];
			}		
		}
		object.set('alerts',alerts);
		object.save(null, {
		success: function(object) {
			//
  }
});
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	})
	
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	});
	event.preventDefault();
}


function get_alerts () {
	
	var alerts;
	
	var switcher = document.getElementById("myonoffswitch");
	var goal_status = document.getElementById("goals-status");
	var checkin_status = document.getElementById("checkin-status");	
	
	var query = new Parse.Query(UserObject);
	query.select('username','alerts');
	query.find({
	success: function(results) {
		for (var i = 0; i < results.length; i++) {
			if (results[i].get("username") === email) {
			alerts = results[i].get("alerts");
			}
		};
		
		console.log(alerts);
		
		
		if (alerts[0] === "Y") {
			switcher.checked = true;
		}
		else {
			switcher.checked = false;
			document.getElementById("alert-options").style.display = 'none';
		}
		
		
		if (alerts[1] === "Y") {
			goal_status.checked = true
		}
		else {
			goal_status.checked = false
		}
		
		
		if (alerts[2] === "Y") {
			checkin_status.checked = true
		}
		else {
			checkin_status.checked = false
		}
		
	},
	error: function(error) {
		alert("Error: " + error.code + " " + error.message);
	}
	});
}
