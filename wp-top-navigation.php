<?php

/*
Plugin Name: WP Top Navigation
Plugin URI: https://github.com/sdellow/wp-top-navigation
Version: 1.4.0
Description: Puts the WordPress admin navigation at the top of the screen providing more screen estate for the rest of WordPress. Its non-destructive nature still allows for a responsive admin area. Requires WordPress 3.8 or higher.
Author: Stew Dellow
Author URI: https://hellostew.com
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt
Text Domain: wptn
*/

// Prevent direct access.
if(!defined('WPINC')){die;}

/**
 * init_wp_simple_subscribers
 * Init the plugin.
 *
 * @param null
 * @return null
 * @since 1.0.0
 * @version 1.0.0
**/
function init_wp_top_navigation(){
    // Do version checks.
    vc_wp_top_navigation('WP Top Navigation', 'wp-top-navigation');
}
add_action('plugins_loaded', 'init_wp_top_navigation');

/**
 * wptn_assets
 * Loads the CSS and JS overrides.
 *
 * @param null
 * @return null
 * @since 1.0.0
 * @version 1.0.0
**/
function wptn_assets($page){
    wp_enqueue_script('wptn-js', plugins_url('js/navigation.js', __FILE__), array('jquery'), true, true);
    wp_localize_script('wptn-js', 'wp_top_navigation_vars', array('pluginurl' => plugin_dir_url(__FILE__)));
    wp_enqueue_style('wptn-wp-admin-css', plugins_url('css/wp-admin.css', __FILE__), 'wp-admin-css');
    wp_enqueue_style('wptn-admin-bar-css', plugins_url('css/admin-bar.css', __FILE__), 'admin-bar-css');
    wp_enqueue_style('wptn-css', plugins_url('css/wp-top-navigation.css', __FILE__), 'wp-top-navigation-css');
    wp_enqueue_style('wptn-colors-css', plugins_url('css/colors/dummy.css', __FILE__), 'wp-top-navigation-colors-css');
}
add_action('admin_enqueue_scripts', 'wptn_assets', 999);

/**
 * wptn_append_body_class
 * Adds an additional body class to the admin.
 *
 * @param null
 * @return null
 * @since 1.0.0
 * @version 1.0.0
**/
function wptn_append_body_class($classes){
    if(is_admin()){
        $classes .= 'wp-top-navigation-slider';
    }

    return $classes;
}
add_filter('admin_body_class', 'wptn_append_body_class');

/**
 * vc_wp_top_navigation
 * Do version checks.
 *
 * @param null
 * @return null
 * @since 1.0.0
 * @version 1.0.0
**/
function vc_wp_top_navigation($name, $slug){
    // Version variables
    $required_php_version = '5.5'; $required_wp_version = '4.0';

    // Version checks
    if(version_compare(PHP_VERSION, $required_php_version, '<') || version_compare(get_bloginfo('version'), $required_wp_version, '<')){
        require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        deactivate_plugins(basename(__FILE__), true);

        if(isset($_GET['action']) && ($_GET['action'] == 'activate' || $_GET['action'] == 'error_scrape') && $_GET['plugin'] == $slug){
            die(__($name . ' requires PHP version ' . $required_php_version . ' or greater and WordPress ' . $required_wp_version . ' or greater.'));
        }
    }
}
