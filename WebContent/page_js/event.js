var modules;
var moduleElements;

function addParticipation(moduleIndex) {
	var part = 0;
	var index;
	for (index = 0; index < moduleElements[moduleIndex].options.length; index++) {
		if (moduleElements[moduleIndex].options[index].checked) {
			part = part | (1 << index);
		}
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
			success: function(result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					window.alert(participation.name + " a été ajouté");
					getModules();
				} else {
					window.alert(updateResult.message);
				}
			}
		});
	}
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
			success: function(result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					window.alert(participation.name + " a été supprimé");
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
		"comment_name": moduleElements[moduleIndex].commentName.value,
		"comment_text": moduleElements[moduleIndex].commentText.value
	};

	if (comment.comment_name == "") {
		window.alert("Le nom ne peut pas être vide");
	} else if (comment.comment_text == "") {
		window.alert("Le message ne peut pas être vide");
	} else {
		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "new_cmt",
				"comment": JSON.stringify(comment)
			},
			success: function(result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					window.alert("Votre message a été publié");
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
		"comment_name": modules[moduleIndex].comments[commentIndex].comment_name,
		"comment_time": modules[moduleIndex].comments[commentIndex].comment_time
	};

	if (confirm("Etes-vous sûr de supprimer le message du " + comment.comment_name + " ?")) {
		$.ajax({
			url: SERVER_QUERY_URL,
			type: "POST",
			data: {
				"action": "delete_cmt",
				"comment": JSON.stringify(comment)
			},
			success: function(result) {
				updateResult = $.parseJSON(result);
				if (updateResult.result) {
					window.alert("Le message a été supprimé");
					getModules();
				} else {
					window.alert(updateResult.message);
				}
			}
		});
	}
}

function createModuleTable(module, moduleIndex) {
	var dateOptions = {
		year: "numeric",
		month: "long",
		day: "numeric"
	};

	var dateTimeOptions = {
		year: "2-digit",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	};

	var windowWidth = $(window).width();
	var index, index2;
	var moduleElement = new Object();

	var tableModule = document.createElement("table");
	tableModule.border = "2px solid gray";
	tableModule.style = "margin-left: 10%; margin-right: 10%; margin-bottom: 60px; min-width: 80%; max-width: 80%; width: 80%";

	var tableModuleBody = document.createElement("tbody");
	tableModule.appendChild(tableModuleBody);

	var tableModuleTitleTr = document.createElement("tr");
	tableModuleBody.appendChild(tableModuleTitleTr);

	{
		var tableModuleTitleTd = document.createElement("td");
		tableModuleTitleTr.appendChild(tableModuleTitleTd);
		tableModuleTitleTd.colSpan = "3";

		var tableModuleTitleInnerDiv = document.createElement("div");
		tableModuleTitleTd.appendChild(tableModuleTitleInnerDiv);
		tableModuleTitleInnerDiv.style = "width: 100%";

		var tableModuleTitleInnerTable = document.createElement("table");
		tableModuleTitleInnerDiv.appendChild(tableModuleTitleInnerTable);
		tableModuleTitleInnerTable.border = "1px solid gray";
		tableModuleTitleInnerTable.style = "width: 100%";

		var tableModuleTitleInnerTableBody = document.createElement("tbody");
		tableModuleTitleInnerTable.appendChild(tableModuleTitleInnerTableBody);

		var tableModuleTitleInnerTableTr = document.createElement("tr");
		tableModuleTitleInnerTableBody.appendChild(tableModuleTitleInnerTableTr);

		var tableModuleTitleInnerTableDateTd = document.createElement("td");
		tableModuleTitleInnerTableTr.appendChild(tableModuleTitleInnerTableDateTd);
		tableModuleTitleInnerTableDateTd.style = "min-width: 239px; max-width: 239px; height: 48px; padding-left: 16px";
		tableModuleTitleInnerTableDateTd.innerHTML = "Date : " + new Date(module.end_date).toLocaleDateString("fr-fr", dateOptions);

		var titleTextWidth = windowWidth * 8 / 10 - 240 -  2;
		var tableModuleTitleInnerTableTitleTd = document.createElement("td");
		tableModuleTitleInnerTableTr.appendChild(tableModuleTitleInnerTableTitleTd);
		tableModuleTitleInnerTableTitleTd.style = "min-width: " + titleTextWidth + "px; max-width: "  + titleTextWidth + "px; padding: 16px";
		tableModuleTitleInnerTableTitleTd.innerHTML = module.title;
	}

	var tableModuleOptionTr = document.createElement("tr");
	tableModuleBody.appendChild(tableModuleOptionTr);

	{
		var tableModuleOptionTd = document.createElement("td");
		tableModuleOptionTr.appendChild(tableModuleOptionTd);
		tableModuleOptionTd.style = "vertical-align: top; min-width: 390px; max-width: 390px";

		var tableModuleOptionInnerDiv = document.createElement("div");
		tableModuleOptionTd.appendChild(tableModuleOptionInnerDiv);
		tableModuleOptionInnerDiv.style = "width: 100%";

		var tableModuleOptionInnerTable = document.createElement("table");
		tableModuleOptionInnerDiv.appendChild(tableModuleOptionInnerTable);
		tableModuleOptionInnerTable.border = "1px solid gray";
		tableModuleOptionInnerTable.style = "width: 100%";

		var tableModuleOptionInnerTableBody = document.createElement("tbody");
		tableModuleOptionInnerTable.appendChild(tableModuleOptionInnerTableBody);

		{
			var tableModuleOptionInnerTableTr = document.createElement("tr");
			tableModuleOptionInnerTableBody.appendChild(tableModuleOptionInnerTableTr);
			{
				var tableModuleOptionInnerTableTd = document.createElement("td");
				tableModuleOptionInnerTableTr.appendChild(tableModuleOptionInnerTableTd);
				tableModuleOptionInnerTableTd.style = "min-width: 239px; max-width: 239px; height: 48px; padding-left: 16px";
				tableModuleOptionInnerTableTd.innerHTML = "Participants";
			}

			{
				var tableModulePartInnerTableTd = document.createElement("td");
				tableModuleOptionInnerTableTr.appendChild(tableModulePartInnerTableTd);
				tableModulePartInnerTableTd.align = "center"
				tableModulePartInnerTableTd.style = "min-width: 149px; max-width: 149px; height: 48px; padding-left: 16px; padding-right: 16px";

				var tableModulePartInnerTableName = document.createElement("input");
				tableModulePartInnerTableTd.appendChild(tableModulePartInnerTableName);
				tableModulePartInnerTableName.type = "text";
				tableModulePartInnerTableName.maxlength = "16";
				tableModulePartInnerTableName.style = "width: 100%";

				moduleElement.partName = tableModulePartInnerTableName;
			}
		}

		var moduleElementOptions = new Array();
		for (index = 0; index < module.options.length; index++) {
			var tableModuleOptionInnerTableTr = document.createElement("tr");
			tableModuleOptionInnerTableBody.appendChild(tableModuleOptionInnerTableTr);

			{
				var tableModuleOptionInnerTableTd = document.createElement("td");
				tableModuleOptionInnerTableTr.appendChild(tableModuleOptionInnerTableTd);
				tableModuleOptionInnerTableTd.style = "min-width: 239px; max-width: 239px; height: 48px; padding-left: 16px; overflow-x: hidden";
				tableModuleOptionInnerTableTd.innerHTML = module.options[index].title;
			}

			{
				var tableModulePartInnerTableTd = document.createElement("td");
				tableModuleOptionInnerTableTr.appendChild(tableModulePartInnerTableTd);
				tableModulePartInnerTableTd.align = "center"
				tableModulePartInnerTableTd.style = "min-width: 149px; max-width: 149px; height: 48px; padding-left: 16px; padding-right: 16px";

				var tableModulePartInnerTablePart = document.createElement("input");
				tableModulePartInnerTableTd.appendChild(tableModulePartInnerTablePart);
				tableModulePartInnerTablePart.type = "checkbox";

				moduleElementOptions.push(tableModulePartInnerTablePart);
			}
		}
		moduleElement.options = moduleElementOptions;

		{
			var tableModuleOptionInnerTableTr = document.createElement("tr");
			tableModuleOptionInnerTableBody.appendChild(tableModuleOptionInnerTableTr);

			{
				var tableModuleOptionInnerTableTd = document.createElement("td");
				tableModuleOptionInnerTableTr.appendChild(tableModuleOptionInnerTableTd);
				tableModuleOptionInnerTableTd.style = "height: 48px; padding-left: 16px";
			}
			{
				var tableModulePartInnerTableTd = document.createElement("td");
				tableModuleOptionInnerTableTr.appendChild(tableModulePartInnerTableTd);
				tableModulePartInnerTableTd.align = "center"
				tableModulePartInnerTableTd.style = "height: 48px; padding-left: 16px; padding-right: 16px";

				var tableModulePartInnerTableIcon = document.createElement("img");
				tableModulePartInnerTableTd.appendChild(tableModulePartInnerTableIcon);
				tableModulePartInnerTableIcon.src = "images/plus.png";
				tableModulePartInnerTableIcon.width = "16";
				tableModulePartInnerTableIcon.height = "16";
				tableModulePartInnerTableIcon.addEventListener("click", (function(constModuleIndex) {
					return function() {
						addParticipation(constModuleIndex);
					}
				})(moduleIndex));
			}
		}
	}

	var participationsOption = new Array();
	{
		var tableModuleMemberTd = document.createElement("td");
		tableModuleOptionTr.appendChild(tableModuleMemberTd);

		var tableModuleMemberInnerDiv = document.createElement("div");
		tableModuleMemberTd.appendChild(tableModuleMemberInnerDiv);

		var tableModuleMemberInnerTable = document.createElement("table");
		tableModuleMemberInnerDiv.appendChild(tableModuleMemberInnerTable);
		tableModuleMemberInnerTable.border = "1px solid gray";

		var tableModuleMemberInnerTableBody = document.createElement("tbody");
		tableModuleMemberInnerTable.appendChild(tableModuleMemberInnerTableBody);
		tableModuleMemberInnerTableBody.style.display = "block";
		tableModuleMemberInnerTableBody.style.width = (windowWidth * 8 / 10 - 450) + "px";
		tableModuleMemberInnerTableBody.style.minHeight = ((module.options.length + 2) * 48 + 18) + "px";
		tableModuleMemberInnerTableBody.style.overflowX = "scroll";

		{
			var moduleElementParts = new Array();
			var tableModuleMemberInnerTableTr = document.createElement("tr");
			tableModuleMemberInnerTableBody.appendChild(tableModuleMemberInnerTableTr);

			for (index = 0; index < module.parts.length; index++) {
				var tableModuleMemberInnerTableTd = document.createElement("th");
				tableModuleMemberInnerTableTr.appendChild(tableModuleMemberInnerTableTd);
				tableModuleMemberInnerTableTd.style = "text-align: center; min-width: 148px; max-width: 148px; height: 48px; padding-left: 16px; padding-right: 16px";
				tableModuleMemberInnerTableTd.innerHTML = module.parts[index].name;

				moduleElementParts.push(module.parts[index].name);
			}
			moduleElement.parts = moduleElementParts;
		}

		var mask = 1;
		for (index = 0; index < module.options.length; index++) {
			var tableModuleMemberInnerTableTr = document.createElement("tr");
			tableModuleMemberInnerTableBody.appendChild(tableModuleMemberInnerTableTr);

			var participationOption = 0;
			for (index2 = 0; index2 < module.parts.length; index2++) {
				var tableModuleMemberInnerTableTd = document.createElement("td");
				tableModuleMemberInnerTableTr.appendChild(tableModuleMemberInnerTableTd);
				tableModuleMemberInnerTableTd.align = "center"
				tableModuleMemberInnerTableTd.style = "height: 48px; padding-left: 16px; padding-right: 16px";

				var tableModuleMemberInnerTableTdIcon = document.createElement("img");
				tableModuleMemberInnerTableTd.appendChild(tableModuleMemberInnerTableTdIcon);
				tableModuleMemberInnerTableTdIcon.width = "16";
				tableModuleMemberInnerTableTdIcon.height = "16";
				if ((module.parts[index2].participation & mask) > 0) {
					tableModuleMemberInnerTableTdIcon.src = "images/checked.png";
					participationOption++;
				} else {
					tableModuleMemberInnerTableTdIcon.src = "images/unchecked.png";
				}
			}
			participationsOption.push(participationOption);

			mask = mask << 1;
		}

		{
			var tableModuleMemberInnerTableTr = document.createElement("tr");
			tableModuleMemberInnerTableBody.appendChild(tableModuleMemberInnerTableTr);

			for (index = 0; index < module.parts.length; index++) {
				var tableModuleMemberInnerTableTd = document.createElement("td");
				tableModuleMemberInnerTableTr.appendChild(tableModuleMemberInnerTableTd);
				tableModuleMemberInnerTableTd.align = "center"
				tableModuleMemberInnerTableTd.style = "height: 48px; padding-left: 16px; padding-right: 16px";

				var tableModuleMemberInnerTableIcon = document.createElement("img");
				tableModuleMemberInnerTableTd.appendChild(tableModuleMemberInnerTableIcon);
				tableModuleMemberInnerTableIcon.src = "images/trash.png";
				tableModuleMemberInnerTableIcon.width = "16";
				tableModuleMemberInnerTableIcon.height = "16";
				tableModuleMemberInnerTableIcon.addEventListener("click", (function(constModuleIndex, constPartIndex) {
					return function() {
						deleteParticipation(constModuleIndex, constPartIndex);
					}
				})(moduleIndex, index));
			}
		}
	}

	{
		var tableModuleOptionTd = document.createElement("td");
		tableModuleOptionTr.appendChild(tableModuleOptionTd);
		tableModuleOptionTd.style = "vertical-align: top; min-width: 60px; max-width:60px";

		var tableModuleOptionInnerDiv = document.createElement("div");
		tableModuleOptionTd.appendChild(tableModuleOptionInnerDiv);
		tableModuleOptionInnerDiv.style = "width: 100%";

		var tableModuleOptionInnerTable = document.createElement("table");
		tableModuleOptionInnerDiv.appendChild(tableModuleOptionInnerTable);
		tableModuleOptionInnerTable.border = "1px solid gray";
		tableModuleOptionInnerTable.style = "width: 100%";

		var tableModuleOptionInnerTableBody = document.createElement("tbody");
		tableModuleOptionInnerTable.appendChild(tableModuleOptionInnerTableBody);

		{
			var tableModuleOptionInnerTableTr = document.createElement("tr");
			tableModuleOptionInnerTableBody.appendChild(tableModuleOptionInnerTableTr);

			var tableModulePartInnerTableTd = document.createElement("td");
			tableModuleOptionInnerTableTr.appendChild(tableModulePartInnerTableTd);
			tableModulePartInnerTableTd.align = "center"
			tableModulePartInnerTableTd.style = "min-width: 100%; max-width: 100%; height: 48px";
			tableModulePartInnerTableTd.innerHTML = "Total";
		}

		for (index = 0; index < module.options.length; index++) {
			var tableModuleOptionInnerTableTr = document.createElement("tr");
			tableModuleOptionInnerTableBody.appendChild(tableModuleOptionInnerTableTr);

			var tableModulePartInnerTableTd = document.createElement("td");
			tableModuleOptionInnerTableTr.appendChild(tableModulePartInnerTableTd);
			tableModulePartInnerTableTd.align = "center"
			tableModulePartInnerTableTd.style = "height: 48px; padding-left: 16px; padding-right: 16px";
			tableModulePartInnerTableTd.innerHTML = participationsOption[index].toString();
		}

		{
			var tableModuleOptionInnerTableTr = document.createElement("tr");
			tableModuleOptionInnerTableBody.appendChild(tableModuleOptionInnerTableTr);

			var tableModulePartInnerTableTd = document.createElement("td");
			tableModuleOptionInnerTableTr.appendChild(tableModulePartInnerTableTd);
			tableModulePartInnerTableTd.align = "center"
			tableModulePartInnerTableTd.style = "height: 48px; padding-left: 16px; padding-right: 16px";
		}
	}

	var tableModuleCommentTr = document.createElement("tr");
	tableModuleBody.appendChild(tableModuleCommentTr);

	var tableModuleCommentTd = document.createElement("td");
	tableModuleCommentTr.appendChild(tableModuleCommentTd);
	tableModuleCommentTd.colSpan = "3";
	{
		var tableModuleCommentInnerTable = document.createElement("table");
		tableModuleCommentTd.appendChild(tableModuleCommentInnerTable);

		{
			var tableModuleCommentInnterTableTr = document.createElement("tr");
			tableModuleCommentInnerTable.appendChild(tableModuleCommentInnterTableTr);

			var tableModuleCommentInnterTableTdNameTitle = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdNameTitle);
			tableModuleCommentInnterTableTdNameTitle.style = "border-bottom: 1px solid grey; text-align: right; min-width: 90px; max-width: 90px; height: 48px";
			tableModuleCommentInnterTableTdNameTitle.innerHTML = "Votre nom: ";

			var tableModuleCommentInnterTableTdName = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdName);
			tableModuleCommentInnterTableTdName.style = "border-bottom: 1px solid grey; min-width: 150px; max-width: 150px; height: 48px; padding-left: 16px; padding-right: 16px";

			var tableModuleCommentInnterTableTdNameText = document.createElement("input");
			tableModuleCommentInnterTableTdName.appendChild(tableModuleCommentInnterTableTdNameText);
			tableModuleCommentInnterTableTdNameText.type = "text";
			tableModuleCommentInnterTableTdNameText.maxlength = "16";
			tableModuleCommentInnterTableTdNameText.style = "width: 100%";

			moduleElement.commentName = tableModuleCommentInnterTableTdNameText;

			var tableModuleCommentInnterTableTdMessageTitle = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdMessageTitle);
			tableModuleCommentInnterTableTdMessageTitle.style = "border-bottom: 1px solid grey; text-align: right; min-width: 150px; max-width: 150px; height: 48px; padding-right: 8px";
			tableModuleCommentInnterTableTdMessageTitle.innerHTML = "Votre message: ";

			var textWidth = windowWidth * 8 / 10 - 450 + 3;
			var tableModuleCommentInnterTableTdMessage = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdMessage);
			tableModuleCommentInnterTableTdMessage.style = "border-bottom: 1px solid grey; min-width: " + textWidth + "px; max-width: " + textWidth + "px; height: 48px; padding-left: 8px; padding-right: 16px";

			var tableModuleCommentInnterTableTdMessageText = document.createElement("input");
			tableModuleCommentInnterTableTdMessage.appendChild(tableModuleCommentInnterTableTdMessageText);
			tableModuleCommentInnterTableTdMessageText.type = "text";
			tableModuleCommentInnterTableTdMessageText.maxlength = "256";
			tableModuleCommentInnterTableTdMessageText.style = "width: 100%";

			var tableModuleCommentInnterTableTdAdd = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdAdd);
			tableModuleCommentInnterTableTdAdd.style = "border-bottom: 1px solid grey; text-align: center; min-width: 60px; max-width: 60px; height: 48px; padding-left: 16px; padding-right: 16px";

			var tableModuleCommentInnterTableTdAddIcon = document.createElement("img");
			tableModuleCommentInnterTableTdAdd.appendChild(tableModuleCommentInnterTableTdAddIcon);
			tableModuleCommentInnterTableTdAddIcon.src = "images/message.png";
			tableModuleCommentInnterTableTdAddIcon.width = "16";
			tableModuleCommentInnterTableTdAddIcon.height = "16";
			tableModuleCommentInnterTableTdAddIcon.addEventListener("click", (function(constModuleIndex) {
				return function() {
					return addComment(constModuleIndex);
				}
			})(moduleIndex));

			moduleElement.commentText = tableModuleCommentInnterTableTdMessageText;
		}

		for (index = 0; index < module.comments.length; index++) {
			var tableModuleCommentInnterTableTr = document.createElement("tr");
			tableModuleCommentInnerTable.appendChild(tableModuleCommentInnterTableTr);

			var tableModuleCommentInnterTableTdNameTitle = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdNameTitle);
			tableModuleCommentInnterTableTdNameTitle.style = "text-align: right; min-width: 90px; max-width: 90px; height: 48px";

			var tableModuleCommentInnterTableTdName = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdName);
			tableModuleCommentInnterTableTdName.style = "min-width: 150px; max-width: 150px; height: 48px; padding-left: 16px; padding-right: 16px";
			tableModuleCommentInnterTableTdName.innerHTML = module.comments[index].comment_name;

			var tableModuleCommentInnterTableTdTime = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdTime);
			tableModuleCommentInnterTableTdTime.style = "text-align: center; min-width: 150px; max-width: 150px; height: 48px";
			tableModuleCommentInnterTableTdTime.innerHTML = new Date(parseInt(module.comments[index].comment_time) * 1000).toLocaleDateString("fr-fr", dateTimeOptions);

			var textWidth = windowWidth * 8 / 10 - 450;
			var tableModuleCommentInnterTableTdMessage = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdMessage);
			tableModuleCommentInnterTableTdMessage.style = "min-width: " + textWidth + "px; max-width: " + textWidth + "px; height: 48px; padding-left: 16px; padding-right: 16px";
			tableModuleCommentInnterTableTdMessage.innerHTML = module.comments[index].comment_text;

			var tableModuleCommentInnterTableTdDelete = document.createElement("td");
			tableModuleCommentInnterTableTr.appendChild(tableModuleCommentInnterTableTdDelete);
			tableModuleCommentInnterTableTdDelete.style = "text-align: center; min-width: 60px; max-width: 60px; height: 48px; padding-left: 16px; padding-right: 16px";

			var tableModuleCommentInnterTableTdDeleteIcon = document.createElement("img");
			tableModuleCommentInnterTableTdDelete.appendChild(tableModuleCommentInnterTableTdDeleteIcon);
			tableModuleCommentInnterTableTdDeleteIcon.src = "images/trash.png";
			tableModuleCommentInnterTableTdDeleteIcon.width = "16";
			tableModuleCommentInnterTableTdDeleteIcon.height = "16";
			tableModuleCommentInnterTableTdDeleteIcon.addEventListener("click", (function(constModuleIndex, constCommentIndex) {
				return function() {
					return deleteComment(constModuleIndex, constCommentIndex);
				}
			})(moduleIndex, index));
		}

	}
	moduleElements.push(moduleElement);

	return tableModule;
}

function getModules() {
	showLoading();
	$.ajax({
		url: SERVER_QUERY_URL,
		type: "POST",
		data: {
			"action": "get_module",
			"nb_modules": 5,
			"opened_only": 1,
			"type": 1
		},
		success: function(result) {
			var modulePanel = document.getElementById("modulePanel");
			var newModulePanel = document.createElement("div");
			newModulePanel.id = "modulePanel";

			modules = $.parseJSON(result);
			moduleElements = new Array();
			var index;
			for (index = 0; index < modules.length; index++) {
				module = modules[index];
				var table = createModuleTable(module, index);
				newModulePanel.appendChild(table);
			}

			modulePanel.parentNode.replaceChild(newModulePanel, modulePanel);
			hideLoading();
		}
	});
}

function prepare() {
	getModules();
}

$(document).ready(prepare());
