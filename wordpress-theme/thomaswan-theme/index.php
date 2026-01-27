<?php get_header(); ?>

<main>
    <!-- Hero Section -->
    <section class="hero-section">
        <div class="container">
            <span class="hero-label">Trusted Medical Malpractice Attorneys</span>
            <h1>Fighting for <span class="highlight">Justice</span> in Medical Malpractice Cases</h1>
            <p>With decades of combined experience, we have helped families across Texas recover millions in compensation for birth injuries, surgical errors, and medical negligence.</p>
            <div style="margin-top: 32px;">
                <a href="<?php echo home_url('/contact'); ?>" class="btn btn-primary">Schedule Free Consultation</a>
                <a href="tel:713-529-1177" class="btn btn-white" style="margin-left: 16px;">Call (713) 529-1177</a>
            </div>
        </div>
    </section>

    <!-- Practice Areas -->
    <section class="section">
        <div class="container">
            <div class="section-title">
                <span class="hero-label">Our Expertise</span>
                <h2>Practice Areas</h2>
                <p>We focus exclusively on medical malpractice cases, bringing specialized knowledge to every case.</p>
            </div>
            
            <div class="row">
                <div class="col-md-3">
                    <div class="practice-card">
                        <div class="icon">&#9829;</div>
                        <h4>Birth Injuries</h4>
                        <p>Representing families affected by preventable birth injuries including cerebral palsy and HIE.</p>
                        <a href="<?php echo home_url('/practice-areas/birth-injuries'); ?>" class="read-more">Learn More &rarr;</a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="practice-card">
                        <div class="icon">&#9879;</div>
                        <h4>Surgical Errors</h4>
                        <p>Fighting for victims of preventable surgical mistakes and wrong-site surgeries.</p>
                        <a href="<?php echo home_url('/practice-areas/surgical-errors'); ?>" class="read-more">Learn More &rarr;</a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="practice-card">
                        <div class="icon">&#9733;</div>
                        <h4>Brain Injuries</h4>
                        <p>Advocating for patients who suffered brain damage due to medical negligence.</p>
                        <a href="<?php echo home_url('/practice-areas/brain-injuries'); ?>" class="read-more">Learn More &rarr;</a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="practice-card">
                        <div class="icon">&#9737;</div>
                        <h4>Misdiagnosis</h4>
                        <p>Holding doctors accountable for delayed or incorrect diagnoses.</p>
                        <a href="<?php echo home_url('/practice-areas/misdiagnosis'); ?>" class="read-more">Learn More &rarr;</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Statistics -->
    <section class="section-alt">
        <div class="container">
            <div class="row">
                <div class="col-md-3">
                    <div class="stat">
                        <div class="stat-number">$50M+</div>
                        <div class="stat-label">Recovered for Clients</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat">
                        <div class="stat-number">500+</div>
                        <div class="stat-label">Cases Handled</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat">
                        <div class="stat-number">30+</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="stat">
                        <div class="stat-number">100%</div>
                        <div class="stat-label">Medical Malpractice Focus</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
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
