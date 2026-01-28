<footer class="site-footer">
    <div class="container">
        <div class="footer-grid">
            
            <!-- Contact Info -->
            <div class="footer-info">
                <div class="site-logo">
                    <?php if (has_custom_logo()): ?>
                        <?php the_custom_logo(); ?>
                    <?php else: ?>
                        <img src="<?php echo get_template_directory_uri(); ?>/images/logo.webp" alt="<?php bloginfo('name'); ?>">
                    <?php endif; ?>
                </div>
                <p class="footer-tagline">Attorneys at Law</p>
                
                <p>We work on a contingency basis. This means you only pay a percentage for our services if we win a verdict or settlement for your family.</p>

                <div class="footer-contact-list">
                    <div class="footer-contact-item">
                        <?php echo thomaswan_icon('phone'); ?>
                        <div>
                            <h4>Phone</h4>
                            <p><?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?></p>
                            <p class="small">Available 24/7 for emergencies</p>
                        </div>
                    </div>
                    
                    <div class="footer-contact-item">
                        <?php echo thomaswan_icon('map-pin'); ?>
                        <div>
                            <h4>Office</h4>
                            <p><?php echo nl2br(esc_html(get_theme_mod('contact_address', "1710 Sunset Blvd\nHouston, TX 77005"))); ?></p>
                        </div>
                    </div>

                    <div class="footer-contact-item">
                        <?php echo thomaswan_icon('clock'); ?>
                        <div>
                            <h4>Hours</h4>
                            <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                            <p>Weekends: By Appointment</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contact Form -->
            <div class="footer-form-wrapper">
                <h3>Request Free Consultation</h3>
                <form class="footer-form" method="post" action="">
                    <div class="form-group">
                        <input type="text" name="name" placeholder="Your Name *" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="phone" placeholder="Phone Number *" required>
                    </div>
                    <div class="form-group">
                        <input type="email" name="email" placeholder="Email Address *" required>
                    </div>
                    <div class="form-group">
                        <textarea name="message" placeholder="Briefly describe your situation..."></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit Request</button>
                </form>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; <?php echo date('Y'); ?> Thomas & Wan, LLP. All Rights Reserved.</p>
            <div class="footer-links">
                <a href="<?php echo home_url('/privacy-policy/'); ?>">Privacy Policy</a>
                <a href="<?php echo home_url('/disclaimer/'); ?>">Disclaimer</a>
                <a href="<?php echo home_url('/sitemap/'); ?>">Site Map</a>
            </div>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>

<script>
// Mobile menu toggle
document.getElementById('mobile-menu-toggle').addEventListener('click', function() {
    document.getElementById('mobile-navigation').classList.toggle('active');
});

// Sticky header
window.addEventListener('scroll', function() {
    const header = document.getElementById('site-header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(function(button) {
    button.addEventListener('click', function() {
        const item = this.parentElement;
        const wasActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(function(i) {
            i.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});
</script>
</body>
</html>
