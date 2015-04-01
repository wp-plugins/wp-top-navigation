<?php

/**
 * Plugin Name: WP Top Navigation
 * Description: Puts the WordPress admin navigation at the top of the screen providing more screen estate for the rest of WordPress. Its non-destructive nature still allows for a responsive admin area. Requires WordPress 3.8 or higher.
 * Version: 1.3.0
 * Author: Stewart Dellow
 * Author URI: http://hellostew.com
**/

// Prevent direct access.
defined('ABSPATH') or die('No direct access allowed.');

/**
 * wp_top_navigation
 * Loads the CSS and JS overrides.
 *
 * @param null
 * @return null
 * @since 1.0.0
 * @version 1.0.0
**/
function wp_top_navigation($page){
    wp_enqueue_script('wp-top-navigation-js', plugins_url('js/navigation.js', __FILE__), array('jquery'), true, true);
    wp_localize_script('wp-top-navigation-js', 'wp_top_navigation_vars', array('pluginurl' => plugin_dir_url(__FILE__)));
    wp_enqueue_style('wp-top-navigation-wp-admin-css', plugins_url('css/wp-admin.css', __FILE__), 'wp-admin-css');
    wp_enqueue_style('wp-top-navigation-admin-bar-css', plugins_url('css/admin-bar.css', __FILE__), 'admin-bar-css');
    wp_enqueue_style('wp-top-navigation-css', plugins_url('css/wp-top-navigation.css', __FILE__), 'wp-top-navigation-css');
    wp_enqueue_style('wp-top-navigation-colors-css', plugins_url('css/colors/dummy.css', __FILE__), 'wp-top-navigation-colors-css');
}
add_action('admin_enqueue_scripts', 'wp_top_navigation', 999);

/**
 * wp_top_navigation_append_body_class
 * Adds an additional body class to the admin.
 *
 * @param null
 * @return null
 * @since 1.0.0
 * @version 1.0.0
**/
function wp_top_navigation_append_body_class($classes){
    if(is_admin()){
        $classes .= 'wp-top-navigation-slider';
    }

    return $classes;
}
add_filter('admin_body_class', 'wp_top_navigation_append_body_class');
