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

//--------------------------------------------------------------------------------

function Voter(options){
	var countVote = 0;
	var elem = document.getElementById(options);

	function render(){
		var div = document.createElement('div');
		var down = document.createElement('span');
		var vote = document.createElement('span');
		var up = document.createElement('span');
		div.classList.add('voter');
		div.id = 'voter';
		down.classList.add('down');
		vote.classList.add('vote');
		up.classList.add('up');
		down.innerHTML = ' - ';
		vote.innerHTML = countVote;
		up.innerHTML = ' + ';
		div.appendChild(down);
		div.appendChild(vote);
		div.appendChild(up);
		elem.appendChild(div);
		return div;
	}

	function setVote(i){
		countVote = i;
		view();
	}

	function main() {
		var voter = document.getElementById('voter');
		if(!voter)
			voter = render();
		voter.onclick = function(elem) {
			if(elem.target.className == "up")
				++countVote;
			if(elem.target.className == "down")
				--countVote;
			view();
		}
	}

	function view() {
		var vote = document.querySelector(".vote");
		vote.innerHTML = countVote;
	}

	this.main = main;
	this.setVote = setVote;
}

window.onload = function () {

	var clock = new Clock('clock');
	clock.start();
	//clock.stop();
	var voter = new Voter('field_voter');
	voter.main();
	voter.setVote(4);
}