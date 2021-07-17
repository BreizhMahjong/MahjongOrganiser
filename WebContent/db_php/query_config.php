<?php
setlocale(LC_TIME, 'fr_FR.utf8', 'fra');

define("ACTION", "action");

define ("ACTION_LOGIN", "login");
define ("ACTION_LOGIN_PARAM_USER", "username");
define ("ACTION_LOGIN_PARAM_PASSWORD", "password");

define ("ACTION_LOGOUT", "logout");

define("ACTION_NEW_MODULE", "new_module");
define("ACTION_NEW_MODULE_PARAM_MODULE", "module");

define("ACTION_MODIFY_MODULE", "modify_module");
define("ACTION_MODIFY_MODULE_PARAM_MODULE", "module");

define("ACTION_DELETE_MODULE", "delete_module");
define("ACTION_DELETE_MODULE_PARAM_ID", "id");

define("ACTION_PURGE_CLOSED_MODULE", "purge_closed_module");

define("ACTION_GET_MODULE", "get_module");
define("ACTION_GET_MODULE_PARAM_NB_MODULES", "nb_modules");
define("ACTION_GET_MODULE_PARAM_OPENED_ONLY", "opened_only");
define("ACTION_GET_MODULE_PARAM_WITHIN_DAYS", "within_days");
define("ACTION_GET_MODULE_PARAM_TYPE", "type");

define("ACTION_NEW_PART", "new_part");
define("ACTION_NEW_PART_PARAM_PART", "part");

define("ACTION_MODIFY_PART", "modify_part");
define("ACTION_MODIFY_PART_PARAM_PART", "part");

define("ACTION_DELETE_PART", "delete_part");
define("ACTION_DELETE_PART_PARAM_PART", "part");

define("ACTION_NEW_CMT", "new_cmt");
define("ACTION_NEW_CMT_PARAM_CMT", "comment");

define("ACTION_DELETE_CMT", "delete_cmt");
define("ACTION_DELETE_CMT_PARAM_CMT", "comment");

?>