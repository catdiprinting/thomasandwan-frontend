<?php
/**
 * Single Post Template
 *
 * @package Thomas_Wan
 */

get_header();
?>

<?php while ( have_posts() ) : the_post(); ?>

<div class="page-hero">
    <div class="container">
        <span class="section-label"><?php the_category( ', ' ); ?></span>
        <h1><?php the_title(); ?></h1>
        <p style="color: rgba(255,255,255,0.7); margin-top: 15px;">
            <?php echo get_the_date(); ?> &bull; By <?php the_author(); ?>
        </p>
    </div>
</div>

<div class="section">
    <div class="container">
        <article class="single-post">
            
            <?php if ( has_post_thumbnail() ) : ?>
                <div class="post-featured-image mb-4">
                    <?php the_post_thumbnail( 'large' ); ?>
                </div>
            <?php endif; ?>
            
            <div class="post-content">
                <?php the_content(); ?>
            </div>
            
            <div class="post-tags mt-4">
                <?php the_tags( '<span class="tag-label">Tags: </span>', ', ', '' ); ?>
            </div>
            
        </article>
        
        <div class="post-navigation mt-5" style="display: flex; justify-content: space-between; padding-top: 30px; border-top: 1px solid #e5e7eb;">
            <div class="nav-previous">
                <?php previous_post_link( '%link', '&larr; %title' ); ?>
            </div>
            <div class="nav-next">
                <?php next_post_link( '%link', '%title &rarr;' ); ?>
            </div>
        </div>
    </div>
</div>

<?php endwhile; ?>

<style>
.single-post {
    max-width: 800px;
    margin: 0 auto;
}
.post-featured-image img {
    width: 100%;
    border-radius: 5px;
}
.post-content {
    font-size: 18px;
    line-height: 1.8;
}
.post-content h2,
.post-content h3,
.post-content h4 {
    margin-top: 40px;
    margin-bottom: 20px;
}
.post-content p {
    margin-bottom: 20px;
}
.post-content ul,
.post-content ol {
    margin-bottom: 20px;
    padding-left: 25px;
}
.post-content li {
    margin-bottom: 10px;
}
.post-content blockquote {
    border-left: 4px solid #F48400;
    padding-left: 25px;
    margin: 30px 0;
    font-style: italic;
    color: #6B7280;
}
.tag-label {
    font-weight: 700;
    color: #1F2937;
}
</style>

<?php get_footer(); ?>
