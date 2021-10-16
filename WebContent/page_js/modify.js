var modules;

var elementSelectModule;
var elementTROptions;
var elementButtonModify;
var elementButtonDuplicate;
var elementButtonDelete;
var elementButtonPurge;

var elementDate;
var elementRegisterDate;
var elementAvailable;
var elementSticky;
var elementTitle;
var elementDescription;
var elementInputOptions;

function dateChanged() {
	var dateDate = elementDate.valueAsDate;
	var registerDate = elementRegisterDate.valueAsDate;
	if (dateDate.getTime() < registerDate.getTime()) {
		elementRegisterDate.value = elementDate.value;
		window.alert("La date choisie est antérieure que la date fin d'inscription");
	}
}

function registerDateChanged() {
	var dateDate = elementDate.valueAsDate;
	var registerDate = elementRegisterDate.valueAsDate;
	if (dateDate.getTime() < registerDate.getTime()) {
		elementDate.value = elementRegisterDate.value;
		window.alert("La date fin d'inscription choisie est postérieure que la date");
	}
}

function displayModule() {
	if (modules != null && modules.length > 0) {
		var index;
		var module = modules[selectModule.selectedIndex];

		elementTitle.value = module.title;
		elementDescription.value = module.description;
		elementDate.value = module.event_date;
		elementRegisterDate.value = module.register_end_date;
		elementAvailable.value = module.available;
		elementSticky.checked = module.sticky == 1;

		for (index = 0; index < module.options.length; index++) {
			elementTROptions[index].style.display = "table-row";
			elementInputOptions[index].value = module.options[index].title;
		}
		for (index = module.options.length; index < elementTROptions.length; index++) {
			elementTROptions[index].style.display = "none";
			elementInputOptions[index].value = "";
		}
	} else {
		elementTitle.value = "";
		for (index = 0; index < elementTROptions.length; index++) {
			elementTROptions[index].style.display = "none";
			elementInputOptions[index].value = "";
		}
	}
}

function modifyModule() {
	if (modules != null && modules.length > 0) {
		var index;
		var module = modules[selectModule.selectedIndex];

		var today = new Date();
		if (elementDate.valueAsDate.getTime() < today.getTime()) {
			window.alert("La date choisie est antérieure que la date du jour");
			return;
		}

		if (elementTitle.value == "") {
			window.alert("Le titre du module est vide");
			return;
		}

		for (index = 0; index < module.options.length; index++) {
			if (elementInputOptions[index].value == "") {
				window.alert("Option " + (index + 1) + " est vide");
				return;
			}
		}

		module.title = elementTitle.value;
		module.available = elementAvailable.value;
		module.sticky = elementSticky.checked ? 1 : 0;
		module.event_date = elementDate.value;
		module.register_end_date = elementRegisterDate.value;
		module.description = elementDescription.value;

		for (index = 0; index < module.options.length; index++) {
			module.options[index].title = elementInputOptions[index].value;
		}

		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "modify_module",
				"module": JSON.stringify(module)
			},
			success: function(result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					window.alert("Le module a été modifié");
				} else {
					window.alert(updateResult.message);
				}
				getModules();
			}
		});
	} else {
		window.alert("Aucun module");
	}
}

function duplicateModule() {
	if (modules != null && modules.length > 0) {
		var index;
		var module = modules[selectModule.selectedIndex];

		var today = new Date();
		if (elementDate.valueAsDate.getTime() < today.getTime()) {
			window.alert("La date choisie est antérieure que la date du jour");
			return;
		}

		if (elementTitle.value == "") {
			window.alert("Le titre du module est vide");
			return;
		}

		for (index = 0; index < module.options.length; index++) {
			if (elementInputOptions[index].value == "") {
				window.alert("Option " + (index + 1) + " est vide");
				return;
			}
		}

		module.title = elementTitle.value;
		module.available = elementAvailable.value;
		module.sticky = elementSticky.checked ? 1 : 0;
		module.event_date = elementDate.value;
		module.register_end_date = elementRegisterDate.value;
		module.description = elementDescription.value;

		for (index = 0; index < module.options.length; index++) {
			module.options[index].title = elementInputOptions[index].value;
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
					window.alert("Le module a été dupliqué");
				} else {
					window.alert(updateResult.message);
				}
				getModules();
			}
		});
	} else {
		window.alert("Aucun module");
	}
}

function deleteModule() {
	if (modules != null && modules.length > 0) {
		var module = modules[selectModule.selectedIndex];

		if (confirm("Etes-vous sûr de supprimer ce module ?")) {
			$.ajax({
				url: SERVER_QUERY_URL,
				type: "POST",
				data: {
					"action": "delete_module",
					"id": module.id
				},
				success: function(result) {
					updateResult = $.parseJSON(result);
					if (updateResult.result) {
						window.alert("Le module a été supprimé");
					} else {
						window.alert(updateResult.message);
					}
					getModules();
				}
			});
		}
	} else {
		window.alert("Aucun module");
	}
}

function purgeClosedModules() {
	if (modules != null && modules.length > 0) {
		if (confirm("Etes-vous sûr de purger tous les modules fermés ?")) {
			$.ajax({
				url: SERVER_QUERY_URL,
				type: "POST",
				data: {
					"action": "purge_closed_module"
				},
				success: function(result) {
					updateResult = $.parseJSON(result);
					if (updateResult.result) {
						window.alert("Les modules fermés ont été purgés");
					} else {
						window.alert(updateResult.message);
					}
					getModules();
				}
			});
		}
	} else {
		window.alert("Aucun module");
	}
}

function getModules() {
	$.ajax({
		url: SERVER_QUERY_URL,
		type: "POST",
		data: {
			"action": "get_module",
			"nb_modules": 0,
			"opened_only": 0,
			"type": -1
		},
		success: function(result) {
			var dateOptions = {
				year: "numeric",
				month: "long",
				day: "2-digit",
				weekday: "long"
			};
			
			modules = $.parseJSON(result);
			selectModule.options.length = 0;
			for (index = 0; index < modules.length; index++) {
				var moduleEventDate = new Date(modules[index].event_date);
				var option = document.createElement("option");
				option.innerHTML = moduleEventDate.toLocaleDateString("fr-fr", dateOptions) + " : " + modules[index].title;
				selectModule.appendChild(option);
			}

			selectModule.selectedIndex = 0;
			displayModule();
		}
	});
}

function prepare() {
	elementSelectModule = document.getElementById("selectModule");

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

	elementTROptions = new Array();
	elementTROptions.push(document.getElementById("optionLine1"));
	elementTROptions.push(document.getElementById("optionLine2"));
	elementTROptions.push(document.getElementById("optionLine3"));
	elementTROptions.push(document.getElementById("optionLine4"));
	elementTROptions.push(document.getElementById("optionLine5"));
	elementTROptions.push(document.getElementById("optionLine6"));
	elementTROptions.push(document.getElementById("optionLine7"));
	elementTROptions.push(document.getElementById("optionLine8"));

	elementButtonModify = document.getElementById("buttonModify");
	elementButtonDuplicate = document.getElementById("buttonDuplicate");
	elementButtonDelete = document.getElementById("buttonDelete");
	elementButtonPurge = document.getElementById("buttonPurge");

	elementSelectModule.addEventListener("change", displayModule);
	elementButtonModify.addEventListener("click", modifyModule);
	elementButtonDuplicate.addEventListener("click", duplicateModule);
	elementButtonDelete.addEventListener("click", deleteModule);
	elementButtonPurge.addEventListener("click", purgeClosedModules);

	getModules();
}

$(document).ready(prepare());