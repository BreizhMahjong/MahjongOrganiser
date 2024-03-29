var elementOptions;
var elementTROptions;
var elementButtonCreate;
var elementButtonReset;

var elementType;
var elementAvailable;
var elementDate;
var elementRegisterDate;
var elementSticky;
var elementTitle;
var elementDescription;
var elementInputOptions;

function dateChanged() {
	var dateDate = elementDate.valueAsDate;
	var registerDate = elementRegisterDate.valueAsDate;
	if (dateDate !== null && registerDate !== null) {
		if (dateDate.getTime() < registerDate.getTime()) {
			elementRegisterDate.value = elementDate.value;
			window.alert("La date choisie est antérieure que la date fin d'inscription");
		}
	}
}

function registerDateChanged() {
	var dateDate = elementDate.valueAsDate;
	var registerDate = elementRegisterDate.valueAsDate;
	if (dateDate !== null && registerDate !== null) {
		if (dateDate.getTime() < registerDate.getTime()) {
			elementDate.value = elementRegisterDate.value;
			window.alert("La date fin d'inscription choisie est postérieure que la date");
		}
	}
}

function toggleOptions() {
	var index;
	for (index = 0; index <= elementOptions.selectedIndex; index++) {
		elementTROptions[index].style.display = "table-row";
	}
	for (index = elementOptions.selectedIndex + 1; index < elementTROptions.length; index++) {
		elementTROptions[index].style.display = "none";
	}
}

function addModule() {
	var index;
	var nbOptions = elementOptions.selectedIndex + 1;

	var dateDate = elementDate.valueAsDate;
	var today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	if (dateDate.getTime() < today.getTime()) {
		window.alert("La date choisie est antérieure que la date du jour");
		return;
	}
	var date = elementDate.value;
	var registerDate = elementRegisterDate.value;
	var available = elementAvailable.value;
	var sticky = elementSticky.checked ? 1 : 0;

	var title = elementTitle.value;
	if (title == "") {
		window.alert("Le titre du module est vide");
		return;
	}	
	var description = elementDescription.value;

	var options = new Array();
	for (index = 0; index < nbOptions; index++) {
		if (elementInputOptions[index].value == "") {
			window.alert("Option " + (index + 1) + " est vide");
			return;
		}
		var option = {
			"position": index,
			"title": elementInputOptions[index].value
		}
		options.push(option);
	}

	var module = {
		"title": title,
		"description": description,
		"event_date": date,
		"register_end_date": registerDate,
		"type": elementType.options[elementType.selectedIndex].value,
		"available": available,
		"sticky": sticky,
		"options": options
	}

	$.ajax({
		url: SERVER_QUERY_URL,
		type: "POST",
		data: {
			"action": "new_module",
			"module": JSON.stringify(module)
		},
		success: function(result) {
			updateResult = $.parseJSON(result);
			if (updateResult.result) {
				window.alert("Le module a été créé");
				reset();
			} else {
				window.alert(updateResult.message);
			}
		}
	});
}

function reset() {
	var index;
	elementTitle.value = "";
	elementOptions.selectedIndex = 7;
	toggleOptions();
	for (index = 0; index < elementInputOptions.length; index++) {
		elementInputOptions[index].value = "";
	}
}

function prepare() {
	elementType = document.getElementById("moduleType");
	elementDate = document.getElementById("moduleDate");
	elementRegisterDate = document.getElementById("moduleRegisterDate");
	elementAvailable = document.getElementById("moduleAvailable");
	elementSticky = document.getElementById("moduleSticky");
	elementTitle = document.getElementById("moduleTitle");
	elementDescription = document.getElementById("moduleDescription");
	elementInputOptions = new Array();
	elementInputOptions.push(document.getElementById("moduleOption1"));
	elementInputOptions.push(document.getElementById("moduleOption2"));
	elementInputOptions.push(document.getElementById("moduleOption3"));
	elementInputOptions.push(document.getElementById("moduleOption4"));
	elementInputOptions.push(document.getElementById("moduleOption5"));
	elementInputOptions.push(document.getElementById("moduleOption6"));
	elementInputOptions.push(document.getElementById("moduleOption7"));
	elementInputOptions.push(document.getElementById("moduleOption8"));

	elementOptions = document.getElementById("moduleOptions");
	elementTROptions = new Array();
	elementTROptions.push(document.getElementById("optionLine1"));
	elementTROptions.push(document.getElementById("optionLine2"));
	elementTROptions.push(document.getElementById("optionLine3"));
	elementTROptions.push(document.getElementById("optionLine4"));
	elementTROptions.push(document.getElementById("optionLine5"));
	elementTROptions.push(document.getElementById("optionLine6"));
	elementTROptions.push(document.getElementById("optionLine7"));
	elementTROptions.push(document.getElementById("optionLine8"));

	elementButtonCreate = document.getElementById("buttonCreate");
	elementButtonReset = document.getElementById("buttonReset");

	elementOptions.addEventListener("change", toggleOptions);
	elementButtonCreate.addEventListener("click", addModule);
	elementButtonReset.addEventListener("click", reset);
}

$(document).ready(prepare());