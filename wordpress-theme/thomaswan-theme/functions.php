<?php
/**
 * Thomas & Wan Theme Functions
 */

// Theme Setup
function thomaswan_setup() {
    // Add title tag support
    add_theme_support('title-tag');
    
    // Add featured images
    add_theme_support('post-thumbnails');
    
    // Add HTML5 support
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => 'Primary Menu',
        'footer' => 'Footer Menu',
    ));
    
    // Custom logo
    add_theme_support('custom-logo', array(
        'height' => 60,
        'width' => 200,
        'flex-height' => true,
        'flex-width' => true,
    ));
}
add_action('after_setup_theme', 'thomaswan_setup');

// Enqueue Scripts and Styles
function thomaswan_scripts() {
    wp_enqueue_style('thomaswan-style', get_stylesheet_uri(), array(), '1.0');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap', array(), null);
}
add_action('wp_enqueue_scripts', 'thomaswan_scripts');

// Enable CORS for headless frontend
add_action('init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
});

// Register Sidebar/Widget Areas
function thomaswan_widgets_init() {
    register_sidebar(array(
        'name' => 'Blog Sidebar',
        'id' => 'blog-sidebar',
        'description' => 'Widgets for blog sidebar',
        'before_widget' => '<div class="sidebar-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ));
    
    register_sidebar(array(
        'name' => 'Footer Widget 1',
        'id' => 'footer-1',
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ));
    
    register_sidebar(array(
        'name' => 'Footer Widget 2',
        'id' => 'footer-2',
        'before_widget' => '<div class="footer-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ));
}
add_action('widgets_init', 'thomaswan_widgets_init');

// Custom excerpt length
function thomaswan_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'thomaswan_excerpt_length');

// Custom excerpt more
function thomaswan_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'thomaswan_excerpt_more');

// Add category to REST API
function thomaswan_rest_prepare_post($response, $post, $request) {
    $categories = get_the_category($post->ID);
    if (!empty($categories)) {
        $response->data['category_name'] = $categories[0]->name;
    }
    return $response;
}
add_filter('rest_prepare_post', 'thomaswan_rest_prepare_post', 10, 3);
