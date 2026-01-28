<?php
/**
 * Template Name: Birth Injuries
 */
get_header();
?>

<main>
    <!-- Page Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Practice Area</span>
            <h1 class="section-title">Birth Injury <span class="highlight">Attorneys</span></h1>
            <p class="section-description">
                If your child suffered a preventable birth injury, you deserve answers and justice. 
                Our experienced attorneys have helped families recover millions in birth injury cases.
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <div class="single-post-content">
                    <h2>Understanding Birth Injuries</h2>
                    <p>
                        Birth injuries occur when a baby is harmed during the labor and delivery process. 
                        While some birth injuries are unavoidable, many are caused by medical negligence, 
                        including failure to monitor fetal distress, improper use of delivery tools, 
                        delayed C-sections, and medication errors.
                    </p>
                    
                    <h3>Types of Birth Injuries We Handle</h3>
                    <ul>
                        <li><strong>Cerebral Palsy</strong> - Often caused by oxygen deprivation during birth</li>
                        <li><strong>Brachial Plexus Injuries</strong> - Nerve damage affecting the arm and hand</li>
                        <li><strong>Hypoxic-Ischemic Encephalopathy (HIE)</strong> - Brain damage from lack of oxygen</li>
                        <li><strong>Shoulder Dystocia</strong> - When the baby's shoulder gets stuck during delivery</li>
                        <li><strong>Erb's Palsy</strong> - Paralysis of the arm caused by nerve injury</li>
                        <li><strong>Skull Fractures</strong> - Often from improper use of forceps or vacuum extractors</li>
                    </ul>
                    
                    <h3>Signs of a Birth Injury</h3>
                    <p>
                        Some birth injuries are immediately apparent, while others may not become obvious 
                        until your child misses developmental milestones. Warning signs include:
                    </p>
                    <ul>
                        <li>Difficulty feeding or swallowing</li>
                        <li>Excessive drooling</li>
                        <li>Favoring one side of the body</li>
                        <li>Delayed motor skill development</li>
                        <li>Seizures in infancy</li>
                        <li>Arched back while crying</li>
                    </ul>
                    
                    <h3>Why Choose Thomas & Wan for Your Birth Injury Case?</h3>
                    <p>
                        Birth injury cases require specialized medical knowledge and significant resources. 
                        At Thomas & Wan, we work with leading medical experts to thoroughly investigate 
                        what happened during your delivery and build the strongest possible case.
                    </p>
                    <p>
                        We understand the emotional and financial burden families face when caring for a 
                        child with a birth injury. That's why we fight to recover compensation for:
                    </p>
                    <ul>
                        <li>Current and future medical expenses</li>
                        <li>Therapy and rehabilitation costs</li>
                        <li>Special education needs</li>
                        <li>Adaptive equipment and home modifications</li>
                        <li>Lost earning capacity</li>
                        <li>Pain and suffering</li>
                    </ul>
                    
                    <blockquote>
                        "I had a hard time coming to terms with what happened to my baby at birth... 
                        what helped me was she said it wasn't my fault." — Alyssa, Client
                    </blockquote>
                </div>

                <aside class="blog-sidebar">
                    <div class="sidebar-widget sidebar-cta">
                        <h3>Free Case Review</h3>
                        <p>If your child suffered a birth injury, contact us for a free consultation.</p>
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
                            <li><a href="<?php echo home_url('/practice-areas/surgical-errors/'); ?>">Surgical Errors</a></li>
                            <li><a href="<?php echo home_url('/practice-areas/brain-injuries/'); ?>">Brain Injuries</a></li>
                            <li><a href="<?php echo home_url('/practice-areas/misdiagnosis/'); ?>">Misdiagnosis</a></li>
                            <li><a href="<?php echo home_url('/practice-areas/wrongful-death/'); ?>">Wrongful Death</a></li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    </section>

    <!-- Results -->
    <section class="section-alt">
        <div class="container">
            <div class="section-header">
                <span class="section-label">Birth Injury Results</span>
                <h2 class="section-title">We Fight for Maximum Compensation</h2>
            </div>
            
            <div class="results-grid">
                <div class="result-card">
                    <div class="result-amount">$6.5 Million</div>
                    <div class="result-type">Birth Injury Settlement</div>
                    <p class="result-description">For a child who suffered brain damage due to delayed delivery.</p>
                </div>
                <div class="result-card">
                    <div class="result-amount">$4.2 Million</div>
                    <div class="result-type">Cerebral Palsy</div>
                    <p class="result-description">Settlement for failure to perform timely C-section.</p>
                </div>
                <div class="result-card">
                    <div class="result-amount">$3.8 Million</div>
                    <div class="result-type">Shoulder Dystocia</div>
                    <p class="result-description">Verdict for brachial plexus injury during delivery.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Was Your Child Injured at Birth?</h2>
            <p>You may have a case. Contact us for a free, confidential consultation.</p>
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
