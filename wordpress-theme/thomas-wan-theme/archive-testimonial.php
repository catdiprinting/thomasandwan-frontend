<?php
/**
 * Testimonials Archive Template
 *
 * @package Thomas_Wan
 */

get_header();
?>

<div class="page-hero">
    <div class="container">
        <span class="section-label">Client Stories</span>
        <h1>Voices of <em>Justice & Hope</em></h1>
        <p>Don't just take our word for it. Read what our clients have to say about their experience working with Thomas & Wan.</p>
    </div>
</div>

<section class="section bg-light">
    <div class="container">
        <div class="grid grid-2">
            <?php while ( have_posts() ) : the_post(); 
                $client_name = get_post_meta( get_the_ID(), '_client_name', true );
                $date = get_post_meta( get_the_ID(), '_testimonial_date', true );
            ?>
                <div class="testimonial-card">
                    <div class="testimonial-stars">★★★★★</div>
                    <p class="testimonial-quote">"<?php echo get_the_content(); ?>"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar"><?php echo esc_html( substr( $client_name ?: get_the_title(), 0, 1 ) ); ?></div>
                        <div>
                            <div class="testimonial-name"><?php echo esc_html( $client_name ?: get_the_title() ); ?></div>
                            <?php if ( $date ) : ?>
                                <div class="testimonial-date"><?php echo esc_html( $date ); ?></div>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
        
        <?php the_posts_pagination(); ?>
    </div>
</section>

<!-- CTA SECTION -->
<section class="cta-section">
    <div class="container">
        <h2>Let Us Fight for Your Family Too</h2>
        <p>If you or a loved one has suffered due to medical negligence, we are here to listen. Contact us today for a free, confidential consultation.</p>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary btn-lg">
            Share Your Story With Us
        </a>
    </div>
</section>

<?php get_footer(); ?>
