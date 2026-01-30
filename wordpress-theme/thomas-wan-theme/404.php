<?php
/**
 * 404 Page Template
 *
 * @package Thomas_Wan
 */

get_header();
?>

<div class="page-hero">
    <div class="container">
        <h1>Page Not Found</h1>
    </div>
</div>

<div class="section">
    <div class="container text-center">
        <div style="max-width: 600px; margin: 0 auto;">
            <p class="lead">Sorry, we couldn't find the page you're looking for. It may have been moved or deleted.</p>
            
            <div style="margin-top: 30px;">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary">Return to Homepage</a>
            </div>
            
            <p style="margin-top: 40px; color: #6B7280;">
                Need help? Call us at 
                <?php $phone = thomas_wan_get_option( 'tw_phone', '(713) 529-1177' ); ?>
                <a href="tel:<?php echo preg_replace( '/[^0-9]/', '', $phone ); ?>" style="color: #F48400; font-weight: 700;">
                    <?php echo esc_html( $phone ); ?>
                </a>
            </p>
        </div>
    </div>
</div>

<?php get_footer(); ?>
