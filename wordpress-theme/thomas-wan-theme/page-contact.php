<?php
/**
 * Template Name: Contact Page
 *
 * @package Thomas_Wan
 */

get_header();
?>

<div class="page-hero">
    <div class="container">
        <span class="section-label">Get In Touch</span>
        <h1>Contact <em>Thomas & Wan</em></h1>
        <p>Schedule your free consultation today. We're here to help.</p>
    </div>
</div>

<section class="section bg-white">
    <div class="container">
        <div class="grid grid-2" style="gap: 60px;">
            
            <div class="contact-info">
                <h2>Get Your Free Case Review</h2>
                <p class="lead">If you or a loved one has been harmed by medical negligence, we're here to help. Contact us today for a free, confidential consultation.</p>
                
                <div style="margin: 40px 0; padding: 30px; background: #F9F7F5; border-left: 4px solid #F48400;">
                    <h3 style="margin-bottom: 20px;">Contact Information</h3>
                    
                    <?php $phone = thomas_wan_get_option( 'tw_phone', '(713) 529-1177' ); ?>
                    <p style="margin-bottom: 15px;">
                        <strong>Phone:</strong><br>
                        <a href="tel:<?php echo preg_replace( '/[^0-9]/', '', $phone ); ?>" style="color: #F48400; font-size: 24px; font-weight: 700;">
                            <?php echo esc_html( $phone ); ?>
                        </a>
                    </p>
                    
                    <?php $email = thomas_wan_get_option( 'tw_email', 'info@thomasandwan.com' ); ?>
                    <p style="margin-bottom: 15px;">
                        <strong>Email:</strong><br>
                        <a href="mailto:<?php echo esc_attr( $email ); ?>" style="color: #F48400;">
                            <?php echo esc_html( $email ); ?>
                        </a>
                    </p>
                    
                    <?php $address = thomas_wan_get_option( 'tw_address', '440 Louisiana Street, Suite 1500, Houston, TX 77002' ); ?>
                    <p style="margin-bottom: 0;">
                        <strong>Office Address:</strong><br>
                        <?php echo esc_html( $address ); ?>
                    </p>
                </div>
                
                <h3>Office Hours</h3>
                <p>Monday - Friday: 8:30 AM - 5:30 PM<br>
                <strong>Available 24/7 for emergencies</strong></p>
            </div>
            
            <div class="contact-form-wrapper">
                <div class="contact-form">
                    <h3 style="margin-bottom: 25px;">Send Us a Message</h3>
                    
                    <?php 
                    // Check if Contact Form 7 is active
                    if ( shortcode_exists( 'contact-form-7' ) ) {
                        // You'll need to update this shortcode ID after creating your form in CF7
                        echo do_shortcode( '[contact-form-7 id="YOUR_FORM_ID" title="Contact Form"]' );
                    } else {
                        // Fallback form
                    ?>
                    <form action="#" method="post">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <div>
                                <label for="name">Your Name *</label>
                                <input type="text" id="name" name="name" required>
                            </div>
                            <div>
                                <label for="phone">Phone *</label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>
                        </div>
                        
                        <label for="email">Email *</label>
                        <input type="email" id="email" name="email" required>
                        
                        <label for="message">Tell Us About Your Case</label>
                        <textarea id="message" name="message" rows="5" placeholder="Briefly describe what happened..."></textarea>
                        
                        <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">
                            Get My Free Case Review
                        </button>
                        
                        <p style="text-align: center; font-size: 14px; color: #6B7280; margin-top: 15px;">
                            Your information is confidential. No fee unless we win your case.
                        </p>
                    </form>
                    <?php } ?>
                </div>
            </div>
            
        </div>
    </div>
</section>

<!-- Map Section -->
<section class="section-sm bg-light">
    <div class="container">
        <div style="background: #e5e7eb; height: 400px; display: flex; align-items: center; justify-content: center; color: #6B7280;">
            <!-- Add Google Maps embed code here -->
            <p>Google Maps Embed - 440 Louisiana Street, Suite 1500, Houston, TX 77002</p>
        </div>
    </div>
</section>

<?php get_footer(); ?>
