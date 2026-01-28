<?php
/**
 * Template Name: Wrongful Death
 */
get_header();
?>

<main>
    <!-- Page Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Practice Area</span>
            <h1 class="section-title">Wrongful Death <span class="highlight">Attorneys</span></h1>
            <p class="section-description">
                Losing a loved one due to medical negligence is devastating. We help families 
                seek justice and hold negligent healthcare providers accountable.
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <div class="single-post-content">
                    <h2>Medical Malpractice Wrongful Death</h2>
                    <p>
                        When a patient dies because a healthcare provider failed to meet the standard 
                        of care, surviving family members may be entitled to compensation. While no 
                        amount of money can replace a loved one, a wrongful death lawsuit can provide 
                        financial security and hold negligent parties accountable.
                    </p>
                    
                    <h3>Common Causes of Medical Wrongful Death</h3>
                    <ul>
                        <li><strong>Surgical Errors</strong> - Fatal mistakes during operations</li>
                        <li><strong>Medication Errors</strong> - Wrong drug, wrong dose, or harmful interactions</li>
                        <li><strong>Delayed Diagnosis</strong> - Cancer or other conditions caught too late</li>
                        <li><strong>Birth Injuries</strong> - Infant or maternal death during delivery</li>
                        <li><strong>Anesthesia Errors</strong> - Fatal reactions or monitoring failures</li>
                        <li><strong>Hospital Infections</strong> - Sepsis and other preventable infections</li>
                        <li><strong>Nursing Home Neglect</strong> - Failure to provide adequate care</li>
                    </ul>
                    
                    <h3>Who Can File a Wrongful Death Claim in Texas?</h3>
                    <p>
                        Under Texas law, the following family members can file a wrongful death claim:
                    </p>
                    <ul>
                        <li>Surviving spouse</li>
                        <li>Children (including adopted children)</li>
                        <li>Parents of the deceased</li>
                    </ul>
                    <p>
                        Claims must generally be filed within two years of the date of death, though 
                        some exceptions may apply.
                    </p>
                    
                    <h3>Damages in Wrongful Death Cases</h3>
                    <p>
                        Compensation in wrongful death cases may include:
                    </p>
                    <ul>
                        <li>Medical expenses before death</li>
                        <li>Funeral and burial costs</li>
                        <li>Lost income and benefits the deceased would have earned</li>
                        <li>Loss of companionship, comfort, and guidance</li>
                        <li>Mental anguish and emotional suffering</li>
                        <li>Loss of inheritance</li>
                    </ul>
                    
                    <blockquote>
                        "They were aggressive and fought hard for us. I highly recommend them." — Lisa A., Client
                    </blockquote>
                </div>

                <aside class="blog-sidebar">
                    <div class="sidebar-widget sidebar-cta">
                        <h3>We're Here for You</h3>
                        <p>If you've lost a loved one due to medical negligence, we can help.</p>
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
                            <li><a href="<?php echo home_url('/practice-areas/misdiagnosis/'); ?>">Misdiagnosis</a></li>
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
                <span class="section-label">Wrongful Death Results</span>
                <h2 class="section-title">Fighting for Grieving Families</h2>
            </div>
            
            <div class="results-grid">
                <div class="result-card">
                    <div class="result-amount">$4.8 Million</div>
                    <div class="result-type">Wrongful Death Settlement</div>
                    <p class="result-description">For a family who lost a mother due to misdiagnosis of heart condition.</p>
                </div>
                <div class="result-card">
                    <div class="result-amount">$3.2 Million</div>
                    <div class="result-type">Surgical Death</div>
                    <p class="result-description">Settlement for death due to post-operative complications.</p>
                </div>
                <div class="result-card">
                    <div class="result-amount">$2.9 Million</div>
                    <div class="result-type">Hospital Negligence</div>
                    <p class="result-description">For failure to respond to deteriorating patient condition.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Lost a Loved One to Medical Negligence?</h2>
            <p>Our compassionate attorneys are here to help your family seek justice.</p>
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
