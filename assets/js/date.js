
//console.log(today);
function toEnDigit(s) {
    return s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g,    // Detect all Persian/Arabic Digit in range of their Unicode with a global RegEx character set
        function(a) { return a.charCodeAt(0) & 0xf }     // Remove the Unicode base(2) range that not match
    )
}

var weeknum;
let weekday = ['دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه','یکشنبه'];

var printDate = function () {
	
	let monthNames = [
		'فروردین',
		'اردی بهشت',
		'خرداد',
		'تیر',
		'مرداد',
		'شهریور',
		'مهر',
		'آبان',
		'آذر',
		'دی',
		'بهمن',
		'اسفند',
	]
	var d = new Date();
    let today = d.toLocaleDateString('fa-IR');

	weeknum = d.getDay() > 0 ? weekday[d.getDay()-1] : weekday[6];

	var month = toEnDigit(today.split('/')[1]);

	var monthName = monthNames[month - 1];

	var date = today.split('/')[2];

	var hour = d.getHours().toLocaleString('fa-IR');
	var minute = d.getMinutes().toLocaleString('fa-IR');
	if (hour < 10) {
		hour = "0" + String(hour);
	} else {
		hour = hour;
	}
	if (minute < 10) {
		minute = "0" + String(minute);
	} else {
		minute = minute;
	}

	var light =  d.getHours() > 18 || d.getHours() < 5 ? false : true;
	if(light) {
		document.querySelector(".clock-box").classList.remove("day")
	} else {
		document.querySelector(".clock-box").classList.add("night")
	}
	
	document.getElementById("date").innerHTML = " " + weeknum + " , " + date + " " + monthName ;
	document.getElementById("time").innerHTML = hour + ":" + minute;
	
};

setInterval(printDate, 1000);

