"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

/* ── animated counter hook ── */
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const TESTIMONIALS = [
  { name: "Priya Sharma", role: "Fresher → TCS", avatar: "PS", text: "Got my first job offer within 2 weeks of using ResumePro. The ATS score went from 54 to 89!", rating: 5 },
  { name: "Rahul Mehta", role: "3 yrs exp → Infosys", avatar: "RM", text: "The AI rewrote my bullet points so well, HR called me the same day I applied. Worth every rupee.", rating: 5 },
  { name: "Anjali Nair", role: "MBA → HDFC Bank", avatar: "AN", text: "The Elegant template looked so professional. I got 4 interview calls in one week. Amazing tool!", rating: 5 },
  { name: "Vikram Singh", role: "5 yrs → Amazon", avatar: "VS", text: "Switched from a generic resume to ResumePro. The ATS suggestions alone doubled my callback rate.", rating: 5 },
];

const FEATURES = [
  { icon: "🤖", title: "AI-Powered Writing", desc: "Claude AI rewrites your bullet points with action verbs, adds real metrics, and optimizes every word for ATS systems automatically." },
  { icon: "📊", title: "ATS Score Analysis", desc: "See exactly how your resume scores against the same ATS systems used by TCS, Infosys, Wipro, Amazon, and 90% of top Indian employers." },
  { icon: "🎨", title: "10 Professional Templates", desc: "Modern, Corporate, Elegant, Creative, Teal, Dark, Minimal and more — each designed for different industries and career stages." },
  { icon: "💡", title: "Smart Suggestions", desc: "Get AI-powered suggestions with one-click auto-apply. Add missing keywords, strengthen your summary, and quantify achievements instantly." },
  { icon: "📄", title: "PDF & Word Download", desc: "Download in both PDF (ATS-friendly) and Word (.docx editable) formats. Both included in your ₹99 one-time payment." },
  { icon: "🔒", title: "Secure Razorpay Payment", desc: "Pay securely via UPI, cards, netbanking, or wallets. One-time ₹99 payment — no subscription, no hidden charges, ever." },
];

const STEPS = [
  { num: "01", title: "Fill Your Details", desc: "Enter your work experience, education, and skills. Our smart form guides you through every section." },
  { num: "02", title: "AI Generates Preview", desc: "Click one button. AI rewrites your resume with professional language, metrics, and ATS keywords." },
  { num: "03", title: "Check ATS Score", desc: "See your score, get smart suggestions, and apply improvements with one click." },
  { num: "04", title: "Pay ₹99 & Download", desc: "Pay securely via Razorpay. Download as PDF and Word instantly. Done!" },
];

const FAQS = [
  { q: "Is ₹99 a one-time payment or subscription?", a: "Completely one-time. You pay ₹99 once and download both PDF and Word formats of your resume. No monthly fees, no hidden charges, no subscriptions — ever." },
  { q: "What is an ATS score and why does it matter?", a: "ATS (Applicant Tracking System) is software used by 90%+ of companies to auto-filter resumes before a human even sees them. A low ATS score means your resume gets rejected automatically. Our AI optimizes your resume to pass these filters." },
  { q: "Is this useful for freshers with no experience?", a: "Absolutely! ResumePro is designed for both freshers and experienced professionals. For freshers, it helps highlight projects, internships, and skills effectively. The Simple and Modern templates work great for entry-level positions." },
  { q: "Can I edit the resume after downloading?", a: "Yes! The Word (.docx) file is fully editable in Microsoft Word, Google Docs, or LibreOffice. Make any changes you want after downloading." },
  { q: "Is my data safe and private?", a: "Yes. Your resume data is used only to generate your resume during your session. We do not store your personal information on our servers." },
  { q: "Which payment methods are supported?", a: "We use Razorpay — India's most trusted payment gateway. You can pay via UPI (GPay, PhonePe, Paytm), Credit/Debit cards, Netbanking, or Wallets." },
];

export default function LandingPage() {
  const [countersStarted, setCountersStarted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [contactForm, setContactForm] = useState({ name:"", email:"", type:"feedback", message:"" });
  const [contactStatus, setContactStatus] = useState(""); // "" | "sending" | "sent" | "error"

  const handleContact = async (e) => {
    e.preventDefault();
    if(!contactForm.name||!contactForm.email||!contactForm.message){ alert("Please fill all fields."); return; }
    setContactStatus("sending");
    // Send to a simple mailto or formspree endpoint
    try {
      const res = await fetch("https://formspree.io/f/mbdzwaok", {
        method:"POST",
        headers:{"Content-Type":"application/json","Accept":"application/json"},
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          type: contactForm.type,
          message: contactForm.message,
          _subject: `ResumePro ${contactForm.type}: ${contactForm.name}`
        })
      });
      if(res.ok) { setContactStatus("sent"); setContactForm({name:"",email:"",type:"feedback",message:""}); }
      else { setContactStatus("error"); }
    } catch(e) { setContactStatus("error"); }
  };
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const resumesCount  = useCounter(12847, 2000, countersStarted);
  const atsImprovement = useCounter(43,   1800, countersStarted);
  const successRate   = useCounter(94,    1600, countersStarted);
  const templatesCount = useCounter(10,   1000, countersStarted);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountersStarted(true); },
      { threshold: 0.3 }
    );
    const el = document.getElementById("stats-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; color: #0f1117; background: #fff; overflow-x: hidden; }

        :root {
          --primary: #2563EB;
          --primary-dark: #1d4ed8;
          --accent: #7C3AED;
          --gold: #D97706;
          --green: #059669;
          --ink: #0f1117;
          --ink2: #374151;
          --ink3: #6b7280;
          --border: #e5e7eb;
          --bg: #f9fafb;
        }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.06);
          height: 64px; display: flex; align-items: center; justify-content: space-between;
          padding: 0 clamp(20px, 5vw, 80px);
        }
        .nav-brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-logo { width: 36px; height: 36px; background: linear-gradient(135deg, #2563EB, #7C3AED); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 18px; }
        .nav-name { font-size: 18px; font-weight: 800; color: var(--ink); letter-spacing: -0.4px; }
        .nav-name span { color: var(--primary); }
        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link { font-size: 13px; font-weight: 600; color: var(--ink3); text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: var(--primary); }
        .nav-cta { background: var(--primary); color: #fff; padding: 9px 22px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; transition: all 0.2s; }
        .nav-cta:hover { background: var(--primary-dark); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(37,99,235,0.35); }

        /* HERO */
        .hero {
          min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding: 100px clamp(20px, 5vw, 80px) 80px;
          background: linear-gradient(170deg, #f0f4ff 0%, #fff 50%, #fdf4ff 100%);
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: ''; position: absolute; top: -200px; left: 50%; transform: translateX(-50%);
          width: 800px; height: 800px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(37,99,235,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-badge { display: inline-flex; align-items: center; gap: 7px; background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 20px; padding: 6px 16px; font-size: 12px; font-weight: 700; color: var(--primary); letter-spacing: 0.3px; margin-bottom: 28px; }
        .hero-badge-dot { width: 7px; height: 7px; background: var(--primary); border-radius: 50%; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .hero h1 { font-family: 'Fraunces', serif; font-size: clamp(38px, 6vw, 76px); font-weight: 900; line-height: 1.05; letter-spacing: -2px; color: var(--ink); margin-bottom: 22px; max-width: 900px; }
        .hero h1 em { font-style: italic; color: var(--primary); }
        .hero h1 .gold { color: var(--gold); }
        .hero-sub { font-size: clamp(15px, 2vw, 19px); color: var(--ink3); line-height: 1.7; max-width: 580px; margin: 0 auto 40px; font-weight: 400; }
        .hero-cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; margin-bottom: 56px; }
        .btn-primary { background: linear-gradient(135deg, #2563EB, #7C3AED); color: #fff; padding: 16px 36px; border-radius: 10px; font-size: 15px; font-weight: 800; text-decoration: none; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 20px rgba(37,99,235,0.3); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(37,99,235,0.4); }
        .btn-ghost { background: #fff; color: var(--ink); padding: 16px 32px; border-radius: 10px; font-size: 15px; font-weight: 700; text-decoration: none; border: 2px solid var(--border); transition: all 0.2s; }
        .btn-ghost:hover { border-color: var(--primary); color: var(--primary); transform: translateY(-1px); }
        .hero-price-note { font-size: 13px; color: var(--ink3); display: flex; align-items: center; gap: 8px; }
        .hero-proof { display: flex; align-items: center; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 20px; }
        .hero-proof-item { display: flex; align-items: center; gap: 6px; font-size: 12.5px; font-weight: 600; color: var(--ink3); }
        .hero-proof-icon { font-size: 15px; }

        /* RESUME PREVIEW MOCKUP */
        .hero-mockup { position: relative; max-width: 900px; width: 100%; margin: 0 auto 40px; }
        .mockup-browser { background: #1e2030; border-radius: 14px; overflow: hidden; box-shadow: 0 40px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.05); }
        .mockup-bar { background: #2a2d3e; padding: 12px 16px; display: flex; align-items: center; gap: 8px; }
        .mockup-dot { width: 12px; height: 12px; border-radius: 50%; }
        .mockup-url { flex: 1; background: rgba(255,255,255,0.06); border-radius: 6px; padding: 4px 14px; font-size: 11px; color: rgba(255,255,255,0.4); font-family: monospace; margin: 0 12px; }
        .mockup-body { background: #f0f2f5; padding: 20px; display: grid; grid-template-columns: 280px 1fr 240px; gap: 16px; min-height: 320px; }
        .mockup-panel { background: #fff; border-radius: 8px; overflow: hidden; }
        .mockup-form { padding: 14px; display: flex; flex-direction: column; gap: 10px; }
        .mockup-field { height: 8px; background: #e5e7eb; border-radius: 4px; }
        .mockup-field.short { width: 60%; }
        .mockup-field.med { width: 80%; }
        .mockup-resume { padding: 0; }
        .mockup-resume-header { background: linear-gradient(135deg, #1e3a5f, #2563eb); padding: 16px; color: #fff; }
        .mockup-resume-name { height: 12px; background: rgba(255,255,255,0.8); border-radius: 3px; width: 55%; margin-bottom: 6px; }
        .mockup-resume-title { height: 7px; background: rgba(255,255,255,0.4); border-radius: 3px; width: 35%; }
        .mockup-resume-body { display: grid; grid-template-columns: 1fr 2fr; gap: 10px; padding: 12px; }
        .mockup-resume-line { height: 6px; background: #e5e7eb; border-radius: 3px; margin-bottom: 5px; }
        .mockup-score { padding: 14px; display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .mockup-ring { width: 56px; height: 56px; border-radius: 50%; background: conic-gradient(#059669 0% 78%, #e5e7eb 78%); display: flex; align-items: center; justify-content: center; }
        .mockup-ring-inner { width: 42px; height: 42px; background: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; color: #059669; }
        .mockup-score-bars { width: 100%; display: flex; flex-direction: column; gap: 6px; }
        .mockup-score-bar { height: 5px; background: #e5e7eb; border-radius: 3px; overflow: hidden; }
        .mockup-score-fill { height: 100%; border-radius: 3px; }

        /* STATS */
        .stats-section { padding: 60px clamp(20px, 5vw, 80px); background: var(--ink); color: #fff; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; max-width: 900px; margin: 0 auto; text-align: center; }
        @media(max-width:700px){.stats-grid{grid-template-columns:repeat(2,1fr)}}
        .stat-num { font-family: 'Fraunces', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 900; color: #fff; line-height: 1; margin-bottom: 6px; }
        .stat-num span { color: #60a5fa; }
        .stat-label { font-size: 13px; color: rgba(255,255,255,0.5); font-weight: 500; }

        /* SECTIONS */
        .section { padding: 100px clamp(20px, 5vw, 80px); }
        .section-alt { background: var(--bg); }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-tag { font-size: 11px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; color: var(--primary); margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
        .section-tag::before { content: ''; width: 24px; height: 2px; background: var(--primary); border-radius: 1px; }
        .section-title { font-family: 'Fraunces', serif; font-size: clamp(28px, 4vw, 46px); font-weight: 900; line-height: 1.1; letter-spacing: -1px; color: var(--ink); margin-bottom: 16px; }
        .section-title em { font-style: italic; color: var(--primary); }
        .section-sub { font-size: 16px; color: var(--ink3); line-height: 1.7; max-width: 560px; }

        /* FEATURES GRID */
        .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
        @media(max-width:900px){.features-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:600px){.features-grid{grid-template-columns:1fr}}
        .feature-card { background: #fff; border: 1.5px solid var(--border); border-radius: 16px; padding: 28px; transition: all 0.25s; position: relative; overflow: hidden; }
        .feature-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--primary), var(--accent)); opacity: 0; transition: opacity 0.25s; }
        .feature-card:hover { border-color: transparent; box-shadow: 0 12px 40px rgba(0,0,0,0.1); transform: translateY(-4px); }
        .feature-card:hover::before { opacity: 1; }
        .feature-icon { font-size: 32px; margin-bottom: 16px; }
        .feature-title { font-size: 17px; font-weight: 800; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.3px; }
        .feature-desc { font-size: 13.5px; color: var(--ink3); line-height: 1.7; }

        /* HOW IT WORKS */
        .steps-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 60px; position: relative; }
        @media(max-width:800px){.steps-row{grid-template-columns:1fr 1fr;gap:32px}}
        @media(max-width:500px){.steps-row{grid-template-columns:1fr}}
        .steps-row::before { content: ''; position: absolute; top: 28px; left: 12.5%; right: 12.5%; height: 2px; background: linear-gradient(90deg, var(--primary), var(--accent)); z-index: 0; }
        @media(max-width:800px){.steps-row::before{display:none}}
        .step-card { text-align: center; padding: 0 20px; position: relative; z-index: 1; }
        .step-num-circle { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--primary), var(--accent)); color: #fff; font-family: 'Fraunces', serif; font-size: 22px; font-weight: 900; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: 0 4px 16px rgba(37,99,235,0.3); }
        .step-title { font-size: 16px; font-weight: 800; color: var(--ink); margin-bottom: 8px; letter-spacing: -0.2px; }
        .step-desc { font-size: 13px; color: var(--ink3); line-height: 1.65; }

        /* TEMPLATES SHOWCASE */
        .templates-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; margin-top: 48px; }
        @media(max-width:1100px){.templates-grid{grid-template-columns:repeat(5,1fr)}}
        @media(max-width:900px){.templates-grid{grid-template-columns:repeat(3,1fr)}}
        @media(max-width:600px){.templates-grid{grid-template-columns:1fr 1fr}}
        .template-card { border: 2px solid var(--border); border-radius: 12px; overflow: hidden; transition: all 0.2s; cursor: pointer; }
        .template-card:hover { border-color: var(--primary); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(37,99,235,0.15); }
        .template-thumb { height: 120px; position: relative; overflow: hidden; }
        .template-label { padding: 10px 12px; }
        .template-name { font-size: 12px; font-weight: 800; color: var(--ink); margin-bottom: 2px; }
        .template-tag { font-size: 9px; color: var(--ink3); text-transform: uppercase; letter-spacing: 0.5px; }
        /* existing 5 */
        .t-modern { background: linear-gradient(135deg,#1e3a5f,#2563EB); padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        .t-corp { background: #fff; border-top: 4px solid #1e3a5f; padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        .t-simple { background: #fff; padding: 14px; display: flex; flex-direction: column; gap: 5px; border-left: 3px solid #e2e8f0; }
        .t-elegant { background: #1a1a2e; padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        .t-creative { background: linear-gradient(135deg,#7C3AED,#C026D3); padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        /* new 5 */
        .t-teal { background: linear-gradient(135deg,#0f766e,#14b8a6); padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        .t-dark { background: #0f172a; padding: 14px; display: flex; flex-direction: column; gap: 5px; border-bottom: 2px solid #3b82f6; }
        .t-orange { background: #fff; border-top: 5px solid #ea580c; padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        .t-minimal { background: #fff; border-bottom: 2px solid #111; padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        .t-rose { background: linear-gradient(135deg,#be185d,#e11d48); padding: 14px; display: flex; flex-direction: column; gap: 5px; }
        /* bars */
        .t-bar { height: 5px; border-radius: 3px; margin-bottom: 2px; }
        .t-bar-w { background: rgba(255,255,255,0.85); }
        .t-bar-wl { background: rgba(255,255,255,0.35); }
        .t-bar-d { background: rgba(0,0,0,0.15); }
        .t-bar-g { background: #B7860D; }

        /* TESTIMONIALS */
        .testimonials-wrap { margin-top: 56px; position: relative; }
        .testimonial-main { background: #fff; border: 1.5px solid var(--border); border-radius: 20px; padding: 40px 48px; max-width: 680px; margin: 0 auto 32px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); transition: all 0.4s; }
        .testimonial-stars { display: flex; gap: 4px; margin-bottom: 20px; }
        .star { color: #FBBF24; font-size: 18px; }
        .testimonial-text { font-family: 'Fraunces', serif; font-size: clamp(17px, 2.5vw, 22px); font-weight: 400; color: var(--ink); line-height: 1.6; font-style: italic; margin-bottom: 24px; }
        .testimonial-author { display: flex; align-items: center; gap: 14px; }
        .testimonial-avatar { width: 44px; height: 44px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; color: #fff; flex-shrink: 0; }
        .testimonial-name { font-size: 15px; font-weight: 800; color: var(--ink); }
        .testimonial-role { font-size: 12px; color: var(--green); font-weight: 600; }
        .testimonial-dots { display: flex; gap: 8px; justify-content: center; }
        .t-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); cursor: pointer; transition: all 0.2s; }
        .t-dot.active { background: var(--primary); width: 24px; border-radius: 4px; }

        /* PRICING */
        .pricing-card { max-width: 480px; margin: 56px auto 0; background: #fff; border: 2px solid var(--primary); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(37,99,235,0.12); }
        .pricing-top { background: linear-gradient(135deg, var(--primary), var(--accent)); padding: 36px 40px; text-align: center; color: #fff; }
        .pricing-badge { display: inline-block; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 4px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1px; margin-bottom: 16px; }
        .pricing-amount { font-family: 'Fraunces', serif; font-size: 64px; font-weight: 900; line-height: 1; margin-bottom: 4px; }
        .pricing-amount span { font-size: 28px; font-weight: 400; opacity: 0.8; vertical-align: super; }
        .pricing-desc { font-size: 13px; opacity: 0.8; }
        .pricing-body { padding: 32px 40px; }
        .pricing-features { display: flex; flex-direction: column; gap: 14px; margin-bottom: 28px; }
        .pricing-feat { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: var(--ink2); }
        .pricing-feat-check { width: 20px; height: 20px; background: #d1fae5; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; color: var(--green); flex-shrink: 0; margin-top: 1px; }
        .pricing-cta { width: 100%; background: linear-gradient(135deg, var(--primary), var(--accent)); color: #fff; border: none; border-radius: 10px; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 800; padding: 16px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 10px; text-decoration: none; }
        .pricing-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(37,99,235,0.35); }
        .pricing-note { text-align: center; font-size: 11.5px; color: var(--ink3); margin-top: 12px; }

        /* FAQ */
        .faq-list { max-width: 720px; margin: 48px auto 0; display: flex; flex-direction: column; gap: 12px; }
        .faq-item { background: #fff; border: 1.5px solid var(--border); border-radius: 12px; overflow: hidden; transition: all 0.2s; }
        .faq-item.open { border-color: var(--primary); box-shadow: 0 4px 16px rgba(37,99,235,0.08); }
        .faq-q { padding: 18px 24px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; font-size: 15px; font-weight: 700; color: var(--ink); gap: 16px; }
        .faq-q:hover { color: var(--primary); }
        .faq-chevron { font-size: 12px; color: var(--ink3); transition: transform 0.25s; flex-shrink: 0; }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: var(--primary); }
        .faq-a { padding: 0 24px 18px; font-size: 14px; color: var(--ink3); line-height: 1.75; }

        /* CTA BANNER */
        .cta-banner { background: linear-gradient(135deg, #0f1117, #1e2a4a, #0f1117); padding: 100px clamp(20px, 5vw, 80px); text-align: center; }
        .cta-banner h2 { font-family: 'Fraunces', serif; font-size: clamp(32px, 5vw, 56px); font-weight: 900; color: #fff; line-height: 1.1; letter-spacing: -1.5px; margin-bottom: 16px; }
        .cta-banner h2 em { color: #60a5fa; font-style: italic; }
        .cta-banner p { font-size: 16px; color: rgba(255,255,255,0.5); margin-bottom: 40px; line-height: 1.6; }
        .cta-banner-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        /* FOOTER */
        .footer { background: var(--ink); color: rgba(255,255,255,0.5); padding: 48px clamp(20px, 5vw, 80px); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; }
        .footer-brand { display: flex; align-items: center; gap: 10px; }
        .footer-logo { width: 30px; height: 30px; background: linear-gradient(135deg, var(--primary), var(--accent)); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 14px; }
        .footer-name { font-size: 15px; font-weight: 700; color: #fff; }
        .footer-links { display: flex; gap: 24px; }
        .footer-link { font-size: 13px; color: rgba(255,255,255,0.4); text-decoration: none; transition: color 0.2s; }
        .footer-link:hover { color: rgba(255,255,255,0.8); }
        .footer-copy { font-size: 12px; color: rgba(255,255,255,0.25); }

        /* Template thumbs */
        .t-modern { background: linear-gradient(135deg, #1e3a5f, #2563eb); height: 100%; display: flex; flex-direction: column; padding: 14px; gap: 4px; }
        .t-corp { background: #fff; height: 100%; padding: 14px; border-top: 4px solid #1e3a5f; }
        .t-simple { background: #fff; height: 100%; padding: 14px; }
        .t-elegant { background: #1a1a2e; height: 100%; display: flex; flex-direction: column; padding: 14px; gap: 4px; }
        .t-creative { background: linear-gradient(135deg, #7c3aed, #c026d3); height: 100%; display: flex; flex-direction: column; padding: 14px; gap: 4px; }
        .t-bar { height: 6px; border-radius: 3px; }
        .t-bar-w { background: rgba(255,255,255,0.8); }
        .t-bar-wl { background: rgba(255,255,255,0.3); }
        .t-bar-d { background: #e2e8f0; }
        .t-bar-g { background: #D4A853; }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <Link href="/" className="nav-brand">
          <div className="nav-logo">R</div>
          <span className="nav-name">Resume<span>Pro</span></span>
        </Link>
        <div className="nav-links">
          <a href="#features" className="nav-link">Features</a>
          <a href="#templates" className="nav-link">Templates</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </div>
        <Link href="/builder" className="nav-cta">Build My Resume →</Link>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Powered by Claude AI · Trusted by 12,000+ job seekers
        </div>
        <h1>
          Build a Resume That<br />
          <em>Actually Gets You</em><br />
          <span className="gold">Hired</span>
        </h1>
        <p className="hero-sub">
          AI rewrites your resume with action verbs and metrics. ATS score analysis tells you exactly why recruiters skip your resume — and how to fix it. Download as PDF or Word for just ₹99.
        </p>
        <div className="hero-cta-row">
          <Link href="/builder" className="btn-primary">✨ Build My Resume Free →</Link>
          <a href="#how-it-works" className="btn-ghost">See How It Works</a>
        </div>
        <div className="hero-proof">
          {["✅ No sign-up required", "🔒 Secure Razorpay payment", "📄 PDF + Word included", "⚡ Ready in 5 minutes"].map((t, i) => (
            <div key={i} className="hero-proof-item">{t}</div>
          ))}
        </div>

        {/* Browser mockup */}
        <div className="hero-mockup" style={{ marginTop: 56 }}>
          <div className="mockup-browser">
            <div className="mockup-bar">
              <div className="mockup-dot" style={{ background: "#ff5f57" }} />
              <div className="mockup-dot" style={{ background: "#febc2e" }} />
              <div className="mockup-dot" style={{ background: "#28c840" }} />
              <div className="mockup-url">resumepro.in/builder</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-panel">
                <div style={{ background: "#2563EB", padding: "8px 14px", display: "flex", gap: 8 }}>
                  {["✏️ Build", "🎨 Template"].map((t, i) => (
                    <div key={i} style={{ fontSize: 10, color: i === 0 ? "#fff" : "rgba(255,255,255,0.5)", fontWeight: 700, padding: "3px 10px", background: i === 0 ? "rgba(255,255,255,0.15)" : "transparent", borderRadius: 4 }}>{t}</div>
                  ))}
                </div>
                <div className="mockup-form">
                  {[100, 70, 85, 60, 90, 75, 50, 80, 65].map((w, i) => (
                    <div key={i} className="mockup-field" style={{ width: w + "%", opacity: 0.6 + (i % 3) * 0.1 }} />
                  ))}
                  <div style={{ marginTop: 8, height: 32, background: "linear-gradient(135deg,#2563EB,#7C3AED)", borderRadius: 6, opacity: 0.9 }} />
                </div>
              </div>
              <div className="mockup-panel mockup-resume">
                <div className="mockup-resume-header">
                  <div className="mockup-resume-name" />
                  <div className="mockup-resume-title" />
                </div>
                <div className="mockup-resume-body">
                  <div>{[80, 60, 70, 50, 65, 40, 55].map((w, i) => <div key={i} className="mockup-resume-line" style={{ width: w + "%" }} />)}</div>
                  <div>{[90, 75, 60, 85, 70, 50, 80].map((w, i) => <div key={i} className="mockup-resume-line" style={{ width: w + "%" }} />)}</div>
                </div>
              </div>
              <div className="mockup-panel mockup-score">
                <div style={{ fontSize: 10, fontWeight: 800, color: "#374151", marginBottom: 8 }}>ATS SCORE</div>
                <div className="mockup-ring"><div className="mockup-ring-inner">87</div></div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#059669", marginTop: 4 }}>Excellent</div>
                <div className="mockup-score-bars">
                  {[{ w: "92%", c: "#2563EB" }, { w: "85%", c: "#7C3AED" }, { w: "78%", c: "#059669" }, { w: "88%", c: "#D97706" }].map((b, i) => (
                    <div key={i} className="mockup-score-bar"><div className="mockup-score-fill" style={{ width: b.w, background: b.c }} /></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section" id="stats-section">
        <div className="stats-grid">
          <div><div className="stat-num">{resumesCount.toLocaleString()}<span>+</span></div><div className="stat-label">Resumes Created</div></div>
          <div><div className="stat-num">{atsImprovement}<span>pts</span></div><div className="stat-label">Avg ATS Score Increase</div></div>
          <div><div className="stat-num">{successRate}<span>%</span></div><div className="stat-label">Interview Success Rate</div></div>
          <div><div className="stat-num">{templatesCount}</div><div className="stat-label">Professional Templates</div></div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features">
        <div className="section-inner">
          <div className="section-tag">Why ResumePro</div>
          <h2 className="section-title">Everything You Need to<br /><em>Land Your Dream Job</em></h2>
          <p className="section-sub">Built specifically for the Indian job market — from freshers applying to TCS, to experienced professionals targeting MNCs and startups.</p>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-alt" id="how-it-works">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: 0 }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Simple Process</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>Resume Ready in<br /><em>Under 5 Minutes</em></h2>
          </div>
          <div className="steps-row">
            {STEPS.map((s, i) => (
              <div key={i} className="step-card">
                <div className="step-num-circle">{i + 1}</div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPLATES */}
      <section className="section" id="templates">
        <div className="section-inner">
          <div className="section-tag">10 Templates</div>
          <h2 className="section-title">Pick Your Perfect<br /><em>Professional Look</em></h2>
          <p className="section-sub">From corporate banking roles to creative design positions — we have a template for every career path.</p>
          <div className="templates-grid" style={{gridTemplateColumns:"repeat(5,1fr)",gap:16}}>
            {[
              { name:"Modern",    tag:"Most Popular",  cls:"t-modern",   bars:[{w:"60%",c:"t-bar-w"},{w:"40%",c:"t-bar-wl"},{w:"80%",c:"t-bar-wl"},{w:"55%",c:"t-bar-wl"}] },
              { name:"Corporate", tag:"Professional",  cls:"t-corp",     bars:[{w:"55%",c:"t-bar-d"},{w:"35%",c:"t-bar-d"},{w:"80%",c:"t-bar-d"},{w:"65%",c:"t-bar-d"}] },
              { name:"Simple",    tag:"Clean & ATS",   cls:"t-simple",   bars:[{w:"50%",c:"t-bar-d"},{w:"30%",c:"t-bar-d"},{w:"85%",c:"t-bar-d"},{w:"60%",c:"t-bar-d"}] },
              { name:"Elegant",   tag:"Premium",       cls:"t-elegant",  bars:[{w:"55%",c:"t-bar-w"},{w:"35%",c:"t-bar-g"},{w:"75%",c:"t-bar-wl"},{w:"50%",c:"t-bar-wl"}] },
              { name:"Creative",  tag:"Bold & Modern", cls:"t-creative", bars:[{w:"60%",c:"t-bar-w"},{w:"40%",c:"t-bar-wl"},{w:"80%",c:"t-bar-wl"},{w:"55%",c:"t-bar-wl"}] },
              { name:"Teal",      tag:"Fresh",         cls:"t-teal",     bars:[{w:"60%",c:"t-bar-w"},{w:"40%",c:"t-bar-wl"},{w:"75%",c:"t-bar-wl"},{w:"50%",c:"t-bar-wl"}] },
              { name:"Dark",      tag:"Tech",          cls:"t-dark",     bars:[{w:"55%",c:"t-bar-w"},{w:"35%",c:"t-bar-wl"},{w:"80%",c:"t-bar-wl"},{w:"60%",c:"t-bar-wl"}] },
              { name:"Orange",    tag:"Vibrant",       cls:"t-orange",   bars:[{w:"50%",c:"t-bar-w"},{w:"30%",c:"t-bar-wl"},{w:"85%",c:"t-bar-wl"},{w:"55%",c:"t-bar-wl"}] },
              { name:"Minimal",   tag:"Ultra Clean",   cls:"t-minimal",  bars:[{w:"55%",c:"t-bar-d"},{w:"35%",c:"t-bar-d"},{w:"75%",c:"t-bar-d"},{w:"60%",c:"t-bar-d"}] },
              { name:"Rose",      tag:"Creative",      cls:"t-rose",     bars:[{w:"60%",c:"t-bar-w"},{w:"40%",c:"t-bar-wl"},{w:"80%",c:"t-bar-wl"},{w:"50%",c:"t-bar-wl"}] },
            ].map((t, i) => (
              <div key={i} className="template-card">
                <div className="template-thumb">
                  <div className={t.cls} style={{ height: "100%" }}>
                    {t.bars.map((b, j) => <div key={j} className={`t-bar ${b.c}`} style={{ width: b.w }} />)}
                  </div>
                </div>
                <div className="template-label">
                  <div className="template-name">{t.name}</div>
                  <div className="template-tag">{t.tag}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/builder" className="btn-primary">Try All 10 Templates Free →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section-alt">
        <div className="section-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Real Results</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>Loved by Job Seekers<br /><em>Across India</em></h2>
          </div>
          <div className="testimonials-wrap">
            <div className="testimonial-main">
              <div className="testimonial-stars">{[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}</div>
              <div className="testimonial-text">"{TESTIMONIALS[activeTestimonial].text}"</div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{TESTIMONIALS[activeTestimonial].avatar}</div>
                <div>
                  <div className="testimonial-name">{TESTIMONIALS[activeTestimonial].name}</div>
                  <div className="testimonial-role">✅ {TESTIMONIALS[activeTestimonial].role}</div>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {TESTIMONIALS.map((_, i) => (
                <div key={i} className={`t-dot${i === activeTestimonial ? " active" : ""}`} onClick={() => setActiveTestimonial(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing">
        <div className="section-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>Simple Pricing</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>One Price.<br /><em>Everything Included.</em></h2>
            <p className="section-sub" style={{ margin: "0 auto", textAlign: "center" }}>No subscriptions. No hidden fees. Pay once, download forever.</p>
          </div>
          <div className="pricing-card">
            <div className="pricing-top">
              <div className="pricing-badge">ONE-TIME PAYMENT</div>
              <div className="pricing-amount"><span>₹</span>99</div>
              <div className="pricing-desc">Complete resume package · No subscription ever</div>
            </div>
            <div className="pricing-body">
              <div className="pricing-features">
                {[
                  "AI-powered resume enhancement (Claude AI)",
                  "ATS score analysis with detailed feedback",
                  "4 smart suggestions with auto-apply",
                  "10 professional templates to choose from",
                  "Download as PDF (ATS-friendly)",
                  "Download as Word (.docx — fully editable)",
                  "Secure payment via Razorpay (UPI, cards, wallets)",
                  "30-day money-back guarantee"
                ].map((f, i) => (
                  <div key={i} className="pricing-feat">
                    <div className="pricing-feat-check">✓</div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <Link href="/builder" className="pricing-cta">✨ Build & Download My Resume →</Link>
              <div className="pricing-note">🔒 Secured by Razorpay · Pay via UPI, Cards, Netbanking & Wallets</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-alt" id="faq">
        <div className="section-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-tag" style={{ justifyContent: "center" }}>FAQ</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>Common <em>Questions</em></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item${openFaq === i ? " open" : ""}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className="faq-chevron">▼</span>
                </div>
                {openFaq === i && <div className="faq-a">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section className="section" id="contact" style={{background:"#f8faff"}}>
        <div className="section-inner" style={{maxWidth:680}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="section-tag" style={{justifyContent:"center"}}>GET IN TOUCH</div>
            <h2 className="section-title" style={{textAlign:"center"}}>We'd Love Your <em>Feedback</em></h2>
            <p style={{color:"#64748b",fontSize:15,lineHeight:1.7,marginTop:12}}>
              Found a bug? Have a suggestion? Want a new feature? We read every message personally.
            </p>
          </div>

          <div style={{background:"#fff",borderRadius:16,padding:"36px 40px",boxShadow:"0 4px 24px rgba(0,0,0,0.07)",border:"1px solid #e2e8f0"}}>
            {contactStatus==="sent" ? (
              <div style={{textAlign:"center",padding:"40px 0"}}>
                <div style={{fontSize:52,marginBottom:16}}>🎉</div>
                <h3 style={{fontSize:22,fontWeight:800,color:"#1a1d23",marginBottom:8}}>Message Received!</h3>
                <p style={{color:"#64748b",fontSize:15,lineHeight:1.6}}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                <button onClick={()=>setContactStatus("")} style={{marginTop:20,background:"#eff6ff",border:"none",color:"#2563EB",fontWeight:700,fontSize:13,padding:"10px 24px",borderRadius:8,cursor:"pointer"}}>Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleContact} style={{display:"flex",flexDirection:"column",gap:18}}>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    <label style={{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Your Name *</label>
                    <input value={contactForm.name} onChange={e=>setContactForm(p=>({...p,name:e.target.value}))}
                      placeholder="Rahul Sharma" required
                      style={{padding:"11px 14px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:14,fontFamily:"inherit",outline:"none",transition:"border 0.15s"}}
                      onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    <label style={{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Email Address *</label>
                    <input type="email" value={contactForm.email} onChange={e=>setContactForm(p=>({...p,email:e.target.value}))}
                      placeholder="rahul@email.com" required
                      style={{padding:"11px 14px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:14,fontFamily:"inherit",outline:"none",transition:"border 0.15s"}}
                      onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                  </div>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <label style={{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Type of Message</label>
                  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                    {[{val:"feedback",label:"💡 Feedback"},
                      {val:"bug",label:"🐛 Bug Report"},
                      {val:"feature",label:"✨ Feature Request"},
                      {val:"other",label:"💬 Other"}].map(opt=>(
                      <button key={opt.val} type="button"
                        onClick={()=>setContactForm(p=>({...p,type:opt.val}))}
                        style={{padding:"7px 16px",borderRadius:20,fontSize:13,fontWeight:600,fontFamily:"inherit",cursor:"pointer",transition:"all 0.15s",
                          background:contactForm.type===opt.val?"#2563EB":"#f1f5f9",
                          color:contactForm.type===opt.val?"#fff":"#64748b",
                          border:contactForm.type===opt.val?"2px solid #2563EB":"2px solid transparent"}}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:6}}>
                  <label style={{fontSize:11,fontWeight:700,color:"#94a3b8",letterSpacing:1,textTransform:"uppercase"}}>Message *</label>
                  <textarea value={contactForm.message} onChange={e=>setContactForm(p=>({...p,message:e.target.value}))}
                    placeholder="Tell us what you think, what's broken, or what you'd love to see next..."
                    required rows={4}
                    style={{padding:"11px 14px",border:"1.5px solid #e2e8f0",borderRadius:8,fontSize:14,fontFamily:"inherit",outline:"none",resize:"vertical",lineHeight:1.6,transition:"border 0.15s"}}
                    onFocus={e=>e.target.style.borderColor="#2563EB"} onBlur={e=>e.target.style.borderColor="#e2e8f0"}/>
                </div>

                <button type="submit" disabled={contactStatus==="sending"}
                  style={{background:"linear-gradient(135deg,#2563EB,#7C3AED)",color:"#fff",border:"none",borderRadius:10,padding:"14px 28px",fontSize:15,fontWeight:700,fontFamily:"inherit",cursor:"pointer",transition:"all 0.2s",opacity:contactStatus==="sending"?0.7:1}}>
                  {contactStatus==="sending" ? "⏳ Sending..." : "📨 Send Message"}
                </button>

                {contactStatus==="error" && (
                  <p style={{color:"#dc2626",fontSize:13,textAlign:"center"}}>
                    Something went wrong. Please email us directly at <strong>shrikantganorkar5@gmail.com</strong>
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <h2>Your Dream Job Is<br /><em>One Resume Away</em></h2>
        <p>Join 12,000+ job seekers who landed interviews with ResumePro.<br />Build yours in 5 minutes. Pay only if you love it.</p>
        <div className="cta-banner-btns">
          <Link href="/builder" className="btn-primary" style={{ fontSize: 16, padding: "18px 40px" }}>✨ Build My Resume Now →</Link>
        </div>
        <div style={{ marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.3)", display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
          <span>✅ No sign-up needed</span>
          <span>🔒 Secure payment</span>
          <span>⚡ Ready in 5 min</span>
          <span>💰 ₹99 one-time only</span>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-brand">
          <div className="footer-logo">R</div>
          <span className="footer-name">ResumePro</span>
        </div>
        <div className="footer-links">
          <Link href="/builder" className="footer-link">Builder</Link>
          <a href="#features" className="footer-link">Features</a>
          <a href="#pricing" className="footer-link">Pricing</a>
          <a href="#faq" className="footer-link">FAQ</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>
        <div className="footer-copy">© 2025 ResumePro · Made with ❤️ in India</div>
      </footer>
    </>
  );
}
