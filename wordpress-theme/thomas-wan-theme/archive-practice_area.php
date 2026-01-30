<?php
/**
 * Practice Areas Archive Template
 *
 * @package Thomas_Wan
 */

get_header();
?>

<div class="page-hero">
    <div class="container">
        <span class="section-label">Our Expertise</span>
        <h1>Specializing in Complex <em>Medical Malpractice</em> Cases</h1>
        <p>We don't handle car accidents or divorces. Our sole focus is mastering the complex realm of medical malpractice to win for you.</p>
    </div>
</div>

<section class="section bg-white">
    <div class="container">
        <div class="container-narrow text-center mb-5">
            <h2>Why Specialization Matters</h2>
            <p class="lead">Medical malpractice law is highly technical and requires a deep understanding of both medicine and the legal system. General practice attorneys often lack the specific resources and knowledge needed to challenge large hospitals and insurance companies. At Thomas & Wan, we have dedicated our entire careers to this specific field.</p>
        </div>
    </div>
</section>

<?php 
$count = 0;
while ( have_posts() ) : the_post(); 
    $icon = get_post_meta( get_the_ID(), '_practice_icon', true );
    $cases_list = get_post_meta( get_the_ID(), '_cases_list', true );
    $bg_class = ( $count % 2 === 0 ) ? 'bg-light' : 'bg-white';
    $reverse = ( $count % 2 === 1 );
    $count++;
?>

<section class="section <?php echo $bg_class; ?>">
    <div class="container">
        <div class="grid grid-2" style="align-items: center; gap: 60px;">
            
            <?php if ( $reverse ) : ?>
            <div>
                <?php if ( has_post_thumbnail() ) : ?>
                    <?php the_post_thumbnail( 'large' ); ?>
                <?php else : ?>
                    <div style="background: #e5e7eb; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #9ca3af; font-style: italic;">
                        <?php the_title(); ?>
                    </div>
                <?php endif; ?>
            </div>
            <?php endif; ?>
            
            <div>
                <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 25px;">
                    <div style="width: 60px; height: 60px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1); font-size: 28px;">
                        <?php echo esc_html( $icon ?: '⚖️' ); ?>
                    </div>
                    <h2 style="margin: 0;"><?php the_title(); ?></h2>
                </div>
                
                <div style="font-size: 18px; line-height: 1.8; color: #6B7280; margin-bottom: 30px;">
                    <?php the_excerpt(); ?>
                </div>
                
                <?php if ( $cases_list ) : 
                    $cases = array_filter( explode( "\n", $cases_list ) );
                ?>
                <div style="background: <?php echo $bg_class === 'bg-light' ? '#fff' : '#F9F7F5'; ?>; border-left: 4px solid #F48400; padding: 25px;">
                    <p style="color: #1F2937; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px;">Common Cases We Handle</p>
                    <ul style="color: #6B7280; font-size: 16px; line-height: 2; list-style: none; padding: 0; margin: 0;">
                        <?php foreach ( $cases as $case ) : ?>
                            <li>→ <?php echo esc_html( trim( $case ) ); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <?php endif; ?>
                
                <div style="margin-top: 30px;">
                    <a href="<?php the_permalink(); ?>" class="btn btn-primary">Learn More About <?php the_title(); ?></a>
                </div>
            </div>
            
            <?php if ( ! $reverse ) : ?>
            <div>
                <?php if ( has_post_thumbnail() ) : ?>
                    <?php the_post_thumbnail( 'large' ); ?>
                <?php else : ?>
                    <div style="background: #e5e7eb; aspect-ratio: 4/3; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #9ca3af; font-style: italic;">
                        <?php the_title(); ?>
                    </div>
                <?php endif; ?>
            </div>
            <?php endif; ?>
            
        </div>
    </div>
</section>

<?php endwhile; ?>

<!-- CTA SECTION -->
<section class="cta-section">
    <div class="container">
        <h2>Not Sure If You Have a Case?</h2>
        <p>Medical malpractice cases are complex. Let our team review your medical records to determine if negligence occurred.</p>
        <a href="<?php echo esc_url( home_url( '/contact/' ) ); ?>" class="btn btn-primary btn-lg">
            Request Free Case Review
        </a>
    </div>
</section>

<?php get_footer(); ?>
