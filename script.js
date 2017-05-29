function Clock(options){
	var valueTimer = false;
	var countTimer = 1000;
	var elem = document.getElementById(options);

	function time(){
		if(valueTimer){
			var currentDate = new Date();
			var hrs = check(currentDate.getHours());
			var min = check(currentDate.getMinutes());
			var sec = check(currentDate.getSeconds());
			elem.innerHTML=hrs+":"+min+":"+sec;
			var t = setTimeout(time, countTimer);
		}
	}

	function check(i){
		if (i < 10)
			i = "0" + i;
		return i;
	}

	function start() {
		elem.style.color = "black";
		valueTimer = true;
		time();
	}

	function stop() {
		valueTimer = false;
	}

	elem.onclick = function(){
		stop();
		var timerClick = setTimeout(start, 3000);
		elem.style.color = "red";
	}

	this.start = start;
	this.stop = stop;
}

window.onload = function () {

	var clock = new Clock('clock');
	clock.start();
	//clock.stop();

}