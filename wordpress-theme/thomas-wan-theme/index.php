<?php
/**
 * Main template file
 *
 * @package Thomas_Wan
 */

get_header();
?>

<?php if ( is_home() && ! is_front_page() ) : ?>
    <div class="page-hero">
        <div class="container">
            <h1><?php single_post_title(); ?></h1>
        </div>
    </div>
<?php endif; ?>

<div class="section">
    <div class="container">
        
        <?php if ( have_posts() ) : ?>
            
            <div class="grid grid-3">
                <?php while ( have_posts() ) : the_post(); ?>
                    
                    <article id="post-<?php the_ID(); ?>" <?php post_class( 'blog-card' ); ?>>
                        <?php if ( has_post_thumbnail() ) : ?>
                            <a href="<?php the_permalink(); ?>" class="blog-card-image">
                                <?php the_post_thumbnail( 'medium_large' ); ?>
                            </a>
                        <?php endif; ?>
                        
                        <div class="blog-card-content">
                            <div class="blog-card-meta">
                                <span class="blog-date"><?php echo get_the_date(); ?></span>
                            </div>
                            
                            <h2 class="blog-card-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h2>
                            
                            <p class="blog-card-excerpt"><?php echo get_the_excerpt(); ?></p>
                            
                            <a href="<?php the_permalink(); ?>" class="btn btn-outline" style="padding: 10px 20px; font-size: 12px;">
                                Read More
                            </a>
                        </div>
                    </article>
                    
                <?php endwhile; ?>
            </div>

            <?php
            the_posts_pagination( array(
                'mid_size'  => 2,
                'prev_text' => '&laquo; Previous',
                'next_text' => 'Next &raquo;',
            ) );
            ?>

        <?php else : ?>
            
            <p><?php _e( 'No posts found.', 'thomas-wan' ); ?></p>
            
        <?php endif; ?>

    </div>
</div>

<style>
.blog-card {
    background: #fff;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
}
.blog-card:hover {
    box-shadow: 0 15px 40px rgba(0,0,0,0.1);
}
.blog-card-image img {
    width: 100%;
    aspect-ratio: 16/10;
    object-fit: cover;
}
.blog-card-content {
    padding: 25px;
}
.blog-card-meta {
    margin-bottom: 10px;
}
.blog-date {
    font-size: 14px;
    color: #6B7280;
    text-transform: uppercase;
    letter-spacing: 1px;
}
.blog-card-title {
    font-size: 22px;
    margin-bottom: 15px;
}
.blog-card-title a {
    color: #1F2937;
}
.blog-card-title a:hover {
    color: #F48400;
}
.blog-card-excerpt {
    color: #6B7280;
    margin-bottom: 20px;
}
</style>

<?php get_footer(); ?>
