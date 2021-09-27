var DAYS_OF_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_OF_MONTH_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var today;
var modules;
var moduleElements;

function getDisplayOptionIcon(option) {
	switch (option) {
	case 3:
		return "images/question-24.png";
	case 2:
		return "images/heart-24.png";
	case 1:
		return "images/checked-24.png";
	case 0:
	default:
		return "images/empty-24.png";
	}
}

function getChoiceOptionIcon(option) {
	switch (option) {
	case 3:
		return "images/question-24.png";
	case 2:
		return "images/heart-24.png";
	case 1:
		return "images/checked-24.png";
	case 0:
	default:
		return "images/unchecked-24.png";
	}
}

function toggleNbPartsDisplay(moduleIndex) {
	moduleElements[moduleIndex].displayNbPartTextSimple = !moduleElements[moduleIndex].displayNbPartTextSimple;
	var textNbParts = moduleElements[moduleIndex].displayNbPartTextSimple ? moduleElements[moduleIndex].nbPartsTextSimple : moduleElements[moduleIndex].nbPartsTextComplete;
	var index;
	for (index = 0; index < moduleElements[moduleIndex].nbParts.length; index++) {
		moduleElements[moduleIndex].nbParts[index].innerHTML = textNbParts[index];
	}
}

function toggleOption(moduleIndex, optionIndex) {
	moduleElements[moduleIndex].options[optionIndex] = (moduleElements[moduleIndex].options[optionIndex] + 1) % 4;
	moduleElements[moduleIndex].optionImages[optionIndex].src = getChoiceOptionIcon(moduleElements[moduleIndex].options[optionIndex]);
}

function addParticipation(moduleIndex) {
	var part = 0;
	var index;
	for (index = 0; index < moduleElements[moduleIndex].options.length; index++) {
		part = part | ((moduleElements[moduleIndex].options[index] & 3) << (index * 2));
	}
	
	if (part == 0) {
		window.alert("Il faut choisir au moins une option");
	} else if (moduleElements[moduleIndex].partName.value == "") {
		window.alert("Le nom du participant ne peut pas être vide");
	} else {
		var participation = {
			"module_id": modules[moduleIndex].id,
			"name": moduleElements[moduleIndex].partName.value,
			"participation": part
		};
		
		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "new_part",
				"part": JSON.stringify(participation)
			},
			success: function (result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					getModules();
				} else {
					window.alert(updateResult.message);
				}
			}
		});
	}
}

function prepareEditParticipation(moduleIndex, partIndex) {
	var module = modules[moduleIndex];
	moduleElements[moduleIndex].partName.value = module.parts[partIndex].name;
	moduleElements[moduleIndex].partName.setAttribute("disabled", "true");
	
	var optionIndex;
	for (optionIndex = 0; optionIndex < module.options.length; optionIndex++) {
		moduleElements[moduleIndex].options[optionIndex] = (module.parts[partIndex].participation >> (optionIndex * 2)) & 3;
		moduleElements[moduleIndex].optionImages[optionIndex].src = getChoiceOptionIcon(moduleElements[moduleIndex].options[optionIndex]);
		moduleElements[moduleIndex].optionImages[optionIndex].style.display = "";
	}
	
	moduleElements[moduleIndex].addParticipationButton.style.display = "none";
	moduleElements[moduleIndex].saveModifyParticipationButton.style.display = "";
	moduleElements[moduleIndex].cancelModifyParticipationButton.style.display = "";
}

function saveModifyParticipation(moduleIndex) {
	var part = 0;
	var index;
	for (index = 0; index < moduleElements[moduleIndex].options.length; index++) {
		part = part | ((moduleElements[moduleIndex].options[index] & 3) << (index * 2));
	}
	
	if (part == 0) {
		window.alert("Il faut choisir au moins une option");
	} else {
		var participation = {
			"module_id": modules[moduleIndex].id,
			"name": moduleElements[moduleIndex].partName.value,
			"participation": part
		};
		
		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "modify_part",
				"part": JSON.stringify(participation)
			},
			success: function (result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					getModules();
				} else {
					window.alert(updateResult.message);
				}
			}
		});
	}
}

function cancelModifyParticipation(moduleIndex) {
	var module = modules[moduleIndex];
	moduleElements[moduleIndex].partName.value = "";
	
	var optionIndex;	
	if (moduleElements[moduleIndex].register_open) {
		moduleElements[moduleIndex].partName.removeAttribute("disabled");
		for (optionIndex = 0; optionIndex < module.options.length; optionIndex++) {
			moduleElements[moduleIndex].options[optionIndex] = 0;
			moduleElements[moduleIndex].optionImages[optionIndex].src = getChoiceOptionIcon(moduleElements[moduleIndex].options[optionIndex]);
		}
		moduleElements[moduleIndex].addParticipationButton.style.display = "";
	} else {
		for (optionIndex = 0; optionIndex < module.options.length; optionIndex++) {
			moduleElements[moduleIndex].options[optionIndex] = 0;
			moduleElements[moduleIndex].optionImages[optionIndex].src = getDisplayOptionIcon(moduleElements[moduleIndex].options[optionIndex]);
		}
	}
	
	moduleElements[moduleIndex].saveModifyParticipationButton.style.display = "none";
	moduleElements[moduleIndex].cancelModifyParticipationButton.style.display = "none";
}

function deleteParticipation(moduleIndex, partIndex) {
	var participation = {
		"module_id": modules[moduleIndex].id,
		"name": moduleElements[moduleIndex].parts[partIndex]
	};
	
	if (confirm("Etes-vous sûr de supprimer " + participation.name + " ?")) {
		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "delete_part",
				"part": JSON.stringify(participation)
			},
			success: function (result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					getModules();
				} else {
					window.alert(updateResult.message);
				}
			}
		});
	}
}

function addComment(moduleIndex) {
	var comment = {
		"module_id": modules[moduleIndex].id,
		"name": moduleElements[moduleIndex].commentName.value,
		"text": moduleElements[moduleIndex].commentText.value
	};
	
	if (comment.name == "") {
		window.alert("Le nom ne peut pas être vide");
	} else if (comment.text == "") {
		window.alert("Le message ne peut pas être vide");
	} else {
		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "new_cmt",
				"comment": JSON.stringify(comment)
			},
			success: function (result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					getModules();
				} else {
					window.alert(updateResult.message);
				}
			}
		});
	}
}

function deleteComment(moduleIndex, commentIndex) {
	var comment = {
		"module_id": modules[moduleIndex].id,
		"name": modules[moduleIndex].comments[commentIndex].name,
		"time": modules[moduleIndex].comments[commentIndex].time
	};
	
	if (confirm("Etes-vous sûr de supprimer le message du " + comment.name + " ?")) {
		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "delete_cmt",
				"comment": JSON.stringify(comment)
			},
			success: function (result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					getModules();
				} else {
					window.alert(updateResult.message);
				}
			}
		});
	}
}

function toggleModuleBody(moduleId) {
	var div = document.getElementById("div_" + moduleId);
	var icon = document.getElementById("icon_" + moduleId);
	if (div.style.display === "none") {
		div.style.display = "table";
		icon.src = "images/arrowup.png";
	} else {
		div.style.display = "none";
		icon.src = "images/arrowdown.png";
	}
}

function createModuleTable(module, moduleIndex, hue) {
	var dateOptions = {
		year: "numeric",
		month: "long",
		day: "2-digit",
		weekday: "long"
	};
	
	var dateTimeOptions = {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	};
	
	var index,
	index2;
	var moduleElement = new Object();
	moduleElements.push(moduleElement);
	
	var participations = new Array();
	var participationsOption = new Array();
	var participationsFavorite = new Array();
	var participationsMaybe = new Array();
	for (index = 0; index < module.options.length; index++) {
		var participation = new Array();
		var participationOption = 0;
		var participationFavorite = 0;
		var participationMaybe = 0;
		for (index2 = 0; index2 < module.parts.length; index2++) {
			var participationValue = (module.parts[index2].participation >> (index * 2)) & 3;
			participation.push(participationValue);
			switch (participationValue) {
				case 1:
					participationOption++;
					break;
				case 2:
					participationOption++;
					participationFavorite++;
					break;
				case 3:		
					participationMaybe++;
					break;
				default:
					break;
			}
		}
		participations.push(participation);
		participationsOption.push(participationOption);
		participationsFavorite.push(participationFavorite);
		participationsMaybe.push(participationMaybe);
	}
	
	var moduleEventDate = new Date(module.event_date);
	var moduleRegisterDate = new Date(module.register_end_date);	
	moduleElement.register_open = moduleRegisterDate.getTime() >= today.getTime();
	
	var divModule = document.createElement("div");
	divModule.className = "div-module";
	
	{
		var divModuleTitle = document.createElement("div");
		divModule.appendChild(divModuleTitle);
		divModuleTitle.className = "div-module-title";
		divModuleTitle.style.background = "hsl(" + hue + ", 100%, 95%)";
//		divModuleTitle.addEventListener("click", (function (constModuleId) {
//				return function () {
//					toggleModuleBody(constModuleId);
//				}
		
		var divModuleTitleTitle = document.createElement("div");
		divModuleTitle.appendChild(divModuleTitleTitle);
		divModuleTitleTitle.innerHTML = module.title;
		if (module.type == 0) {
			if (moduleEventDate.getTime() >= today.getTime()) {
				divModuleTitleTitle.className = "div-module-title-title";
			} else {
				divModuleTitleTitle.className = "div-module-title-title-closed";
			}
		} else if (module.type == 1) {
			if (moduleEventDate.getTime() >= today.getTime()) {
				divModuleTitleTitle.className = "div-module-title-title";
			} else {
				divModuleTitleTitle.className = "div-module-title-title-closed";
			}
		} else if (module.type == 2) {
			divModuleTitleTitle.className = "div-module-title-title";
		}
		
//		var divModuleTitleIcon = document.createElement("div");
//		divModuleTitle.appendChild(divModuleTitleIcon);
//		divModuleTitleIcon.className = "div-module-title-icon";
		
//		var divModuleTitleIconImg = document.createElement("img");
//		divModuleTitleIcon.appendChild(divModuleTitleIconImg);
//		divModuleTitleIconImg.id = "icon_" + module.id;
//		divModuleTitleIconImg.src = "images/arrowdown.png";
//		divModuleTitleIconImg.width = "16";
//		divModuleTitleIconImg.height = "16";
	}
	
	{
//		var divModuleFoldable = document.createElement("div");
//		divModule.appendChild(divModuleFoldable);
//		divModuleFoldable.className = "div-module-foldable";
//		divModuleFoldable.id = "div_" + module.id;
		
		{
			var divModuleDescription = document.createElement("div");
//			divModuleFoldable.appendChild(divModuleDescription);
			divModule.appendChild(divModuleDescription);
			divModuleDescription.className = "div-module-description";
			divModuleDescription.style.background = "hsl(" + (hue + 30) + ", 100%, 90%)";
			
			var subTitle;
			if (module.type == 0) {
				subTitle = "Séance " + moduleEventDate.toLocaleDateString("fr-fr", dateOptions) + ". Inscription avant " + moduleRegisterDate.toLocaleDateString("fr-fr", dateOptions) + ".<br>";
			} else if (module.type == 1) {
				subTitle = "Événement " + moduleEventDate.toLocaleDateString("fr-fr", dateOptions) + ". Inscription avant " + moduleRegisterDate.toLocaleDateString("fr-fr", dateOptions) + ".<br>";
			} else if (module.type == 2) {
				subTitle = "Sondage à répondre avant " + moduleRegisterDate.toLocaleDateString("fr-fr", dateOptions) + ".<br>";
			}
			
			if (module.description != null && module.description != "") {
				subTitle = subTitle + "Description : " + module.description;
			}
			divModuleDescription.innerHTML = subTitle;
		}
		
		{
			var divModulePart = document.createElement("div");
//			divModuleFoldable.appendChild(divModulePart);
			divModule.appendChild(divModulePart);
			divModulePart.className = "div-module-part";
			divModulePart.style.background = "hsl(" + (hue + 30) + ", 100%, 95%)";
			divModulePart.style.height = ((module.options.length + 2) * 48 + 20) + "px";
			var divModulePartRight = document.createElement("div");
			divModulePart.appendChild(divModulePartRight);
			divModulePartRight.className = "div-module-part-right";
			
			var divModulePartRightWrapper = document.createElement("div");
			divModulePartRight.appendChild(divModulePartRightWrapper);
			divModulePartRightWrapper.style.width = (module.parts.length * 150) + "px";
			if (module.parts.length * 150 < 720) {
				divModulePartRightWrapper.style.marginRight = (720 - module.parts.length * 150) + "px";
			}
			
			var moduleElementParts = new Array();
			for (index = 0; index < module.parts.length; index++) {
				var divModulePartRightCol = document.createElement("div");
				divModulePartRightWrapper.appendChild(divModulePartRightCol);
				divModulePartRightCol.className = "div-module-part-right-part-col";
				
				var divModulePartRightName = document.createElement("div");
				divModulePartRightCol.appendChild(divModulePartRightName);
				divModulePartRightName.className = "div-module-part-right-part-cell";
				divModulePartRightName.innerHTML = module.parts[index].name;
				
				moduleElementParts.push(module.parts[index].name);
				
				for (index2 = 0; index2 < module.options.length; index2++) {
					var divModulePartRightPart = document.createElement("div");
					divModulePartRightCol.appendChild(divModulePartRightPart);
					divModulePartRightPart.className = "div-module-part-right-part-cell";
					
					var divModulePartRightPartImg = document.createElement("img");
					divModulePartRightPart.appendChild(divModulePartRightPartImg);
					divModulePartRightPartImg.width = "24";
					divModulePartRightPartImg.height = "24";
					divModulePartRightPartImg.src = getDisplayOptionIcon(participations[index2][index]);
				}
				
				var divModulePartRightNameRemove = document.createElement("div");
				divModulePartRightCol.appendChild(divModulePartRightNameRemove);
				divModulePartRightNameRemove.className = "div-module-part-right-part-cell";
				
				var divModulePartRightNameEditImg = document.createElement("img");
				divModulePartRightNameRemove.appendChild(divModulePartRightNameEditImg);
				divModulePartRightNameEditImg.src = "images/edit.png";
				divModulePartRightNameEditImg.width = "16";
				divModulePartRightNameEditImg.height = "16";
				divModulePartRightNameEditImg.style.cursor = "pointer";
				divModulePartRightNameEditImg.style.margin = "0px 8px";
				divModulePartRightNameEditImg.addEventListener("click", (function (constModuleIndex, constPartIndex) {
						return function () {
							prepareEditParticipation(constModuleIndex, constPartIndex);
						}
					})(moduleIndex, index));
				
				var divModulePartRightNameRemoveImg = document.createElement("img");
				divModulePartRightNameRemove.appendChild(divModulePartRightNameRemoveImg);
				divModulePartRightNameRemoveImg.src = "images/trash.png";
				divModulePartRightNameRemoveImg.width = "16";
				divModulePartRightNameRemoveImg.height = "16";
				divModulePartRightNameRemoveImg.style.cursor = "pointer";
				divModulePartRightNameRemoveImg.style.margin = "0px 8px";
				divModulePartRightNameRemoveImg.addEventListener("click", (function (constModuleIndex, constPartIndex) {
						return function () {
							deleteParticipation(constModuleIndex, constPartIndex);
						}
					})(moduleIndex, index));
			}
			moduleElement.parts = moduleElementParts;
			
			var divModulePartLeft = document.createElement("div");
			divModulePart.appendChild(divModulePartLeft);
			divModulePartLeft.className = "div-module-part-left";
			
			var divModulePartLeftTotalCol = document.createElement("div");
			divModulePartLeft.appendChild(divModulePartLeftTotalCol);
			divModulePartLeftTotalCol.className = "div-module-part-left-nbpart-col";
			
			var divModulePartLeftTotalSpaceTop = document.createElement("div");
			divModulePartLeftTotalCol.appendChild(divModulePartLeftTotalSpaceTop);
			divModulePartLeftTotalSpaceTop.className = "div-module-part-left-nbpart-cell-normal";
			
			var moduleElementNbParts = new Array();
			var textNbPartsSimple = new Array();
			var textNbPartsComplete = new Array();
			if (module.available == 0) {
				for (index = 0; index < module.options.length; index++) {
					var divModulePartLeftTotalOption = document.createElement("div");
					divModulePartLeftTotalCol.appendChild(divModulePartLeftTotalOption);
					divModulePartLeftTotalOption.className = "div-module-part-left-nbpart-cell-normal";
					divModulePartLeftTotalOption.addEventListener("click", (function (constModuleIndex) {
						return function () {
							toggleNbPartsDisplay(constModuleIndex);
						}
					})(moduleIndex));
					moduleElementNbParts.push(divModulePartLeftTotalOption);
					
					var textNbPartSimple = participationsOption[index].toString();
					var textNbPartComplete = participationsOption[index].toString();
					if (participationsFavorite[index] > 0) {
						textNbPartComplete = textNbPartComplete + " (" + participationsFavorite[index].toString() + ")";
					}
					if (participationsMaybe[index] > 0) {
						textNbPartComplete = textNbPartComplete + " + " + participationsMaybe[index].toString();
					} 
					textNbPartsSimple.push(textNbPartSimple);
					textNbPartsComplete.push(textNbPartComplete);
					divModulePartLeftTotalOption.innerHTML = textNbPartSimple;
				}
			} else {
				for (index = 0; index < module.options.length; index++) {
					var divModulePartLeftTotalOption = document.createElement("div");
					divModulePartLeftTotalCol.appendChild(divModulePartLeftTotalOption);
					if (participationsOption[index] > module.available) {
						divModulePartLeftTotalOption.className = "div-module-part-left-nbpart-cell-overbooked";
					} else {
						divModulePartLeftTotalOption.className = "div-module-part-left-nbpart-cell-normal";
					}
					divModulePartLeftTotalOption.addEventListener("click", (function (constModuleIndex) {
						return function () {
							toggleNbPartsDisplay(constModuleIndex);
						}
					})(moduleIndex));
					moduleElementNbParts.push(divModulePartLeftTotalOption);

					var textNbPartSimple = participationsOption[index].toString();
					var textNbPartComplete = participationsOption[index].toString();
					if (participationsFavorite[index] > 0) {
						textNbPartComplete = textNbPartComplete + " (" + participationsFavorite[index].toString() + ")";
					}
					if (participationsMaybe[index] > 0) {
						textNbPartComplete = textNbPartComplete + " + " + participationsMaybe[index].toString();
					}
					textNbPartSimple = textNbPartSimple + " / " + module.available.toString();
					textNbPartComplete = textNbPartComplete + " / " + module.available.toString();
					textNbPartsSimple.push(textNbPartSimple);
					textNbPartsComplete.push(textNbPartComplete);
					divModulePartLeftTotalOption.innerHTML = textNbPartSimple;
				}
			}
			moduleElement.nbParts = moduleElementNbParts;
			moduleElement.displayNbPartTextSimple = true;
			moduleElement.nbPartsTextSimple = textNbPartsSimple;
			moduleElement.nbPartsTextComplete = textNbPartsComplete;
			
			divModulePartLeftTotalSpaceBottom = document.createElement("div");
			divModulePartLeftTotalCol.appendChild(divModulePartLeftTotalSpaceBottom);
			divModulePartLeftTotalSpaceBottom.className = "div-module-part-left-nbpart-cell";
			
			var divModulePartLeftOptionCol = document.createElement("div");
			divModulePartLeft.appendChild(divModulePartLeftOptionCol);
			divModulePartLeftOptionCol.className = "div-module-part-left-option-col";
			
			var divModulePartLeftOptionSpaceTop = document.createElement("div");
			divModulePartLeftOptionCol.appendChild(divModulePartLeftOptionSpaceTop);
			divModulePartLeftOptionSpaceTop.className = "div-module-part-left-option-cell";
			
			for (index = 0; index < module.options.length; index++) {
				var divModulePartLeftOptionOption = document.createElement("div");
				divModulePartLeftOptionCol.appendChild(divModulePartLeftOptionOption);
				divModulePartLeftOptionOption.className = "div-module-part-left-option-cell";
				divModulePartLeftOptionOption.innerHTML = module.options[index].title;
			}
			
			var divModulePartLeftOptionSpaceBottom = document.createElement("div");
			divModulePartLeftOptionCol.appendChild(divModulePartLeftOptionSpaceBottom);
			divModulePartLeftOptionSpaceBottom.className = "div-module-part-left-option-cell";
			
			var divModulePartLeftNewPartCol = document.createElement("div");
			divModulePartLeft.appendChild(divModulePartLeftNewPartCol);
			divModulePartLeftNewPartCol.className = "div-module-part-left-newpart-col";
			
			var divModulePartLeftNewPartName = document.createElement("div");
			divModulePartLeftNewPartCol.appendChild(divModulePartLeftNewPartName);
			divModulePartLeftNewPartName.className = "div-module-part-left-newpart-cell";
			
			var divModulePartLeftNewPartNameInput = document.createElement("input");
			divModulePartLeftNewPartName.appendChild(divModulePartLeftNewPartNameInput);
			divModulePartLeftNewPartNameInput.type = "text";
			divModulePartLeftNewPartNameInput.maxlength = "16";
			divModulePartLeftNewPartNameInput.style = "width: 100%";
			if (!moduleElement.register_open) {
				divModulePartLeftNewPartNameInput.setAttribute("disabled", "true");
			}
			
			moduleElement.partName = divModulePartLeftNewPartNameInput;
			
			var moduleElementOptions = new Array();
			var moduleElementOptionImages = new Array();
			for (index = 0; index < module.options.length; index++) {
				var divModulePartLeftNewPartOption = document.createElement("div");
				divModulePartLeftNewPartCol.appendChild(divModulePartLeftNewPartOption);
				divModulePartLeftNewPartOption.className = "div-module-part-left-newpart-cell";
				
				var divModulePartLeftNewPartOptionImg = document.createElement("img");
				divModulePartLeftNewPartOption.appendChild(divModulePartLeftNewPartOptionImg);
				divModulePartLeftNewPartOptionImg.src = getChoiceOptionIcon(0);
				divModulePartLeftNewPartOptionImg.width = "24";
				divModulePartLeftNewPartOptionImg.height = "24";
				divModulePartLeftNewPartOptionImg.addEventListener("click", (function (constModuleIndex, constOptionIndex) {
						return function () {
							toggleOption(constModuleIndex, constOptionIndex);
						}
					})(moduleIndex, index));
				if (!moduleElement.register_open) {
					divModulePartLeftNewPartOptionImg.style.display = "none";
				}

				moduleElementOptions.push(0);
				moduleElementOptionImages.push(divModulePartLeftNewPartOptionImg);
			}
			moduleElement.options = moduleElementOptions;
			moduleElement.optionImages = moduleElementOptionImages;
			
			var divModulePartLeftNewPartIcon = document.createElement("div");
			divModulePartLeftNewPartCol.appendChild(divModulePartLeftNewPartIcon);
			divModulePartLeftNewPartIcon.className = "div-module-part-left-newpart-cell";
			
			var divModulePartLeftNewPartIconImg = document.createElement("img");
			divModulePartLeftNewPartIcon.appendChild(divModulePartLeftNewPartIconImg);
			divModulePartLeftNewPartIconImg.src = "images/plus.png";
			divModulePartLeftNewPartIconImg.width = "16";
			divModulePartLeftNewPartIconImg.height = "16";
			divModulePartLeftNewPartIconImg.style.cursor = "pointer";
			divModulePartLeftNewPartIconImg.style.margin = "0px 8px";
			divModulePartLeftNewPartIconImg.addEventListener("click", (function (constModuleIndex) {
					return function () {
						addParticipation(constModuleIndex);
					}
				})(moduleIndex));
			if (!moduleElement.register_open) {
				divModulePartLeftNewPartIconImg.style.display = "none";
			}
			moduleElement.addParticipationButton = divModulePartLeftNewPartIconImg;
			
			var divModulePartLeftModifyPartIconImg = document.createElement("img");
			divModulePartLeftNewPartIcon.appendChild(divModulePartLeftModifyPartIconImg);
			divModulePartLeftModifyPartIconImg.src = "images/save.png";
			divModulePartLeftModifyPartIconImg.width = "16";
			divModulePartLeftModifyPartIconImg.height = "16";
			divModulePartLeftModifyPartIconImg.style.cursor = "pointer";
			divModulePartLeftModifyPartIconImg.style.margin = "0px 8px";
			divModulePartLeftModifyPartIconImg.style.display = "none";
			divModulePartLeftModifyPartIconImg.addEventListener("click", (function (constModuleIndex) {
					return function () {
						saveModifyParticipation(constModuleIndex);
					}
				})(moduleIndex));
			moduleElement.saveModifyParticipationButton = divModulePartLeftModifyPartIconImg;
			
			var divModulePartLeftCancelPartIconImg = document.createElement("img");
			divModulePartLeftNewPartIcon.appendChild(divModulePartLeftCancelPartIconImg);
			divModulePartLeftCancelPartIconImg.src = "images/cancel.png";
			divModulePartLeftCancelPartIconImg.width = "16";
			divModulePartLeftCancelPartIconImg.height = "16";
			divModulePartLeftCancelPartIconImg.style.cursor = "pointer";
			divModulePartLeftCancelPartIconImg.style.margin = "0px 8px";
			divModulePartLeftCancelPartIconImg.style.display = "none";
			divModulePartLeftCancelPartIconImg.addEventListener("click", (function (constModuleIndex) {
					return function () {
						cancelModifyParticipation(constModuleIndex);
					}
				})(moduleIndex));
			moduleElement.cancelModifyParticipationButton = divModulePartLeftCancelPartIconImg;
		}
		
		{
			var divModuleComment = document.createElement("div");
//			divModuleFoldable.appendChild(divModuleComment);
			divModule.appendChild(divModuleComment);
			divModuleComment.className = "div-module-comment";
			
			var tableModuleCommentInnerTable = document.createElement("table");
			divModuleComment.appendChild(tableModuleCommentInnerTable);
			tableModuleCommentInnerTable.className = "div-module-comment-table";
			var tableModuleCommentInnterTableTr = document.createElement("tr");
			tableModuleCommentInnterTableTr.style.background = "hsl(" + (hue + 60) + ", 100%, 90%)";
			tableModuleCommentInnerTable.appendChild(tableModuleCommentInnterTableTr);
			
			var tableModuleCommentInnterTableTdNameTitle = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdNameTitle);
			tableModuleCommentInnterTableTdNameTitle.className = "div-module-comment-table-title-col1";
			tableModuleCommentInnterTableTdNameTitle.innerHTML = "Votre nom: ";
			
			var tableModuleCommentInnterTableTdName = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdName);
			tableModuleCommentInnterTableTdName.className = "div-module-comment-table-title-col2";
			
			var tableModuleCommentInnterTableTdNameText = document.createElement("input");
			tableModuleCommentInnterTableTdName.appendChild(tableModuleCommentInnterTableTdNameText);
			tableModuleCommentInnterTableTdNameText.type = "text";
			tableModuleCommentInnterTableTdNameText.maxlength = "16";
			tableModuleCommentInnterTableTdNameText.style = "width: 100%";
			
			moduleElement.commentName = tableModuleCommentInnterTableTdNameText;
			
			var tableModuleCommentInnterTableTdMessageTitle = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdMessageTitle);
			tableModuleCommentInnterTableTdMessageTitle.className = "div-module-comment-table-title-col3";
			tableModuleCommentInnterTableTdMessageTitle.innerHTML = "Votre message: ";
			
			var tableModuleCommentInnterTableTdMessage = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdMessage);
			tableModuleCommentInnterTableTdMessage.className = "div-module-comment-table-title-col4";
			
			var tableModuleCommentInnterTableTdMessageText = document.createElement("input");
			tableModuleCommentInnterTableTdMessage.appendChild(tableModuleCommentInnterTableTdMessageText);
			tableModuleCommentInnterTableTdMessageText.type = "text";
			tableModuleCommentInnterTableTdMessageText.maxlength = "256";
			tableModuleCommentInnterTableTdMessageText.style = "width: 100%";
			
			var tableModuleCommentInnterTableTdAdd = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdAdd);
			tableModuleCommentInnterTableTdAdd.className = "div-module-comment-table-title-col5";
			
			var tableModuleCommentInnterTableTdAddIcon = document.createElement("img");
			tableModuleCommentInnterTableTdAdd.appendChild(tableModuleCommentInnterTableTdAddIcon);
			tableModuleCommentInnterTableTdAddIcon.src = "images/message.png";
			tableModuleCommentInnterTableTdAddIcon.width = "16";
			tableModuleCommentInnterTableTdAddIcon.height = "16";
			tableModuleCommentInnterTableTdAddIcon.style.cursor = "pointer";
			tableModuleCommentInnterTableTdAddIcon.addEventListener("click", (function (constModuleIndex) {
					return function () {
						return addComment(constModuleIndex);
					}
				})(moduleIndex));
			
			moduleElement.commentText = tableModuleCommentInnterTableTdMessageText;
			
			for (index = 0; index < module.comments.length; index++) {
				if (displaySystemMessage == 1 || (displaySystemMessage == 0 && module.comments[index].type == 0)) {
					var tableModuleCommentInnterTableTr = document.createElement("tr");
					tableModuleCommentInnterTableTr.style.background = "hsl(" + (hue + 60) + ", 100%, 95%)";
					tableModuleCommentInnerTable.appendChild(tableModuleCommentInnterTableTr);
					
					var tableModuleCommentInnterTableTdNameTitle = document.createElement("td");
					tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdNameTitle);
					tableModuleCommentInnterTableTdNameTitle.className = "div-module-comment-table-body-col1";
					
					var tableModuleCommentInnterTableTdName = document.createElement("td");
					tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdName);
					tableModuleCommentInnterTableTdName.className = "div-module-comment-table-body-col2";
					tableModuleCommentInnterTableTdName.innerHTML = module.comments[index].name;
					
					var tableModuleCommentInnterTableTdTime = document.createElement("td");
					tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdTime);
					tableModuleCommentInnterTableTdTime.className = "div-module-comment-table-body-col3";
					tableModuleCommentInnterTableTdTime.innerHTML = new Date(parseInt(module.comments[index].time) * 1000).toLocaleDateString("fr-fr", dateTimeOptions);
					
					var tableModuleCommentInnterTableTdMessage = document.createElement("td");
					tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdMessage);
					tableModuleCommentInnterTableTdMessage.className = "div-module-comment-table-body-col4";
					tableModuleCommentInnterTableTdMessage.innerHTML = module.comments[index].text;
					
					var tableModuleCommentInnterTableTdDelete = document.createElement("td");
					tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdDelete);
					tableModuleCommentInnterTableTdDelete.className = "div-module-comment-table-body-col5";
					
					var tableModuleCommentInnterTableTdDeleteIcon = document.createElement("img");
					tableModuleCommentInnterTableTdDelete.appendChild(tableModuleCommentInnterTableTdDeleteIcon);
					tableModuleCommentInnterTableTdDeleteIcon.src = "images/trash.png";
					tableModuleCommentInnterTableTdDeleteIcon.width = "16";
					tableModuleCommentInnterTableTdDeleteIcon.height = "16";
					tableModuleCommentInnterTableTdDeleteIcon.style.cursor = "pointer";
					tableModuleCommentInnterTableTdDeleteIcon.addEventListener("click", (function (constModuleIndex, constCommentIndex) {
							return function () {
								return deleteComment(constModuleIndex, constCommentIndex);
							}
						})(moduleIndex, index));
				}
			}
		}
	}
	return divModule;
}

function getModules() {
	$.ajax({
		url: SERVER_QUERY_URL,
		type: "POST",
		data: {
			"action": "get_module",
			"nb_modules": moduleLimitConst,
			"opened_only": moduleOpenedOnlyConst,
			"within_days": moduleWithinDaysConst,
			"type": moduleTypeConst
		},
		success: function (result) {
			today = new Date();
			today.setHours(0, 0, 0, 0);
			var month;
			var days = 0;
			var totalDaysYear;
			if ((today.getFullYear() % 4 == 0 && !today.getFullYear() % 100 == 0) || today.getFullYear() % 400 == 0) {
				for (month = 0; month < today.getMonth(); month++) {
					days += DAYS_OF_MONTH_LEAP[month];
				}
				totalDaysYear = 366;
			} else {
				for (month = 0; month < today.getMonth(); month++) {
					days += DAYS_OF_MONTH[month];
				}
				totalDaysYear = 365;
			}
			days += today.getDate();
			var halfTotalDaysYear = Math.floor(totalDaysYear / 2);
			var hue = Math.abs(((days + 10) % totalDaysYear) - halfTotalDaysYear) * 240 / halfTotalDaysYear;
			
			var modulePanel = document.getElementById("modulePanel");
			var newModulePanel = document.createElement("div");
			newModulePanel.id = "modulePanel";
			newModulePanel.align = "center";
			
			modules = $.parseJSON(result);
			moduleElements = new Array();
			if (modules.length > 0) {
				var index;
				for (index = 0; index < modules.length; index++) {
					module = modules[index];
					var table = createModuleTable(module, index, hue);
					newModulePanel.appendChild(table);
				}
				var windowY = window.scrollY;
				modulePanel.parentNode.replaceChild(newModulePanel, modulePanel);
				window.scroll(0, windowY);
			}
		}
	});
}

function prepare() {
	getModules();
}

$(document).ready(prepare());
