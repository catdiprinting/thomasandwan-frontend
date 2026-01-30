<?php
/**
 * Demo Content Import
 *
 * @package Thomas_Wan
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

/**
 * Add Demo Import Menu
 */
function thomas_wan_demo_import_menu() {
    add_theme_page(
        __( 'Import Demo Content', 'thomas-wan' ),
        __( 'Import Demo', 'thomas-wan' ),
        'manage_options',
        'thomas-wan-demo-import',
        'thomas_wan_demo_import_page'
    );
}
add_action( 'admin_menu', 'thomas_wan_demo_import_menu' );

/**
 * Demo Import Page
 */
function thomas_wan_demo_import_page() {
    ?>
    <div class="wrap">
        <h1><?php _e( 'Thomas & Wan - Import Demo Content', 'thomas-wan' ); ?></h1>
        
        <div style="background: #fff; padding: 30px; margin-top: 20px; border: 1px solid #ccd0d4; max-width: 800px;">
            
            <?php if ( isset( $_GET['imported'] ) && $_GET['imported'] === 'success' ) : ?>
                <div class="notice notice-success" style="margin-bottom: 20px;">
                    <p><strong><?php _e( 'Demo content imported successfully!', 'thomas-wan' ); ?></strong></p>
                </div>
            <?php endif; ?>
            
            <h2><?php _e( 'What will be imported:', 'thomas-wan' ); ?></h2>
            
            <ul style="list-style: disc; padding-left: 25px; margin-bottom: 30px;">
                <li><strong>6 Testimonials</strong> - Real client testimonials from Thomas & Wan</li>
                <li><strong>5 Practice Areas</strong> - Birth Injuries, Surgical Errors, Brain Injuries, Misdiagnosis, Wrongful Death</li>
                <li><strong>3 Case Results</strong> - Sample verdicts and settlements</li>
                <li><strong>2 Team Members</strong> - Linda Thomas and Michelle Wan profiles</li>
                <li><strong>Core Pages</strong> - Home, About, Contact, Testimonials</li>
                <li><strong>Navigation Menus</strong> - Primary and Footer menus</li>
            </ul>
            
            <p style="color: #666; margin-bottom: 20px;">
                <strong>Note:</strong> This will create new content but will not overwrite existing posts or pages.
            </p>
            
            <form method="post" action="">
                <?php wp_nonce_field( 'thomas_wan_demo_import', 'demo_import_nonce' ); ?>
                <input type="submit" name="import_demo" class="button button-primary button-hero" value="<?php _e( 'Import Demo Content', 'thomas-wan' ); ?>">
            </form>
            
        </div>
    </div>
    <?php
}

/**
 * Handle Demo Import
 */
function thomas_wan_handle_demo_import() {
    if ( ! isset( $_POST['import_demo'] ) || ! isset( $_POST['demo_import_nonce'] ) ) {
        return;
    }
    
    if ( ! wp_verify_nonce( $_POST['demo_import_nonce'], 'thomas_wan_demo_import' ) ) {
        return;
    }
    
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }
    
    // Import Testimonials
    thomas_wan_import_testimonials();
    
    // Import Practice Areas
    thomas_wan_import_practice_areas();
    
    // Import Case Results
    thomas_wan_import_case_results();
    
    // Import Team Members
    thomas_wan_import_team_members();
    
    // Import Pages
    thomas_wan_import_pages();
    
    // Create Menus
    thomas_wan_create_menus();
    
    // Set Homepage
    thomas_wan_set_homepage();
    
    // Redirect
    wp_redirect( admin_url( 'themes.php?page=thomas-wan-demo-import&imported=success' ) );
    exit;
}
add_action( 'admin_init', 'thomas_wan_handle_demo_import' );

/**
 * Import Testimonials
 */
function thomas_wan_import_testimonials() {
    $testimonials = array(
        array(
            'title' => 'Alyssa - Birth Injury Case',
            'content' => 'I had a hard time coming to the terms with what happened to my baby at birth..and as I was looking thru and for a Medical Mal Practice attorney and her face was so welcoming I loved what I read and how long she has been an attorney. our first meet and greet I was anxious and emotional and she had a comfortable vibe in her tone of voice..her concern about what\'s happened..and her smile… I instantly relaxed and what helped me thru my childbirth complications was she said it wasn\'t my fault.',
            'client_name' => 'Alyssa',
            'date' => '',
        ),
        array(
            'title' => 'Lisa A - Premises Liability',
            'content' => 'Thomas & Wan did a great job representing me and my family against the owner of our apartment complex. We have just moved in when our daughter was shot in the head by a stray bullet while she was sleeping in her bed. It was a miracle she survived. The lawyers at Thomas & Wan went to work right away and through research found out that there had been five murders at that complex the year before. They also found out that the complex didn\'t hire security to patrol at night. They were aggressive and fought hard for us.',
            'client_name' => 'Lisa A',
            'date' => '',
        ),
        array(
            'title' => 'Lauren - Medical Malpractice',
            'content' => 'After being abandoned by my original lawyer who was greedy for money, Linda was a TRUE answer to my prayers. She is after JUSTICE, not money. She has spent COUNTLESS hours researching my case and asking just the right questions. She has the heart of a saint; she really cares about her clients and it shows. I have emailed her outside of our visits asking for updates or just addressing concerns I have, and she answers right away. I also have been very anxious and stressed with my case.',
            'client_name' => 'Lauren',
            'date' => '',
        ),
        array(
            'title' => 'Rogelio L - Refinery Injury',
            'content' => 'Linda and Michelle represented me when I was hurt at a refinery. I had tried using a different lawyer, but he never returned my calls or talked to me. Linda and Michelle did a good job and they care about your case.',
            'client_name' => 'Rogelio L',
            'date' => '',
        ),
        array(
            'title' => 'Stephanie S - Birth Injury',
            'content' => 'Thomas & Wan represented my baby who was seriously harmed by nurses at a hospital who did not know what they were doing. Linda and Michelle were able to guide us through what to do in getting help for my baby for the rest of his life.',
            'client_name' => 'Stephanie S',
            'date' => '',
        ),
        array(
            'title' => 'Houston Chronicle Feature',
            'content' => 'After a heart transplant in August 2016, Ernest "Chris" Keys can\'t talk or walk. The Houston hospital is under pressure for the quality of its once-renowned heart program. Now it is being sued by Mr. Keys\'s family.',
            'client_name' => 'Houston Chronicle',
            'date' => 'July 5, 2018',
        ),
    );
    
    foreach ( $testimonials as $testimonial ) {
        $post_id = wp_insert_post( array(
            'post_title'   => $testimonial['title'],
            'post_content' => $testimonial['content'],
            'post_type'    => 'testimonial',
            'post_status'  => 'publish',
        ) );
        
        if ( $post_id ) {
            update_post_meta( $post_id, '_client_name', $testimonial['client_name'] );
            update_post_meta( $post_id, '_testimonial_date', $testimonial['date'] );
        }
    }
}

/**
 * Import Practice Areas
 */
function thomas_wan_import_practice_areas() {
    $practice_areas = array(
        array(
            'title' => 'Birth Injuries',
            'excerpt' => 'Birth injuries turn a moment of joy into a lifetime of challenges. We handle cases involving cerebral palsy, hypoxia, shoulder dystocia, and other preventable injuries caused by medical negligence during labor and delivery.',
            'content' => '<h2>Understanding Birth Injuries</h2>
<p>Birth injuries occur when a baby is harmed during the labor and delivery process. While some birth injuries are unavoidable, many result from medical negligence — doctors, nurses, or hospital staff failing to meet the standard of care.</p>

<p>At Thomas & Wan, we have dedicated our practice to helping families affected by preventable birth injuries. We understand the emotional and financial toll these injuries take, and we fight to ensure your family receives the compensation needed to provide lifelong care for your child.</p>

<h2>Types of Birth Injuries We Handle</h2>

<h3>Cerebral Palsy</h3>
<p>Cerebral palsy often results from oxygen deprivation during birth. When medical professionals fail to monitor fetal distress or delay necessary interventions like emergency C-sections, the consequences can be devastating.</p>

<h3>Erb\'s Palsy and Brachial Plexus Injuries</h3>
<p>These injuries occur when excessive force is used during delivery, damaging the nerves that control the arm and hand. Shoulder dystocia, if not properly managed, is a common cause.</p>

<h3>Hypoxic Ischemic Encephalopathy (HIE)</h3>
<p>HIE is brain damage caused by lack of oxygen and blood flow to the brain. This serious condition requires immediate intervention and can lead to permanent cognitive and physical disabilities.</p>

<h2>Signs of Medical Negligence in Birth Injuries</h2>
<ul>
<li>Failure to monitor fetal heart rate</li>
<li>Delayed response to fetal distress</li>
<li>Improper use of delivery instruments (forceps, vacuum)</li>
<li>Failure to perform a timely C-section</li>
<li>Mismanagement of shoulder dystocia</li>
<li>Improper administration of Pitocin or other drugs</li>
</ul>

<h2>Why Choose Thomas & Wan for Your Birth Injury Case?</h2>
<p>Birth injury cases are among the most complex in medical malpractice law. They require extensive medical knowledge, expert witnesses, and the resources to take on major hospitals and their insurance companies.</p>

<p>Linda Thomas and Michelle Wan have over 55 years of combined experience specifically in medical malpractice. We work with leading medical experts to build the strongest possible case for your family.</p>',
            'icon' => '👶',
            'cases_list' => "Cerebral Palsy\nErb's Palsy\nHypoxic Ischemic Encephalopathy (HIE)\nShoulder Dystocia\nBrachial Plexus Injuries\nFailure to Perform C-Section\nFetal Monitoring Errors",
        ),
        array(
            'title' => 'Surgical Errors',
            'excerpt' => 'When surgeons, anesthesiologists, or nurses make preventable mistakes in the operating room, the consequences can be fatal. We fight for patients harmed by surgical negligence.',
            'content' => '<h2>When Surgery Goes Wrong</h2>
<p>Surgery carries inherent risks, but many surgical complications are entirely preventable. When medical professionals make errors before, during, or after surgery, patients can suffer life-altering injuries or even death.</p>

<h2>Common Surgical Errors</h2>

<h3>Wrong-Site Surgery</h3>
<p>Operating on the wrong body part, wrong side, or wrong patient represents a clear failure of basic safety protocols.</p>

<h3>Anesthesia Errors</h3>
<p>Improper dosing, failure to monitor vital signs, or allergic reactions can lead to brain damage, coma, or death.</p>

<h3>Retained Surgical Instruments</h3>
<p>Sponges, clamps, and other surgical tools left inside patients cause infections, pain, and often require additional surgery.</p>

<h3>Nerve and Organ Damage</h3>
<p>Careless surgical technique can result in severed nerves, punctured organs, or excessive bleeding.</p>

<h2>Holding Surgeons Accountable</h2>
<p>Surgical errors often require expert testimony to prove negligence. Our firm works with leading surgeons and medical experts who can analyze your case and testify on your behalf.</p>',
            'icon' => '🩺',
            'cases_list' => "Wrong Site Surgery\nAnesthesia Errors\nRetained Surgical Instruments\nPost-Operative Infections\nNerve Damage\nOrgan Perforation\nExcessive Bleeding",
        ),
        array(
            'title' => 'Brain Injuries',
            'excerpt' => 'Traumatic brain injuries resulting from medical negligence require lifetime care. We help families secure the financial resources needed for long-term rehabilitation and support.',
            'content' => '<h2>The Devastating Impact of Brain Injuries</h2>
<p>Brain injuries caused by medical negligence can fundamentally change a person\'s life. Victims may face cognitive impairments, personality changes, loss of motor function, and the need for lifelong care.</p>

<h2>Medical Causes of Brain Injuries</h2>

<h3>Oxygen Deprivation (Anoxic Brain Injury)</h3>
<p>When the brain is deprived of oxygen due to surgical errors, anesthesia mistakes, or delayed treatment, permanent damage can occur within minutes.</p>

<h3>Stroke Misdiagnosis</h3>
<p>Failure to recognize and treat stroke symptoms promptly can result in extensive brain damage that could have been prevented.</p>

<h3>Medication Errors</h3>
<p>Wrong medications or incorrect dosages can cause seizures, bleeding in the brain, or other catastrophic injuries.</p>

<h2>Pursuing Maximum Compensation</h2>
<p>Brain injury cases often involve substantial damages including lifetime medical care, lost earning capacity, pain and suffering, and loss of quality of life. We fight to ensure our clients receive the full compensation they deserve.</p>',
            'icon' => '🧠',
            'cases_list' => "Anoxic Brain Injury\nTraumatic Brain Injury (TBI)\nStroke Misdiagnosis\nUndiagnosed Aneurysms\nMedication Errors affecting the Brain\nSurgical Complications\nBirth-Related Brain Injuries",
        ),
        array(
            'title' => 'Misdiagnosis',
            'excerpt' => 'Failure to diagnose a critical condition is one of the most common forms of medical malpractice. Early detection saves lives, and when doctors miss the signs, we hold them accountable.',
            'content' => '<h2>The Cost of Missed Diagnoses</h2>
<p>A correct diagnosis is the foundation of effective medical treatment. When doctors fail to diagnose conditions like cancer, heart disease, or infections, patients lose precious time — time that could mean the difference between life and death.</p>

<h2>Common Misdiagnosis Cases</h2>

<h3>Cancer Misdiagnosis</h3>
<p>Delayed cancer diagnosis is one of the most common and devastating forms of diagnostic error. Early-stage cancer is often treatable, but delays allow the disease to progress to advanced stages.</p>

<h3>Heart Attack Misdiagnosis</h3>
<p>Heart attack symptoms, especially in women, are often dismissed as anxiety, indigestion, or muscle strain. This delay can result in permanent heart damage or death.</p>

<h3>Stroke Misdiagnosis</h3>
<p>Every minute counts during a stroke. Misdiagnosis delays treatment, leading to increased brain damage and disability.</p>

<h3>Infection Misdiagnosis</h3>
<p>Failure to diagnose sepsis or meningitis can rapidly progress to organ failure and death.</p>

<h2>Proving Diagnostic Negligence</h2>
<p>We work with medical experts to demonstrate that a competent physician should have made the correct diagnosis given the symptoms and test results available.</p>',
            'icon' => '📋',
            'cases_list' => "Cancer Misdiagnosis\nHeart Attack Misdiagnosis\nStroke Misdiagnosis\nMeningitis Misdiagnosis\nSepsis Misdiagnosis\nPulmonary Embolism\nAppendiciitis Misdiagnosis",
        ),
        array(
            'title' => 'Wrongful Death',
            'excerpt' => 'Losing a loved one due to medical carelessness is a tragedy no family should endure. We provide compassionate yet aggressive representation for families seeking justice for wrongful death.',
            'content' => '<h2>Seeking Justice for Your Loved One</h2>
<p>No amount of money can replace the loss of a family member. But a wrongful death lawsuit can provide financial security for surviving family members and hold negligent medical providers accountable for their actions.</p>

<h2>Common Causes of Medical Wrongful Death</h2>

<h3>Surgical Fatalities</h3>
<p>Deaths during or after surgery may result from surgical errors, anesthesia mistakes, or failure to properly monitor patients post-operatively.</p>

<h3>Emergency Room Negligence</h3>
<p>Overcrowded ERs, undertrained staff, and failure to triage properly can result in preventable deaths.</p>

<h3>Medication Errors</h3>
<p>Wrong medications, dangerous drug interactions, or improper dosing can be fatal.</p>

<h3>Failure to Rescue</h3>
<p>When hospital staff fail to recognize and respond to a patient\'s deteriorating condition, preventable death can occur.</p>

<h2>Who Can File a Wrongful Death Claim?</h2>
<p>In Texas, the surviving spouse, children, and parents of the deceased may bring a wrongful death claim. The claim must be filed within two years of the death.</p>

<h2>Damages in Wrongful Death Cases</h2>
<ul>
<li>Medical expenses incurred before death</li>
<li>Funeral and burial costs</li>
<li>Loss of financial support</li>
<li>Loss of companionship and consortium</li>
<li>Mental anguish and emotional suffering</li>
</ul>',
            'icon' => '💔',
            'cases_list' => "Fatal Medication Errors\nSurgical Fatalities\nFailure to Rescue\nEmergency Room Negligence\nFatal Misdiagnosis\nAnesthesia Deaths\nHospital-Acquired Infections",
        ),
    );
    
    $order = 1;
    foreach ( $practice_areas as $area ) {
        $post_id = wp_insert_post( array(
            'post_title'   => $area['title'],
            'post_excerpt' => $area['excerpt'],
            'post_content' => $area['content'],
            'post_type'    => 'practice_area',
            'post_status'  => 'publish',
            'menu_order'   => $order,
        ) );
        
        if ( $post_id ) {
            update_post_meta( $post_id, '_practice_icon', $area['icon'] );
            update_post_meta( $post_id, '_cases_list', $area['cases_list'] );
        }
        
        $order++;
    }
}

/**
 * Import Case Results
 */
function thomas_wan_import_case_results() {
    $results = array(
        array(
            'title' => 'Birth Injury Brain Damage Settlement',
            'content' => 'Settlement for a child who suffered brain damage due to delayed delivery. The hospital failed to perform an emergency C-section despite clear signs of fetal distress.',
            'amount' => '$6.5 Million',
            'type' => 'Birth Injury Settlement',
        ),
        array(
            'title' => 'Surgical Nerve Damage Verdict',
            'content' => 'Verdict for a patient who suffered permanent nerve damage during routine surgery. The surgeon failed to properly identify anatomical structures.',
            'amount' => '$2.1 Million',
            'type' => 'Surgical Error',
        ),
        array(
            'title' => 'Heart Attack Misdiagnosis Settlement',
            'content' => 'Settlement for a family who lost a mother due to misdiagnosis of heart condition. The ER failed to recognize classic heart attack symptoms.',
            'amount' => '$4.8 Million',
            'type' => 'Wrongful Death',
        ),
    );
    
    foreach ( $results as $result ) {
        $post_id = wp_insert_post( array(
            'post_title'   => $result['title'],
            'post_content' => $result['content'],
            'post_type'    => 'case_result',
            'post_status'  => 'publish',
        ) );
        
        if ( $post_id ) {
            update_post_meta( $post_id, '_case_amount', $result['amount'] );
            update_post_meta( $post_id, '_case_type', $result['type'] );
        }
    }
}

/**
 * Import Team Members
 */
function thomas_wan_import_team_members() {
    $team = array(
        array(
            'title' => 'Linda Thomas',
            'content' => 'Linda Thomas has dedicated over 35 years to representing victims of medical malpractice and personal injury. She is Board Certified in Personal Injury Trial Law by the Texas Board of Legal Specialization, a distinction held by less than 3% of Texas attorneys.

Linda has been recognized as an AV Preeminent rated attorney by Martindale-Hubbell, the highest rating for legal ability and ethical standards. She has also been named a Texas Super Lawyer and listed among the Best Lawyers in America.

Her passion for justice stems from a deep belief that everyone deserves quality legal representation, regardless of the power of their opponent. She has successfully taken on major hospital systems throughout Texas and recovered millions for her clients.',
            'job_title' => 'Founding Partner',
        ),
        array(
            'title' => 'Michelle Wan',
            'content' => 'Michelle Wan brings a unique perspective to medical malpractice law as a former registered nurse. Her medical background allows her to quickly identify instances of negligence and understand the complex medical issues involved in each case.

With over 25 years of legal experience, Michelle has built a reputation as a fierce advocate for her clients. She is known for her meticulous preparation and her ability to explain complex medical concepts to juries in simple terms.

Michelle is a member of the Texas Trial Lawyers Association and the Houston Trial Lawyers Association. She is committed to fighting for families who have been devastated by medical negligence.',
            'job_title' => 'Founding Partner',
        ),
    );
    
    $order = 1;
    foreach ( $team as $member ) {
        $post_id = wp_insert_post( array(
            'post_title'   => $member['title'],
            'post_content' => $member['content'],
            'post_type'    => 'team_member',
            'post_status'  => 'publish',
            'menu_order'   => $order,
        ) );
        
        if ( $post_id ) {
            update_post_meta( $post_id, '_member_title', $member['job_title'] );
        }
        
        $order++;
    }
}

/**
 * Import Pages
 */
function thomas_wan_import_pages() {
    // About Page
    wp_insert_post( array(
        'post_title'   => 'About Us',
        'post_name'    => 'about',
        'post_content' => '<h2>Houston\'s Trusted Medical Malpractice Attorneys</h2>

<p>Thomas & Wan LLP is a women-owned law firm dedicated exclusively to representing victims of medical malpractice in Houston and throughout Texas. Founded by Linda Thomas and Michelle Wan, our firm combines over 55 years of legal experience with a genuine passion for justice.</p>

<h2>Why We Do What We Do</h2>

<p>Medical malpractice cases are among the most challenging in the legal profession. They require extensive resources, specialized knowledge, and the willingness to stand up to powerful hospital systems and insurance companies. Many law firms shy away from these cases, but we embrace them.</p>

<p>We believe that when medical professionals fail to meet the standard of care, they should be held accountable. More importantly, we believe that families who have been devastated by medical negligence deserve compassionate, experienced legal representation.</p>

<h2>What Sets Us Apart</h2>

<ul>
<li><strong>100% Focus on Medical Malpractice:</strong> We don\'t handle car accidents, slip and falls, or divorces. Our sole focus is medical malpractice, allowing us to develop deep expertise in this complex area of law.</li>
<li><strong>Former Medical Professional:</strong> Michelle Wan\'s background as a registered nurse gives our firm unique insight into medical procedures and standards of care.</li>
<li><strong>Board Certified:</strong> Linda Thomas is Board Certified in Personal Injury Trial Law, a distinction held by less than 3% of Texas attorneys.</li>
<li><strong>Proven Results:</strong> We have recovered millions of dollars for our clients and have a track record of success against major hospital systems.</li>
<li><strong>Personal Attention:</strong> Every case is personally handled by Linda and Michelle. We don\'t hand off cases to junior associates.</li>
</ul>

<h2>Our Commitment to You</h2>

<p>When you choose Thomas & Wan, you\'re not just getting attorneys — you\'re getting advocates who will fight tirelessly for your family. We understand that you\'re going through one of the most difficult times in your life, and we\'re here to shoulder the legal burden so you can focus on healing.</p>

<p>We work on a contingency fee basis, which means you pay nothing unless we win your case. This ensures that everyone has access to quality legal representation, regardless of their financial situation.</p>',
        'post_type'    => 'page',
        'post_status'  => 'publish',
    ) );
    
    // Contact Page
    wp_insert_post( array(
        'post_title'   => 'Contact Us',
        'post_name'    => 'contact',
        'post_content' => '<h2>Get Your Free Case Review</h2>

<p>If you or a loved one has been harmed by medical negligence, we\'re here to help. Contact us today for a free, confidential consultation.</p>

<h3>Our Office</h3>
<p><strong>Thomas & Wan LLP</strong><br>
440 Louisiana Street, Suite 1500<br>
Houston, TX 77002</p>

<p><strong>Phone:</strong> <a href="tel:7135291177">(713) 529-1177</a><br>
<strong>Email:</strong> info@thomasandwan.com</p>

<h3>Office Hours</h3>
<p>Monday - Friday: 8:30 AM - 5:30 PM<br>
We are available 24/7 for emergencies</p>

<h3>Send Us a Message</h3>
<p>Use the form below to tell us about your case. All consultations are free and confidential.</p>

[contact-form-7 id="YOUR_FORM_ID" title="Contact Form"]',
        'post_type'    => 'page',
        'post_status'  => 'publish',
    ) );
    
    // Testimonials Page
    wp_insert_post( array(
        'post_title'   => 'Testimonials',
        'post_name'    => 'testimonials',
        'post_content' => '',
        'post_type'    => 'page',
        'post_status'  => 'publish',
        'page_template' => 'archive-testimonial.php',
    ) );
}

/**
 * Create Navigation Menus
 */
function thomas_wan_create_menus() {
    // Create Primary Menu
    $primary_menu_id = wp_create_nav_menu( 'Primary Menu' );
    
    if ( ! is_wp_error( $primary_menu_id ) ) {
        // Get page IDs
        $home = get_page_by_path( 'home' );
        $about = get_page_by_path( 'about' );
        $contact = get_page_by_path( 'contact' );
        
        wp_update_nav_menu_item( $primary_menu_id, 0, array(
            'menu-item-title'   => 'Home',
            'menu-item-url'     => home_url( '/' ),
            'menu-item-status'  => 'publish',
            'menu-item-type'    => 'custom',
        ) );
        
        wp_update_nav_menu_item( $primary_menu_id, 0, array(
            'menu-item-title'   => 'Practice Areas',
            'menu-item-url'     => home_url( '/practice-areas/' ),
            'menu-item-status'  => 'publish',
            'menu-item-type'    => 'custom',
        ) );
        
        if ( $about ) {
            wp_update_nav_menu_item( $primary_menu_id, 0, array(
                'menu-item-title'     => 'About',
                'menu-item-object-id' => $about->ID,
                'menu-item-object'    => 'page',
                'menu-item-status'    => 'publish',
                'menu-item-type'      => 'post_type',
            ) );
        }
        
        wp_update_nav_menu_item( $primary_menu_id, 0, array(
            'menu-item-title'   => 'Testimonials',
            'menu-item-url'     => home_url( '/testimonials/' ),
            'menu-item-status'  => 'publish',
            'menu-item-type'    => 'custom',
        ) );
        
        if ( $contact ) {
            wp_update_nav_menu_item( $primary_menu_id, 0, array(
                'menu-item-title'     => 'Contact',
                'menu-item-object-id' => $contact->ID,
                'menu-item-object'    => 'page',
                'menu-item-status'    => 'publish',
                'menu-item-type'      => 'post_type',
            ) );
        }
        
        // Assign to location
        $locations = get_theme_mod( 'nav_menu_locations' );
        $locations['primary'] = $primary_menu_id;
        set_theme_mod( 'nav_menu_locations', $locations );
    }
}

/**
 * Set Homepage
 */
function thomas_wan_set_homepage() {
    update_option( 'show_on_front', 'page' );
    
    // Try to find or create a home page
    $home = get_page_by_path( 'home' );
    if ( ! $home ) {
        $home_id = wp_insert_post( array(
            'post_title'   => 'Home',
            'post_name'    => 'home',
            'post_content' => '',
            'post_type'    => 'page',
            'post_status'  => 'publish',
        ) );
        update_option( 'page_on_front', $home_id );
    } else {
        update_option( 'page_on_front', $home->ID );
    }
    
    // Set blog page
    $blog = get_page_by_path( 'blog' );
    if ( ! $blog ) {
        $blog_id = wp_insert_post( array(
            'post_title'   => 'Blog',
            'post_name'    => 'blog',
            'post_content' => '',
            'post_type'    => 'page',
            'post_status'  => 'publish',
        ) );
        update_option( 'page_for_posts', $blog_id );
    } else {
        update_option( 'page_for_posts', $blog->ID );
    }
}
