<?php
/**
 * Single Post Template
 */
get_header();
?>

<main>
    <?php while (have_posts()): the_post(); 
        $categories = get_the_category();
        $category_name = !empty($categories) ? $categories[0]->name : 'Blog';
    ?>
    
    <!-- Post Header -->
    <section class="single-post-header">
        <div class="container">
            <div class="blog-post-meta">
                <span class="category"><?php echo esc_html($category_name); ?></span>
                <span><?php echo get_the_date('F j, Y'); ?></span>
                <span><?php the_author(); ?></span>
            </div>
            <h1><?php the_title(); ?></h1>
        </div>
    </section>

    <!-- Post Content -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <article class="single-post-content">
                    <?php the_content(); ?>
                    
                    <div class="back-to-blog">
                        <a href="<?php echo home_url('/blog/'); ?>" class="btn btn-outline">
                            <?php echo thomaswan_icon('arrow-right'); ?> Back to All Articles
                        </a>
                    </div>
                </article>
                
                <aside class="blog-sidebar">
                    <div class="sidebar-widget sidebar-cta">
                        <h3>Need Legal Help?</h3>
                        <p>If you believe you have a medical malpractice case, contact us for a free consultation.</p>
                        <a href="<?php echo home_url('/contact/'); ?>" class="btn btn-primary">Contact Us</a>
                        <p style="text-align: center; color: rgba(255,255,255,0.6); margin-top: 16px; margin-bottom: 0;">Or call us at</p>
                        <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_theme_mod('contact_phone', '713-529-1177'))); ?>" class="phone-link" style="display: block; text-align: center; color: var(--tw-secondary); font-weight: 700; font-size: 1.25rem;">
                            (<?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?>)
                        </a>
                    </div>
                </aside>
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
