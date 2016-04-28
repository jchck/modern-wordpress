<?php

$jchck_includes = [
	'lib/assets.php',
	'lib/soil.php'
];

foreach ($jchck_includes as $file) {
	if (!$filepath = locate_template( $file )) {
		trigger_error(sprintf(__('Error locating %s for inclusion', 'jchck'), $file), E_USER_ERROR);
	}

	require_once $filepath;
}

unset($file, $filepath);