<?php
require_once ("query_database_connection.php");
require_once ("query_database_table_module.php");
require_once ("query_database_table_option.php");
require_once ("query_database_table_part.php");
require_once ("query_database_table_cmt.php");
require_once ("query_scheduler_module_config.php");

function new_module($module) {
	$result = array(
		CREATE_MODULE_RESULT => true,
		CREATE_MODULE_MESSAGE => CREATE_MODULE_MESSAGE_OK
	);

	if (isset($_SESSION[SESSION_IS_ADMIN]) && $_SESSION[SESSION_IS_ADMIN]) {
		if ($module !== null) {
			$moduleArray = json_decode($module, true);
			$title = array_key_exists(MODULE_TITLE, $moduleArray) ? $moduleArray[MODULE_TITLE] : null;
			$end_date = array_key_exists(MODULE_END_DATE, $moduleArray) ? $moduleArray[MODULE_END_DATE] : null;
			$options = array_key_exists(MODULE_OPTIONS, $moduleArray) ? $moduleArray[MODULE_OPTIONS] : null;

			if ($title !== null && $end_date !== null && $options !== null) {
				beginTransaction();
				$query = "INSERT INTO " . TABLE_MODULE . "(" . TABLE_MODULE_TITLE . ", " . TABLE_MODULE_END_DATE . ", " . TABLE_MODULE_NB_OPTIONS . ") VALUES(?, ?, ?)";
				$parameters = array(
					$title,
					$end_date,
					count($options)
				);

				$id = executeInsert($query, $parameters);
				if ($id > 0) {
					$optionAddError = false;
					foreach ($options as $option) {
						if (! empty($option)) {
							$position = array_key_exists(OPTION_POSITION, $option) ? intval($option[OPTION_POSITION]) : null;
							$title = array_key_exists(OPTION_TITLE, $option) ? $option[OPTION_TITLE] : null;
							if ($position !== null && $title !== null) {
								$query = "INSERT INTO " . TABLE_OPTION . "(" . TABLE_OPTION_MODULE_ID . ", " . TABLE_OPTION_POSITION . ", " . TABLE_OPTION_TITLE . ") VALUES(?, ?, ?)";
								$parameters = array(
									$id,
									$position,
									$title
								);
								$optionAdded = executeUpdate($query, $parameters);
								if (! $optionAdded) {
									$optionAddError = true;
									break;
								}
							} else {
								$optionAddError = true;
								break;
							}
						} else {
							$optionAddError = true;
							break;
						}
					}
					if ($optionAddError) {
						rollBack();
						$result[CREATE_MODULE_RESULT] = false;
						$result[CREATE_MODULE_MESSAGE] = CREATE_MODULE_MESSAGE_DB;
					} else {
						commit();
					}
				} else {
					rollBack();
					$result[CREATE_MODULE_RESULT] = false;
					$result[CREATE_MODULE_MESSAGE] = CREATE_MODULE_MESSAGE_DB;
				}
			} else {
				$result[CREATE_MODULE_RESULT] = false;
				$result[CREATE_MODULE_MESSAGE] = CREATE_MODULE_MESSAGE_NULL;
			}
		} else {
			$result[CREATE_MODULE_RESULT] = false;
			$result[CREATE_MODULE_MESSAGE] = CREATE_MODULE_MESSAGE_NULL;
		}
	} else {
		$result[CREATE_MODULE_RESULT] = false;
		$result[CREATE_MODULE_MESSAGE] = CREATE_MODULE_MESSAGE_ADMIN;
	}
	return json_encode($result);
}

function modify_module($module) {
	$result = array(
		MODIFY_MODULE_RESULT => true,
		MODIFY_MODULE_MESSAGE => MODIFY_MODULE_MESSAGE_OK
	);

	if (isset($_SESSION[SESSION_IS_ADMIN]) && $_SESSION[SESSION_IS_ADMIN]) {
		if ($module !== null) {
			$moduleArray = json_decode($module, true);
			$id = array_key_exists(MODULE_ID, $moduleArray) ? $moduleArray[MODULE_ID] : null;
			$title = array_key_exists(MODULE_TITLE, $moduleArray) ? $moduleArray[MODULE_TITLE] : null;
			$end_date = array_key_exists(MODULE_END_DATE, $moduleArray) ? $moduleArray[MODULE_END_DATE] : null;
			$options = array_key_exists(MODULE_OPTIONS, $moduleArray) ? $moduleArray[MODULE_OPTIONS] : null;

			if ($title !== null && $end_date !== null) {
				beginTransaction();
				$query = "UPDATE " . TABLE_MODULE . " SET " . TABLE_MODULE_TITLE . "=?, " . TABLE_MODULE_END_DATE . "=? WHERE " . TABLE_MODULE . DOT . TABLE_MODULE_ID . "=?";
				$parameters = array(
					$title,
					$end_date,
					$id
				);
				$updated = executeUpdate($query, $parameters);
				
				if ($updated) {
					$query = "UPDATE " . TABLE_OPTION . " SET " . TABLE_OPTION_TITLE . "=? WHERE " . TABLE_OPTION_MODULE_ID . "=? AND " . TABLE_OPTION_POSITION . "=?";
					$optionModifyError = false;
					foreach ($options as $option) {
						if (! empty($option)) {
							$position = array_key_exists(OPTION_POSITION, $option) ? intval($option[OPTION_POSITION]) : null;
							$title = array_key_exists(OPTION_TITLE, $option) ? $option[OPTION_TITLE] : null;
							if ($position !== null && $title !== null) {
								$parameters = array(
									$title,
									$id,
									$position
								);
								
								$optionModified = executeUpdate($query, $parameters);
								if (! $optionModified) {
									$optionModifyError = true;
									break;
								}
							} else {
								$optionModifyError = true;
								break;
							}
						} else {
							$optionModifyError = true;
							break;
						}
					}
					if ($optionModifyError) {
						rollBack();
						$result[CREATE_MODULE_RESULT] = false;
						$result[CREATE_MODULE_MESSAGE] = CREATE_MODULE_MESSAGE_DB;
					} else {
						commit();
					}
				} else {
					rollBack();
					$result[CREATE_MODULE_RESULT] = false;
					$result[CREATE_MODULE_MESSAGE] = CREATE_MODULE_MESSAGE_DB;
				}
			} else {
				$result[MODIFY_MODULE_RESULT] = false;
				$result[MODIFY_MODULE_MESSAGE] = MODIFY_MODULE_MESSAGE_NULL;
			}
		} else {
			$result[MODIFY_MODULE_RESULT] = false;
			$result[MODIFY_MODULE_MESSAGE] = MODIFY_MODULE_MESSAGE_NULL;
		}
	} else {
		$result[MODIFY_MODULE_RESULT] = false;
		$result[MODIFY_MODULE_MESSAGE] = MODIFY_MODULE_MESSAGE_ADMIN;
	}
	return json_encode($result);
}

function delete_module($id) {
	session_start();
	$result = array(
		DELETE_MODULE_RESULT => true,
		DELETE_MODULE_MESSAGE => DELETE_MODULE_MESSAGE_OK
	);

	if (isset($_SESSION[SESSION_IS_ADMIN]) && $_SESSION[SESSION_IS_ADMIN]) {
		if ($id !== null) {
			beginTransaction();
			$query = "DELETE FROM " . TABLE_CMT . " WHERE " . TABLE_CMT . DOT . TABLE_CMT_MODULE_ID . "=?";
			$parameters = array(
				$id
			);
			$deleted = executeUpdate($query, $parameters);

			if ($deleted) {
				$query = "DELETE FROM " . TABLE_PART . " WHERE " . TABLE_PART . DOT . TABLE_PART_MODULE_ID . "=?";
				$parameters = array(
					$id
				);
				$deleted = executeUpdate($query, $parameters);
			}

			if ($deleted) {
				$query = "DELETE FROM " . TABLE_OPTION . " WHERE " . TABLE_OPTION . DOT . TABLE_OPTION_MODULE_ID . "=?";
				$parameters = array(
					$id
				);
				$deleted = executeUpdate($query, $parameters);
			}

			if ($deleted) {
				$query = "DELETE FROM " . TABLE_MODULE . " WHERE " . TABLE_MODULE . DOT . TABLE_MODULE_ID . "=?";
				$parameters = array(
					$id
				);
				$deleted = executeUpdate($query, $parameters);
			}

			if ($deleted) {
				commit();
			} else {
				rollBack();
				$result[DELETE_MODULE_RESULT] = false;
				$result[DELETE_MODULE_MESSAGE] = DELETE_RCR_GAME_MESSAGE_DB;
			}
		} else {
			$result[DELETE_MODULE_RESULT] = false;
			$result[DELETE_MODULE_MESSAGE] = DELETE_MODULE_MESSAGE_NULL;
		}
	} else {
		$result[DELETE_MODULE_RESULT] = false;
		$result[DELETE_MODULE_MESSAGE] = DELETE_MODULE_MESSAGE_ADMIN;
	}
	return json_encode($result);
}

function get_module($nb_modules) {
	$querySelect = "SELECT " . TABLE_MODULE . DOT . TABLE_MODULE_ID . ", " . TABLE_MODULE . DOT . TABLE_MODULE_TITLE . ", " . TABLE_MODULE . DOT . TABLE_MODULE_END_DATE . " FROM " . TABLE_MODULE;
	$queryWhere = " WHERE " . TABLE_MODULE . DOT . TABLE_MODULE_END_DATE . " >= CURDATE()";
	$queryOrder = " ORDER BY " . TABLE_MODULE . DOT . TABLE_MODULE_END_DATE . " ASC";
	$queryFetch = "";
	if ($nb_modules > 0) {
		$queryFetch = " LIMIT " . $nb_modules;
	}
	$result = executeQuery($querySelect . $queryWhere . $queryOrder . $queryFetch, null);

	$modules = array();
	foreach ($result as $line) {
		$module = array();
		$module[MODULE_ID] = $line[TABLE_MODULE_ID];
		$module[MODULE_TITLE] = $line[TABLE_MODULE_TITLE];
		$module[MODULE_END_DATE] = $line[TABLE_MODULE_END_DATE];
		$modules[] = $module;
	}

	$moduleComplets = array();
	$queryOption = "SELECT " . TABLE_OPTION . DOT . TABLE_OPTION_POSITION . ", " . TABLE_OPTION . DOT . TABLE_OPTION_TITLE . " FROM " . TABLE_OPTION . " WHERE " . TABLE_OPTION . DOT . TABLE_OPTION_MODULE_ID . "=? ORDER BY " . TABLE_OPTION . DOT . TABLE_OPTION_POSITION . " ASC";
	$queryPart = "SELECT " . TABLE_PART . DOT . TABLE_PART_NAME . ", " . TABLE_PART . DOT . TABLE_PART_PART . " FROM " . TABLE_PART . " WHERE " . TABLE_PART . DOT . TABLE_PART_MODULE_ID . "=? ORDER BY " . TABLE_PART . DOT . TABLE_PART_NAME . " ASC";
	$queryCmt = "SELECT " . TABLE_CMT . DOT . TABLE_CMT_NAME . ", " . TABLE_CMT . DOT . TABLE_CMT_TEXT . ", UNIX_TIMESTAMP(" . TABLE_CMT . DOT . TABLE_CMT_TIME . ") AS " . TABLE_CMT_UTIME . " FROM " . TABLE_CMT . " WHERE " . TABLE_CMT . DOT . TABLE_CMT_MODULE_ID . "=? ORDER BY " . TABLE_CMT . DOT . TABLE_CMT_TIME . " ASC";
	foreach ($modules as $module) {
		$parameters = array(
			$module[MODULE_ID]
		);

		$result = executeQuery($queryOption, $parameters);
		$options = array();
		foreach ($result as $line) {
			$option = array();
			$option[OPTION_MODULE_ID] = $module[MODULE_ID];
			$option[OPTION_POSITION] = $line[TABLE_OPTION_POSITION];
			$option[OPTION_TITLE] = $line[TABLE_OPTION_TITLE];
			$options[] = $option;
		}
		$module[MODULE_OPTIONS] = $options;

		$result = executeQuery($queryPart, $parameters);
		$parts = array();
		foreach ($result as $line) {
			$part = array();
			$part[PART_NAME] = $line[TABLE_PART_NAME];
			$part[PART_PART] = $line[TABLE_PART_PART];
			$parts[] = $part;
		}
		$module[MODULE_PARTS] = $parts;

		$result = executeQuery($queryCmt, $parameters);
		$comments = array();
		foreach ($result as $line) {
			$comment = array();
			$comment[COMMENT_MODULE_ID] = $module[MODULE_ID];
			$comment[COMMENT_COMMENT_NAME] = $line[TABLE_CMT_NAME];
			$comment[COMMENT_COMMENT_TEXT] = $line[TABLE_CMT_TEXT];
			$comment[COMMENT_COMMENT_TIME] = $line[TABLE_CMT_UTIME];
			$comments[] = $comment;
		}
		$module[MODULE_COMMENTS] = $comments;

		$moduleComplets[] = $module;
	}

	return json_encode($moduleComplets);
}
?>