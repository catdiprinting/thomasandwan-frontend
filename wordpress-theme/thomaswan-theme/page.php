<?php
/**
 * Page Template
 */
get_header();
?>

<main>
    <?php while (have_posts()): the_post(); ?>
    
    <!-- Page Header -->
    <section class="blog-header">
        <div class="container">
            <h1 class="section-title"><?php the_title(); ?></h1>
        </div>
    </section>

    <!-- Page Content -->
    <section class="section">
        <div class="container">
            <div class="single-post-content" style="max-width: 800px; margin: 0 auto;">
                <?php the_content(); ?>
            </div>
        </div>
    </section>

    <?php endwhile; ?>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Do You Have a Medical Malpractice Case?</h2>
            <p>If you or a loved one has been injured due to medical negligence, we are here to help.</p>
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
