<?php
ini_set('display_errors', 'On');

require_once ("./db_php/query_config.php");
require_once ("./db_php/query_login_logout.php");
require_once ("./db_php/query_scheduler_module.php");
require_once ("./db_php/query_scheduler_part.php");
require_once ("./db_php/query_scheduler_cmt.php");

$action = isset($_POST[ACTION]) ? $_POST[ACTION] : null;
$user = isset($_SERVER["PHP_AUTH_USER"]) ? $_POST["PHP_AUTH_USER"] : null;
$password = isset($_SERVER["PHP_AUTH_PW"]) ? $_POST["PHP_AUTH_PW"] : null;

if ($action !== null) {
	switch ($action) {
		case ACTION_LOGIN:
			$userName = isset($_POST[ACTION_LOGIN_PARAM_USER]) ? $_POST[ACTION_LOGIN_PARAM_USER] : null;
			$password = isset($_POST[ACTION_LOGIN_PARAM_PASSWORD]) ? $_POST[ACTION_LOGIN_PARAM_PASSWORD] : null;
			echo login($userName, $password);
			break;
		case ACTION_LOGOUT:
			echo logout();
			break;
		case ACTION_NEW_MODULE:
			$module = isset($_POST[ACTION_NEW_MODULE_PARAM_MODULE]) ? $_POST[ACTION_NEW_MODULE_PARAM_MODULE] : null;
			echo new_module($module);
			break;
		case ACTION_MODIFY_MODULE:
			$module = isset($_POST[ACTION_MODIFY_MODULE_PARAM_MODULE]) ? $_POST[ACTION_MODIFY_MODULE_PARAM_MODULE] : null;
			echo modify_module($module);
			break;
		case ACTION_DELETE_MODULE:
			$id = isset($_POST[ACTION_DELETE_MODULE_PARAM_ID]) ? $_POST[ACTION_DELETE_MODULE_PARAM_ID] : null;
			echo delete_module($id);
			break;
		case ACTION_GET_MODULE:
			$nb_modules = isset($_POST[ACTION_GET_MODULE_PARAM_NB_MODULES]) ? $_POST[ACTION_GET_MODULE_PARAM_NB_MODULES] : null;
			if ($nb_modules == null) {
				echo get_module(0);
			} else {
				echo get_module($nb_modules);
			}
			break;
		case ACTION_NEW_PART:
			$part = isset($_POST[ACTION_NEW_PART_PARAM_PART]) ? $_POST[ACTION_NEW_PART_PARAM_PART] : null;
			echo new_part($part);
			break;
		case ACTION_MODIFY_PART:
			$part = isset($_POST[ACTION_MODIFY_PART_PARAM_PART]) ? $_POST[ACTION_MODIFY_PART_PARAM_PART] : null;
			echo modify_part($part);
			break;
		case ACTION_DELETE_PART:
			$part = isset($_POST[ACTION_DELETE_PART_PARAM_PART]) ? $_POST[ACTION_DELETE_PART_PARAM_PART] : null;
			echo delete_part($part);
			break;
		case ACTION_NEW_CMT:
			$comment = isset($_POST[ACTION_NEW_CMT_PARAM_CMT]) ? $_POST[ACTION_NEW_CMT_PARAM_CMT] : null;
			echo new_comment($comment);
			break;
		case ACTION_DELETE_CMT:
			$comment = isset($_POST[ACTION_DELETE_CMT_PARAM_CMT]) ? $_POST[ACTION_DELETE_CMT_PARAM_CMT] : null;
			echo delete_comment($comment);
			break;
		default:
			break;
	}
}
?>