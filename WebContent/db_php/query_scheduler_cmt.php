<?php
require_once ("query_database_connection.php");
require_once ("query_database_table_cmt.php");
require_once ("query_scheduler_cmt_config.php");

function new_comment($comment) {
	$result = array(
		ADD_CMT_RESULT => true,
		ADD_CMT_MESSAGE => ADD_CMT_MESSAGE_OK
	);
	if ($comment !== null) {
		$commentArray = json_decode($comment, true);
		$id = array_key_exists(COMMENT_MODULE_ID, $commentArray) ? $commentArray[COMMENT_MODULE_ID] : null;
		$name = array_key_exists(COMMENT_COMMENT_NAME, $commentArray) ? $commentArray[COMMENT_COMMENT_NAME] : null;
		$text = array_key_exists(COMMENT_COMMENT_TEXT, $commentArray) ? $commentArray[COMMENT_COMMENT_TEXT] : null;

		if ($id !== null && $name !== null && $text !== null) {
			beginTransaction();
			$query = "INSERT INTO " . TABLE_CMT . "(" . TABLE_CMT_MODULE_ID . ", " . TABLE_CMT_NAME . ", " . TABLE_CMT_TEXT . ") VALUES(?, ?, ?)";
			$parameters = array(
				$id,
				$name,
				$text
			);
			$added = executeUpdate($query, $parameters);
			if ($added) {
				commit();
			} else {
				rollBack();
				$result[ADD_CMT_RESULT] = false;
				$result[ADD_CMT_MESSAGE] = ADD_CMT_MESSAGE_DB;
			}
		} else {
			$result[ADD_CMT_RESULT] = false;
			$result[ADD_CMT_MESSAGE] = ADD_CMT_MESSAGE_NULL;
		}
	} else {
		$result[ADD_CMT_RESULT] = false;
		$result[ADD_CMT_MESSAGE] = ADD_CMT_MESSAGE_NULL;
	}
	return json_encode($result);
}

function delete_comment($comment) {
	$result = array(
		DELETE_CMT_RESULT => true,
		DELETE_CMT_MESSAGE => DELETE_CMT_MESSAGE_OK
	);
	if ($comment !== null) {
		$commentArray = json_decode($comment, true);
		$id = array_key_exists(COMMENT_MODULE_ID, $commentArray) ? intval($commentArray[COMMENT_MODULE_ID]) : null;
		$name = array_key_exists(COMMENT_COMMENT_NAME, $commentArray) ? $commentArray[COMMENT_COMMENT_NAME] : null;
		$date = array_key_exists(COMMENT_COMMENT_TIME, $commentArray) ? $commentArray[COMMENT_COMMENT_TIME] : null;

		if ($id !== null && $name !== null && $date !== null) {
			beginTransaction();
			$query = "DELETE FROM " . TABLE_CMT . " WHERE " . TABLE_CMT_MODULE_ID . "=? AND " . TABLE_CMT_NAME . "=? AND " . TABLE_CMT_TIME . "=FROM_UNIXTIME(" . $date . ")";
			$parameters = array(
				$id,
				$name
			);
			$deleted = executeUpdate($query, $parameters);
			if ($deleted) {
				commit();
			} else {
				rollBack();
				$result[DELETE_CMT_RESULT] = false;
				$result[DELETE_CMT_MESSAGE] = DELETE_CMT_MESSAGE_DB;
			}
		} else {
			$result[DELETE_CMT_RESULT] = false;
			$result[DELETE_CMT_MESSAGE] = DELETE_CMT_MESSAGE_NULL;
		}
	} else {
		$result[DELETE_CMT_RESULT] = false;
		$result[DELETE_CMT_MESSAGE] = DELETE_CMT_MESSAGE_NULL;
	}
	return json_encode($result);
}
?>