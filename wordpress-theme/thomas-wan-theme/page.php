<?php
/**
 * Default Page Template
 *
 * @package Thomas_Wan
 */

get_header();
?>

<div class="page-hero">
    <div class="container">
        <h1><?php the_title(); ?></h1>
    </div>
</div>

<div class="section">
    <div class="container">
        <?php while ( have_posts() ) : the_post(); ?>
            <div class="page-content">
                <?php the_content(); ?>
            </div>
        <?php endwhile; ?>
    </div>
</div>

<style>
.page-content {
    max-width: 900px;
    margin: 0 auto;
}
.page-content h2,
.page-content h3,
.page-content h4 {
    margin-top: 40px;
    margin-bottom: 20px;
}
.page-content p {
    margin-bottom: 20px;
}
.page-content ul,
.page-content ol {
    margin-bottom: 20px;
    padding-left: 25px;
}
.page-content li {
    margin-bottom: 10px;
}
</style>

<?php get_footer(); ?>
