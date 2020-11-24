<?php
require_once ("query_common.php");

define ("ADD_PART_RESULT", "result");
define ("ADD_PART_MESSAGE", "message");
define ("ADD_PART_MESSAGE_OK", "ok");
define ("ADD_PART_MESSAGE_NULL", "Le nom ne peut pas être vide.");
define ("ADD_PART_MESSAGE_EXISTING", "Le nom est déjà utilisé.");

define ("MODIFY_PART_RESULT", "result");
define ("MODIFY_PART_MESSAGE", "message");
define ("MODIFY_PART_MESSAGE_OK", "ok");
define ("MODIFY_PART_MESSAGE_NULL", "L'identifiant et le nom ne peuvent pas être vides.");
define ("MODIFY_PART_MESSAGE_DB", "Une erreur est survenue.");

define ("DELETE_PART_RESULT", "result");
define ("DELETE_PART_MESSAGE", "message");
define ("DELETE_PART_MESSAGE_OK", "ok");
define ("DELETE_PART_MESSAGE_NULL", "L'identifiant ne peut pas être vide.");
define ("DELETE_PART_MESSAGE_DB", "Une erreur est survenue.");
?>