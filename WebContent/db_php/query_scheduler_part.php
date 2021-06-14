<?php
require_once ("query_database_connection.php");
require_once ("query_database_table_part.php");
require_once ("query_database_table_cmt.php");
require_once ("query_scheduler_part_config.php");

function new_part($part) {
	$result = array(
		ADD_PART_RESULT => true,
		ADD_PART_MESSAGE => ADD_PART_MESSAGE_OK
	);

	if($part !== null) {
		$partArray = json_decode($part, true);
		$id = array_key_exists(PART_MODULE_ID, $partArray) ? $partArray[PART_MODULE_ID] : null;
		$name = array_key_exists(PART_NAME, $partArray) ? $partArray[PART_NAME] : null;
		$participation = array_key_exists(PART_PART, $partArray) ? $partArray[PART_PART] : null;

		if($id !== null && $name !== null && $participation !== null) {
			beginTransaction();
			$query = "INSERT INTO " . TABLE_PART . "(" . TABLE_PART_MODULE_ID . ", " . TABLE_PART_NAME . ", " . TABLE_PART_PART . ") VALUES(?, ?, ?)";
			$parameters = array(
				$id,
				$name,
				$participation
			);
			$added = executeUpdate($query, $parameters);

			if($added) {
				$query = "INSERT INTO " . TABLE_CMT . "(" . TABLE_CMT_MODULE_ID . ", " . TABLE_CMT_NAME . ", " . TABLE_CMT_TEXT . ", " . TABLE_CMT_TYPE . ") VALUES(?, ?, ?, 1)";
				$parameters = array(
					$id,
					$name,
					$name . " a voutché."
				);
				$added = executeUpdate($query, $parameters);
			}

			if($added) {
				commit();
			} else {
				rollBack();
				$result[ADD_PART_RESULT] = false;
				$result[ADD_PART_MESSAGE] = ADD_PART_MESSAGE_EXISTING;
			}
		} else {
			$result[ADD_PART_RESULT] = false;
			$result[ADD_PART_MESSAGE] = ADD_PART_MESSAGE_NULL;
		}
	} else {
		$result[ADD_PART_RESULT] = false;
		$result[ADD_PART_MESSAGE] = ADD_PART_MESSAGE_NULL;
	}

	return json_encode($result);
}

function modify_part($part) {
	$result = array(
		MODIFY_PART_RESULT => true,
		MODIFY_PART_MESSAGE => MODIFY_PART_MESSAGE_OK
	);

	if($part !== null) {
		$partArray = json_decode($part, true);
		$id = array_key_exists(PART_MODULE_ID, $partArray) ? $partArray[PART_MODULE_ID] : null;
		$name = array_key_exists(PART_NAME, $partArray) ? $partArray[PART_NAME] : null;
		$participation = array_key_exists(PART_PART, $partArray) ? $partArray[PART_PART] : null;

		if($id !== null && $name !== null && $participation !== null) {
			beginTransaction();
			$query = "UPDATE " . TABLE_PART . " SET " . TABLE_PART_PART . "=? WHERE " . TABLE_PART_MODULE_ID . "=? AND " . TABLE_PART_NAME . "=?";
			$parameters = array(
				$participation,
				$id,
				$name
			);
			$modified = executeUpdate($query, $parameters);

			if($modified) {
				commit();
			} else {
				rollBack();
				$result[MODIFY_PART_RESULT] = false;
				$result[MODIFY_PART_MESSAGE] = MODIFY_PART_MESSAGE_DB;
			}
		} else {
			$result[MODIFY_PART_RESULT] = false;
			$result[MODIFY_PART_MESSAGE] = MODIFY_PART_MESSAGE_NULL;
		}
	} else {
		$result[MODIFY_PART_RESULT] = false;
		$result[MODIFY_PART_MESSAGE] = MODIFY_PART_MESSAGE_NULL;
	}
	return json_encode($result);
}

function delete_part($part) {
	$result = array(
		DELETE_PART_RESULT => true,
		MODIFY_PART_MESSAGE => DELETE_PART_MESSAGE_OK
	);

	if($part !== null) {
		$partArray = json_decode($part, true);
		$id = array_key_exists(PART_MODULE_ID, $partArray) ? $partArray[PART_MODULE_ID] : null;
		$name = array_key_exists(PART_NAME, $partArray) ? $partArray[PART_NAME] : null;

		if($id !== null && $name !== null) {
			beginTransaction();
			$query = "DELETE FROM " . TABLE_PART . " WHERE " . TABLE_PART_MODULE_ID . "=? AND " . TABLE_PART_NAME . "=?";
			$parameters = array(
				$id,
				$name
			);
			$deleted = executeUpdate($query, $parameters);

			if($deleted) {
				$query = "INSERT INTO " . TABLE_CMT . "(" . TABLE_CMT_MODULE_ID . ", " . TABLE_CMT_NAME . ", " . TABLE_CMT_TEXT . ", " . TABLE_CMT_TYPE . ") VALUES(?, ?, ?, 1)";
				$parameters = array(
					$id,
					$name,
					$name . " a doutché."
				);
				$deleted = executeUpdate($query, $parameters);
			}

			if($deleted) {
				commit();
			} else {
				rollBack();
				$result[DELETE_PART_RESULT] = false;
				$result[DELETE_PART_MESSAGE] = DELETE_PART_MESSAGE_DB;
			}
		} else {
			$result[DELETE_PART_RESULT] = false;
			$result[DELETE_PART_MESSAGE] = DELETE_PART_MESSAGE_NULL;
		}
	} else {
		$result[DELETE_PART_RESULT] = false;
		$result[DELETE_PART_MESSAGE] = DELETE_PART_MESSAGE_NULL;
	}
	return json_encode($result);
}
?>