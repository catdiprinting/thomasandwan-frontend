<?php
/**
 * Front Page Template
 *
 * @package Thomas_Wan
 */

get_header();
?>

<!-- HERO SECTION -->
<section class="hero">
    <div class="container">
        <div class="hero-grid">
            <div class="hero-content">
                <span class="section-label">Medical Malpractice Attorneys</span>
                
                <h1>
                    Dedicated to <br>
                    <em>Justice</em> for <br>
                    Your Family.
                </h1>
                
                <p class="lead">
                    <?php echo esc_html( thomas_wan_get_option( 'tw_hero_subheadline', 'With over 60+ years of combined experience in medical malpractice, Linda Thomas and Michelle Wan fight for the answers and compensation you deserve.' ) ); ?>
                </p>
                
                <div style="display: flex; gap: 15px; flex-wrap: wrap; margin-top: 30px;">
                    <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary btn-lg">
                        Schedule Free Consultation
                    </a>
                    <a href="<?php echo esc_url( home_url( '/practice-areas/' ) ); ?>" class="btn btn-outline btn-lg">
                        Learn More &rarr;
                    </a>
                </div>
                
                <div class="hero-badges">
                    <div class="hero-badge">Available 24/7</div>
                    <div class="hero-badge">No Win, No Fee</div>
                </div>
            </div>
            
            <div class="hero-image">
                <img src="<?php echo esc_url( THOMAS_WAN_URI . '/assets/images/partners-hero.jpg' ); ?>" alt="Linda Thomas and Michelle Wan">
            </div>
        </div>
    </div>
</section>

<!-- TRUST BAR -->
<section class="trust-bar">
    <div class="container">
        <div class="trust-logos">
            <img src="<?php echo esc_url( THOMAS_WAN_URI . '/assets/images/av-preeminent.png' ); ?>" alt="AV Preeminent Rated">
            <img src="<?php echo esc_url( THOMAS_WAN_URI . '/assets/images/super-lawyers.png' ); ?>" alt="Super Lawyers">
            <img src="<?php echo esc_url( THOMAS_WAN_URI . '/assets/images/board-certified.png' ); ?>" alt="Board Certified">
            <img src="<?php echo esc_url( THOMAS_WAN_URI . '/assets/images/best-lawyers.png' ); ?>" alt="Best Lawyers">
        </div>
    </div>
</section>

<!-- PRACTICE AREAS -->
<section class="section bg-light">
    <div class="container">
        <div class="text-center mb-5">
            <span class="section-label">Our Expertise</span>
            <h2>Focused Exclusively on<br><em class="text-secondary">Medical Malpractice</em></h2>
            <p class="lead" style="max-width: 700px; margin: 0 auto;">
                We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.
            </p>
        </div>
        
        <div class="grid grid-3">
            <?php
            $practice_areas = new WP_Query( array(
                'post_type'      => 'practice_area',
                'posts_per_page' => 5,
                'orderby'        => 'menu_order',
                'order'          => 'ASC',
            ) );
            
            if ( $practice_areas->have_posts() ) :
                while ( $practice_areas->have_posts() ) : $practice_areas->the_post();
                    $icon = get_post_meta( get_the_ID(), '_practice_icon', true );
            ?>
                <div class="practice-card">
                    <div class="practice-icon"><?php echo esc_html( $icon ?: '⚖️' ); ?></div>
                    <h3><?php the_title(); ?></h3>
                    <p><?php echo get_the_excerpt(); ?></p>
                    <a href="<?php the_permalink(); ?>" class="practice-link">Learn More &rarr;</a>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                // Fallback static content
                $default_areas = array(
                    array( 'icon' => '👶', 'title' => 'Birth Injuries', 'desc' => 'Cerebral palsy, hypoxia, shoulder dystocia, and preventable birth trauma.' ),
                    array( 'icon' => '🩺', 'title' => 'Surgical Errors', 'desc' => 'Mistakes during surgery, anesthesia errors, and post-operative negligence.' ),
                    array( 'icon' => '🧠', 'title' => 'Brain Injuries', 'desc' => 'Traumatic brain injuries resulting from medical negligence or malpractice.' ),
                    array( 'icon' => '📋', 'title' => 'Misdiagnosis', 'desc' => 'Failure to diagnose cancer, heart attacks, strokes, and critical conditions.' ),
                    array( 'icon' => '💔', 'title' => 'Wrongful Death', 'desc' => 'Seeking justice for the loss of a loved one due to medical carelessness.' ),
                );
                foreach ( $default_areas as $area ) :
            ?>
                <div class="practice-card">
                    <div class="practice-icon"><?php echo esc_html( $area['icon'] ); ?></div>
                    <h3><?php echo esc_html( $area['title'] ); ?></h3>
                    <p><?php echo esc_html( $area['desc'] ); ?></p>
                    <a href="<?php echo esc_url( home_url( '/practice-areas/' ) ); ?>" class="practice-link">Learn More &rarr;</a>
                </div>
            <?php
                endforeach;
            endif;
            ?>
            
            <div class="practice-cta">
                <h3>Do You Have a Case?</h3>
                <p>Get a free review of your medical records by our expert team.</p>
                <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary">Contact Us Today</a>
            </div>
        </div>
    </div>
</section>

<!-- TEAM SECTION -->
<section class="section bg-white">
    <div class="container">
        <div class="text-center mb-5">
            <span class="section-label">Your Legal Team</span>
            <h2>Meet Our Attorneys</h2>
        </div>
        
        <div class="grid grid-2" style="max-width: 900px; margin: 0 auto;">
            <?php
            $team = new WP_Query( array(
                'post_type'      => 'team_member',
                'posts_per_page' => 2,
                'orderby'        => 'menu_order',
                'order'          => 'ASC',
            ) );
            
            if ( $team->have_posts() ) :
                while ( $team->have_posts() ) : $team->the_post();
                    $title = get_post_meta( get_the_ID(), '_member_title', true );
            ?>
                <div class="team-card">
                    <?php if ( has_post_thumbnail() ) : ?>
                        <?php the_post_thumbnail( 'large' ); ?>
                    <?php endif; ?>
                    <div class="team-content">
                        <h3><?php the_title(); ?></h3>
                        <div class="team-title"><?php echo esc_html( $title ); ?></div>
                        <p><?php echo get_the_excerpt(); ?></p>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
            ?>
                <div class="team-card">
                    <img src="<?php echo esc_url( THOMAS_WAN_URI . '/assets/images/linda-thomas.jpg' ); ?>" alt="Linda Thomas">
                    <div class="team-content">
                        <h3>Linda Thomas</h3>
                        <div class="team-title">Founding Partner</div>
                        <p>Over 35 years of experience in medical malpractice law. Board Certified in Personal Injury Trial Law.</p>
                    </div>
                </div>
                <div class="team-card">
                    <img src="<?php echo esc_url( THOMAS_WAN_URI . '/assets/images/michelle-wan.jpg' ); ?>" alt="Michelle Wan">
                    <div class="team-content">
                        <h3>Michelle Wan</h3>
                        <div class="team-title">Founding Partner</div>
                        <p>Over 25 years of experience fighting for victims of medical negligence. Former registered nurse.</p>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</section>

<!-- CASE RESULTS -->
<section class="section bg-light">
    <div class="container">
        <div class="text-center mb-5">
            <span class="section-label">Proven Track Record</span>
            <h2>Recent Case Results</h2>
        </div>
        
        <div class="grid grid-3">
            <?php
            $results = new WP_Query( array(
                'post_type'      => 'case_result',
                'posts_per_page' => 3,
                'orderby'        => 'date',
                'order'          => 'DESC',
            ) );
            
            if ( $results->have_posts() ) :
                while ( $results->have_posts() ) : $results->the_post();
                    $amount = get_post_meta( get_the_ID(), '_case_amount', true );
                    $type = get_post_meta( get_the_ID(), '_case_type', true );
            ?>
                <div class="result-card">
                    <div class="result-amount"><?php echo esc_html( $amount ); ?></div>
                    <div class="result-type"><?php echo esc_html( $type ); ?></div>
                    <p class="result-desc"><?php echo get_the_excerpt(); ?></p>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                $default_results = array(
                    array( 'amount' => '$6.5 Million', 'type' => 'Birth Injury Settlement', 'desc' => 'Settlement for a child who suffered brain damage due to delayed delivery.' ),
                    array( 'amount' => '$2.1 Million', 'type' => 'Surgical Error', 'desc' => 'Verdict for a patient who suffered permanent nerve damage during routine surgery.' ),
                    array( 'amount' => '$4.8 Million', 'type' => 'Wrongful Death', 'desc' => 'Settlement for a family who lost a mother due to misdiagnosis of heart condition.' ),
                );
                foreach ( $default_results as $result ) :
            ?>
                <div class="result-card">
                    <div class="result-amount"><?php echo esc_html( $result['amount'] ); ?></div>
                    <div class="result-type"><?php echo esc_html( $result['type'] ); ?></div>
                    <p class="result-desc"><?php echo esc_html( $result['desc'] ); ?></p>
                </div>
            <?php
                endforeach;
            endif;
            ?>
        </div>
    </div>
</section>

<!-- STATS BANNER -->
<section class="stats-banner">
    <div class="container">
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-number">55+</div>
                <div class="stat-label">Years Combined Experience</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">$50M+</div>
                <div class="stat-label">Recovered for Clients</div>
            </div>
            <div class="stat-item">
                <div class="stat-number">100%</div>
                <div class="stat-label">Medical Malpractice Focus</div>
            </div>
        </div>
    </div>
</section>

<!-- TESTIMONIALS -->
<section class="section bg-light">
    <div class="container">
        <div class="text-center mb-5">
            <span class="section-label">Client Stories</span>
            <h2>What Our Clients Say</h2>
        </div>
        
        <div class="grid grid-2">
            <?php
            $testimonials = new WP_Query( array(
                'post_type'      => 'testimonial',
                'posts_per_page' => 4,
                'orderby'        => 'rand',
            ) );
            
            if ( $testimonials->have_posts() ) :
                while ( $testimonials->have_posts() ) : $testimonials->the_post();
                    $client_name = get_post_meta( get_the_ID(), '_client_name', true );
                    $date = get_post_meta( get_the_ID(), '_testimonial_date', true );
            ?>
                <div class="testimonial-card">
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-quote">"<?php echo get_the_content(); ?>"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar"><?php echo esc_html( substr( $client_name, 0, 1 ) ); ?></div>
                        <div>
                            <div class="testimonial-name"><?php echo esc_html( $client_name ); ?></div>
                            <?php if ( $date ) : ?>
                                <div class="testimonial-date"><?php echo esc_html( $date ); ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php
                endwhile;
                wp_reset_postdata();
            else :
                $default_testimonials = array(
                    array( 'name' => 'Alyssa', 'text' => 'I had a hard time coming to the terms with what happened to my baby at birth. Her face was so welcoming and she had a comfortable vibe in her tone of voice. I instantly relaxed and what helped me through my childbirth complications was she said it wasn\'t my fault.' ),
                    array( 'name' => 'Lisa A', 'text' => 'Thomas & Wan did a great job representing me and my family. They were aggressive and fought hard for us. They found out that the complex didn\'t hire security to patrol at night.' ),
                );
                foreach ( $default_testimonials as $t ) :
            ?>
                <div class="testimonial-card">
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-quote">"<?php echo esc_html( $t['text'] ); ?>"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar"><?php echo esc_html( substr( $t['name'], 0, 1 ) ); ?></div>
                        <div>
                            <div class="testimonial-name"><?php echo esc_html( $t['name'] ); ?></div>
                        </div>
                    </div>
                </div>
            <?php
                endforeach;
            endif;
            ?>
        </div>
        
        <div class="text-center mt-4">
            <a href="<?php echo esc_url( home_url( '/testimonials/' ) ); ?>" class="btn btn-outline">
                Read More Testimonials
            </a>
        </div>
    </div>
</section>

<!-- CTA SECTION -->
<section class="cta-section">
    <div class="container">
        <h2>Ready to Get the Justice You Deserve?</h2>
        <p>Contact us today for a free, confidential consultation. We'll review your case and help you understand your options.</p>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary btn-lg">
            Schedule Free Consultation
        </a>
        <?php $phone = thomas_wan_get_option( 'tw_phone', '(713) 529-1177' ); ?>
        <div class="cta-phone">
            <a href="tel:<?php echo preg_replace( '/[^0-9]/', '', $phone ); ?>">
                <?php echo esc_html( $phone ); ?>
            </a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
