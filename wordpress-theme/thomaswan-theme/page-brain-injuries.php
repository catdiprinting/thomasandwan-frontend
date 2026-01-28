<?php
/**
 * Template Name: Brain Injuries
 */
get_header();
?>

<main>
    <!-- Page Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Practice Area</span>
            <h1 class="section-title">Brain Injury <span class="highlight">Attorneys</span></h1>
            <p class="section-description">
                Brain injuries caused by medical negligence can have life-altering consequences. 
                We fight for victims and their families to secure the compensation they need.
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <div class="single-post-content">
                    <h2>Medical Malpractice Brain Injuries</h2>
                    <p>
                        When healthcare providers fail to meet the standard of care, the brain can be 
                        deprived of oxygen, damaged during surgery, or harmed through medication errors. 
                        These injuries often result in permanent disability requiring lifelong care.
                    </p>
                    
                    <h3>Common Causes of Medical Malpractice Brain Injuries</h3>
                    <ul>
                        <li><strong>Birth Injuries</strong> - Oxygen deprivation during labor and delivery</li>
                        <li><strong>Anesthesia Errors</strong> - Improper monitoring leading to hypoxia</li>
                        <li><strong>Surgical Mistakes</strong> - Damage during brain or spine surgery</li>
                        <li><strong>Failure to Diagnose Stroke</strong> - Delayed treatment causing brain death</li>
                        <li><strong>Medication Errors</strong> - Drug interactions or overdoses affecting the brain</li>
                        <li><strong>Hospital Falls</strong> - Head trauma from negligent patient care</li>
                    </ul>
                    
                    <h3>Long-Term Effects of Brain Injuries</h3>
                    <p>
                        Brain injuries can result in a wide range of physical, cognitive, and emotional 
                        impairments that affect every aspect of life:
                    </p>
                    <ul>
                        <li>Memory loss and cognitive impairment</li>
                        <li>Difficulty with speech and communication</li>
                        <li>Paralysis or motor function problems</li>
                        <li>Personality and behavioral changes</li>
                        <li>Seizures and epilepsy</li>
                        <li>Need for 24/7 care and supervision</li>
                    </ul>
                    
                    <h3>Calculating Damages in Brain Injury Cases</h3>
                    <p>
                        Brain injury victims often require extensive medical care and support for the 
                        rest of their lives. We work with life care planners and economists to calculate:
                    </p>
                    <ul>
                        <li>Past and future medical expenses</li>
                        <li>Rehabilitation and therapy costs</li>
                        <li>Home modifications and adaptive equipment</li>
                        <li>Lost wages and earning capacity</li>
                        <li>Pain, suffering, and loss of enjoyment of life</li>
                        <li>Family members' loss of companionship</li>
                    </ul>
                </div>

                <aside class="blog-sidebar">
                    <div class="sidebar-widget sidebar-cta">
                        <h3>Free Case Review</h3>
                        <p>If you or a loved one suffered a brain injury due to medical negligence, contact us.</p>
                        <a href="<?php echo home_url('/contact/'); ?>" class="btn btn-primary" style="width: 100%; margin-bottom: 16px;">
                            Contact Us Now
                        </a>
                        <a href="tel:<?php echo esc_attr(preg_replace('/[^0-9]/', '', get_theme_mod('contact_phone', '713-529-1177'))); ?>" class="phone-link" style="display: block; text-align: center; color: var(--tw-secondary); font-weight: 700; font-size: 1.25rem;">
                            (<?php echo esc_html(get_theme_mod('contact_phone', '713-529-1177')); ?>)
                        </a>
                    </div>
                    
                    <div class="sidebar-widget">
                        <h3>Other Practice Areas</h3>
                        <ul>
                            <li><a href="<?php echo home_url('/practice-areas/birth-injuries/'); ?>">Birth Injuries</a></li>
                            <li><a href="<?php echo home_url('/practice-areas/surgical-errors/'); ?>">Surgical Errors</a></li>
                            <li><a href="<?php echo home_url('/practice-areas/misdiagnosis/'); ?>">Misdiagnosis</a></li>
                            <li><a href="<?php echo home_url('/practice-areas/wrongful-death/'); ?>">Wrongful Death</a></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Suffered a Brain Injury Due to Medical Negligence?</h2>
            <p>Contact us for a free consultation. We fight for maximum compensation.</p>
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
