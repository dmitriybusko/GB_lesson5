window.addEventListener('load', init, false);

function init(){
	myform = document.getElementById('my_form');
	myform.addEventListener('submit', sendAjaxRequest, false);
	$(document).ready(function() {
		$("input[name='birth']").datepicker({
			monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь"
			,"Ноябрь","Декабрь"],
			dayNamesMin:["ВС","Пн","Вт","Ср","Чт","Пт","Сб"],
			firstDay:1,
			dateFormat:"yy.mm.dd"
		});
	});
	return false; 
}

function checkAnswer(answer){
	var arrayFields = ["The Username", "The Password", "The Gender", "The Credit Card", "The Email",
	 "The Birth"];
	var arrayFieldsSelector = ["username","password","gender","credit_card","email","birth"];
	var selector;
	clear();
	for(i in answer.error){
		for(j in arrayFields){
			if(answer.error[i].indexOf(arrayFields[j]) != -1){
				selector = document.querySelector("input[name='" + arrayFieldsSelector[j] + "']");
				selector.style.border = '2px solid red';
				$("input[name='" + arrayFieldsSelector[j] + "']").effect("shake");
			}
		}
	}
}

function clear(){
	$("input").each(function(){
		$("input").css("border", "");
	});
}

function sendAjaxRequest(e){
	var evt = e || window.event;
	if(evt.preventDefault){
		evt.preventDefault(); 
	}
	var elems = myform.elements; // все элементы формы
	var params = [];
	var elName;
	var elType;
	for(var i = 0; i < elems.length; i++){
		  elType = elems[i].type; // тип текущего элемента (атрибут type)
		  elName = elems[i].name; // имя текущего элемента (атрибут name)
		  if(elName){ // если атрибут name присутствует, добавляем параметр "ключ(name)=значение(value)"
		    params.push(elems[i].name + '=' + elems[i].value);
		  }
	}
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://localhost/validator.php', true);
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	xhr.send(params.join('&'));
	xhr.onreadystatechange = function() { 
		if(xhr.readyState == 4 && xhr.status == 200){
			var answer = JSON.parse(xhr.responseText);
			if(answer.result == true)
				alert("All fields are correct");
			else{
				checkAnswer(answer);
			}
		}
	}
}

	