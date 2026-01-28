<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- Utility Bar -->
<div class="utility-bar">
    <div class="container">
        <div class="utility-bar-left">
            <a href="mailto:<?php echo esc_attr(get_theme_mod('contact_email', 'info@thomasandwan.com')); ?>">
                <?php echo thomaswan_icon('mail'); ?>
                <?php echo esc_html(get_theme_mod('contact_email', 'info@thomasandwan.com')); ?>
            </a>
            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_theme_mod('contact_phone', '713-529-1177'))); ?>">
                <?php echo thomaswan_icon('phone'); ?>
                (<?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?>)
            </a>
            <span>
                <?php echo thomaswan_icon('map-pin'); ?>
                Houston, TX
            </span>
        </div>
        <div class="utility-bar-right">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'utility',
                'container' => false,
                'fallback_cb' => function() {
                    echo '<a href="' . home_url('/about/') . '">About Us</a>';
                    echo '<a href="' . home_url('/contact/') . '">Contact</a>';
                },
                'items_wrap' => '%3$s',
                'walker' => new class extends Walker_Nav_Menu {
                    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
                        $output .= '<a href="' . esc_url($item->url) . '">' . esc_html($item->title) . '</a>';
                    }
                    function end_el(&$output, $item, $depth = 0, $args = null) {}
                    function start_lvl(&$output, $depth = 0, $args = null) {}
                    function end_lvl(&$output, $depth = 0, $args = null) {}
                },
            ));
            ?>
        </div>
    </div>
</div>

<!-- Main Header -->
<header class="site-header" id="site-header">
    <div class="container">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo">
            <?php if (has_custom_logo()): ?>
                <?php the_custom_logo(); ?>
            <?php else: ?>
                <img src="<?php echo get_template_directory_uri(); ?>/images/logo.webp" alt="<?php bloginfo('name'); ?>">
            <?php endif; ?>
        </a>
        
        <nav class="main-navigation">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => false,
                'fallback_cb' => function() {
                    echo '<ul>';
                    echo '<li class="' . (is_front_page() ? 'current-menu-item' : '') . '"><a href="' . home_url('/') . '">Home</a></li>';
                    echo '<li class="menu-item-has-children"><a href="' . home_url('/practice-areas/') . '">Practice Areas</a>';
                    echo '<ul class="sub-menu">';
                    echo '<li><a href="' . home_url('/practice-areas/birth-injuries/') . '">Birth Injuries</a></li>';
                    echo '<li><a href="' . home_url('/practice-areas/surgical-errors/') . '">Surgical Errors</a></li>';
                    echo '<li><a href="' . home_url('/practice-areas/medical-malpractice/') . '">Medical Malpractice</a></li>';
                    echo '</ul></li>';
                    echo '<li><a href="' . home_url('/testimonials/') . '">Testimonials</a></li>';
                    echo '<li><a href="' . home_url('/blog/') . '">Blog</a></li>';
                    echo '</ul>';
                },
            ));
            ?>
            <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary header-cta">Free Case Review</a>
        </nav>
        
        <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle mobile menu">
            <?php echo thomaswan_icon('menu'); ?>
        </button>
    </div>
    
    <!-- Mobile Navigation -->
    <nav class="mobile-navigation" id="mobile-navigation">
        <?php
        wp_nav_menu(array(
            'theme_location' => 'primary',
            'container' => false,
            'fallback_cb' => function() {
                echo '<ul>';
                echo '<li><a href="' . home_url('/') . '">Home</a></li>';
                echo '<li><a href="' . home_url('/practice-areas/') . '">Practice Areas</a>';
                echo '<ul class="sub-menu">';
                echo '<li><a href="' . home_url('/practice-areas/birth-injuries/') . '">Birth Injuries</a></li>';
                echo '<li><a href="' . home_url('/practice-areas/surgical-errors/') . '">Surgical Errors</a></li>';
                echo '</ul></li>';
                echo '<li><a href="' . home_url('/testimonials/') . '">Testimonials</a></li>';
                echo '<li><a href="' . home_url('/blog/') . '">Blog</a></li>';
                echo '<li><a href="' . home_url('/about/') . '">About Us</a></li>';
                echo '<li><a href="' . home_url('/contact/') . '">Contact</a></li>';
                echo '</ul>';
            },
        ));
        ?>
        <div style="padding: 16px 0; border-top: 1px solid #f1f5f9; margin-top: 16px;">
            <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_theme_mod('contact_phone', '713-529-1177'))); ?>" style="display: flex; align-items: center; gap: 8px; color: var(--tw-primary); font-weight: 500; font-size: 18px; margin-bottom: 12px;">
                <?php echo thomaswan_icon('phone'); ?> (<?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?>)
            </a>
            <a href="mailto:<?php echo esc_attr(get_theme_mod('contact_email', 'info@thomasandwan.com')); ?>" style="display: flex; align-items: center; gap: 8px; color: var(--tw-primary); font-weight: 500; font-size: 18px;">
                <?php echo thomaswan_icon('mail'); ?> <?php echo esc_html(get_theme_mod('contact_email', 'info@thomasandwan.com')); ?>
            </a>
        </div>
        <a href="<?php echo esc_url(home_url('/contact/')); ?>" class="btn btn-primary mobile-nav-cta">Call Now</a>
    </nav>
</header>
