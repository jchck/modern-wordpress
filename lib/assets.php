<?php

namespace jchck\assets;

function assets(){
	wp_enqueue_style('css', get_template_directory_uri() . '/dist/styles.css', false, null);
}

add_action('wp_enqueue_scripts', __NAMESPACE__ . '\\assets', 100);