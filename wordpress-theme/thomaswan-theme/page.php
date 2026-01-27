<?php get_header(); ?>

<main>
    <!-- Hero -->
    <section class="hero-section" style="padding: 120px 0 80px;">
        <div class="container">
            <?php while (have_posts()) : the_post(); ?>
                <h1 style="color: #fff;"><?php the_title(); ?></h1>
            <?php endwhile; ?>
        </div>
    </section>

    <!-- Content -->
    <section class="section">
        <div class="container">
            <?php while (have_posts()) : the_post(); ?>
                <div class="entry-content" style="max-width: 800px; margin: 0 auto; font-size: 1.125rem; line-height: 1.9;">
                    <?php the_content(); ?>
                </div>
            <?php endwhile; ?>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Do You Have a Medical Malpractice Case?</h2>
            <p>If you or a loved one has been injured due to medical negligence, we are here to help.</p>
            <div>
                <a href="tel:713-529-1177" class="btn btn-primary">Call (713) 529-1177</a>
                <a href="<?php echo home_url('/contact'); ?>" class="btn btn-outline" style="margin-left: 16px; border-color: #fff; color: #fff;">Request Free Case Review</a>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
