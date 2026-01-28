<?php
/**
 * Front Page Template - Matching React Design
 */
get_header();
?>

<main>
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <div class="hero-grid">
                <div class="hero-content">
                    <span class="hero-label"><?php echo esc_html(get_theme_mod('hero_label', 'Medical Malpractice Attorneys')); ?></span>
                    
                    <h1 class="hero-title">
                        Dedicated to <br>
                        <span class="highlight">Justice</span> for <br>
                        Your Family.
                    </h1>
                    
                    <p class="hero-description">
                        <?php echo esc_html(get_theme_mod('hero_description', 'With over 60+ years of combined experience in medical malpractice, Linda Thomas and Michelle Wan fight for the answers and compensation you deserve.')); ?>
                    </p>
                    
                    <div class="hero-buttons">
                        <a href="<?php echo home_url('/contact/'); ?>" class="btn btn-primary">Schedule Free Consultation</a>
                        <a href="<?php echo home_url('/about/'); ?>" class="btn btn-outline">
                            Learn More <?php echo thomaswan_icon('arrow-right'); ?>
                        </a>
                    </div>

                    <div class="hero-trust-signals">
                        <div class="hero-trust-signal">
                            <span class="dot"></span>
                            <span>Available 24/7</span>
                        </div>
                        <div class="hero-trust-signal">
                            <span class="dot"></span>
                            <span>No Win, No Fee</span>
                        </div>
                    </div>
                </div>

                <div class="hero-image-wrapper">
                    <div class="hero-image-frame">
                        <div class="hero-image-inner">
                            <?php if (get_theme_mod('hero_image')): ?>
                                <img src="<?php echo esc_url(get_theme_mod('hero_image')); ?>" alt="Linda Thomas and Michelle Wan">
                            <?php else: ?>
                                <img src="<?php echo get_template_directory_uri(); ?>/images/partners-hero.jpg" alt="Linda Thomas and Michelle Wan">
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Trust Bar -->
    <section class="trust-bar">
        <div class="container">
            <div class="trust-badges">
                <img src="<?php echo get_template_directory_uri(); ?>/images/trust-badges.png" alt="Award Badges: Million Dollar Advocates, Super Lawyers, Top 25 Trial Lawyers">
            </div>

            <div class="trust-signals">
                <div class="trust-signal">
                    <div class="trust-signal-rating">
                        <span class="number">5.0</span>
                        <div class="stars">
                            <?php for($i = 0; $i < 5; $i++): ?>
                                <?php echo thomaswan_icon('star'); ?>
                            <?php endfor; ?>
                        </div>
                    </div>
                    <span class="trust-signal-label">Google Reviews</span>
                </div>

                <div class="trust-signal hidden sm-block">
                    <span class="trust-signal-text">AV Preeminent®</span>
                    <span class="trust-signal-label">Peer Rated for Highest Level of Excellence</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Practice Areas -->
    <section class="section-alt">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Our Expertise</span>
                <h2 class="section-title">
                    Focused Exclusively on <br>
                    <span class="font-alt" style="color: var(--tw-secondary); font-style: italic;">Medical Malpractice</span>
                </h2>
                <p class="section-description">
                    We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.
                </p>
            </div>

            <div class="practice-areas-grid">
                <?php 
                $practices = thomaswan_get_practice_areas();
                foreach($practices as $practice): 
                ?>
                <div class="practice-card">
                    <div class="practice-card-icon">
                        <?php echo thomaswan_icon($practice['icon']); ?>
                    </div>
                    <h3><?php echo esc_html($practice['title']); ?></h3>
                    <p><?php echo esc_html($practice['desc']); ?></p>
                    <a href="<?php echo esc_url(home_url($practice['link'])); ?>" class="practice-card-link">
                        Learn More <?php echo thomaswan_icon('arrow-up-right'); ?>
                    </a>
                </div>
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

    <!-- Team Section -->
    <section class="section-alt">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Team Behind This Work</span>
                <h2 class="section-title">Dedicated to Your Family's Future</h2>
            </div>

            <div class="team-grid">
                <?php 
                $team = thomaswan_get_team();
                foreach($team as $member): 
                ?>
                <div class="team-member">
                    <div class="team-member-image">
                        <img src="<?php echo esc_url($member['image']); ?>" alt="<?php echo esc_attr($member['name']); ?>">
                        <div class="team-member-info">
                            <h3><?php echo esc_html($member['name']); ?></h3>
                            <span><?php echo esc_html($member['title']); ?></span>
                        </div>
                    </div>
                    
                    <p><?php echo esc_html($member['bio']); ?></p>
                    
                    <a href="<?php echo home_url('/about/'); ?>" class="team-member-link">
                        View Profile <?php echo thomaswan_icon('arrow-right'); ?>
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Results & Testimonials -->
    <section class="section">
        <div class="container">
            
            <!-- Results -->
            <div style="margin-bottom: 96px;">
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

            <!-- Testimonials -->
            <div class="testimonials-wrapper">
                <div class="section-header">
                    <h2 class="section-title">Client Stories</h2>
                </div>

                <div class="testimonials-slider">
                    <?php 
                    $testimonials = thomaswan_get_testimonials();
                    foreach($testimonials as $testimonial): 
                    ?>
                    <div class="testimonial-card">
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
                </div>
            </div>

        </div>
    </section>

    <!-- Stats Banner -->
    <section class="stats-banner">
        <div class="container">
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number"><?php echo esc_html(get_theme_mod('stat_1_number', '55+')); ?></div>
                    <div class="stat-label"><?php echo esc_html(get_theme_mod('stat_1_label', 'Years Combined Experience')); ?></div>
                </div>
                <div class="stat-item">
                    <div class="stat-number"><?php echo esc_html(get_theme_mod('stat_2_number', '$50M+')); ?></div>
                    <div class="stat-label"><?php echo esc_html(get_theme_mod('stat_2_label', 'Recovered for Clients')); ?></div>
                </div>
                <div class="stat-item">
                    <div class="stat-number"><?php echo esc_html(get_theme_mod('stat_3_number', '100%')); ?></div>
                    <div class="stat-label"><?php echo esc_html(get_theme_mod('stat_3_label', 'Medical Malpractice Focus')); ?></div>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="section">
        <div class="container">
            <div class="faq-grid">
                <div class="faq-sidebar">
                    <span class="section-label">Common Questions</span>
                    <h2 class="section-title">Frequently Asked Questions</h2>
                    <p class="section-description" style="margin-bottom: 32px;">
                        Navigating medical malpractice claims can be confusing. Here are answers to some of the most common questions our clients ask.
                    </p>
                    
                    <div class="faq-cta">
                        <h3>Still have questions?</h3>
                        <p>We are available 24/7 to answer your questions and help you understand your rights.</p>
                        <a href="<?php echo home_url('/contact/'); ?>" class="btn btn-primary">Contact Us Now</a>
                    </div>
                </div>

                <div class="faq-accordion">
                    <?php 
                    $faqs = thomaswan_get_faqs();
                    foreach($faqs as $idx => $faq): 
                    ?>
                    <div class="faq-item <?php echo $idx === 0 ? 'active' : ''; ?>">
                        <button class="faq-question">
                            <?php echo esc_html($faq['question']); ?>
                            <?php echo thomaswan_icon('chevron-down'); ?>
                        </button>
                        <div class="faq-answer">
                            <?php echo esc_html($faq['answer']); ?>
                        </div>
                    </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Blog Section -->
    <section class="section-alt">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Latest Insights</span>
                <h2 class="section-title">From Our Blog</h2>
            </div>

            <div class="blog-grid">
                <?php
                $blog_query = new WP_Query(array(
                    'posts_per_page' => 3,
                    'post_status' => 'publish',
                ));
                
                if ($blog_query->have_posts()):
                    while ($blog_query->have_posts()): $blog_query->the_post();
                        $categories = get_the_category();
                        $category_name = !empty($categories) ? $categories[0]->name : 'Blog';
                ?>
                <article class="blog-card">
                    <?php if (has_post_thumbnail()): ?>
                    <div class="blog-card-image">
                        <?php the_post_thumbnail('blog-card'); ?>
                    </div>
                    <?php endif; ?>
                    <div class="blog-card-content">
                        <div class="blog-card-meta">
                            <span class="blog-card-category"><?php echo esc_html($category_name); ?></span>
                            <span><?php echo get_the_date('M j, Y'); ?></span>
                        </div>
                        <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                        <p><?php echo wp_trim_words(get_the_excerpt(), 20); ?></p>
                        <a href="<?php the_permalink(); ?>" class="blog-card-link">
                            Read Article <?php echo thomaswan_icon('arrow-right'); ?>
                        </a>
                    </div>
                </article>
                <?php 
                    endwhile;
                    wp_reset_postdata();
                else:
                ?>
                <p>No blog posts found.</p>
                <?php endif; ?>
            </div>
            
            <div style="text-align: center; margin-top: 48px;">
                <a href="<?php echo home_url('/blog/'); ?>" class="btn btn-outline">View All Articles</a>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
        <div class="container">
            <h2>Do You Have a Medical Malpractice Case?</h2>
            <p>If you or a loved one has been injured due to medical negligence, we are here to help. Call us today for a free consultation.</p>
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
