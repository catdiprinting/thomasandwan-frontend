<?php
/**
 * Blog Archive Template
 */
get_header();
?>

<main>
    <!-- Blog Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Insights & News</span>
            <h1 class="section-title">
                Legal Resources for <span class="highlight">Empowered</span> Decisions
            </h1>
            <p class="section-description">
                Stay informed with the latest updates on medical malpractice law, birth injuries, and patient safety from Thomas & Wan.
            </p>
        </div>
    </section>

    <!-- Blog Posts -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <div class="blog-posts-list">
                    <?php if (have_posts()): ?>
                        <?php while (have_posts()): the_post(); 
                            $categories = get_the_category();
                            $category_name = !empty($categories) ? $categories[0]->name : 'Blog';
                        ?>
                        <article class="blog-post-item">
                            <div class="blog-post-meta">
                                <span class="category"><?php echo esc_html($category_name); ?></span>
                                <span><?php echo get_the_date('F j, Y'); ?></span>
                                <span><?php the_author(); ?></span>
                            </div>
                            
                            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                            
                            <p><?php echo get_the_excerpt(); ?></p>
                            
                            <a href="<?php the_permalink(); ?>" class="read-more">
                                Read Full Article <?php echo thomaswan_icon('arrow-right'); ?>
                            </a>
                        </article>
                        <?php endwhile; ?>
                        
                        <div class="pagination">
                            <?php 
                            the_posts_pagination(array(
                                'mid_size' => 2,
                                'prev_text' => '&larr;',
                                'next_text' => '&rarr;',
                            )); 
                            ?>
                        </div>
                    <?php else: ?>
                        <p>No posts found.</p>
                    <?php endif; ?>
                </div>
                
                <aside class="blog-sidebar">
                    <div class="sidebar-widget">
                        <h3>Categories</h3>
                        <ul>
                            <?php wp_list_categories(array(
                                'title_li' => '',
                                'show_count' => true,
                            )); ?>
                        </ul>
                    </div>
                    
                    <div class="sidebar-widget sidebar-cta">
                        <h3>Need Legal Help?</h3>
                        <p>Contact us today for a free consultation regarding your medical malpractice case.</p>
                        <a href="<?php echo home_url('/contact/'); ?>" class="btn btn-primary">Contact Us</a>
                    </div>
                    
                    <div class="sidebar-widget">
                        <h3>Free Case Review</h3>
                        <p>Call us today for a free consultation. We work on a contingency basis.</p>
                        <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_theme_mod('contact_phone', '713-529-1177'))); ?>" class="sidebar-cta phone-link" style="color: var(--tw-secondary); font-weight: 700; font-size: 1.25rem;">
                            (<?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?>)
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Do You Have a Medical Malpractice Case?</h2>
            <p>If you or a loved one has been injured due to medical negligence, we are here to help. Call us today for a free consultation.</p>
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
