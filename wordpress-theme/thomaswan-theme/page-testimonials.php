<?php
/**
 * Template Name: Testimonials
 */
get_header();
?>

<main>
    <!-- Page Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Client Testimonials</span>
            <h1 class="section-title">What Our <span class="highlight">Clients Say</span></h1>
            <p class="section-description">
                Read real stories from families we've helped. Their trust in us drives everything we do.
            </p>
        </div>
    </section>

    <!-- Testimonials Grid -->
    <section class="section">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 32px;">
                <?php 
                $testimonials = thomaswan_get_testimonials();
                foreach($testimonials as $testimonial): 
                ?>
                <div class="testimonial-card" style="margin: 0;">
                    <div class="testimonial-quote-icon">
                        <?php echo thomaswan_icon('quote'); ?>
                    </div>
                    <div class="testimonial-stars">
                        <?php for($i = 0; $i < $testimonial['rating']; $i++): ?>
                            <?php echo thomaswan_icon('star'); ?>
                        <?php endfor; ?>
                    </div>
                    <p class="testimonial-text">"<?php echo esc_html($testimonial['text']); ?>"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-author-name"><?php echo esc_html($testimonial['name']); ?></div>
                        <div class="testimonial-author-label"><?php echo esc_html($testimonial['label']); ?></div>
                    </div>
                </div>
                <?php endforeach; ?>
                
                <!-- Additional testimonials -->
                <div class="testimonial-card" style="margin: 0;">
                    <div class="testimonial-quote-icon">
                        <?php echo thomaswan_icon('quote'); ?>
                    </div>
                    <div class="testimonial-stars">
                        <?php for($i = 0; $i < 5; $i++): echo thomaswan_icon('star'); endfor; ?>
                    </div>
                    <p class="testimonial-text">"They took the time to explain everything and made sure we understood our options. Their compassion during such a difficult time meant everything to our family."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-author-name">Michael R.</div>
                        <div class="testimonial-author-label">Verified Client</div>
                    </div>
                </div>
                
                <div class="testimonial-card" style="margin: 0;">
                    <div class="testimonial-quote-icon">
                        <?php echo thomaswan_icon('quote'); ?>
                    </div>
                    <div class="testimonial-stars">
                        <?php for($i = 0; $i < 5; $i++): echo thomaswan_icon('star'); endfor; ?>
                    </div>
                    <p class="testimonial-text">"Professional, knowledgeable, and truly caring. Thomas & Wan fought for us when we didn't know where to turn. We will forever be grateful for their help."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-author-name">Jennifer T.</div>
                        <div class="testimonial-author-label">Verified Client</div>
                    </div>
                </div>
                
                <div class="testimonial-card" style="margin: 0;">
                    <div class="testimonial-quote-icon">
                        <?php echo thomaswan_icon('quote'); ?>
                    </div>
                    <div class="testimonial-stars">
                        <?php for($i = 0; $i < 5; $i++): echo thomaswan_icon('star'); endfor; ?>
                    </div>
                    <p class="testimonial-text">"After being turned away by other firms, Linda and Michelle believed in our case. Their determination led to a settlement that will help our son for the rest of his life."</p>
                    <div class="testimonial-author">
                        <div class="testimonial-author-name">David & Maria S.</div>
                        <div class="testimonial-author-label">Verified Clients</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Google Reviews Banner -->
    <section class="stats-banner">
        <div class="container">
            <div style="text-align: center;">
                <div style="display: flex; justify-content: center; align-items: center; gap: 8px; margin-bottom: 16px;">
                    <span style="font-size: 3rem; font-weight: 700; font-family: 'Playfair Display', serif;">5.0</span>
                    <div style="color: var(--tw-secondary); display: flex; gap: 4px;">
                        <?php for($i = 0; $i < 5; $i++): echo thomaswan_icon('star'); endfor; ?>
                    </div>
                </div>
                <p style="font-size: 1.25rem; opacity: 0.8; margin: 0;">Based on Google Reviews</p>
            </div>
        </div>
    </section>

    <!-- Results Section -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Proven Track Record</span>
                <h2 class="section-title">Results That Speak for Themselves</h2>
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
            <h2>Ready to Share Your Story With Us?</h2>
            <p>Contact us today for a free, confidential consultation. We're here to listen and help.</p>
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
