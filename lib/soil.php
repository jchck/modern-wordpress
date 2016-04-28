<?php

namespace jchck\soil;

function soil(){
	add_theme_support('soil-clean-up');
	add_theme_support('soil-nav-walker');
	add_theme_support('soil-nice-search');
	add_theme_support('soil-jquery-cdn');
	add_theme_support('soil-relative-urls');
}

add_action('after_setup_theme', __NAMESPACE__ . '\\soil');