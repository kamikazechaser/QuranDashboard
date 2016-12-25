/*
 * Quran Quotes Dashboard Chrome App 
 *
 * Mohammed Sohail <sohailsameja@gmail.com>
 *
 * Released Under AGPL-v3 License
 *
 */
var locale = 'en-EN';
var clock = {
	hours: document.querySelector('.m-clock .hours').firstChild,
	minutes: document.querySelector('.m-clock .minutes').firstChild,
	date: document.querySelector('.m-date').firstChild,
    hijridate: document.querySelector('.m-hijridate').firstChild
};
render();
HijriRender();

function padZero(number) {
	var str = number.toString();
	return str.length < 2 ? '0' + str : str;
}

function render() {
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();

	clock.hours.data = hours + ":";
	clock.minutes.data = padZero(minutes);
	clock.date.data = now.toLocaleString(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric'
	});

	setTimeout(render, (60 - seconds) * 1000);
}

function HijriRender() {    
	clock.hijridate.data = HijriJS.today().toString();
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
};

var ayahNum = Math.floor(Math.random() * (6236-1) + 1);
getJSON('http://api.alquran.cloud/ayah/' + ayahNum, function(err, data) {
  if (err != null) {
    // Do Nothing
  } else {
    arabic.innerText = data.data.text;
  }
});
getJSON('http://api.alquran.cloud/ayah/' + ayahNum + '/en.asad', function(err, data) {
  if (err != null) {
    // Do Nothing
  } else {
    result.innerText = data.data.text;
    info.innerText = "Surah " + data.data.surah.englishName + " : " + data.data.numberInSurah 
  }
});