<table style="border: 0px; width: 960px; margin-bottom: 32px">
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Module :</td>
		<td colspan="5" style="width: 800px; padding: 8px"><select id="selectModule" style="width: 100%;"></select></td>
	</tr>
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Date :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="width: 100%" id="moduleDate" type="date" onchange="dateChanged()"></td>
		<td style="text-align: right; width: 160px; padding: 8px">Fin d'inscription :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="width: 100%" id="moduleRegisterDate" type="date" onchange="registerDateChanged()"></td>
		<td/>
		<td/>
	</tr>
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Nombre de places :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="width: 100%" id="moduleAvailable" type="number" min="0" max="128" value="0"></td>
		<td style="text-align: right; width: 160px; padding: 8px">Mise en avant :</td>
		<td style="text-align: center; width: 160px; padding: 8px"><input style="float: left" id="moduleSticky" type="checkbox"></td>
		<td/>
		<td/>
	</tr>
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Titre :</td>
		<td colspan="5" style="text-align: center; width: 800px; padding: 8px"><input style="width: 100%" id="moduleTitle" type="text" maxlength="128"></td>
	</tr>
	<tr>
		<td style="text-align: right; width: 160px; padding: 8px">Description :</td>
		<td colspan="5" style="text-align: center; width: 800px; height: 150px; padding: 8px"><textarea id="moduleDescription" maxlength="2048" style="width: 100%; height: 100%; resize: none"></textarea></td>
	</tr>
	<tr style="display: table-row" id="optionLine1">
		<td style="text-align: right; width: 160px; padding: 8px">Option 1 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption1" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
	<tr style="display: table-row" id="optionLine2">
		<td style="text-align: right; width: 160px; padding: 8px">Option 2 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption2" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
	<tr style="display: table-row" id="optionLine3">
		<td style="text-align: right; width: 160px; padding: 8px">Option 3 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption3" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
	<tr style="display: table-row" id="optionLine4">
		<td style="text-align: right; width: 160px; padding: 8px">Option 4 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption4" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
	<tr style="display: table-row" id="optionLine5">
		<td style="text-align: right; width: 160px; padding: 8px">Option 5 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption5" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
	<tr style="display: table-row" id="optionLine6">
		<td style="text-align: right; width: 160px; padding: 8px">Option 6 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption6" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
	<tr style="display: table-row" id="optionLine7">
		<td style="text-align: right; width: 160px; padding: 8px">Option 7 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption7" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
	<tr style="display: table-row" id="optionLine8">
		<td style="text-align: right; width: 160px; padding: 8px">Option 8 :</td>
		<td colspan="3" style="text-align: center; width: 480px; padding: 8px"><input style="width: 100%" id="moduleOption8" type="text" maxlength="32"></td>
		<td/>
		<td/>
	</tr>
</table>
<table style="border: 0px; width: 800px; margin-bottom: 32px">
	<tr>
		<td style="width: 20%; padding: 8px"></td>
		<td style="width: 20%; padding: 8px"><input style="width: 100%" id="buttonModify" type="button" value="Modifier"></td>
		<td style="width: 20%; padding: 8px"></td>
		<td style="width: 20%; padding: 8px"><input style="width: 100%" id="buttonDuplicate" type="button" value="Dupliquer"></td>
		<td style="width: 20%; padding: 8px"></td>
	</tr>
	<tr>
		<td colspan="5" style="height: 24px"></td>
	</tr>
	<tr>
		<td style="width: 20%; padding: 8px"></td>
		<td style="width: 20%; padding: 8px"><input style="width: 100%" id="buttonDelete" type="button" value="Supprimer"></td>
		<td style="width: 20%; padding: 8px"></td>
		<td style="width: 20%; padding: 8px"><input style="width: 100%" id="buttonPurge" type="button" value="Purger"></td>
		<td style="width: 20%; padding: 8px"></td>
	</tr>
</table>
<div class="loadingImage">
	<img src="images/rolling.gif" />
</div>