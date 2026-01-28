<?php
/**
 * Template Name: Practice Areas
 */
get_header();
?>

<main>
    <!-- Practice Areas Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Our Expertise</span>
            <h1 class="section-title">Medical Malpractice <span class="highlight">Practice Areas</span></h1>
            <p class="section-description">
                We focus exclusively on medical malpractice cases. This specialization allows us to build 
                deep expertise and deliver better results for our clients.
            </p>
        </div>
    </section>

    <!-- Practice Areas Grid -->
    <section class="section">
        <div class="container">
            <div class="practice-areas-grid">
                <?php 
                $practices = thomaswan_get_practice_areas();
                foreach($practices as $practice): 
                ?>
                <a href="<?php echo esc_url(home_url($practice['link'])); ?>" class="practice-card" style="text-decoration: none;">
                    <div class="practice-card-icon">
                        <?php echo thomaswan_icon($practice['icon']); ?>
                    </div>
                    <h3><?php echo esc_html($practice['title']); ?></h3>
                    <p><?php echo esc_html($practice['desc']); ?></p>
                    <span class="practice-card-link">
                        Learn More <?php echo thomaswan_icon('arrow-up-right'); ?>
                    </span>
                </a>
                <?php endforeach; ?>
                
                <!-- CTA Card -->
                <div class="practice-cta-card">
                    <h3>Do You Have a Case?</h3>
                    <p>Get a free review of your medical records by our expert team.</p>
                    <a href="<?php echo home_url('/contact/'); ?>" class="btn">Contact Us Today</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section-alt">
        <div class="container">
            <div style="max-width: 900px; margin: 0 auto; text-align: center;">
                <span class="section-label">Why Choose Thomas & Wan</span>
                <h2 class="section-title">Focused Exclusively on Medical Malpractice</h2>
                <p style="font-size: 1.125rem; color: var(--tw-text-muted); line-height: 1.9; margin-bottom: 48px;">
                    We don't handle car accidents, divorces, or criminal cases. Our entire practice is dedicated 
                    to medical malpractice, which means we have the specialized knowledge and experience needed 
                    to take on complex medical cases and win.
                </p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 32px; text-align: left;">
                    <div style="background: white; padding: 32px; border-top: 4px solid var(--tw-secondary);">
                        <h4 style="margin-bottom: 12px;">Expert Medical Team</h4>
                        <p style="color: var(--tw-text-muted); margin: 0;">We work with doctors and nurses who review your records and help us understand exactly what went wrong.</p>
                    </div>
                    <div style="background: white; padding: 32px; border-top: 4px solid var(--tw-secondary);">
                        <h4 style="margin-bottom: 12px;">No Fee Unless We Win</h4>
                        <p style="color: var(--tw-text-muted); margin: 0;">We work on a contingency basis. You pay nothing unless we recover compensation for you.</p>
                    </div>
                    <div style="background: white; padding: 32px; border-top: 4px solid var(--tw-secondary);">
                        <h4 style="margin-bottom: 12px;">Personal Attention</h4>
                        <p style="color: var(--tw-text-muted); margin: 0;">Linda and Michelle handle every case personally. We don't flip cases to other firms.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Results -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Proven Track Record</span>
                <h2 class="section-title">Recent Case Results</h2>
            </div>
            
            <div class="results-grid">
                <?php 
                $results = thomaswan_get_results();
                foreach($results as $result): 
                ?>
                <div class="result-card">
                    <div class="result-amount"><?php echo esc_html($result['amount']); ?></div>
                    <div class="result-type"><?php echo esc_html($result['type']); ?></div>
                    <p class="result-description"><?php echo esc_html($result['desc']); ?></p>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Think You Have a Medical Malpractice Case?</h2>
            <p>Contact us today for a free consultation. We'll review your case and let you know if we can help.</p>
            <div class="cta-buttons">
                <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_theme_mod('contact_phone', '713-529-1177'))); ?>" class="btn btn-primary">
                    Call (<?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?>)
                </a>
                <a href="<?php echo home_url('/contact/'); ?>" class="btn btn-outline">Request Free Case Review</a>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
