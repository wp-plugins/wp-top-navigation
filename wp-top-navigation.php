<?php

/**
 *
 * Plugin Name: WP Top Navigation
 * Plugin URI: https://github.com/sdellow/wp-top-navigation
 * Description: Puts the WordPress admin navigation at the top of the screen providing more screen estate for the rest of WordPress. Its non-destructive nature still allows for a responsive admin area. Requires WordPress 3.8 or higher.
 * Version: 1.2.0
 * Author: Stewart Dellow
 * Author URI: http://www.hellostew.com
 *
**/

// Do a PHP and WP version check
$required_php_version = '5.3';
$required_wp_version  = '3.8';
if(version_compare(PHP_VERSION, $required_php_version, '<') || version_compare(get_bloginfo('version'), $required_wp_version, '<')){
    // Require WP plugin module
    require_once(ABSPATH . 'wp-admin/includes/plugin.php');
    // Prevent the plugin
    deactivate_plugins(basename(__FILE__), true);
    // Return an error
    if(isset($_GET['action']) && ($_GET['action'] == 'activate' || $_GET['action'] == 'error_scrape')){
        die(__("WP Top Navigation requires PHP version " . $required_php_version . " or greater and WordPress " . $required_wp_version . " or greater.", 'vab_core'));
    }
}

/**
 * wp_top_navigation
 * Loads the CSS and JS overrides
**/
function wp_top_navigation($page){
    wp_enqueue_script('wp-top-navigation-js', plugins_url('js/navigation.js', __FILE__), array('jquery'), true, true);
    wp_localize_script('wp-top-navigation-js', 'wp_top_navigation_vars', array('pluginurl' => plugin_dir_url(__FILE__)));
    wp_enqueue_style('wp-top-navigation-wp-admin-css', plugins_url('css/wp-admin.css', __FILE__), 'wp-admin-css');
    wp_enqueue_style('wp-top-navigation-admin-bar-css', plugins_url('css/admin-bar.css', __FILE__), 'admin-bar-css');
    wp_enqueue_style('wp-top-navigation-css', plugins_url('css/wp-top-navigation.css', __FILE__), 'wp-top-navigation-css');
    wp_enqueue_style('wp-top-navigation-colors-css', plugins_url('css/colors/dummy.css', __FILE__), 'wp-top-navigation-colors-css');
}
add_action('admin_enqueue_scripts', 'wp_top_navigation');

/**
 * wp_top_navigation_append_body_class
 * Adds an additional body class to the admin
**/
function wp_top_navigation_append_body_class($classes){
    if(is_admin()){
        $classes .= 'wp-top-navigation-slider';
    }

    return $classes;
}
add_filter('admin_body_class', 'wp_top_navigation_append_body_class');

?>
