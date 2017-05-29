function Clock(options){
	var valueTimer = false;

	function time(){
		var currentDate = new Date();
		var hrs = check(currentDate.getHours());
		var min = check(currentDate.getMinutes());
		var sec = check(currentDate.getSeconds());
		var elem = document.getElementById(options);
		elem.innerHTML=hrs+":"+min+":"+sec;
		if(valueTimer){
			var t = setTimeout(time, 500);
		}
	}

	function check(i){
		if (i < 10)
			i = "0" + i;
		return i;
	}

	function start() {
		valueTimer = true;
		time();
	}

	function stop() {
		valueTimer = false;
	}

	this.start = start;
	this.stop = stop;
}

window.onload = function () {

	var clock = new Clock('clock');
	clock.start();
	//clock.stop();

}