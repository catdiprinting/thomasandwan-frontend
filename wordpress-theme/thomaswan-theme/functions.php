<?php
/**
 * Thomas & Wan Theme Functions
 * Version 2.0 - Matching React Design
 */

// Theme Setup
function thomaswan_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
    add_theme_support('custom-logo', array(
        'height' => 60,
        'width' => 200,
        'flex-height' => true,
        'flex-width' => true,
    ));
    
    register_nav_menus(array(
        'primary' => 'Primary Menu',
        'utility' => 'Utility Bar Menu',
        'footer' => 'Footer Menu',
    ));
    
    add_image_size('blog-card', 600, 340, true);
    add_image_size('hero-image', 800, 1000, true);
    add_image_size('team-photo', 600, 800, true);
}
add_action('after_setup_theme', 'thomaswan_setup');

// Enqueue Scripts and Styles
function thomaswan_scripts() {
    wp_enqueue_style('thomaswan-fonts', 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lato:wght@300;400;700&family=Crimson+Text:ital@0;1&display=swap', array(), null);
    wp_enqueue_style('thomaswan-style', get_stylesheet_uri(), array(), '2.0');
    
    wp_enqueue_script('thomaswan-scripts', get_template_directory_uri() . '/js/scripts.js', array(), '2.0', true);
}
add_action('wp_enqueue_scripts', 'thomaswan_scripts');

// Register Sidebars
function thomaswan_widgets_init() {
    register_sidebar(array(
        'name' => 'Blog Sidebar',
        'id' => 'blog-sidebar',
        'before_widget' => '<div class="sidebar-widget">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ));
}
add_action('widgets_init', 'thomaswan_widgets_init');

// Customizer Settings
function thomaswan_customize_register($wp_customize) {
    // Hero Section
    $wp_customize->add_section('thomaswan_hero', array(
        'title' => 'Hero Section',
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('hero_label', array('default' => 'Medical Malpractice Attorneys'));
    $wp_customize->add_control('hero_label', array(
        'label' => 'Hero Label',
        'section' => 'thomaswan_hero',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('hero_title', array('default' => 'Dedicated to Justice for Your Family.'));
    $wp_customize->add_control('hero_title', array(
        'label' => 'Hero Title',
        'section' => 'thomaswan_hero',
        'type' => 'textarea',
    ));
    
    $wp_customize->add_setting('hero_description', array('default' => 'With over 60+ years of combined experience in medical malpractice, Linda Thomas and Michelle Wan fight for the answers and compensation you deserve.'));
    $wp_customize->add_control('hero_description', array(
        'label' => 'Hero Description',
        'section' => 'thomaswan_hero',
        'type' => 'textarea',
    ));
    
    $wp_customize->add_setting('hero_image');
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_image', array(
        'label' => 'Hero Image',
        'section' => 'thomaswan_hero',
    )));
    
    // Contact Info Section
    $wp_customize->add_section('thomaswan_contact', array(
        'title' => 'Contact Information',
        'priority' => 35,
    ));
    
    $wp_customize->add_setting('contact_phone', array('default' => '713-529-1177'));
    $wp_customize->add_control('contact_phone', array(
        'label' => 'Phone Number',
        'section' => 'thomaswan_contact',
        'type' => 'text',
    ));
    
    $wp_customize->add_setting('contact_email', array('default' => 'info@thomasandwan.com'));
    $wp_customize->add_control('contact_email', array(
        'label' => 'Email',
        'section' => 'thomaswan_contact',
        'type' => 'email',
    ));
    
    $wp_customize->add_setting('contact_address', array('default' => '1710 Sunset Blvd, Houston, TX 77005'));
    $wp_customize->add_control('contact_address', array(
        'label' => 'Address',
        'section' => 'thomaswan_contact',
        'type' => 'textarea',
    ));
    
    // Stats Section
    $wp_customize->add_section('thomaswan_stats', array(
        'title' => 'Statistics',
        'priority' => 40,
    ));
    
    $wp_customize->add_setting('stat_1_number', array('default' => '55+'));
    $wp_customize->add_control('stat_1_number', array(
        'label' => 'Stat 1 Number',
        'section' => 'thomaswan_stats',
    ));
    $wp_customize->add_setting('stat_1_label', array('default' => 'Years Combined Experience'));
    $wp_customize->add_control('stat_1_label', array(
        'label' => 'Stat 1 Label',
        'section' => 'thomaswan_stats',
    ));
    
    $wp_customize->add_setting('stat_2_number', array('default' => '$50M+'));
    $wp_customize->add_control('stat_2_number', array(
        'label' => 'Stat 2 Number',
        'section' => 'thomaswan_stats',
    ));
    $wp_customize->add_setting('stat_2_label', array('default' => 'Recovered for Clients'));
    $wp_customize->add_control('stat_2_label', array(
        'label' => 'Stat 2 Label',
        'section' => 'thomaswan_stats',
    ));
    
    $wp_customize->add_setting('stat_3_number', array('default' => '100%'));
    $wp_customize->add_control('stat_3_number', array(
        'label' => 'Stat 3 Number',
        'section' => 'thomaswan_stats',
    ));
    $wp_customize->add_setting('stat_3_label', array('default' => 'Medical Malpractice Focus'));
    $wp_customize->add_control('stat_3_label', array(
        'label' => 'Stat 3 Label',
        'section' => 'thomaswan_stats',
    ));
}
add_action('customize_register', 'thomaswan_customize_register');

// Custom excerpt length
function thomaswan_excerpt_length($length) {
    return 25;
}
add_filter('excerpt_length', 'thomaswan_excerpt_length');

function thomaswan_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'thomaswan_excerpt_more');

// Enable CORS for headless frontend
add_action('init', function() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
        header('Access-Control-Allow-Methods: GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }
});

// Add category to REST API response
function thomaswan_rest_prepare_post($response, $post, $request) {
    $categories = get_the_category($post->ID);
    if (!empty($categories)) {
        $response->data['category_name'] = $categories[0]->name;
    }
    return $response;
}
add_filter('rest_prepare_post', 'thomaswan_rest_prepare_post', 10, 3);

// SVG Icons Helper
function thomaswan_icon($name) {
    $icons = array(
        'phone' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
        'mail' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>',
        'map-pin' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>',
        'clock' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>',
        'menu' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>',
        'x' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>',
        'arrow-right' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>',
        'arrow-up-right' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"></path><path d="M7 17 17 7"></path></svg>',
        'star' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
        'quote' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>',
        'chevron-down' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"></path></svg>',
        'baby' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"></path><path d="M15 12h.01"></path><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"></path><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path></svg>',
        'stethoscope' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>',
        'brain' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"></path><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"></path></svg>',
        'activity' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
        'heart-pulse' => '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path></svg>',
    );
    
    return isset($icons[$name]) ? $icons[$name] : '';
}

// Practice Areas Data
function thomaswan_get_practice_areas() {
    return array(
        array(
            'title' => 'Birth Injuries',
            'icon' => 'baby',
            'desc' => 'Cerebral palsy, hypoxia, shoulder dystocia, and preventable birth trauma.',
            'link' => '/practice-areas/birth-injuries/',
        ),
        array(
            'title' => 'Surgical Errors',
            'icon' => 'stethoscope',
            'desc' => 'Mistakes during surgery, anesthesia errors, and post-operative negligence.',
            'link' => '/practice-areas/surgical-errors/',
        ),
        array(
            'title' => 'Brain Injuries',
            'icon' => 'brain',
            'desc' => 'Traumatic brain injuries resulting from medical negligence or malpractice.',
            'link' => '/practice-areas/brain-injuries/',
        ),
        array(
            'title' => 'Misdiagnosis',
            'icon' => 'activity',
            'desc' => 'Failure to diagnose cancer, heart attacks, strokes, and critical conditions.',
            'link' => '/practice-areas/misdiagnosis/',
        ),
        array(
            'title' => 'Wrongful Death',
            'icon' => 'heart-pulse',
            'desc' => 'Seeking justice for the loss of a loved one due to medical carelessness.',
            'link' => '/practice-areas/wrongful-death/',
        ),
    );
}

// Testimonials Data
function thomaswan_get_testimonials() {
    return array(
        array(
            'name' => 'Alyssa',
            'label' => 'Verified Client',
            'text' => 'I had a hard time coming to terms with what happened to my baby at birth... and as I was looking for a Medical Malpractice attorney, her face was so welcoming. I instantly relaxed and what helped me thru my childbirth complications was she said it wasn\'t my fault.',
            'rating' => 5,
        ),
        array(
            'name' => 'Lisa A.',
            'label' => 'Verified Client',
            'text' => 'Thomas & Wan did a great job representing me and my family. The lawyers went to work right away and through research found out critical information. They were aggressive and fought hard for us. I highly recommend them.',
            'rating' => 5,
        ),
        array(
            'name' => 'Sarah M.',
            'label' => 'Verified Client',
            'text' => 'Linda Thomas and Michelle Wan are the dedicated attorneys you need. They explained everything clearly and were always available to answer my questions. Their expertise in birth injury cases is unmatched.',
            'rating' => 5,
        ),
    );
}

// Results Data
function thomaswan_get_results() {
    return array(
        array(
            'amount' => '$6.5 Million',
            'type' => 'Birth Injury Settlement',
            'desc' => 'Settlement for a child who suffered brain damage due to delayed delivery.',
        ),
        array(
            'amount' => '$2.1 Million',
            'type' => 'Surgical Error',
            'desc' => 'Verdict for a patient who suffered permanent nerve damage during routine surgery.',
        ),
        array(
            'amount' => '$4.8 Million',
            'type' => 'Wrongful Death',
            'desc' => 'Settlement for a family who lost a mother due to misdiagnosis of heart condition.',
        ),
    );
}

// FAQs Data
function thomaswan_get_faqs() {
    return array(
        array(
            'question' => 'Do I have a case?',
            'answer' => 'The first step is for us to help you get a copy of all your medical records. Then we work with our team of expert doctors and nurses to review the records to let us know if you have a case.',
        ),
        array(
            'question' => 'What kind of help can my family receive?',
            'answer' => 'If we feel you have a case, we will have our team of experts determine how much money it will take to pay for the past medical bills and future quality medical care for you or your loved one for the rest of his or her life.',
        ),
        array(
            'question' => 'How much do you charge?',
            'answer' => 'We work on a contingency basis. This means that you only pay a percentage for our services if we win a verdict or settlement for your family. If no recovery is made, you pay nothing.',
        ),
        array(
            'question' => 'Why should we hire you?',
            'answer' => 'There are very few attorneys in Texas who specialize in medical malpractice, and those are the only kind of cases we do. Linda Thomas and Michelle Wan have over 55 years of combined experience. If we take your case, we work on your case ourselves; we don\'t "flip" it to another firm.',
        ),
    );
}

// Team Data
function thomaswan_get_team() {
    return array(
        array(
            'name' => 'Linda Laurent Thomas',
            'title' => 'Partner',
            'bio' => 'Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. She specializes in cases involving personal injuries, wrongful death, and medical malpractice.',
            'image' => get_template_directory_uri() . '/images/partner-thomas.jpg',
        ),
        array(
            'name' => 'Michelle W. Wan',
            'title' => 'Partner',
            'bio' => 'Michelle W. Wan has worked exclusively representing clients in personal injury matters. Like Thomas, Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others.',
            'image' => get_template_directory_uri() . '/images/partner-wan.jpg',
        ),
    );
}
