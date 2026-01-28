<?php
/**
 * Template Name: Misdiagnosis
 */
get_header();
?>

<main>
    <!-- Page Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Practice Area</span>
            <h1 class="section-title">Misdiagnosis <span class="highlight">Attorneys</span></h1>
            <p class="section-description">
                A missed or delayed diagnosis can be the difference between life and death. 
                We hold doctors accountable for diagnostic failures.
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <div class="single-post-content">
                    <h2>Failure to Diagnose & Misdiagnosis</h2>
                    <p>
                        Diagnostic errors are among the most common forms of medical malpractice. When a 
                        doctor fails to correctly identify a condition, patients may receive the wrong 
                        treatment, no treatment, or treatment that comes too late to prevent serious harm.
                    </p>
                    
                    <h3>Common Misdiagnosis Cases</h3>
                    <ul>
                        <li><strong>Cancer Misdiagnosis</strong> - Delayed detection allowing cancer to spread</li>
                        <li><strong>Heart Attack</strong> - Dismissing cardiac symptoms as less serious conditions</li>
                        <li><strong>Stroke</strong> - Failing to recognize signs leading to permanent brain damage</li>
                        <li><strong>Infections</strong> - Missing sepsis or other life-threatening infections</li>
                        <li><strong>Pulmonary Embolism</strong> - Misdiagnosed as muscle pain or anxiety</li>
                        <li><strong>Appendicitis</strong> - Delayed surgery leading to rupture and complications</li>
                    </ul>
                    
                    <h3>How Misdiagnosis Happens</h3>
                    <p>
                        Diagnostic errors typically occur due to:
                    </p>
                    <ul>
                        <li>Failure to order appropriate tests</li>
                        <li>Misreading lab results or imaging studies</li>
                        <li>Not taking a complete patient history</li>
                        <li>Ignoring patient symptoms or concerns</li>
                        <li>Failure to refer to specialists</li>
                        <li>Communication breakdowns between providers</li>
                    </ul>
                    
                    <h3>Proving a Misdiagnosis Case</h3>
                    <p>
                        To succeed in a misdiagnosis case, we must prove that a competent doctor in the 
                        same specialty would have made the correct diagnosis, and that the failure to 
                        diagnose caused harm. This requires:
                    </p>
                    <ul>
                        <li>Expert medical testimony</li>
                        <li>Thorough review of medical records</li>
                        <li>Evidence of what correct treatment would have achieved</li>
                        <li>Documentation of the harm caused by the delay</li>
                    </ul>
                    
                    <blockquote>
                        "Linda Thomas and Michelle Wan are the dedicated attorneys you need. They explained 
                        everything clearly and were always available to answer my questions." — Sarah M., Client
                    </blockquote>
                </div>

                <aside class="blog-sidebar">
                    <div class="sidebar-widget sidebar-cta">
                        <h3>Free Case Review</h3>
                        <p>If a doctor failed to diagnose your condition, you may have a case.</p>
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
                            <li><a href="<?php echo home_url('/practice-areas/brain-injuries/'); ?>">Brain Injuries</a></li>
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
            <h2>Was Your Condition Misdiagnosed?</h2>
            <p>Contact us for a free consultation to discuss your case.</p>
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
