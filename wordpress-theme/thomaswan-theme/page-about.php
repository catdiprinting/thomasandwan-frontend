<?php
/**
 * Template Name: About Page
 */
get_header();
?>

<main>
    <!-- About Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">About Us</span>
            <h1 class="section-title">Women-Owned. <span class="highlight">Justice-Driven.</span></h1>
            <p class="section-description">
                Thomas & Wan is a Houston-based medical malpractice law firm dedicated to fighting for families affected by medical negligence.
            </p>
        </div>
    </section>

    <!-- Our Story -->
    <section class="section">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr; gap: 64px; max-width: 900px; margin: 0 auto;">
                <div>
                    <span class="section-label">Our Story</span>
                    <h2 class="section-title">Over 55 Years of Combined Experience</h2>
                    <p style="font-size: 1.125rem; color: var(--tw-text-muted); line-height: 1.9;">
                        Thomas & Wan was founded on a simple belief: families devastated by medical negligence deserve 
                        aggressive, compassionate legal representation. Unlike general practice firms, we focus exclusively 
                        on medical malpractice cases, giving us unparalleled expertise in this complex area of law.
                    </p>
                    <p style="font-size: 1.125rem; color: var(--tw-text-muted); line-height: 1.9;">
                        As a women-owned firm, we bring a unique perspective to every case. We understand the emotional 
                        toll that medical malpractice takes on families, and we fight not just for compensation, but for 
                        the answers and accountability our clients deserve.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section class="section-alt">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Meet Our Partners</span>
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
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Linda Thomas Full Bio -->
    <section class="section">
        <div class="container">
            <div style="max-width: 900px; margin: 0 auto;">
                <h2 class="section-title" style="margin-bottom: 32px;">Linda Laurent Thomas</h2>
                
                <p style="font-size: 1.125rem; color: var(--tw-text-muted); line-height: 1.9;">
                    Since 1987, Linda Laurent Thomas has pursued aggressive legal representation on behalf of injury victims. 
                    She specializes in cases involving personal injuries, wrongful death, and medical malpractice, including 
                    birth injuries, surgical errors, and emergency room negligence.
                </p>
                
                <p style="font-size: 1.125rem; color: var(--tw-text-muted); line-height: 1.9;">
                    Linda received her Juris Doctorate from South Texas College of Law and her Bachelor of Arts from 
                    the University of Houston. She is Board Certified in Personal Injury Trial Law by the Texas Board 
                    of Legal Specialization.
                </p>
                
                <h3 style="margin-top: 32px; margin-bottom: 16px;">Awards & Recognition</h3>
                <ul style="color: var(--tw-text-muted); line-height: 2;">
                    <li>Million Dollar Advocates Forum</li>
                    <li>Texas Super Lawyers (Multiple Years)</li>
                    <li>AV Preeminent® Rated by Martindale-Hubbell</li>
                    <li>Top 25 Women Trial Lawyers in Texas</li>
                </ul>
            </div>
        </div>
    </section>

    <!-- Michelle Wan Full Bio -->
    <section class="section-alt">
        <div class="container">
            <div style="max-width: 900px; margin: 0 auto;">
                <h2 class="section-title" style="margin-bottom: 32px;">Michelle W. Wan</h2>
                
                <p style="font-size: 1.125rem; color: var(--tw-text-muted); line-height: 1.9;">
                    Michelle W. Wan has worked exclusively representing clients in personal injury matters. Like Thomas, 
                    Wan has dedicated her career to fighting on behalf of persons injured by the negligence of others, 
                    with a particular focus on birth injury and medical malpractice cases.
                </p>
                
                <p style="font-size: 1.125rem; color: var(--tw-text-muted); line-height: 1.9;">
                    Michelle received her Juris Doctorate from the University of Houston Law Center and her undergraduate 
                    degree from Rice University. She brings a meticulous, research-driven approach to every case.
                </p>
                
                <h3 style="margin-top: 32px; margin-bottom: 16px;">Awards & Recognition</h3>
                <ul style="color: var(--tw-text-muted); line-height: 2;">
                    <li>Million Dollar Advocates Forum</li>
                    <li>Texas Super Lawyers Rising Star</li>
                    <li>Houston's Top Lawyers</li>
                    <li>National Trial Lawyers Top 40 Under 40</li>
                </ul>
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

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Ready to Discuss Your Case?</h2>
            <p>Contact us today for a free, confidential consultation. We work on a contingency basis - you pay nothing unless we win.</p>
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
