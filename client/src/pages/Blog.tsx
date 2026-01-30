import { motion } from "framer-motion";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const blogPosts = [
  // Page 1 - January-February 2025
  { id: 1, title: "What Causes Shoulder Dystocia?", excerpt: "Shoulder dystocia is a serious childbirth complication that occurs when a baby's shoulders become stuck behind the mother's pelvic bone after the head has been delivered.", date: "February 1, 2025", author: "Michelle Wan", category: "Shoulder Dystocia" },
  { id: 2, title: "Can Doctors Be Liable for Cerebral Palsy?", excerpt: "Cerebral palsy (CP) is a neurological disorder that affects muscle movement, coordination, and posture. If medical malpractice contributed to the brain injury that caused CP, the responsible doctor can be held legally accountable.", date: "January 21, 2025", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 3, title: "Can Delayed Delivery Cause Fetal Acidosis?", excerpt: "Fetal acidosis is a serious medical condition that occurs when a baby experiences oxygen deprivation during labor and delivery, leading to increased acidity in the blood.", date: "January 18, 2025", author: "Michelle Wan", category: "Fetal Acidosis" },
  { id: 4, title: "What Are the Risk Factors for Fetal Acidosis?", excerpt: "Fetal acidosis is a serious condition in which a baby's blood becomes excessively acidic due to inadequate oxygen supply during labor and delivery.", date: "January 17, 2025", author: "Michelle Wan", category: "Fetal Acidosis" },
  { id: 5, title: "How Is Fetal Acidosis Treated?", excerpt: "Fetal acidosis is a critical condition that occurs when a baby's blood becomes too acidic due to inadequate oxygen supply during labor and delivery.", date: "January 16, 2025", author: "Michelle Wan", category: "Fetal Acidosis" },
  { id: 6, title: "How Does Fetal Acidosis Affect the Baby?", excerpt: "Fetal acidosis is a critical condition characterized by an increased level of acidity in a baby's blood, often due to oxygen deprivation during labor.", date: "January 16, 2025", author: "Linda Thomas", category: "Fetal Acidosis" },
  { id: 7, title: "What Are the Signs of Fetal Acidosis?", excerpt: "Fetal acidosis is a serious condition that occurs when a baby's blood becomes too acidic due to inadequate oxygen levels during labor.", date: "January 15, 2025", author: "Michelle Wan", category: "Fetal Acidosis" },
  { id: 8, title: "Can Hospitals Be Liable for Cerebral Palsy?", excerpt: "Cerebral palsy (CP) is a neurological disorder caused by brain damage or abnormal brain development, often occurring before, during, or shortly after birth.", date: "January 13, 2025", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 9, title: "What Are the Long Term Effects of Skull Fractures?", excerpt: "Skull fractures in newborns are a serious type of birth injury that can occur during delivery due to complications or medical negligence.", date: "January 13, 2025", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 10, title: "How Is Medical Malpractice Linked to Skull Fractures?", excerpt: "Skull fractures in newborns are a serious and often preventable type of birth injury. Many result from medical errors during delivery.", date: "January 12, 2025", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 11, title: "Can Skull Fractures Be Prevented During Delivery?", excerpt: "Skull fractures in newborns are among the more serious types of birth injuries that can occur during delivery.", date: "January 9, 2025", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 12, title: "What Are Common Mistakes in Shoulder Dystocia?", excerpt: "Shoulder dystocia is a rare but critical childbirth complication. When medical professionals make errors during this emergency, serious injuries can result.", date: "January 8, 2025", author: "Linda Thomas", category: "Shoulder Dystocia" },
  { id: 13, title: "What Are the Signs of Shoulder Dystocia?", excerpt: "Shoulder dystocia is a rare but serious complication that occurs during childbirth when a baby's shoulders become stuck.", date: "January 6, 2025", author: "Michelle Wan", category: "Shoulder Dystocia" },
  { id: 14, title: "What Are the Legal Options for Shoulder Dystocia Injuries?", excerpt: "If medical negligence caused or worsened shoulder dystocia injury, families may have legal options to seek compensation.", date: "January 5, 2025", author: "Linda Thomas", category: "Shoulder Dystocia" },
  { id: 15, title: "How Is Shoulder Dystocia Treated?", excerpt: "Understanding the treatment options for shoulder dystocia helps families understand what should happen during this emergency.", date: "January 4, 2025", author: "Michelle Wan", category: "Shoulder Dystocia" },

  // Page 2 - November-December 2024
  { id: 16, title: "8 Steps to Take After an HIE Diagnosis", excerpt: "A diagnosis of Hypoxic-Ischemic Encephalopathy (HIE) can be overwhelming. HIE is a serious condition caused by oxygen deprivation.", date: "December 18, 2024", author: "Michelle Wan", category: "HIE" },
  { id: 17, title: "Step-by-Step Guide For Filing a Case for Preventable HIE", excerpt: "Hypoxic-Ischemic Encephalopathy (HIE) is a serious birth injury caused by a lack of oxygen and blood flow to a newborn's brain.", date: "December 16, 2024", author: "Linda Thomas", category: "HIE" },
  { id: 18, title: "What Is Mixed Cerebral Palsy Birth Injury?", excerpt: "Mixed cerebral palsy is a type of cerebral palsy where an individual exhibits symptoms of more than one form of the condition.", date: "December 2, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 19, title: "What is Ataxic Cerebral Palsy Birth Injury?", excerpt: "Ataxic cerebral palsy is a less common but significant type that affects coordination, balance, and fine motor skills.", date: "December 1, 2024", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 20, title: "What is Dyskinetic Cerebral Palsy Birth Injury?", excerpt: "Dyskinetic cerebral palsy affects muscle control and coordination, resulting in involuntary movements.", date: "November 29, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 21, title: "What Is Spastic Cerebral Palsy Birth Injury?", excerpt: "Spastic cerebral palsy is the most common type, affecting approximately 70-80% of individuals with CP.", date: "November 27, 2024", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 22, title: "How Many Types of Cerebral Palsy Are There?", excerpt: "Cerebral palsy is a group of neurological disorders that affect movement, muscle tone, and posture.", date: "November 26, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 23, title: "Why Home Care for Birth Injuries Is Essential", excerpt: "For families navigating the challenges of birth injuries, home care plays a crucial role in providing support.", date: "November 25, 2024", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 24, title: "What Educational Support for Birth Injuries Is Required", excerpt: "Children with birth injuries often face unique challenges in their learning and development.", date: "November 21, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 25, title: "What Home Modifications For Birth Injuries Are Needed?", excerpt: "Creating a safe and accessible home environment is essential to supporting a child with birth injuries.", date: "November 20, 2024", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 26, title: "What Are The Therapy Expenses Of Birth Injuries", excerpt: "Therapy is often a cornerstone of treatment and recovery for children with birth injuries.", date: "November 19, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 27, title: "Understanding Common Types of Birth Injuries", excerpt: "Understanding the type of injury your child has experienced can help with treatment planning.", date: "November 18, 2024", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 28, title: "What Are The Medical Costs of Birth Injuries", excerpt: "Birth injuries can lead to significant medical costs that extend far beyond the initial treatment.", date: "November 16, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 29, title: "How Do Medical Errors Cause Cerebral Palsy?", excerpt: "Cerebral palsy is often caused by brain injuries that occur during pregnancy, labour, or delivery.", date: "November 7, 2024", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 30, title: "What Is Wrong Site Surgery and How Does It Happen?", excerpt: "Wrong site surgery is one of the most alarming forms of medical errors—completely preventable mistakes.", date: "November 6, 2024", author: "Michelle Wan", category: "Wrong Site Surgery" },

  // Page 3 - October 2024-January 2024
  { id: 31, title: "Role of Expert Witnesses in Medical Malpractice Cases", excerpt: "When navigating the complexities of a medical malpractice case, the role of an expert witness is critical.", date: "November 6, 2024", author: "Linda Thomas", category: "Legal Information" },
  { id: 32, title: "How Medical Malpractice Can Cause Cerebral Palsy", excerpt: "Understanding the connection between medical malpractice and cerebral palsy is crucial for affected families.", date: "November 5, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 33, title: "How Birth Injury Compensation is Calculated: A Guide for Families", excerpt: "When a birth injury impacts a family, it often brings unexpected emotional and financial challenges.", date: "October 31, 2024", author: "Linda Thomas", category: "Legal Information" },
  { id: 34, title: "Early Warning Signs of Cerebral Palsy in Infants and Toddlers", excerpt: "Noticing early signs of potential health issues in your child can be emotional and challenging.", date: "October 30, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 35, title: "Understanding Your Baby's HIE Diagnosis: Causes, Symptoms, and Legal Support", excerpt: "Understanding and managing hypoxic-ischemic encephalopathy can be overwhelming for any family.", date: "January 16, 2024", author: "Linda Thomas", category: "HIE" },
  { id: 36, title: "Why Patient Monitoring Is So Important In The Hospital?", excerpt: "Within the hospital's corridors, patient monitoring quietly serves as a vigilant guardian of well-being.", date: "January 16, 2024", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 37, title: "Why Do You Need Quality Experts For Your Medical Malpractice?", excerpt: "When something goes wrong with your health care, getting the right help is crucial.", date: "January 14, 2024", author: "Linda Thomas", category: "Legal Information" },
  { id: 38, title: "Why Does it Take So Long To File A Lawsuit?", excerpt: "Why does the process of filing a lawsuit seem to stretch endlessly? Understanding the timeline is important.", date: "January 14, 2024", author: "Michelle Wan", category: "Legal Information" },
  { id: 39, title: "What Is A Birth Plan? And Why Do You Need it?", excerpt: "A birth plan is not just a set of instructions; it's a personalized roadmap for your childbirth experience.", date: "January 12, 2024", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 40, title: "Why Every Mum Should Know About Preeclampsia or PIH?", excerpt: "Unravel the critical importance of being aware of preeclampsia and pregnancy-induced hypertension.", date: "January 12, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 41, title: "When And Why Do Routine Surgeries Go Wrong?", excerpt: "There could be multiple factors that can cause issues in surgeries. Understanding these helps prevent errors.", date: "January 10, 2024", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 42, title: "Why Is Fetal Monitoring During Labour Is Important", excerpt: "Fetal monitoring is a critical aspect of ensuring the safety and well-being of both mother and baby.", date: "January 10, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 43, title: "Why Choose Thomas & Wan for Your Medical Malpractice Case?", excerpt: "Having a legal ally who understands the complexities of medical malpractice makes all the difference.", date: "January 8, 2024", author: "Linda Thomas", category: "Legal Information" },
  { id: 44, title: "8 Reasons Why A Lawyer Will Not Take Your Case And What to Do?", excerpt: "Understanding why a lawyer might decline your case can help you take the right next steps.", date: "January 8, 2024", author: "Michelle Wan", category: "Legal Information" },
  { id: 45, title: "Understanding Shoulder Dystocia and Medical Malpractice", excerpt: "Shoulder dystocia is a critical condition that can lead to severe birth injuries to both infant and mother.", date: "January 6, 2024", author: "Linda Thomas", category: "Shoulder Dystocia" },

  // Page 4 - December 2023-January 2024
  { id: 46, title: "What is Medical Malpractice? An All-Inclusive Guide", excerpt: "What happens when healthcare doesn't go as planned? Understanding medical malpractice is essential.", date: "January 6, 2024", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 47, title: "Everything You Need to Know About Fetal Metabolic Acidosis", excerpt: "Pregnancy is like nature's magical journey, but sometimes challenges emerge during birth.", date: "January 5, 2024", author: "Linda Thomas", category: "Fetal Acidosis" },
  { id: 48, title: "What is Erb's Palsy? Is This Cause For Malpractice?", excerpt: "Erb's Palsy is something parents and doctors discuss when babies are born with arm weakness.", date: "January 5, 2024", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 49, title: "What is Cerebral Palsy?", excerpt: "Understanding Cerebral Palsy opens doors to compassion, practical assistance, and legal support.", date: "December 16, 2023", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 50, title: "What is Birth Asphyxia: Causes & Legal Support", excerpt: "Birth asphyxia is a serious medical condition that occurs when a newborn does not receive adequate oxygen.", date: "December 16, 2023", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 51, title: "What is a Deposition? An All-Inclusive Guide", excerpt: "The deposition is a beacon of strategic importance within the intricate fabric of legal proceedings.", date: "December 14, 2023", author: "Linda Thomas", category: "Legal Information" },
  { id: 52, title: "A Comprehensive Guide to Birth Injury Claims", excerpt: "Understanding the vital importance of Birth Injury Claims is paramount for families facing these challenges.", date: "December 14, 2023", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 53, title: "What Are the Treatment Options for Brain Injuries at Birth?", excerpt: "In the delicate moments of childbirth, unforeseen challenges can arise, particularly with brain injuries.", date: "December 12, 2023", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 54, title: "Understanding a Contingent Fee Contract—Some Frequently Asked Questions", excerpt: "Understanding the costs of getting legal help and how lawyers get paid is important.", date: "December 12, 2023", author: "Michelle Wan", category: "Legal Information" },
  { id: 55, title: "Medical Errors- The Third-Leading Cause of Death in the US", excerpt: "Understanding the significance of addressing medical errors is crucial for healthcare improvement.", date: "December 11, 2023", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 56, title: "5 Reasons Not to Choose a County-Owned Hospital", excerpt: "Knowing what hospital to choose for your medical needs is important for your safety and care.", date: "December 11, 2023", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 57, title: "Surgical Errors and Anesthesia Errors: What They Are and What You Can Do?", excerpt: "What happens when surgeries or anesthesia don't go as planned? Understanding your options is key.", date: "December 10, 2023", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 58, title: "Surgery, The 2nd Most Common Cause of Medical Malpractice Claims", excerpt: "Surgery, that amazing healing tool, has a hidden side that patients should understand.", date: "December 10, 2023", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 59, title: "What Are the Effects of Forceps or Vacuum Injuries on Babies?", excerpt: "The use of forceps or vacuum assistance during childbirth can significantly impact newborns.", date: "December 7, 2023", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 60, title: "Overuse of Pitocin or Cytotec During Labor. How Could This Affect Your Baby?", excerpt: "Understanding the complexities that may arise during childbirth regarding labor-inducing medications.", date: "December 6, 2023", author: "Michelle Wan", category: "Birth Injuries" },

  // Page 5 - November-December 2023
  { id: 61, title: "Everything You Need to Know About Opioids and Medical Malpractice", excerpt: "Opioids are powerful pain-relieving medications and pivotal tools in healthcare when used properly.", date: "December 6, 2023", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 62, title: "How to Check a Hospital's Safety Record?", excerpt: "Ensuring the safety of the healthcare environment is vital for making informed decisions.", date: "December 5, 2023", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 63, title: "How Has Tort Reform Changed Medical Malpractice in Texas?", excerpt: "Tort reform in Texas has reshaped the landscape of medical malpractice claims.", date: "December 5, 2023", author: "Linda Thomas", category: "Legal Information" },
  { id: 64, title: "Diagnostic Errors: Failing to Diagnose or Misdiagnosing Diseases and Injuries", excerpt: "In the world of healthcare, getting the right diagnosis is a big deal that shapes treatment.", date: "December 4, 2023", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 65, title: "What is an Ectopic Pregnancy, and Can You Sue For It?", excerpt: "Understanding the legal dimensions surrounding ectopic pregnancies when complications cast shadows.", date: "December 4, 2023", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 66, title: "Things to Know About Preventing Blood Clots", excerpt: "Blood clots can sometimes form inappropriately, leading to serious health complications.", date: "December 3, 2023", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 67, title: "What If You or a Loved One Become the Victim of Medication Errors?", excerpt: "Have you experienced the unsettling possibility of being given the wrong medication?", date: "December 3, 2023", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 68, title: "Are You Afraid to Sue for Malpractice?", excerpt: "Overcoming the fear of suing for malpractice is the key to seeking the justice you deserve.", date: "November 29, 2023", author: "Michelle Wan", category: "Legal Information" },
  { id: 69, title: "Why it is so important to monitor a patient in the hospital", excerpt: "Many sick patients must be monitored in a hospital to check their vital signs.", date: "June 2, 2022", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 70, title: "Choosing the Right Medical Malpractice Lawyer: Thomas and Wan", excerpt: "Every year in the United States, 85,000 medical malpractice lawsuits are filed.", date: "April 1, 2022", author: "Michelle Wan", category: "Legal Information" },
  { id: 71, title: "WHY CHOOSE THOMAS & WAN FOR YOUR MEDICAL MALPRACTICE CASE?", excerpt: "At Thomas & Wan, the ONLY cases we handle are medical malpractice cases.", date: "January 13, 2022", author: "Linda Thomas", category: "Legal Information" },
  { id: 72, title: "Common Medical Malpractice Statistics", excerpt: "Experts estimate that as many as 98,000 people die in any given year from medical errors in hospitals.", date: "October 8, 2020", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 73, title: "Understanding a Contingent Fee Contract- Some Frequently Asked Questions", excerpt: "Thomas & Wan works on a contingent fee basis—you only pay if we win.", date: "September 9, 2020", author: "Linda Thomas", category: "Legal Information" },
  { id: 74, title: "Are you Afraid to sue for Malpractice?", excerpt: "Malpractice occurs when a health professional fails to provide proper treatment causing injury.", date: "June 17, 2020", author: "Michelle Wan", category: "Legal Information" },
  { id: 75, title: "When a lawyer will not take your case, do not give up!", excerpt: "If you're being told you don't have a case, don't give up—get a second opinion.", date: "May 12, 2020", author: "Linda Thomas", category: "Legal Information" },

  // Page 6 - 2019-2020
  { id: 76, title: "How to Check a Hospital's Safety Record", excerpt: "Whether you want to know how hospitals in your area rank or are choosing one for care.", date: "April 20, 2020", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 77, title: "Coronaviruses (COVID-19) and Pregnancy", excerpt: "Understanding what coronavirus means for pregnant women and their babies.", date: "March 27, 2020", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 78, title: "SURGERY, the 2nd most common cause of Medical Malpractice Claims!", excerpt: "When you think surgery, you think there can be some risk involved with anesthesia.", date: "March 17, 2020", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 79, title: "What is Erb's palsy? Is this cause for malpractice?", excerpt: "Erb's palsy occurs when an injury to the nerves in the upper arms causes paralysis.", date: "January 29, 2020", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 80, title: "Failing to Diagnose or Misdiagnosis of a Disease or Injury!", excerpt: "Failure to diagnose and misdiagnosis are the basis for many medical malpractice cases.", date: "January 17, 2020", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 81, title: "Opioids and Medical Malpractice!", excerpt: "One in three patient deaths from opioids is due to a lack of monitoring by hospital staff.", date: "November 26, 2019", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 82, title: "Is your baby the victim of forceps or vacuum injuries?", excerpt: "Understanding why forceps are used and what can go wrong during delivery.", date: "November 13, 2019", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 83, title: "What is Preeclampsia or PIH?", excerpt: "Preeclampsia is a condition in pregnancy characterized by high blood pressure.", date: "October 17, 2019", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 84, title: "Understanding Surgical Errors and Anesthesia Errors Legal Options", excerpt: "Surgical errors and anesthesia errors are among the most devastating forms of medical malpractice.", date: "October 7, 2019", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 85, title: "What Is Fetal Metabolic Acidosis", excerpt: "Fetal metabolic acidosis is a serious medical condition that occurs when a baby's blood becomes too acidic.", date: "October 2, 2019", author: "Linda Thomas", category: "Fetal Acidosis" },
  { id: 86, title: "Are you or a Loved One the Victim of Being Given the Wrong Medication?", excerpt: "How could being given the wrong medication or too much medication even happen?", date: "September 23, 2019", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 87, title: "Do You Have a Birth Plan?", excerpt: "A birth plan is a document that lets your doctors and nurses know your preferences.", date: "September 13, 2019", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 88, title: "The Third-Leading Cause of Death in the US is Medical Error!", excerpt: "The stats in this article are meant to give people awareness about medical errors.", date: "August 23, 2019", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 89, title: "The Reasons Not to Choose a County-Owned Hospital and Some Other Facts!", excerpt: "Knowing what hospital to choose for your medical needs is important.", date: "August 12, 2019", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 90, title: "Why is a Fetal Monitor So Important?", excerpt: "During labor and delivery, doctors use special equipment to monitor the baby's heart rate.", date: "August 6, 2019", author: "Michelle Wan", category: "Birth Injuries" },

  // Page 7 - June-July 2019
  { id: 91, title: "Does My Child Have a Birth Injury Claim?", excerpt: "Birth injuries refer to preventable injuries suffered prior to birth or during delivery.", date: "July 26, 2019", author: "Linda Thomas", category: "Birth Injuries" },
  { id: 92, title: "Why Does it Take So Long to File a Lawsuit?", excerpt: "What happens after you sign the contract? Understanding the timeline is important.", date: "July 22, 2019", author: "Michelle Wan", category: "Legal Information" },
  { id: 93, title: "What is a deposition?", excerpt: "A deposition can sound scary and daunting. Understanding its purpose helps ease concerns.", date: "July 19, 2019", author: "Linda Thomas", category: "Legal Information" },
  { id: 94, title: "What is Medical Malpractice?", excerpt: "What does a medical malpractice case consist of? Understanding the basics is essential.", date: "June 26, 2019", author: "Michelle Wan", category: "Medical Malpractice" },
  { id: 95, title: "5 Things You Need to Know about Preventing Blood Clots in the Hospital!", excerpt: "How frequently are blood clots happening at hospitals and what you need to know.", date: "June 12, 2019", author: "Linda Thomas", category: "Medical Malpractice" },
  { id: 96, title: "Preventable Newborn Brain Injuries: Causes, Consequences, and Support", excerpt: "Newborn brain injuries are among the most devastating complications during childbirth.", date: "June 7, 2019", author: "Michelle Wan", category: "Birth Injuries" },
  { id: 97, title: "Are Medical Malpractice Lawyers Expensive?", excerpt: "If you're thinking about suing for medical malpractice, you should know how much hiring a lawyer will cost.", date: "June 6, 2019", author: "Linda Thomas", category: "Legal Information" },
];

const categories = [
  "Birth Injuries",
  "Fetal Acidosis",
  "Shoulder Dystocia",
  "HIE",
  "Medical Malpractice",
  "Legal Information",
  "Wrong Site Surgery"
];

const POSTS_PER_PAGE = 12;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-secondary selection:text-primary">
      <Navigation />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-primary text-white py-24 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-secondary/5" />
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl "
            >
              <div className="inline-block border-b-2 border-secondary pb-1 mb-6">
                <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                  Insights & News
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
                Legal Resources for <br/>
                <span className="text-secondary italic">Empowered</span> Decisions
              </h1>
              <p className="text-xl text-white/80 leading-relaxed font-light">
                Stay informed with {blogPosts.length} articles on medical malpractice law, birth injuries, and patient safety from Thomas & Wan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts List */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-12 xl:px-24 2xl:px-32">
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Main Content */}
              <div className="lg:col-span-2">
                {selectedCategory && (
                  <div className="mb-8 flex items-center justify-between">
                    <p className="text-slate-600">
                      Showing <span className="font-bold text-primary">{filteredPosts.length}</span> articles in <span className="font-bold text-secondary">{selectedCategory}</span>
                    </p>
                    <Button variant="outline" size="sm" onClick={() => setSelectedCategory(null)} data-testid="clear-filter">
                      Clear Filter
                    </Button>
                  </div>
                )}

                <div className="space-y-12">
                  {currentPosts.map((post) => (
                    <article key={post.id} className="group border-b border-gray-100 pb-12 last:border-0" data-testid={`blog-post-${post.id}`}>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground uppercase tracking-widest mb-3">
                        <span 
                          className="text-secondary font-bold flex items-center gap-2 cursor-pointer hover:underline"
                          onClick={() => handleCategoryClick(post.category)}
                        >
                          <Tag className="w-4 h-4" /> {post.category}
                        </span>
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" /> {post.date}
                        </span>
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" /> {post.author}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-serif text-primary mb-3 leading-tight group-hover:text-secondary transition-colors cursor-pointer">
                        {post.title}
                      </h2>
                      
                      <p className="text-slate-600 leading-relaxed mb-4 font-light">
                        {post.excerpt}
                      </p>
                      
                      <Button variant="link" className="text-primary font-bold uppercase tracking-wide p-0 h-auto hover:text-secondary" data-testid={`read-more-${post.id}`}>
                        Read Full Article <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-16">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      data-testid="prev-page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-secondary hover:bg-secondary/90" : ""}
                        data-testid={`page-${page}`}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      data-testid="next-page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                <div className="bg-[#F9F7F5] p-6 border-t-4 border-secondary">
                  <h3 className="font-serif text-xl text-primary mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {categories.map((cat, i) => {
                      const count = blogPosts.filter(p => p.category === cat).length;
                      return (
                        <li 
                          key={i} 
                          className={`flex items-center justify-between group cursor-pointer ${selectedCategory === cat ? 'text-secondary' : ''}`}
                          onClick={() => handleCategoryClick(cat)}
                          data-testid={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <span className={`group-hover:text-secondary transition-colors ${selectedCategory === cat ? 'text-secondary font-bold' : 'text-slate-600'}`}>
                            {cat}
                          </span>
                          <span className="text-sm text-muted-foreground">({count})</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <div className="bg-[#F9F7F5] p-6 border-t-4 border-secondary">
                  <h3 className="font-serif text-xl text-primary mb-4">Recent Posts</h3>
                  <ul className="space-y-3">
                    {blogPosts.slice(0, 5).map((post) => (
                      <li key={post.id} className="border-b border-gray-200 pb-3 last:border-0">
                        <p className="text-primary font-medium hover:text-secondary transition-colors cursor-pointer text-sm leading-snug">
                          {post.title}
                        </p>
                        <span className="text-xs text-muted-foreground">{post.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary text-white p-6 text-center">
                  <h3 className="font-serif text-xl mb-3">Need Legal Help?</h3>
                  <p className="text-white/80 mb-4 text-sm">
                    Contact us today for a free consultation regarding your medical malpractice case.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-5" data-testid="sidebar-contact-button">
                      Contact Us
                    </Button>
                  </Link>
                </div>

                <div className="bg-[#F9F7F5] p-6 border-t-4 border-secondary">
                  <h3 className="font-serif text-lg text-primary mb-3">Free Case Review</h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Call us today for a free consultation. We work on a contingency basis.
                  </p>
                  <a href="tel:713-529-1177" className="text-secondary font-bold text-lg hover:underline">
                    (713) 529-1177
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#F9F7F5] py-16 border-t border-gray-100">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="text-3xl font-serif text-primary mb-4">Do You Have a Medical Malpractice Case?</h2>
            <p className="text-lg text-slate-600 mb-8">
              If you or a loved one has been injured due to medical negligence, we are here to help. Call us today for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:713-529-1177">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white font-bold py-6 px-8 rounded-none" data-testid="cta-call-button">
                  Call (713) 529-1177
                </Button>
              </a>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-bold py-6 px-8 rounded-none" data-testid="cta-contact-button">
                  Request Free Case Review
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
