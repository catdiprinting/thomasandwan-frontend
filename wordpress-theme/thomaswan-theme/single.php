<?php get_header(); ?>

<main>
    <!-- Hero -->
    <section class="hero-section" style="padding: 120px 0 80px;">
        <div class="container">
            <?php while (have_posts()) : the_post(); ?>
                <div class="blog-meta" style="color: rgba(255,255,255,0.6);">
                    <span class="category" style="color: #c9a962;"><?php the_category(', '); ?></span>
                    <span><?php echo get_the_date('F j, Y'); ?></span>
                    <span><?php the_author(); ?></span>
                </div>
                <h1 style="color: #fff; max-width: 900px;"><?php the_title(); ?></h1>
            <?php endwhile; ?>
        </div>
    </section>

    <!-- Content -->
    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <?php while (have_posts()) : the_post(); ?>
                        <article>
                            <div class="entry-content" style="font-size: 1.125rem; line-height: 1.9;">
                                <?php the_content(); ?>
                            </div>
                            
                            <div style="margin-top: 48px; padding-top: 32px; border-top: 1px solid #e2e8f0;">
                                <a href="<?php echo home_url('/blog'); ?>" class="btn btn-outline">&larr; Back to All Articles</a>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>
                
                <div class="col-md-4">
                    <div class="sidebar-widget" style="background: #1a365d; color: #fff; border-top-color: #1a365d;">
                        <h3 style="color: #fff;">Need Legal Help?</h3>
                        <p style="color: rgba(255,255,255,0.8);">If you believe you have a medical malpractice case, contact us for a free consultation.</p>
                        <a href="<?php echo home_url('/contact'); ?>" class="btn btn-primary" style="width: 100%; text-align: center; margin-bottom: 16px;">Contact Us</a>
                        <p style="color: rgba(255,255,255,0.6); text-align: center; margin-bottom: 0;">Or call us at</p>
                        <p style="text-align: center;"><a href="tel:713-529-1177" style="color: #c9a962; font-weight: 700; font-size: 1.25rem;">(713) 529-1177</a></p>
                    </div>
                </div>
            </div>
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
