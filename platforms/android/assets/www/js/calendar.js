/*JavaScript code taken and modified from "http://javascriptkit.com"*/

function setToday() {
var now   = new Date();
var day   = now.getDate();
var month = now.getMonth();
var year  = now.getYear();
if (year < 2000)    // Y2K Fix, Isaac Powell
year = year + 1900; // http://onyx.idbsu.edu/~ipowell
this.focusDay = day;
displayCalendar(month, year);
}

function displayCalendar(month, year) {       
month = parseInt(month);
year = parseInt(year);
var table = document.getElementById("calendar"); 
var row = 1;
var i = 0;
var days = getDaysInMonth(month+1,year);
var firstOfMonth = new Date (year, month, 1);
var startingPos = firstOfMonth.getDay();
days += startingPos;

var first_week = [];
var second_week = [];
var third_week = [];
var fourth_week = [];
var fifth_week = [];
var sixth_week = [];


function HowmanydaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

var daysinMonth = HowmanydaysInMonth(new Date().getMonth(), new Date().getYear());


for (i = 0; i < startingPos; i++) {
	first_week.push('')
}

for (i = 1; i <= daysinMonth; i++) {
	if (first_week.length < 7) {
		first_week.push(i)
	}
	else if (second_week.length < 7) {
		second_week.push(i)
	}
	else if (third_week.length < 7) {
		third_week.push(i)
	}
	else if (fourth_week.length < 7) {
		fourth_week.push(i)
	}
	else if (fifth_week.length < 7) {
		fifth_week.push(i)
	}
	else {
		sixth_week.push(i)
	}
};

var day = new Date().getDate();


/*document.getElementById("check1").innerHTML = first_week;
document.getElementById("check2").innerHTML = second_week;
document.getElementById("check3").innerHTML = third_week;
document.getElementById("check4").innerHTML = fourth_week;
document.getElementById("check5").innerHTML = fifth_week;*/

for (i=0; i < first_week.length; i++) {
	table.rows[1].cells[i].innerHTML = first_week[i];
	if (first_week[i] === day) {
		table.rows[1].cells[i].style.backgroundColor = '#e5e500';
}
}

for (i=0; i < second_week.length; i++) {
	table.rows[2].cells[i].innerHTML = second_week[i];
	if (second_week[i] === day) {
		table.rows[2].cells[i].style.backgroundColor = '#e5e500';
}
}

for (i=0; i < third_week.length; i++) {
	table.rows[3].cells[i].innerHTML = third_week[i];
	if (third_week[i] === day) {
		table.rows[3].cells[i].style.backgroundColor = '#e5e500';
}
}

for (i=0; i < fourth_week.length; i++) {
	table.rows[4].cells[i].innerHTML = fourth_week[i];
	if (fourth_week[i] === day) {
		table.rows[4].cells[i].style.backgroundColor = '#e5e500';
}
}
for (i=0; i < fifth_week.length; i++) {
	table.rows[5].cells[i].innerHTML = fifth_week[i];
	if (fifth_week[i] === day) {
		table.rows[5].cells[i].style.backgroundColor = '#e5e500';
}
}

for (i=0; i < sixth_week.length; i++) {
	table.rows[6].cells[i].innerHTML = sixth_week[i];
	if (sixth_week[i] === day) {
		table.rows[6].cells[i].style.backgroundColor = '#e5e500';
}
}


if (sixth_week.length === 0) {
	table.deleteRow(6);
}

if (fifth_week.length === 0) {
	table.deleteRow(5);
}


/*for (i = 1; i < table.rows.length; i++) {
	for (j = 0; i < 7; i++) {
		if (table.rows[i].cells[j].innerHTML.match(24)) {
			table.rows[i].cells[j].style.color = '#e5e500';
		}
	}
}*/

}

function getDaysInMonth(month,year)  {
var days;
if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)  days=31;
else if (month==4 || month==6 || month==9 || month==11) days=30;
else if (month==2)  {
if (isLeapYear(year)) { days=29; }
else { days=28; }
}
return (days);
}

function getwordMonth () {
	var show = document.getElementById("month");
	var month = new Date().getMonth();
	switch (month) {
		case 0:
			show.innerHTML = 'January ' + new Date().getFullYear();
			break;
		case 1:
			show.innerHTML = 'February ' + new Date().getFullYear();
			break;
		case 2:
			show.innerHTML = 'March ' + new Date().getFullYear();
			break;
		case 3:
			show.innerHTML = 'April ' + new Date().getFullYear();
			break;
		case 4:
			show.innerHTML = 'May ' + new Date().getFullYear();
			break;
		case 5:
			show.innerHTML = 'June ' + new Date().getFullYear();
			break;
		case 6:
			show.innerHTML = 'July ' + new Date().getFullYear();
			break;
		case 7:
			show.innerHTML = 'August ' + new Date().getFullYear();
			break;
		case 8:
			show.innerHTML = 'September ' + new Date().getFullYear();
			break;
		case 9:
			show.innerHTML = 'October ' + new Date().getFullYear();
			break;
		case 10:
			show.innerHTML = 'November ' + new Date().getFullYear();
			break;
		case 11:
			show.innerHTML = 'December ' + new Date().getFullYear();
			break;
	}
}


getwordMonth()