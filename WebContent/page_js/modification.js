var modules;

var elementSelectModule;
var elementTROptions;
var elementButtonSave;
var elementButtonModify;
var elementButtonDuplicate;
var elementButtonDelete;

var elementDate;
var elementTitle;
var elementInputOptions;

function displayModule() {
	if (modules != null && modules.length > 0) {
		var index;
		var module = modules[selectModule.selectedIndex];

		elementTitle.value = module.title;
		elementDate.value = module.end_date;

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
		module.end_date = elementDate.value;

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
		module.end_date = elementDate.value;

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

function getModules() {
	showLoading();
	$.ajax({
		url: SERVER_QUERY_URL,
		type: "POST",
		data: {
			"action": "get_module"
		},
		success: function(result) {
			modules = $.parseJSON(result);
			selectModule.options.length = 0;
			for (index = 0; index < modules.length; index++) {
				var option = document.createElement("option");
				option.innerHTML = modules[index].title;
				selectModule.appendChild(option);
			}
			hideLoading();

			selectModule.selectedIndex = 0;
			displayModule();
		}
	});
}

function prepare() {
	elementSelectModule = document.getElementById("selectModule");

	elementDate = document.getElementById("moduleDate");
	elementTitle = document.getElementById("moduleTitle");
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

	elementSelectModule.addEventListener("change", displayModule);
	elementButtonModify.addEventListener("click", modifyModule);
	elementButtonDuplicate.addEventListener("click", duplicateModule);
	elementButtonDelete.addEventListener("click", deleteModule);

	getModules();
}

$(document).ready(prepare());