</main>

<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            
            <div class="footer-about">
                <div class="footer-logo">
                    <?php if ( has_custom_logo() ) : ?>
                        <?php the_custom_logo(); ?>
                    <?php else : ?>
                        <span style="font-family: Georgia, serif; font-size: 24px; color: #fff;">
                            <?php bloginfo( 'name' ); ?>
                        </span>
                    <?php endif; ?>
                </div>
                <p>Houston's trusted women-owned medical malpractice law firm. We fight for families who have been harmed by medical negligence.</p>
            </div>

            <div class="footer-nav">
                <h4 class="footer-heading"><?php _e( 'Quick Links', 'thomas-wan' ); ?></h4>
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'footer',
                    'menu_class'     => 'footer-links',
                    'container'      => false,
                    'fallback_cb'    => false,
                    'depth'          => 1,
                ) );
                ?>
            </div>

            <div class="footer-practice">
                <h4 class="footer-heading"><?php _e( 'Practice Areas', 'thomas-wan' ); ?></h4>
                <ul class="footer-links">
                    <li><a href="<?php echo esc_url( home_url( '/practice-areas/birth-injuries/' ) ); ?>">Birth Injuries</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/practice-areas/surgical-errors/' ) ); ?>">Surgical Errors</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/practice-areas/brain-injuries/' ) ); ?>">Brain Injuries</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/practice-areas/misdiagnosis/' ) ); ?>">Misdiagnosis</a></li>
                    <li><a href="<?php echo esc_url( home_url( '/practice-areas/wrongful-death/' ) ); ?>">Wrongful Death</a></li>
                </ul>
            </div>

            <div class="footer-contact">
                <h4 class="footer-heading"><?php _e( 'Contact Us', 'thomas-wan' ); ?></h4>
                
                <?php $phone = thomas_wan_get_option( 'tw_phone', '(713) 529-1177' ); ?>
                <div class="footer-contact-item">
                    <strong>Phone:</strong>
                    <a href="tel:<?php echo preg_replace( '/[^0-9]/', '', $phone ); ?>" style="color: #F48400;">
                        <?php echo esc_html( $phone ); ?>
                    </a>
                </div>
                
                <?php $address = thomas_wan_get_option( 'tw_address', '440 Louisiana Street, Suite 1500, Houston, TX 77002' ); ?>
                <div class="footer-contact-item">
                    <strong>Address:</strong>
                    <span><?php echo esc_html( $address ); ?></span>
                </div>
                
                <?php $email = thomas_wan_get_option( 'tw_email', 'info@thomasandwan.com' ); ?>
                <div class="footer-contact-item">
                    <strong>Email:</strong>
                    <a href="mailto:<?php echo esc_attr( $email ); ?>" style="color: #F48400;">
                        <?php echo esc_html( $email ); ?>
                    </a>
                </div>
            </div>

        </div>

        <div class="footer-bottom">
            <div class="footer-copyright">
                &copy; <?php echo date( 'Y' ); ?> <?php bloginfo( 'name' ); ?>. All Rights Reserved.
            </div>
            <div class="footer-legal">
                <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>">Privacy Policy</a>
                <a href="<?php echo esc_url( home_url( '/disclaimer/' ) ); ?>">Disclaimer</a>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
});
</script>

</body>
</html>
