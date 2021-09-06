<table style="border: 0px; width: 960px">
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Type :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><select style="width: 128px" id="moduleType">
				<option value="0" selected>Séance</option>
				<option value="1">Événement</option>
				<option value="2">Sondage</option>
		</select></td>
		<td style="text-align: right; width: 160px; padding: 8px">Date :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="width: 128px" id="moduleDate" type="date" onchange="dateChanged()"></td>
		<td style="text-align: right; width: 160px; padding: 8px">Fin d'inscription :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="width: 128px" id="moduleRegisterDate" type="date" onchange="registerDateChanged()"></td>
	</tr>
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Nombre d'options :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><select style="width: 128px" id="moduleOptions">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
				<option value="6">6</option>
				<option value="7">7</option>
				<option value="8" selected>8</option>
		</select></td>
		<td style="text-align: right; width: 160px; padding: 8px">Nombre de places :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="width: 128px" id="moduleAvailable" type="number" min="0" max="128" value="0"></td>
		<td style="text-align: right; width: 160px; padding: 8px">Mise en avant :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="float: left" id="moduleSticky" type="checkbox"></td>
	</tr>
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Titre :</td>
		<td colspan="5" style="text-align: center; width: 800px; padding: 8px"><input style="width: 100%" id="moduleTitle" type="text" maxlength="128"></td>
	</tr>
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Description :</td>
		<td colspan="5" style="text-align: center; width: 800px; height: 150px; padding: 8px"><textarea id="moduleDescription" maxlength="2048" style="width: 100%; height: 100%; resize: none"></textarea></td>
	</tr>
</table>
<table style="border: 0px; width: 640px; margin-bottom: 32px">
	<tr style="display: table-row" id="optionLine1">
		<td style="text-align: right; width: 25%; padding: 8px">Option 1 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption1" type="text" maxlength="32"></td>
	</tr>
	<tr style="display: table-row" id="optionLine2">
		<td style="text-align: right; width: 25%; padding: 8px">Option 2 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption2" type="text" maxlength="32"></td>
	</tr>
	<tr style="display: table-row" id="optionLine3">
		<td style="text-align: right; width: 25%; padding: 8px">Option 3 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption3" type="text" maxlength="32"></td>
	</tr>
	<tr style="display: table-row" id="optionLine4">
		<td style="text-align: right; width: 25%; padding: 8px">Option 4 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption4" type="text" maxlength="32"></td>
	</tr>
	<tr style="display: table-row" id="optionLine5">
		<td style="text-align: right; width: 25%; padding: 8px">Option 5 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption5" type="text" maxlength="32"></td>
	</tr>
	<tr style="display: table-row" id="optionLine6">
		<td style="text-align: right; width: 25%; padding: 8px">Option 6 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption6" type="text" maxlength="32"></td>
	</tr>
	<tr style="display: table-row" id="optionLine7">
		<td style="text-align: right; width: 25%; padding: 8px">Option 7 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption7" type="text" maxlength="32"></td>
	</tr>
	<tr style="display: table-row" id="optionLine8">
		<td style="text-align: right; width: 25%; padding: 8px">Option 8 :</td>
		<td style="text-align: center; width: 75%; padding: 8px"><input style="width: 100%" id="moduleOption8" type="text" maxlength="32"></td>
	</tr>
</table>
<table style="border: 0px; width: 640px">
	<tr>
		<td style="width: 20%"></td>
		<td style="width: 20%"><input style="width: 100%" id="buttonCreate" type="button" value="Créer"></td>
		<td style="width: 20%"></td>
		<td style="width: 20%"><input style="width: 100%" id="buttonReset" type="button" value="Réinitialiser"></td>
		<td style="width: 20%"></td>
	</tr>
</table>