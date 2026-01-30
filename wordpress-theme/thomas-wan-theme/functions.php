<?php
/**
 * Thomas & Wan Theme Functions
 *
 * @package Thomas_Wan
 * @version 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

define( 'THOMAS_WAN_VERSION', '1.0.0' );
define( 'THOMAS_WAN_DIR', get_template_directory() );
define( 'THOMAS_WAN_URI', get_template_directory_uri() );

/**
 * Theme Setup
 */
function thomas_wan_setup() {
    // Add default posts and comments RSS feed links
    add_theme_support( 'automatic-feed-links' );

    // Let WordPress manage the document title
    add_theme_support( 'title-tag' );

    // Enable support for Post Thumbnails
    add_theme_support( 'post-thumbnails' );

    // Custom logo support
    add_theme_support( 'custom-logo', array(
        'height'      => 100,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ) );

    // HTML5 support
    add_theme_support( 'html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ) );

    // Add theme support for selective refresh for widgets
    add_theme_support( 'customize-selective-refresh-widgets' );

    // Register navigation menus
    register_nav_menus( array(
        'primary'   => __( 'Primary Menu', 'thomas-wan' ),
        'footer'    => __( 'Footer Menu', 'thomas-wan' ),
    ) );

    // Set content width
    if ( ! isset( $content_width ) ) {
        $content_width = 1200;
    }
}
add_action( 'after_setup_theme', 'thomas_wan_setup' );

/**
 * Enqueue scripts and styles
 */
function thomas_wan_scripts() {
    // Main stylesheet
    wp_enqueue_style( 'thomas-wan-style', get_stylesheet_uri(), array(), THOMAS_WAN_VERSION );

    // Google Fonts (optional - using system fonts by default)
    // wp_enqueue_style( 'thomas-wan-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap', array(), null );

    // Main JavaScript
    wp_enqueue_script( 'thomas-wan-main', THOMAS_WAN_URI . '/assets/js/main.js', array(), THOMAS_WAN_VERSION, true );

    // Comment reply script
    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'thomas_wan_scripts' );

/**
 * Register widget areas
 */
function thomas_wan_widgets_init() {
    register_sidebar( array(
        'name'          => __( 'Sidebar', 'thomas-wan' ),
        'id'            => 'sidebar-1',
        'description'   => __( 'Add widgets here to appear in the sidebar.', 'thomas-wan' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer Widget 1', 'thomas-wan' ),
        'id'            => 'footer-1',
        'description'   => __( 'First footer widget area.', 'thomas-wan' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-heading">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer Widget 2', 'thomas-wan' ),
        'id'            => 'footer-2',
        'description'   => __( 'Second footer widget area.', 'thomas-wan' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-heading">',
        'after_title'   => '</h4>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Footer Widget 3', 'thomas-wan' ),
        'id'            => 'footer-3',
        'description'   => __( 'Third footer widget area.', 'thomas-wan' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4 class="footer-heading">',
        'after_title'   => '</h4>',
    ) );
}
add_action( 'widgets_init', 'thomas_wan_widgets_init' );

/**
 * Register Custom Post Types
 */
function thomas_wan_register_post_types() {
    // Testimonials
    register_post_type( 'testimonial', array(
        'labels' => array(
            'name'               => __( 'Testimonials', 'thomas-wan' ),
            'singular_name'      => __( 'Testimonial', 'thomas-wan' ),
            'add_new'            => __( 'Add New', 'thomas-wan' ),
            'add_new_item'       => __( 'Add New Testimonial', 'thomas-wan' ),
            'edit_item'          => __( 'Edit Testimonial', 'thomas-wan' ),
            'new_item'           => __( 'New Testimonial', 'thomas-wan' ),
            'view_item'          => __( 'View Testimonial', 'thomas-wan' ),
            'search_items'       => __( 'Search Testimonials', 'thomas-wan' ),
            'not_found'          => __( 'No testimonials found', 'thomas-wan' ),
            'not_found_in_trash' => __( 'No testimonials found in trash', 'thomas-wan' ),
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-format-quote',
        'supports'      => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'       => array( 'slug' => 'testimonials' ),
        'show_in_rest'  => true,
    ) );

    // Practice Areas
    register_post_type( 'practice_area', array(
        'labels' => array(
            'name'               => __( 'Practice Areas', 'thomas-wan' ),
            'singular_name'      => __( 'Practice Area', 'thomas-wan' ),
            'add_new'            => __( 'Add New', 'thomas-wan' ),
            'add_new_item'       => __( 'Add New Practice Area', 'thomas-wan' ),
            'edit_item'          => __( 'Edit Practice Area', 'thomas-wan' ),
            'new_item'           => __( 'New Practice Area', 'thomas-wan' ),
            'view_item'          => __( 'View Practice Area', 'thomas-wan' ),
            'search_items'       => __( 'Search Practice Areas', 'thomas-wan' ),
            'not_found'          => __( 'No practice areas found', 'thomas-wan' ),
            'not_found_in_trash' => __( 'No practice areas found in trash', 'thomas-wan' ),
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-portfolio',
        'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt' ),
        'rewrite'       => array( 'slug' => 'practice-areas' ),
        'show_in_rest'  => true,
    ) );

    // Case Results
    register_post_type( 'case_result', array(
        'labels' => array(
            'name'               => __( 'Case Results', 'thomas-wan' ),
            'singular_name'      => __( 'Case Result', 'thomas-wan' ),
            'add_new'            => __( 'Add New', 'thomas-wan' ),
            'add_new_item'       => __( 'Add New Case Result', 'thomas-wan' ),
            'edit_item'          => __( 'Edit Case Result', 'thomas-wan' ),
            'new_item'           => __( 'New Case Result', 'thomas-wan' ),
            'view_item'          => __( 'View Case Result', 'thomas-wan' ),
            'search_items'       => __( 'Search Case Results', 'thomas-wan' ),
            'not_found'          => __( 'No case results found', 'thomas-wan' ),
            'not_found_in_trash' => __( 'No case results found in trash', 'thomas-wan' ),
        ),
        'public'        => true,
        'has_archive'   => true,
        'menu_icon'     => 'dashicons-awards',
        'supports'      => array( 'title', 'editor' ),
        'rewrite'       => array( 'slug' => 'case-results' ),
        'show_in_rest'  => true,
    ) );

    // Team Members
    register_post_type( 'team_member', array(
        'labels' => array(
            'name'               => __( 'Team Members', 'thomas-wan' ),
            'singular_name'      => __( 'Team Member', 'thomas-wan' ),
            'add_new'            => __( 'Add New', 'thomas-wan' ),
            'add_new_item'       => __( 'Add New Team Member', 'thomas-wan' ),
            'edit_item'          => __( 'Edit Team Member', 'thomas-wan' ),
            'new_item'           => __( 'New Team Member', 'thomas-wan' ),
            'view_item'          => __( 'View Team Member', 'thomas-wan' ),
            'search_items'       => __( 'Search Team Members', 'thomas-wan' ),
            'not_found'          => __( 'No team members found', 'thomas-wan' ),
            'not_found_in_trash' => __( 'No team members found in trash', 'thomas-wan' ),
        ),
        'public'        => true,
        'has_archive'   => false,
        'menu_icon'     => 'dashicons-groups',
        'supports'      => array( 'title', 'editor', 'thumbnail' ),
        'rewrite'       => array( 'slug' => 'team' ),
        'show_in_rest'  => true,
    ) );
}
add_action( 'init', 'thomas_wan_register_post_types' );

/**
 * Add custom meta boxes
 */
function thomas_wan_add_meta_boxes() {
    // Testimonial meta box
    add_meta_box(
        'testimonial_details',
        __( 'Testimonial Details', 'thomas-wan' ),
        'thomas_wan_testimonial_meta_box',
        'testimonial',
        'side'
    );

    // Case Result meta box
    add_meta_box(
        'case_result_details',
        __( 'Case Result Details', 'thomas-wan' ),
        'thomas_wan_case_result_meta_box',
        'case_result',
        'side'
    );

    // Team Member meta box
    add_meta_box(
        'team_member_details',
        __( 'Team Member Details', 'thomas-wan' ),
        'thomas_wan_team_member_meta_box',
        'team_member',
        'side'
    );

    // Practice Area meta box
    add_meta_box(
        'practice_area_details',
        __( 'Practice Area Details', 'thomas-wan' ),
        'thomas_wan_practice_area_meta_box',
        'practice_area',
        'side'
    );
}
add_action( 'add_meta_boxes', 'thomas_wan_add_meta_boxes' );

function thomas_wan_testimonial_meta_box( $post ) {
    wp_nonce_field( 'thomas_wan_testimonial_nonce', 'testimonial_nonce' );
    $client_name = get_post_meta( $post->ID, '_client_name', true );
    $testimonial_date = get_post_meta( $post->ID, '_testimonial_date', true );
    ?>
    <p>
        <label for="client_name"><strong><?php _e( 'Client Name:', 'thomas-wan' ); ?></strong></label><br>
        <input type="text" id="client_name" name="client_name" value="<?php echo esc_attr( $client_name ); ?>" style="width:100%;">
    </p>
    <p>
        <label for="testimonial_date"><strong><?php _e( 'Date (optional):', 'thomas-wan' ); ?></strong></label><br>
        <input type="text" id="testimonial_date" name="testimonial_date" value="<?php echo esc_attr( $testimonial_date ); ?>" style="width:100%;">
    </p>
    <?php
}

function thomas_wan_case_result_meta_box( $post ) {
    wp_nonce_field( 'thomas_wan_case_result_nonce', 'case_result_nonce' );
    $amount = get_post_meta( $post->ID, '_case_amount', true );
    $case_type = get_post_meta( $post->ID, '_case_type', true );
    ?>
    <p>
        <label for="case_amount"><strong><?php _e( 'Settlement/Verdict Amount:', 'thomas-wan' ); ?></strong></label><br>
        <input type="text" id="case_amount" name="case_amount" value="<?php echo esc_attr( $amount ); ?>" placeholder="$6.5 Million" style="width:100%;">
    </p>
    <p>
        <label for="case_type"><strong><?php _e( 'Case Type:', 'thomas-wan' ); ?></strong></label><br>
        <input type="text" id="case_type" name="case_type" value="<?php echo esc_attr( $case_type ); ?>" placeholder="Birth Injury Settlement" style="width:100%;">
    </p>
    <?php
}

function thomas_wan_team_member_meta_box( $post ) {
    wp_nonce_field( 'thomas_wan_team_member_nonce', 'team_member_nonce' );
    $title = get_post_meta( $post->ID, '_member_title', true );
    ?>
    <p>
        <label for="member_title"><strong><?php _e( 'Job Title:', 'thomas-wan' ); ?></strong></label><br>
        <input type="text" id="member_title" name="member_title" value="<?php echo esc_attr( $title ); ?>" placeholder="Founding Partner" style="width:100%;">
    </p>
    <?php
}

function thomas_wan_practice_area_meta_box( $post ) {
    wp_nonce_field( 'thomas_wan_practice_area_nonce', 'practice_area_nonce' );
    $icon = get_post_meta( $post->ID, '_practice_icon', true );
    $cases_list = get_post_meta( $post->ID, '_cases_list', true );
    ?>
    <p>
        <label for="practice_icon"><strong><?php _e( 'Icon (emoji or dashicon):', 'thomas-wan' ); ?></strong></label><br>
        <input type="text" id="practice_icon" name="practice_icon" value="<?php echo esc_attr( $icon ); ?>" placeholder="👶" style="width:100%;">
    </p>
    <p>
        <label for="cases_list"><strong><?php _e( 'Cases We Handle (one per line):', 'thomas-wan' ); ?></strong></label><br>
        <textarea id="cases_list" name="cases_list" style="width:100%;height:150px;"><?php echo esc_textarea( $cases_list ); ?></textarea>
    </p>
    <?php
}

/**
 * Save meta box data
 */
function thomas_wan_save_meta_boxes( $post_id ) {
    // Testimonial
    if ( isset( $_POST['testimonial_nonce'] ) && wp_verify_nonce( $_POST['testimonial_nonce'], 'thomas_wan_testimonial_nonce' ) ) {
        if ( isset( $_POST['client_name'] ) ) {
            update_post_meta( $post_id, '_client_name', sanitize_text_field( $_POST['client_name'] ) );
        }
        if ( isset( $_POST['testimonial_date'] ) ) {
            update_post_meta( $post_id, '_testimonial_date', sanitize_text_field( $_POST['testimonial_date'] ) );
        }
    }

    // Case Result
    if ( isset( $_POST['case_result_nonce'] ) && wp_verify_nonce( $_POST['case_result_nonce'], 'thomas_wan_case_result_nonce' ) ) {
        if ( isset( $_POST['case_amount'] ) ) {
            update_post_meta( $post_id, '_case_amount', sanitize_text_field( $_POST['case_amount'] ) );
        }
        if ( isset( $_POST['case_type'] ) ) {
            update_post_meta( $post_id, '_case_type', sanitize_text_field( $_POST['case_type'] ) );
        }
    }

    // Team Member
    if ( isset( $_POST['team_member_nonce'] ) && wp_verify_nonce( $_POST['team_member_nonce'], 'thomas_wan_team_member_nonce' ) ) {
        if ( isset( $_POST['member_title'] ) ) {
            update_post_meta( $post_id, '_member_title', sanitize_text_field( $_POST['member_title'] ) );
        }
    }

    // Practice Area
    if ( isset( $_POST['practice_area_nonce'] ) && wp_verify_nonce( $_POST['practice_area_nonce'], 'thomas_wan_practice_area_nonce' ) ) {
        if ( isset( $_POST['practice_icon'] ) ) {
            update_post_meta( $post_id, '_practice_icon', sanitize_text_field( $_POST['practice_icon'] ) );
        }
        if ( isset( $_POST['cases_list'] ) ) {
            update_post_meta( $post_id, '_cases_list', sanitize_textarea_field( $_POST['cases_list'] ) );
        }
    }
}
add_action( 'save_post', 'thomas_wan_save_meta_boxes' );

/**
 * Theme Customizer
 */
function thomas_wan_customize_register( $wp_customize ) {
    // Contact Information Section
    $wp_customize->add_section( 'thomas_wan_contact', array(
        'title'    => __( 'Contact Information', 'thomas-wan' ),
        'priority' => 30,
    ) );

    // Phone Number
    $wp_customize->add_setting( 'tw_phone', array(
        'default'           => '(713) 529-1177',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'tw_phone', array(
        'label'   => __( 'Phone Number', 'thomas-wan' ),
        'section' => 'thomas_wan_contact',
        'type'    => 'text',
    ) );

    // Address
    $wp_customize->add_setting( 'tw_address', array(
        'default'           => '440 Louisiana Street, Suite 1500, Houston, TX 77002',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'tw_address', array(
        'label'   => __( 'Address', 'thomas-wan' ),
        'section' => 'thomas_wan_contact',
        'type'    => 'text',
    ) );

    // Email
    $wp_customize->add_setting( 'tw_email', array(
        'default'           => 'info@thomasandwan.com',
        'sanitize_callback' => 'sanitize_email',
    ) );
    $wp_customize->add_control( 'tw_email', array(
        'label'   => __( 'Email', 'thomas-wan' ),
        'section' => 'thomas_wan_contact',
        'type'    => 'email',
    ) );

    // Social Media Section
    $wp_customize->add_section( 'thomas_wan_social', array(
        'title'    => __( 'Social Media', 'thomas-wan' ),
        'priority' => 35,
    ) );

    $social_networks = array( 'facebook', 'twitter', 'linkedin', 'instagram' );
    foreach ( $social_networks as $network ) {
        $wp_customize->add_setting( 'tw_' . $network, array(
            'default'           => '',
            'sanitize_callback' => 'esc_url_raw',
        ) );
        $wp_customize->add_control( 'tw_' . $network, array(
            'label'   => ucfirst( $network ) . ' URL',
            'section' => 'thomas_wan_social',
            'type'    => 'url',
        ) );
    }

    // Homepage Sections
    $wp_customize->add_section( 'thomas_wan_homepage', array(
        'title'    => __( 'Homepage Settings', 'thomas-wan' ),
        'priority' => 40,
    ) );

    // Hero Headline
    $wp_customize->add_setting( 'tw_hero_headline', array(
        'default'           => 'Dedicated to Justice for Your Family.',
        'sanitize_callback' => 'sanitize_text_field',
    ) );
    $wp_customize->add_control( 'tw_hero_headline', array(
        'label'   => __( 'Hero Headline', 'thomas-wan' ),
        'section' => 'thomas_wan_homepage',
        'type'    => 'text',
    ) );

    // Hero Subheadline
    $wp_customize->add_setting( 'tw_hero_subheadline', array(
        'default'           => 'With over 60+ years of combined experience in medical malpractice, Linda Thomas and Michelle Wan fight for the answers and compensation you deserve.',
        'sanitize_callback' => 'sanitize_textarea_field',
    ) );
    $wp_customize->add_control( 'tw_hero_subheadline', array(
        'label'   => __( 'Hero Subheadline', 'thomas-wan' ),
        'section' => 'thomas_wan_homepage',
        'type'    => 'textarea',
    ) );
}
add_action( 'customize_register', 'thomas_wan_customize_register' );

/**
 * Helper function to get theme option
 */
function thomas_wan_get_option( $key, $default = '' ) {
    return get_theme_mod( $key, $default );
}

/**
 * Include additional files
 */
require_once THOMAS_WAN_DIR . '/inc/demo-import.php';

/**
 * Custom excerpt length
 */
function thomas_wan_excerpt_length( $length ) {
    return 25;
}
add_filter( 'excerpt_length', 'thomas_wan_excerpt_length' );

/**
 * Custom excerpt more
 */
function thomas_wan_excerpt_more( $more ) {
    return '...';
}
add_filter( 'excerpt_more', 'thomas_wan_excerpt_more' );

/**
 * Add body classes
 */
function thomas_wan_body_classes( $classes ) {
    if ( is_front_page() ) {
        $classes[] = 'home-page';
    }
    return $classes;
}
add_filter( 'body_class', 'thomas_wan_body_classes' );
