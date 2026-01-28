<?php
/**
 * Template Name: Contact Page
 */
get_header();
?>

<main>
    <!-- Contact Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Get In Touch</span>
            <h1 class="section-title">Contact <span class="highlight">Thomas & Wan</span></h1>
            <p class="section-description">
                We are here to listen and help. Reach out for a free, confidential consultation about your case.
            </p>
        </div>
    </section>

    <!-- Contact Content -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <!-- Contact Form -->
                <div>
                    <h2 style="margin-bottom: 24px;">Request a Free Consultation</h2>
                    <p style="color: var(--tw-text-muted); margin-bottom: 32px;">
                        Fill out the form below and one of our attorneys will contact you within 24 hours 
                        to discuss your case. All consultations are completely confidential.
                    </p>
                    
                    <form class="contact-form" method="post" action="">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            <div class="form-group">
                                <label for="first_name">First Name *</label>
                                <input type="text" id="first_name" name="first_name" required>
                            </div>
                            <div class="form-group">
                                <label for="last_name">Last Name *</label>
                                <input type="text" id="last_name" name="last_name" required>
                            </div>
                        </div>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="phone">Phone Number *</label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="case_type">Type of Case *</label>
                            <select id="case_type" name="case_type" required>
                                <option value="">Select Case Type</option>
                                <option value="birth-injury">Birth Injury</option>
                                <option value="surgical-error">Surgical Error</option>
                                <option value="brain-injury">Brain Injury</option>
                                <option value="misdiagnosis">Misdiagnosis</option>
                                <option value="wrongful-death">Wrongful Death</option>
                                <option value="other">Other Medical Malpractice</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="message">Tell Us About Your Case *</label>
                            <textarea id="message" name="message" rows="6" placeholder="Please provide a brief description of what happened and how we can help you..." required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label style="display: flex; align-items: flex-start; gap: 12px; text-transform: none; font-weight: normal;">
                                <input type="checkbox" name="consent" required style="width: auto; margin-top: 4px;">
                                <span>I understand that contacting Thomas & Wan does not create an attorney-client relationship. I consent to receive communications regarding my inquiry.</span>
                            </label>
                        </div>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Request</button>
                    </form>
                </div>

                <!-- Contact Info Sidebar -->
                <aside class="blog-sidebar">
                    <div class="sidebar-widget sidebar-cta">
                        <h3>Call Us Now</h3>
                        <p>Available 24/7 for emergencies. We're here when you need us most.</p>
                        <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_theme_mod('contact_phone', '713-529-1177'))); ?>" class="btn btn-primary" style="width: 100%; margin-bottom: 16px;">
                            <?php echo thomaswan_icon('phone'); ?> Call Now
                        </a>
                        <p style="text-align: center; font-size: 1.5rem; font-weight: 700; color: var(--tw-secondary); margin: 0;">
                            (<?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?>)
                        </p>
                    </div>
                    
                    <div class="sidebar-widget">
                        <h3>Office Location</h3>
                        <div style="display: flex; gap: 12px; margin-bottom: 16px;">
                            <?php echo thomaswan_icon('map-pin'); ?>
                            <div>
                                <p style="margin: 0;"><?php echo nl2br(esc_html(get_theme_mod('contact_address', "1710 Sunset Blvd\nHouston, TX 77005"))); ?></p>
                            </div>
                        </div>
                        
                        <h3 style="margin-top: 24px;">Office Hours</h3>
                        <div style="display: flex; gap: 12px;">
                            <?php echo thomaswan_icon('clock'); ?>
                            <div>
                                <p style="margin: 0;">Mon - Fri: 8:00 AM - 6:00 PM</p>
                                <p style="margin: 0;">Weekends: By Appointment</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="sidebar-widget">
                        <h3>Email Us</h3>
                        <div style="display: flex; gap: 12px;">
                            <?php echo thomaswan_icon('mail'); ?>
                            <a href="mailto:<?php echo esc_attr(get_theme_mod('contact_email', 'info@thomasandwan.com')); ?>" style="color: var(--tw-secondary);">
                                <?php echo esc_html(get_theme_mod('contact_email', 'info@thomasandwan.com')); ?>
                            </a>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <!-- Map Section -->
    <section class="section-alt">
        <div class="container">
            <div style="background: var(--tw-primary); height: 400px; display: flex; align-items: center; justify-content: center; color: white;">
                <p style="text-align: center;">
                    <?php echo thomaswan_icon('map-pin'); ?><br>
                    <strong>Map Placeholder</strong><br>
                    Add Google Maps embed code here
                </p>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
