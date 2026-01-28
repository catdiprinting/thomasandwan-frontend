<?php
/**
 * Template Name: Surgical Errors
 */
get_header();
?>

<main>
    <!-- Page Header -->
    <section class="blog-header">
        <div class="container">
            <span class="section-label">Practice Area</span>
            <h1 class="section-title">Surgical Error <span class="highlight">Attorneys</span></h1>
            <p class="section-description">
                When surgeons make preventable mistakes, the consequences can be devastating. 
                We hold negligent medical professionals accountable for surgical errors.
            </p>
        </div>
    </section>

    <!-- Main Content -->
    <section class="section">
        <div class="container">
            <div class="blog-archive-grid">
                <div class="single-post-content">
                    <h2>Understanding Surgical Errors</h2>
                    <p>
                        Surgical errors are mistakes made by surgeons, anesthesiologists, nurses, or other 
                        operating room staff before, during, or after a surgical procedure. These errors 
                        can result in serious injuries, prolonged recovery, additional surgeries, and even death.
                    </p>
                    
                    <h3>Types of Surgical Errors We Handle</h3>
                    <ul>
                        <li><strong>Wrong-Site Surgery</strong> - Operating on the wrong body part or side</li>
                        <li><strong>Wrong-Patient Surgery</strong> - Performing surgery on the incorrect patient</li>
                        <li><strong>Retained Surgical Objects</strong> - Leaving sponges, instruments, or other items inside the patient</li>
                        <li><strong>Anesthesia Errors</strong> - Incorrect dosage or failure to monitor vital signs</li>
                        <li><strong>Nerve Damage</strong> - Accidental cutting or damaging of nerves during surgery</li>
                        <li><strong>Surgical Infections</strong> - Infections caused by unsterile conditions or improper technique</li>
                        <li><strong>Organ Perforation</strong> - Accidentally puncturing organs during surgery</li>
                    </ul>
                    
                    <h3>How Surgical Errors Occur</h3>
                    <p>
                        Surgical errors often result from systemic failures rather than a single mistake. 
                        Common causes include:
                    </p>
                    <ul>
                        <li>Poor communication among surgical team members</li>
                        <li>Inadequate preoperative planning</li>
                        <li>Surgeon fatigue or impairment</li>
                        <li>Failure to follow established protocols</li>
                        <li>Understaffing in the operating room</li>
                        <li>Faulty or defective surgical equipment</li>
                    </ul>
                    
                    <h3>Proving Surgical Malpractice</h3>
                    <p>
                        To prove a surgical error claim, we must establish that the surgeon or surgical 
                        team deviated from the accepted standard of care and that this deviation caused 
                        your injury. Our firm works with medical experts who can:
                    </p>
                    <ul>
                        <li>Review your medical records and surgical notes</li>
                        <li>Identify where the standard of care was breached</li>
                        <li>Explain to a jury exactly what went wrong</li>
                        <li>Calculate the full extent of your damages</li>
                    </ul>
                    
                    <blockquote>
                        "Thomas & Wan went to work right away and through research found out critical 
                        information. They were aggressive and fought hard for us." — Lisa A., Client
                    </blockquote>
                </div>

                <aside class="blog-sidebar">
                    <div class="sidebar-widget sidebar-cta">
                        <h3>Free Case Review</h3>
                        <p>If you were harmed by a surgical error, contact us for a free consultation.</p>
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
                <span class="section-label">Surgical Error Results</span>
                <h2 class="section-title">Holding Surgeons Accountable</h2>
            </div>
            
            <div class="results-grid">
                <div class="result-card">
                    <div class="result-amount">$2.1 Million</div>
                    <div class="result-type">Surgical Error Verdict</div>
                    <p class="result-description">For permanent nerve damage during routine surgery.</p>
                </div>
                <div class="result-card">
                    <div class="result-amount">$1.8 Million</div>
                    <div class="result-type">Retained Object</div>
                    <p class="result-description">Settlement for surgical sponge left inside patient.</p>
                </div>
                <div class="result-card">
                    <div class="result-amount">$2.5 Million</div>
                    <div class="result-type">Anesthesia Error</div>
                    <p class="result-description">For brain damage caused by anesthesia complications.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
        <div class="container">
            <h2>Were You Harmed by a Surgical Error?</h2>
            <p>You may be entitled to compensation. Contact us for a free case evaluation.</p>
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
