<?php get_header(); ?>

<main>
    <!-- Hero -->
    <section class="hero-section" style="padding: 120px 0 80px;">
        <div class="container">
            <span class="hero-label">Insights & News</span>
            <h1>Legal Resources for <span class="highlight">Empowered</span> Decisions</h1>
            <p>Stay informed with the latest updates on medical malpractice law, birth injuries, and patient safety from Thomas & Wan.</p>
        </div>
    </section>

    <!-- Blog Posts -->
    <section class="section">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <?php if (have_posts()) : ?>
                        <?php while (have_posts()) : the_post(); ?>
                            <article class="blog-post">
                                <div class="blog-meta">
                                    <span class="category"><?php the_category(', '); ?></span>
                                    <span><?php echo get_the_date('F j, Y'); ?></span>
                                    <span><?php the_author(); ?></span>
                                </div>
                                
                                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                                
                                <p><?php echo get_the_excerpt(); ?></p>
                                
                                <a href="<?php the_permalink(); ?>" class="read-more">Read Full Article &rarr;</a>
                            </article>
                        <?php endwhile; ?>
                        
                        <div style="margin-top: 48px;">
                            <?php the_posts_pagination(array(
                                'mid_size' => 2,
                                'prev_text' => '&larr;',
                                'next_text' => '&rarr;',
                            )); ?>
                        </div>
                    <?php else : ?>
                        <p>No posts found.</p>
                    <?php endif; ?>
                </div>
                
                <div class="col-md-4">
                    <div class="sidebar-widget">
                        <h3>Categories</h3>
                        <ul>
                            <?php wp_list_categories(array(
                                'title_li' => '',
                                'show_count' => true,
                            )); ?>
                        </ul>
                    </div>
                    
                    <div class="sidebar-widget" style="background: #1a365d; color: #fff; border-top-color: #1a365d;">
                        <h3 style="color: #fff;">Need Legal Help?</h3>
                        <p style="color: rgba(255,255,255,0.8);">Contact us today for a free consultation regarding your medical malpractice case.</p>
                        <a href="<?php echo home_url('/contact'); ?>" class="btn btn-primary" style="width: 100%; text-align: center;">Contact Us</a>
                    </div>
                    
                    <div class="sidebar-widget">
                        <h3>Free Case Review</h3>
                        <p>Call us today for a free consultation. We work on a contingency basis.</p>
                        <a href="tel:713-529-1177" style="color: #c9a962; font-weight: 700; font-size: 1.25rem;">(713) 529-1177</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Do You Have a Medical Malpractice Case?</h2>
            <p>If you or a loved one has been injured due to medical negligence, we are here to help. Call us today for a free consultation.</p>
            <div>
                <a href="tel:713-529-1177" class="btn btn-primary">Call (713) 529-1177</a>
                <a href="<?php echo home_url('/contact'); ?>" class="btn btn-outline" style="margin-left: 16px; border-color: #fff; color: #fff;">Request Free Case Review</a>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>
