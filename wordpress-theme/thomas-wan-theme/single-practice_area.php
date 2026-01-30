<?php
/**
 * Single Practice Area Template
 *
 * @package Thomas_Wan
 */

get_header();

$icon = get_post_meta( get_the_ID(), '_practice_icon', true );
$cases_list = get_post_meta( get_the_ID(), '_cases_list', true );
?>

<?php while ( have_posts() ) : the_post(); ?>

<div class="page-hero">
    <div class="container">
        <span class="section-label">Practice Area</span>
        <h1><?php the_title(); ?></h1>
        <p><?php echo get_the_excerpt(); ?></p>
    </div>
</div>

<section class="section bg-white">
    <div class="container">
        <div class="grid grid-2" style="gap: 60px; align-items: start;">
            
            <div class="practice-content">
                <?php the_content(); ?>
            </div>
            
            <div class="practice-sidebar">
                <?php if ( $cases_list ) : 
                    $cases = array_filter( explode( "\n", $cases_list ) );
                ?>
                <div style="background: #F9F7F5; border-left: 4px solid #F48400; padding: 30px; margin-bottom: 30px;">
                    <h3 style="font-size: 20px; margin-bottom: 20px;">Cases We Handle</h3>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        <?php foreach ( $cases as $case ) : ?>
                            <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6B7280;">
                                <span style="color: #F48400; margin-right: 10px;">✓</span>
                                <?php echo esc_html( trim( $case ) ); ?>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php endif; ?>
                
                <div style="background: #1F2937; color: #fff; padding: 35px; text-align: center;">
                    <h3 style="color: #fff; font-size: 24px; margin-bottom: 15px;">Free Case Review</h3>
                    <p style="color: rgba(255,255,255,0.8); margin-bottom: 25px;">
                        Think you have a <?php echo strtolower( get_the_title() ); ?> case? Contact us for a free evaluation.
                    </p>
                    <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary" style="width: 100%;">
                        Contact Us Today
                    </a>
                    <?php $phone = thomas_wan_get_option( 'tw_phone', '(713) 529-1177' ); ?>
                    <p style="margin-top: 20px; margin-bottom: 0;">
                        <a href="tel:<?php echo preg_replace( '/[^0-9]/', '', $phone ); ?>" style="color: #F48400; font-size: 20px; font-weight: 700;">
                            <?php echo esc_html( $phone ); ?>
                        </a>
                    </p>
                </div>
            </div>
            
        </div>
    </div>
</section>

<?php endwhile; ?>

<style>
.practice-content {
    font-size: 18px;
    line-height: 1.8;
}
.practice-content h2,
.practice-content h3 {
    margin-top: 40px;
    margin-bottom: 20px;
}
.practice-content p {
    margin-bottom: 20px;
    color: #6B7280;
}
.practice-content ul,
.practice-content ol {
    margin-bottom: 20px;
    padding-left: 25px;
}
.practice-content li {
    margin-bottom: 10px;
    color: #6B7280;
}
@media (max-width: 991px) {
    .practice-sidebar {
        order: -1;
    }
}
</style>

<!-- Related Practice Areas -->
<section class="section bg-light">
    <div class="container">
        <h2 class="text-center mb-4">Other Practice Areas</h2>
        
        <div class="grid grid-3">
            <?php
            $related = new WP_Query( array(
                'post_type'      => 'practice_area',
                'posts_per_page' => 3,
                'post__not_in'   => array( get_the_ID() ),
                'orderby'        => 'rand',
            ) );
            
            while ( $related->have_posts() ) : $related->the_post();
                $rel_icon = get_post_meta( get_the_ID(), '_practice_icon', true );
            ?>
                <div class="practice-card">
                    <div class="practice-icon"><?php echo esc_html( $rel_icon ?: '⚖️' ); ?></div>
                    <h3><?php the_title(); ?></h3>
                    <p><?php echo get_the_excerpt(); ?></p>
                    <a href="<?php the_permalink(); ?>" class="practice-link">Learn More →</a>
                </div>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="cta-section">
    <div class="container">
        <h2>Ready to Discuss Your Case?</h2>
        <p>Contact us today for a free, confidential consultation with an experienced medical malpractice attorney.</p>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary btn-lg">
            Schedule Free Consultation
        </a>
    </div>
</section>

<?php get_footer(); ?>
