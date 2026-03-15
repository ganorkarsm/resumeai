"use client";
import { useState, useEffect, useRef } from "react";

/* ── LOAD SCRIPTS ── */
function useScript(src) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) { setReady(true); return; }
    const s = document.createElement("script"); s.src = src; s.async = true;
    s.onload = () => setReady(true); document.head.appendChild(s);
  }, [src]);
  return ready;
}

/* ══════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;font-size:14px}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#F0F2F5;color:#1a1d23;min-height:100vh}

:root{
  --ink:#1a1d23;--ink2:#4a5568;--ink3:#94a3b8;
  --bg:#F0F2F5;--white:#ffffff;--surface:#fafbfc;
  --primary:#2563EB;--primary-dark:#1d4ed8;--primary-light:#eff6ff;
  --accent:#7C3AED;--green:#059669;--orange:#D97706;--red:#DC2626;
  --gold:#B7860D;--navy:#1e3a5f;
  --border:#e2e8f0;--border2:#cbd5e1;
  --shadow-sm:0 1px 3px rgba(0,0,0,0.08),0 1px 2px rgba(0,0,0,0.04);
  --shadow:0 4px 16px rgba(0,0,0,0.08),0 2px 6px rgba(0,0,0,0.04);
  --shadow-lg:0 20px 48px rgba(0,0,0,0.12),0 8px 20px rgba(0,0,0,0.06);
  --radius:10px;--radius-sm:6px;--radius-lg:16px;
}

/* ── APP SHELL ── */
.app{display:flex;flex-direction:column;min-height:100vh}

/* ── TOPBAR ── */
.topbar{
  background:#fff;border-bottom:1px solid var(--border);
  height:60px;display:flex;align-items:center;justify-content:space-between;
  padding:0 28px;position:sticky;top:0;z-index:300;
  box-shadow:var(--shadow-sm);
}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none}
.brand-icon{width:34px;height:34px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;font-weight:800;font-family:'Plus Jakarta Sans',sans-serif}
.brand-name{font-size:17px;font-weight:800;color:var(--ink);letter-spacing:-0.3px}
.brand-name span{color:var(--primary)}
.topbar-mid{display:flex;align-items:center;gap:6px}
.step-pill{display:flex;align-items:center;gap:6px;background:var(--bg);border:1px solid var(--border);border-radius:20px;padding:5px 14px;font-size:11px;font-weight:600;color:var(--ink3);letter-spacing:0.3px;transition:all 0.2s}
.step-pill.active{background:var(--primary-light);border-color:var(--primary);color:var(--primary)}
.step-pill.done{background:#f0fdf4;border-color:#bbf7d0;color:var(--green)}
.step-num{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;background:var(--ink3);color:#fff;flex-shrink:0}
.step-pill.active .step-num{background:var(--primary)}
.step-pill.done .step-num{background:var(--green)}
.step-sep{color:var(--border2);font-size:12px}
.topbar-right{display:flex;align-items:center;gap:10px}
.nav-btn{height:36px;padding:0 16px;border-radius:var(--radius-sm);font-size:12px;font-weight:600;cursor:pointer;transition:all 0.18s;font-family:'Plus Jakarta Sans',sans-serif;border:none}
.nav-btn-ghost{background:transparent;border:1.5px solid var(--border2);color:var(--ink2)}
.nav-btn-ghost:hover{border-color:var(--primary);color:var(--primary)}
.nav-btn-primary{background:var(--primary);color:#fff}
.nav-btn-primary:hover{background:var(--primary-dark);transform:translateY(-1px);box-shadow:0 4px 12px rgba(37,99,235,0.3)}

/* ── MAIN LAYOUT ── */
.main-layout{display:grid;grid-template-columns:340px 1fr 360px;height:calc(100vh - 60px)}
@media(max-width:1200px){.main-layout{grid-template-columns:300px 1fr 320px}}

/* ── LEFT PANEL (FORM) ── */
.left-panel{background:#fff;border-right:1px solid var(--border);overflow-y:auto;display:flex;flex-direction:column}

.panel-tabs{display:flex;border-bottom:1px solid var(--border);background:#fff;position:sticky;top:0;z-index:10}
.panel-tab{flex:1;padding:12px 4px;font-size:11px;font-weight:600;color:var(--ink3);text-align:center;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.18s;letter-spacing:0.3px;text-transform:uppercase}
.panel-tab.active{color:var(--primary);border-bottom-color:var(--primary);background:var(--primary-light)}
.panel-tab:hover:not(.active){color:var(--ink2)}

/* TEMPLATE PICKER */
.tpl-section{padding:20px}
.tpl-section-title{font-size:13px;font-weight:700;color:var(--ink);margin-bottom:4px}
.tpl-section-sub{font-size:11px;color:var(--ink3);margin-bottom:16px}
.tpl-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.tpl-card{border:2px solid var(--border);border-radius:var(--radius);overflow:hidden;cursor:pointer;transition:all 0.2s;background:#fff;position:relative}
.tpl-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:var(--shadow)}
.tpl-card.active{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,0.12)}
.tpl-card-thumb{height:90px;overflow:hidden;position:relative}
.tpl-card-label{padding:8px 10px;display:flex;align-items:center;justify-content:space-between}
.tpl-card-name{font-size:11px;font-weight:700;color:var(--ink)}
.tpl-card-tag{font-size:9px;color:var(--ink3);letter-spacing:0.5px;text-transform:uppercase}
.tpl-check{position:absolute;top:6px;right:6px;width:18px;height:18px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;color:#fff;opacity:0;transition:opacity 0.2s}
.tpl-card.active .tpl-check{opacity:1}

/* FORM SECTIONS */
.form-section{border-bottom:1px solid var(--border)}
.form-sec-head{padding:14px 20px;display:flex;align-items:center;gap:10px;cursor:pointer;user-select:none;transition:background 0.15s}
.form-sec-head:hover{background:#fafbfc}
.form-sec-icon{width:28px;height:28px;border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:14px;background:var(--bg);flex-shrink:0}
.form-sec-title{font-size:13px;font-weight:700;flex:1;color:var(--ink)}
.form-sec-badge{font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--ink3)}
.form-sec-chev{font-size:10px;color:var(--ink3);transition:transform 0.2s}
.form-sec-chev.o{transform:rotate(180deg)}
.form-sec-body{padding:16px 20px 20px;background:#fafbfc;border-top:1px solid var(--border)}

.fgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}
.fgrid.full{grid-template-columns:1fr}
.ffield{display:flex;flex-direction:column;gap:5px}
.ffield label{font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink3)}
.ffield input,.ffield textarea,.ffield select{
  background:#fff;border:1.5px solid var(--border);border-radius:var(--radius-sm);
  font-family:'Plus Jakarta Sans',sans-serif;font-size:12.5px;color:var(--ink);
  padding:9px 12px;outline:none;transition:all 0.15s;width:100%;
}
.ffield input:focus,.ffield textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,0.08)}
.ffield textarea{resize:vertical;line-height:1.6}

.entry-card{background:#fff;border:1.5px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:10px;position:relative}
.entry-card:hover{border-color:var(--border2)}
.entry-rem{position:absolute;top:10px;right:10px;width:24px;height:24px;background:none;border:1.5px solid var(--border);border-radius:var(--radius-sm);color:var(--ink3);cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.entry-rem:hover{background:#fef2f2;border-color:var(--red);color:var(--red)}

.add-row{display:flex;align-items:center;gap:8px;margin-top:8px}
.add-entry-btn{display:inline-flex;align-items:center;gap:5px;background:transparent;border:1.5px dashed var(--border2);border-radius:var(--radius-sm);color:var(--ink3);font-size:11.5px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;padding:7px 14px;cursor:pointer;transition:all 0.18s}
.add-entry-btn:hover{border-color:var(--primary);color:var(--primary);background:var(--primary-light)}

/* GENERATE BTN */
.gen-area{padding:16px 20px;border-top:1px solid var(--border);background:#fff;position:sticky;bottom:0}
.gen-btn{width:100%;background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff;border:none;border-radius:var(--radius);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;padding:14px 20px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:9px;letter-spacing:-0.2px}
.gen-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px rgba(37,99,235,0.35)}
.gen-btn:disabled{opacity:0.5;cursor:not-allowed;transform:none;box-shadow:none}
.gen-sub{text-align:center;font-size:10px;color:var(--ink3);margin-top:7px}

/* ── CENTER PANEL (PREVIEW) ── */
.center-panel{background:#e8ecf0;overflow-y:auto;padding:28px 24px;display:flex;flex-direction:column;align-items:center;gap:16px}
.preview-topbar{width:100%;max-width:680px;display:flex;align-items:center;justify-content:space-between}
.preview-title{font-size:11px;font-weight:700;color:var(--ink3);letter-spacing:1.5px;text-transform:uppercase}
.preview-zoom{display:flex;gap:6px}
.zoom-btn{width:28px;height:28px;background:#fff;border:1px solid var(--border);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:13px;color:var(--ink2);transition:all 0.15s}
.zoom-btn:hover{border-color:var(--primary);color:var(--primary)}

/* Resume sheet wrapper */
.sheet-wrap{width:100%;max-width:680px;box-shadow:var(--shadow-lg);border-radius:3px;animation:sheetIn 0.4s ease;transform-origin:top center}
@keyframes sheetIn{from{opacity:0;transform:translateY(16px) scale(0.98)}to{opacity:1;transform:translateY(0) scale(1)}}

.empty-preview{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;padding:60px 20px;gap:16px}
.empty-preview-icon{width:72px;height:72px;background:#fff;border-radius:20px;box-shadow:var(--shadow);display:flex;align-items:center;justify-content:center;font-size:32px}
.empty-preview h3{font-size:18px;font-weight:800;color:var(--ink);letter-spacing:-0.3px}
.empty-preview p{font-size:13px;color:var(--ink3);line-height:1.7;max-width:260px}

.loading-preview{display:flex;flex-direction:column;align-items:center;justify-content:center;height:60%;gap:16px}
.loading-ring{width:44px;height:44px;border:3px solid var(--primary-light);border-top-color:var(--primary);border-radius:50%;animation:spin 0.8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-preview h3{font-size:15px;font-weight:700;color:var(--ink)}
.loading-preview p{font-size:12px;color:var(--ink3);text-align:center;max-width:220px;line-height:1.6}

/* ── RIGHT PANEL ── */
.right-panel{background:#fff;border-left:1px solid var(--border);overflow-y:auto;display:flex;flex-direction:column}
.right-section{padding:20px;border-bottom:1px solid var(--border)}
.rs-title{font-size:13px;font-weight:800;color:var(--ink);margin-bottom:4px;display:flex;align-items:center;gap:8px}
.rs-sub{font-size:11px;color:var(--ink3);margin-bottom:14px;line-height:1.5}

/* ATS Score */
.ats-score-row{display:flex;align-items:center;gap:16px;margin-bottom:16px}
.ats-ring-wrap{position:relative;width:80px;height:80px;flex-shrink:0}
.ats-ring-wrap svg{transform:rotate(-90deg)}
.ats-ring-wrap circle{fill:none;stroke-width:7;stroke-linecap:round}
.ats-trk{stroke:#f1f5f9}
.ats-fill{transition:stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1);stroke-dasharray:220}
.ats-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ats-num{font-size:22px;font-weight:800;line-height:1;font-family:'Plus Jakarta Sans',sans-serif}
.ats-of{font-size:8px;color:var(--ink3);letter-spacing:1px;font-weight:600}
.ats-info{flex:1}
.ats-grade{font-size:16px;font-weight:800;margin-bottom:3px;letter-spacing:-0.3px}
.ats-desc{font-size:11px;color:var(--ink3);line-height:1.5}

/* Score bar */
.score-bar-wrap{margin-bottom:14px}
.score-bar-label{display:flex;justify-content:space-between;font-size:10px;font-weight:600;color:var(--ink3);margin-bottom:5px;text-transform:uppercase;letter-spacing:0.5px}
.score-bar-track{height:6px;background:#f1f5f9;border-radius:3px;overflow:hidden}
.score-bar-fill{height:100%;border-radius:3px;transition:width 1.2s ease}

/* Feedback items */
.fb-grid{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.fb-item{display:flex;gap:9px;padding:10px 12px;border-radius:var(--radius-sm);font-size:11.5px;line-height:1.55;font-weight:500}
.fb-item.good{background:#f0fdf4;color:#166534}
.fb-item.warn{background:#fffbeb;color:#92400e}
.fb-item.bad{background:#fef2f2;color:#991b1b}
.fb-icon{font-size:13px;flex-shrink:0;margin-top:1px}

/* Keywords */
.kw-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:14px}
.kw-pill{font-size:10px;font-weight:600;padding:3px 9px;border-radius:20px;font-family:'Plus Jakarta Sans',sans-serif}
.kw-pill.found{background:#d1fae5;color:#065f46}
.kw-pill.miss{background:#fee2e2;color:#991b1b}

/* AI Suggestions */
.ai-sugg-wrap{display:flex;flex-direction:column;gap:10px}
.sugg-card{border:1.5px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:all 0.2s}
.sugg-card:hover{border-color:var(--primary);box-shadow:var(--shadow-sm)}
.sugg-card-head{padding:12px 14px;display:flex;align-items:flex-start;gap:10px;cursor:pointer}
.sugg-tag{font-size:9px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 7px;border-radius:3px;white-space:nowrap;margin-top:1px;flex-shrink:0}
.sugg-tag.add{background:#dbeafe;color:#1e40af}
.sugg-tag.modify{background:#fef3c7;color:#92400e}
.sugg-tag.enhance{background:#f3e8ff;color:#6b21a8}
.sugg-text{font-size:11.5px;color:var(--ink2);line-height:1.55;flex:1;font-weight:500}
.sugg-actions{padding:0 14px 12px;display:flex;gap:8px}
.sugg-btn{font-size:11px;font-weight:700;padding:6px 12px;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.15s;font-family:'Plus Jakarta Sans',sans-serif;border:none;display:flex;align-items:center;gap:5px}
.sugg-btn.apply{background:var(--primary);color:#fff}
.sugg-btn.apply:hover{background:var(--primary-dark)}
.sugg-btn.skip{background:var(--bg);color:var(--ink3);border:1px solid var(--border)}
.sugg-btn.skip:hover{color:var(--ink2)}
.sugg-applied{font-size:10px;font-weight:700;color:var(--green);padding:4px 0 8px 14px;display:flex;align-items:center;gap:4px}

/* ATS run button */
.ats-run-btn{width:100%;background:var(--bg);border:1.5px solid var(--border2);border-radius:var(--radius);color:var(--ink);font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;padding:12px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:4px}
.ats-run-btn:hover:not(:disabled){background:var(--primary-light);border-color:var(--primary);color:var(--primary)}
.ats-run-btn:disabled{opacity:0.4;cursor:not-allowed}

/* Download area at bottom */
.dl-area{padding:20px;background:#fff;margin-top:auto;border-top:1px solid var(--border)}
.dl-hint{display:flex;align-items:center;gap:8px;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:var(--radius);padding:10px 14px;margin-bottom:14px}
.dl-hint-icon{font-size:18px}
.dl-hint-text{font-size:11.5px;color:var(--primary-dark);font-weight:600;line-height:1.4}
.dl-main-btn{width:100%;background:linear-gradient(135deg,#059669,#0d9488);color:#fff;border:none;border-radius:var(--radius);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;padding:15px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:9px;letter-spacing:-0.2px}
.dl-main-btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 20px rgba(5,150,105,0.35)}
.dl-main-btn:disabled{opacity:0.4;cursor:not-allowed;transform:none}

/* ══ RESUME TEMPLATES ══ */
/* 1. MODERN */
.tpl-modern{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1d23}
.tpl-modern .r-header{background:linear-gradient(135deg,#1e3a5f,#2563EB);color:#fff;padding:24px 28px 20px;position:relative;overflow:hidden}
.tpl-modern .r-header::before{content:'';position:absolute;right:-30px;top:-30px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.06)}
.tpl-modern .r-header::after{content:'';position:absolute;right:20px;bottom:-20px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,0.04)}
.tpl-modern .r-name{font-size:24px;font-weight:800;letter-spacing:-0.5px;margin-bottom:3px}
.tpl-modern .r-title{font-size:11px;color:rgba(255,255,255,0.7);font-weight:500;margin-bottom:12px}
.tpl-modern .r-contacts{display:flex;flex-wrap:wrap;gap:14px;font-size:9px;color:rgba(255,255,255,0.75)}
.tpl-modern .r-contact-item{display:inline-flex;align-items:center}
.tpl-modern .r-body{display:grid;grid-template-columns:1fr 2.2fr;gap:0}
.tpl-modern .r-sidebar{background:#f8faff;padding:18px 16px;border-right:1px solid #e8f0fe}
.tpl-modern .r-main{padding:18px 20px}
.tpl-modern .r-sec-title{font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#2563EB;margin-bottom:8px;padding-bottom:5px;border-bottom:2px solid #2563EB}
.tpl-modern .r-sec{margin-bottom:16px}
.tpl-modern .r-summary{font-size:10px;line-height:1.75;color:#4a5568}
.tpl-modern .r-skill-item{display:flex;align-items:center;justify-content:space-between;margin-bottom:5px}
.tpl-modern .r-skill-name{font-size:9.5px;color:#374151;font-weight:600}
.tpl-modern .r-skill-bar{width:60px;height:4px;background:#e2e8f0;border-radius:2px;overflow:hidden}
.tpl-modern .r-skill-fill{height:100%;background:linear-gradient(90deg,#2563EB,#7C3AED);border-radius:2px}
.tpl-modern .r-exp-item{margin-bottom:14px}
.tpl-modern .r-exp-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px}
.tpl-modern .r-exp-role{font-size:11px;font-weight:800;color:#1a1d23}
.tpl-modern .r-exp-dur{font-size:9px;background:#eff6ff;color:#2563EB;padding:2px 7px;border-radius:10px;font-weight:600;white-space:nowrap}
.tpl-modern .r-exp-co{font-size:9.5px;color:#6b7280;margin-bottom:5px;font-weight:500}
.tpl-modern .r-bullet{display:flex;gap:6px;font-size:9.5px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-modern .r-dot{width:4px;height:4px;background:#2563EB;border-radius:50%;margin-top:4px;flex-shrink:0}
.tpl-modern .r-edu-item{margin-bottom:10px}
.tpl-modern .r-edu-deg{font-size:10.5px;font-weight:700;color:#1a1d23}
.tpl-modern .r-edu-school{font-size:9.5px;color:#6b7280}
.tpl-modern .r-edu-meta{font-size:9px;color:#94a3b8;margin-top:1px}
.tpl-modern .r-tag{display:inline-block;background:#eff6ff;color:#2563EB;font-size:9px;padding:2px 7px;border-radius:4px;margin:2px 2px 2px 0;font-weight:600}
.tpl-modern .r-cert-item{font-size:9.5px;color:#4a5568;margin-bottom:4px;display:flex;gap:5px;align-items:flex-start}

/* 2. CORPORATE */
.tpl-corp{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1d23}
.tpl-corp .r-header{padding:24px 28px 18px;border-bottom:3px solid #1e3a5f;display:flex;justify-content:space-between;align-items:flex-end}
.tpl-corp .r-header-left{}
.tpl-corp .r-name{font-size:26px;font-weight:800;color:#1e3a5f;letter-spacing:-0.5px;margin-bottom:3px}
.tpl-corp .r-title{font-size:11px;color:#64748b;font-weight:500;text-transform:uppercase;letter-spacing:1.5px}
.tpl-corp .r-header-right{text-align:right}
.tpl-corp .r-contacts{display:flex;flex-direction:column;gap:3px;font-size:9px;color:#64748b;align-items:flex-end}
.tpl-corp .r-body{display:grid;grid-template-columns:1fr;padding:0 28px 20px}
.tpl-corp .r-two-col{display:grid;grid-template-columns:1.2fr 2fr;gap:24px;padding-top:18px}
.tpl-corp .r-sec-title{font-size:9px;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#1e3a5f;margin-bottom:8px;display:flex;align-items:center;gap:8px}
.tpl-corp .r-sec-title::after{content:'';flex:1;height:1px;background:#e2e8f0}
.tpl-corp .r-sec{margin-bottom:16px}
.tpl-corp .r-summary{font-size:10px;line-height:1.75;color:#4a5568;font-style:italic;border-left:3px solid #1e3a5f;padding-left:10px}
.tpl-corp .r-exp-role{font-size:11px;font-weight:800;color:#1e3a5f}
.tpl-corp .r-exp-co{font-size:9.5px;color:#64748b;margin-bottom:4px}
.tpl-corp .r-exp-dur{font-size:9px;color:#94a3b8;font-weight:600;margin-bottom:5px}
.tpl-corp .r-bullet{display:flex;gap:6px;font-size:9.5px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-corp .r-dot{width:5px;height:5px;background:#1e3a5f;border-radius:50%;margin-top:3.5px;flex-shrink:0}
.tpl-corp .r-tag{display:inline-block;border:1px solid #cbd5e1;color:#475569;font-size:9px;padding:2px 8px;border-radius:3px;margin:2px 2px 2px 0;font-weight:500}
.tpl-corp .r-edu-deg{font-size:10.5px;font-weight:700;color:#1e3a5f}
.tpl-corp .r-edu-school{font-size:9.5px;color:#64748b}
.tpl-corp .r-edu-meta{font-size:9px;color:#94a3b8}

/* 3. SIMPLE */
.tpl-simple{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#2d3748;padding:24px 28px}
.tpl-simple .r-name{font-size:26px;font-weight:800;color:#2d3748;letter-spacing:-0.5px;margin-bottom:2px}
.tpl-simple .r-title{font-size:12px;color:#718096;font-weight:500;margin-bottom:10px}
.tpl-simple .r-contacts{display:flex;flex-wrap:wrap;gap:14px;font-size:9px;color:#718096;margin-bottom:18px;padding-bottom:14px;border-bottom:1.5px solid #e2e8f0}
.tpl-simple .r-sec-title{font-size:9px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#4a5568;margin-bottom:8px;margin-top:16px}
.tpl-simple .r-summary{font-size:10px;line-height:1.75;color:#4a5568}
.tpl-simple .r-exp-top{display:flex;justify-content:space-between}
.tpl-simple .r-exp-role{font-size:11px;font-weight:700;color:#2d3748}
.tpl-simple .r-exp-dur{font-size:9px;color:#a0aec0;font-weight:600}
.tpl-simple .r-exp-co{font-size:9.5px;color:#718096;margin-bottom:5px}
.tpl-simple .r-bullet{display:flex;gap:6px;font-size:9.5px;color:#4a5568;margin-bottom:2px;line-height:1.5}
.tpl-simple .r-dot{content:'–';color:#a0aec0;font-size:11px;margin-top:0;flex-shrink:0}
.tpl-simple .r-tag{display:inline-block;background:#f7fafc;border:1px solid #e2e8f0;color:#4a5568;font-size:9px;padding:2px 8px;border-radius:3px;margin:2px 2px 2px 0}
.tpl-simple .r-edu-deg{font-size:10.5px;font-weight:700;color:#2d3748}
.tpl-simple .r-edu-school{font-size:9.5px;color:#718096}
.tpl-simple .r-skills-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:4px}
.tpl-simple .r-exp-item{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #f7fafc}
.tpl-simple .r-exp-item:last-child{border-bottom:none}

/* 4. ELEGANT */
.tpl-elegant{background:#fff;font-family:'Playfair Display',serif;font-size:10px;color:#2c2c2c}
.tpl-elegant .r-header{background:#1a1a2e;color:#fff;padding:26px 28px 22px;text-align:center;position:relative}
.tpl-elegant .r-header-accent{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#B7860D,#D4A853,#B7860D)}
.tpl-elegant .r-name{font-size:26px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;color:#fff}
.tpl-elegant .r-title{font-size:10px;color:#D4A853;font-family:'Plus Jakarta Sans',sans-serif;font-weight:400;letter-spacing:3px;text-transform:uppercase;margin-bottom:12px}
.tpl-elegant .r-contacts{display:flex;justify-content:center;flex-wrap:wrap;gap:16px;font-size:8.5px;color:rgba(255,255,255,0.6);font-family:'Plus Jakarta Sans',sans-serif}
.tpl-elegant .r-body{display:grid;grid-template-columns:1fr 2fr;gap:0}
.tpl-elegant .r-sidebar{background:#f9f6f0;padding:18px 16px;border-right:1px solid #ede8df}
.tpl-elegant .r-main{padding:18px 20px}
.tpl-elegant .r-sec-title{font-size:9px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#B7860D;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #D4A853}
.tpl-elegant .r-sec{margin-bottom:16px}
.tpl-elegant .r-summary{font-size:10px;line-height:1.8;color:#555;font-style:italic}
.tpl-elegant .r-exp-role{font-size:11px;font-weight:700;color:#1a1a2e}
.tpl-elegant .r-exp-co{font-size:9.5px;color:#B7860D;font-style:italic;margin-bottom:3px;font-weight:400}
.tpl-elegant .r-exp-dur{font-size:8.5px;color:#94a3b8;font-family:'Plus Jakarta Sans',sans-serif;font-weight:500;margin-bottom:5px}
.tpl-elegant .r-bullet{display:flex;gap:6px;font-size:9.5px;color:#555;margin-bottom:3px;line-height:1.6;font-family:'Plus Jakarta Sans',sans-serif}
.tpl-elegant .r-dot{color:#B7860D;font-size:12px;margin-top:-1px;flex-shrink:0}
.tpl-elegant .r-tag{display:inline-block;background:#f9f6f0;border:1px solid #ede8df;color:#555;font-size:9px;padding:2px 7px;margin:2px 2px 2px 0;font-family:'Plus Jakarta Sans',sans-serif;border-radius:2px}
.tpl-elegant .r-edu-deg{font-size:10.5px;font-weight:700;color:#1a1a2e}
.tpl-elegant .r-edu-school{font-size:9.5px;color:#888;font-style:italic}
.tpl-elegant .r-edu-meta{font-size:8.5px;color:#b0a898;font-family:'Plus Jakarta Sans',sans-serif}

/* 5. CREATIVE */
.tpl-creative{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1a2e}
.tpl-creative .r-header{background:linear-gradient(135deg,#7C3AED,#C026D3);padding:24px 28px 20px;color:#fff;position:relative;overflow:hidden}
.tpl-creative .r-header-shape{position:absolute;right:-40px;top:-40px;width:180px;height:180px;border-radius:50%;background:rgba(255,255,255,0.07)}
.tpl-creative .r-header-shape2{position:absolute;left:-20px;bottom:-40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.05)}
.tpl-creative .r-name{font-size:24px;font-weight:800;letter-spacing:-0.5px;margin-bottom:3px;position:relative}
.tpl-creative .r-title{font-size:11px;color:rgba(255,255,255,0.75);font-weight:500;margin-bottom:12px;position:relative}
.tpl-creative .r-contacts{display:flex;flex-wrap:wrap;gap:10px;font-size:9px;color:rgba(255,255,255,0.65);position:relative}
.tpl-creative .r-contact-pill{background:rgba(255,255,255,0.12);padding:2px 8px;border-radius:10px}
.tpl-creative .r-body{display:grid;grid-template-columns:1fr 2.2fr}
.tpl-creative .r-sidebar{background:#fdf4ff;padding:18px 16px;border-right:2px solid #f3e8ff}
.tpl-creative .r-main{padding:18px 20px}
.tpl-creative .r-sec-title{font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#7C3AED;margin-bottom:8px;padding-bottom:5px;border-bottom:2px solid #e9d5ff}
.tpl-creative .r-sec{margin-bottom:16px}
.tpl-creative .r-summary{font-size:10px;line-height:1.75;color:#4a5568}
.tpl-creative .r-tag{display:inline-block;background:#f3e8ff;color:#7C3AED;font-size:9px;padding:2px 8px;border-radius:10px;margin:2px 2px 2px 0;font-weight:600}
.tpl-creative .r-exp-role{font-size:11px;font-weight:800;color:#1a1a2e}
.tpl-creative .r-exp-co{font-size:9.5px;color:#7C3AED;font-weight:600;margin-bottom:3px}
.tpl-creative .r-exp-dur{font-size:9px;color:#a0aec0;margin-bottom:5px;font-weight:500}
.tpl-creative .r-bullet{display:flex;gap:6px;font-size:9.5px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-creative .r-dot{color:#7C3AED;font-size:14px;margin-top:-2px;flex-shrink:0}
.tpl-creative .r-edu-deg{font-size:10.5px;font-weight:700;color:#1a1a2e}
.tpl-creative .r-edu-school{font-size:9.5px;color:#7C3AED}
.tpl-creative .r-edu-meta{font-size:8.5px;color:#94a3b8}
.tpl-creative .r-skill-dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#C026D3);flex-shrink:0;margin-top:3px}

/* ── MODALS ── */
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.7);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);animation:fadeIn 0.2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:#fff;max-width:480px;width:100%;border-radius:var(--radius-lg);overflow:hidden;animation:slideUp 0.3s cubic-bezier(.34,1.56,.64,1);box-shadow:var(--shadow-lg)}
@keyframes slideUp{from{opacity:0;transform:translateY(28px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.modal-header{padding:28px 32px 20px}
.modal-header h2{font-size:20px;font-weight:800;color:var(--ink);letter-spacing:-0.3px;margin-bottom:4px}
.modal-header p{font-size:12px;color:var(--ink3);line-height:1.5}
.modal-body{padding:0 32px 28px}
.modal-divider{height:1px;background:var(--border);margin:0 0 20px}

/* Price card */
.price-card{background:linear-gradient(135deg,#eff6ff,#f5f3ff);border:1.5px solid #bfdbfe;border-radius:var(--radius);padding:16px 18px;display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.price-amount{font-size:36px;font-weight:800;color:var(--ink);letter-spacing:-1px}
.price-amount span{font-size:18px;font-weight:600;color:var(--ink3)}
.price-right{}
.price-badge-pill{background:var(--primary);color:#fff;font-size:9px;font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:3px 9px;border-radius:10px;display:inline-block;margin-bottom:4px}
.price-desc{font-size:10px;color:var(--ink3);line-height:1.4}

/* Format picker */
.fmt-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink3);margin-bottom:8px}
.fmt-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px}
.fmt-opt{border:2px solid var(--border);border-radius:var(--radius);padding:12px;cursor:pointer;transition:all 0.18s;text-align:center;background:#fff}
.fmt-opt:hover{border-color:var(--primary);background:var(--primary-light)}
.fmt-opt.sel{border-color:var(--primary);background:var(--primary-light)}
.fmt-opt-icon{font-size:24px;margin-bottom:5px}
.fmt-opt-name{font-size:12px;font-weight:800;color:var(--ink);margin-bottom:2px}
.fmt-opt-ext{font-size:9px;color:var(--ink3);letter-spacing:1px;text-transform:uppercase}
.fmt-opt-badge{font-size:9px;font-weight:700;background:#d1fae5;color:#065f46;padding:2px 7px;border-radius:8px;display:inline-block;margin-top:3px}

/* Feats */
.feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:20px}
.feat-item{display:flex;align-items:center;gap:6px;font-size:11.5px;color:var(--ink2);font-weight:500}
.feat-check{color:var(--green);font-size:13px;flex-shrink:0}

/* Pay form */
.pay-form-label{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink3);margin-bottom:8px}
.pay-row{display:flex;gap:8px;margin-bottom:8px}
.pay-inp{flex:1;background:#f8fafc;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;color:var(--ink);padding:11px 13px;outline:none;transition:all 0.15s}
.pay-inp:focus{border-color:var(--primary);background:#fff;box-shadow:0 0 0 3px rgba(37,99,235,0.08)}
.pay-submit{width:100%;background:linear-gradient(135deg,#059669,#0d9488);color:#fff;border:none;border-radius:var(--radius);font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:800;padding:15px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:9px;margin-top:4px}
.pay-submit:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(5,150,105,0.3)}
.modal-cancel-row{text-align:center;margin-top:12px}
.modal-cancel-row button{background:none;border:none;font-size:12px;color:var(--ink3);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;text-decoration:underline;transition:color 0.15s}
.modal-cancel-row button:hover{color:var(--ink)}
.modal-secure{text-align:center;font-size:10px;color:var(--ink3);margin-top:10px;letter-spacing:0.3px;display:flex;align-items:center;justify-content:center;gap:5px}

/* SUCCESS */
.success-modal{background:#fff;max-width:420px;width:100%;border-radius:var(--radius-lg);overflow:hidden;animation:slideUp 0.3s cubic-bezier(.34,1.56,.64,1);box-shadow:var(--shadow-lg);text-align:center;padding:40px 36px}
.success-icon-wrap{width:72px;height:72px;background:#d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 18px;font-size:32px}
.success-modal h2{font-size:22px;font-weight:800;color:var(--ink);margin-bottom:8px;letter-spacing:-0.3px}
.success-modal p{font-size:12.5px;color:var(--ink3);line-height:1.7;margin-bottom:22px}
.success-dl-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px}
.sdl-btn{border:none;border-radius:var(--radius);padding:14px 10px;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;align-items:center;gap:4px;font-family:'Plus Jakarta Sans',sans-serif}
.sdl-btn-icon{font-size:26px}
.sdl-btn-name{font-size:13px;font-weight:800;color:#fff}
.sdl-btn-ext{font-size:9px;color:rgba(255,255,255,0.7);letter-spacing:1px;font-weight:600}
.sdl-btn.pdf-btn{background:linear-gradient(135deg,#DC2626,#b91c1c)}
.sdl-btn.pdf-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(220,38,38,0.3)}
.sdl-btn.word-btn{background:linear-gradient(135deg,#2563EB,#1d4ed8)}
.sdl-btn.word-btn:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(37,99,235,0.3)}
.success-note{font-size:10px;color:var(--ink3)}

/* MISC */
.spin-sm{width:16px;height:16px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;flex-shrink:0}
.spin-dark{width:16px;height:16px;border:2px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin 0.7s linear infinite;display:inline-block;flex-shrink:0}
.badge-new{background:#fef3c7;color:#d97706;font-size:8px;font-weight:700;letter-spacing:0.5px;padding:1px 6px;border-radius:6px;text-transform:uppercase;vertical-align:middle;margin-left:4px}

/* UPLOAD RESUME BUTTON */
.upload-resume-btn{width:100%;background:#fff;border:2px dashed var(--border2);border-radius:var(--radius);font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;font-weight:700;color:var(--ink2);padding:11px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px}
.upload-resume-btn:hover{border-color:var(--primary);color:var(--primary);background:var(--primary-light)}
.upload-resume-btn:disabled{opacity:0.5;cursor:not-allowed}

/* EDITABLE PREVIEW NOTICE */
.preview-edit-notice{font-size:10px;color:var(--ink3);background:#fffbeb;border:1px solid #fde68a;border-radius:var(--radius-sm);padding:5px 10px;display:flex;align-items:center;gap:6px;width:100%;max-width:680px}

/* UPLOAD MODAL */
.upload-modal{background:#fff;max-width:440px;width:100%;border-radius:var(--radius-lg);padding:32px;box-shadow:var(--shadow-lg);animation:slideUp 0.3s cubic-bezier(.34,1.56,.64,1)}
.upload-dropzone{border:2px dashed var(--border2);border-radius:var(--radius);padding:32px 20px;text-align:center;cursor:pointer;transition:all 0.2s;background:#fafbfc}
.upload-dropzone:hover,.upload-dropzone.drag{border-color:var(--primary);background:var(--primary-light)}
.upload-dropzone-icon{font-size:40px;margin-bottom:12px}
.upload-dropzone h3{font-size:15px;font-weight:800;color:var(--ink);margin-bottom:6px}
.upload-dropzone p{font-size:11.5px;color:var(--ink3);line-height:1.6}
.upload-formats{display:flex;gap:6px;justify-content:center;margin-top:12px}
.upload-fmt-pill{font-size:9px;font-weight:700;letter-spacing:1px;padding:3px 10px;border-radius:10px;text-transform:uppercase}
.upload-fmt-pill.pdf{background:#fee2e2;color:#991b1b}
.upload-fmt-pill.docx{background:#dbeafe;color:#1e40af}

/* THUMB TEMPLATES (small version for template cards) */
.thumb-modern{width:100%;height:90px;background:linear-gradient(135deg,#1e3a5f,#2563EB);display:flex;flex-direction:column;padding:8px 10px;gap:3px;overflow:hidden}
.thumb-modern-name{height:7px;background:rgba(255,255,255,0.9);border-radius:2px;width:60%}
.thumb-modern-title{height:4px;background:rgba(255,255,255,0.4);border-radius:2px;width:40%}
.thumb-modern-body{display:grid;grid-template-columns:1fr 2fr;gap:4px;flex:1;margin-top:4px}
.thumb-modern-sidebar{background:rgba(255,255,255,0.08);border-radius:2px;padding:4px 5px;display:flex;flex-direction:column;gap:2px}
.thumb-modern-main{display:flex;flex-direction:column;gap:2px}
.thumb-line{height:3px;background:rgba(255,255,255,0.15);border-radius:1px}
.thumb-line.w80{width:80%}.thumb-line.w60{width:60%}.thumb-line.w40{width:40%}.thumb-line.w70{width:70%}.thumb-line.w50{width:50%}.thumb-line.w30{width:30%}
.thumb-dark{background:rgba(0,0,0,0.2)}

.thumb-corp{width:100%;height:90px;background:#fff;display:flex;flex-direction:column;padding:8px 10px;overflow:hidden}
.thumb-corp-header{border-bottom:2px solid #1e3a5f;padding-bottom:5px;margin-bottom:5px}
.thumb-corp-name{height:8px;background:#1e3a5f;border-radius:2px;width:55%;margin-bottom:3px}
.thumb-corp-title{height:4px;background:#cbd5e1;border-radius:2px;width:35%}
.thumb-corp-lines{display:flex;flex-direction:column;gap:2px;flex:1}
.thumb-line-dark{height:3px;background:#e2e8f0;border-radius:1px}

.thumb-simple{width:100%;height:90px;background:#fff;display:flex;flex-direction:column;padding:8px 10px;overflow:hidden}
.thumb-simple-name{height:8px;background:#2d3748;border-radius:2px;width:50%;margin-bottom:3px}
.thumb-simple-line{height:3px;background:#e2e8f0;border-radius:1px;margin-top:6px;margin-bottom:4px}
.thumb-simple-lines{display:flex;flex-direction:column;gap:2px;flex:1}

.thumb-elegant{width:100%;height:90px;background:#1a1a2e;display:flex;flex-direction:column;overflow:hidden}
.thumb-elegant-top{padding:8px 10px;flex:0 0 35px}
.thumb-elegant-name{height:7px;background:rgba(255,255,255,0.8);border-radius:2px;width:55%;margin-bottom:3px;margin:auto;text-align:center}
.thumb-elegant-gold{height:2px;background:linear-gradient(90deg,#B7860D,#D4A853);margin-top:4px}
.thumb-elegant-body{display:grid;grid-template-columns:1fr 2fr;flex:1;background:#fff}
.thumb-elegant-sidebar{background:#f9f6f0;padding:4px 5px;display:flex;flex-direction:column;gap:2px}
.thumb-elegant-main{padding:4px 5px;display:flex;flex-direction:column;gap:2px}
.thumb-line-gold{height:3px;background:#B7860D;border-radius:1px;width:40%;margin-bottom:2px}

.thumb-creative{width:100%;height:90px;background:linear-gradient(135deg,#7C3AED,#C026D3);display:flex;flex-direction:column;padding:8px 10px;gap:3px;overflow:hidden}
.thumb-creative-name{height:7px;background:rgba(255,255,255,0.9);border-radius:2px;width:55%}
.thumb-creative-title{height:4px;background:rgba(255,255,255,0.4);border-radius:2px;width:35%}
.thumb-creative-body{display:grid;grid-template-columns:1fr 2fr;gap:4px;flex:1;margin-top:3px}
.thumb-creative-sidebar{background:rgba(255,255,255,0.1);border-radius:2px;padding:4px 5px;display:flex;flex-direction:column;gap:2px}
.thumb-creative-main{display:flex;flex-direction:column;gap:2px}
`;

/* ══════════════════════════════════════════════════════
   DATA & CONSTANTS
══════════════════════════════════════════════════════ */
const TEMPLATES = [
  { id: "modern",  name: "Modern",    tag: "Popular",     desc: "Bold gradient header with skill bars" },
  { id: "corp",    name: "Corporate", tag: "Professional", desc: "Classic corporate with clean layout" },
  { id: "simple",  name: "Simple",    tag: "ATS Friendly", desc: "Minimal & distraction-free" },
  { id: "elegant", name: "Elegant",   tag: "Premium",     desc: "Gold accents with serif typography" },
  { id: "creative",name: "Creative",  tag: "Bold",        desc: "Purple gradient for creative roles" },
  { id: "teal",    name: "Teal",      tag: "Fresh",       desc: "Clean teal sidebar layout" },
  { id: "dark",    name: "Dark",      tag: "Tech",        desc: "Sleek dark theme for tech roles" },
  { id: "orange",  name: "Orange",    tag: "Vibrant",     desc: "Warm orange accents" },
  { id: "minimal", name: "Minimal",   tag: "Ultra Clean", desc: "Ultra clean no-color design" },
  { id: "rose",    name: "Rose",      tag: "Creative",    desc: "Pink/rose for creative fields" },
];

/* ── New template CSS injected via style tag ── */
const NEW_TEMPLATE_CSS = `
.tpl-teal{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#134e4a}
.tpl-teal .r-header{background:linear-gradient(135deg,#0f766e,#14b8a6);color:#fff;padding:24px 28px 20px}
.tpl-teal .r-name{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px}
.tpl-teal .r-title{font-size:10px;color:rgba(255,255,255,.65);margin-bottom:10px}
.tpl-teal .r-contacts{display:flex;flex-wrap:wrap;gap:12px;font-size:9px;color:rgba(255,255,255,.65)}
.tpl-teal .r-contact-item{display:flex;align-items:center;gap:4px}
.tpl-teal .r-body{display:grid;grid-template-columns:1fr 2.2fr;gap:0}
.tpl-teal .r-sidebar{background:#f0fdfa;padding:18px 16px;border-right:1px solid #ccfbf1}
.tpl-teal .r-main{padding:18px 20px}
.tpl-teal .r-sec-title{font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#0f766e;margin-bottom:8px;padding-bottom:5px;border-bottom:2px solid #14b8a6}
.tpl-teal .r-sec{margin-bottom:14px}
.tpl-teal .r-summary{font-size:9.5px;line-height:1.75;color:#4a5568}
.tpl-teal .r-skill-item{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.tpl-teal .r-skill-name{font-size:9px;color:#374151;font-weight:600}
.tpl-teal .r-skill-bar{width:56px;height:3px;background:#e2e8f0;border-radius:2px;overflow:hidden}
.tpl-teal .r-skill-fill{height:100%;background:linear-gradient(90deg,#0f766e,#14b8a6)}
.tpl-teal .r-tag{display:inline-block;background:#ccfbf1;color:#0f766e;font-size:8.5px;padding:2px 6px;border-radius:3px;margin:2px 2px 2px 0;font-weight:600}
.tpl-teal .r-exp-item{margin-bottom:12px}
.tpl-teal .r-exp-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px}
.tpl-teal .r-exp-role{font-size:10.5px;font-weight:800;color:#134e4a}
.tpl-teal .r-exp-dur{font-size:8.5px;background:#ccfbf1;color:#0f766e;padding:1px 6px;border-radius:8px;font-weight:600}
.tpl-teal .r-exp-co{font-size:9px;color:#6b7280;margin-bottom:4px}
.tpl-teal .r-bullet{display:flex;gap:5px;font-size:9px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-teal .r-dot{width:3px;height:3px;background:#14b8a6;border-radius:50%;margin-top:4px;flex-shrink:0}
.tpl-teal .r-edu-item{margin-bottom:9px}
.tpl-teal .r-edu-deg{font-size:10px;font-weight:700;color:#134e4a}
.tpl-teal .r-edu-school{font-size:9px;color:#6b7280}
.tpl-teal .r-edu-meta{font-size:8.5px;color:#94a3b8;margin-top:1px}

.tpl-dark{background:#0f172a;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#e2e8f0}
.tpl-dark .r-header{background:#0f172a;padding:24px 28px 20px;border-bottom:1px solid #334155;position:relative}
.tpl-dark .r-header::after{content:'';position:absolute;bottom:0;left:28px;right:28px;height:1px;background:linear-gradient(90deg,#3b82f6,#7c3aed,transparent)}
.tpl-dark .r-name{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px;color:#f1f5f9}
.tpl-dark .r-title{font-size:10px;color:#94a3b8;margin-bottom:10px}
.tpl-dark .r-contacts{display:flex;flex-wrap:wrap;gap:12px;font-size:9px;color:#64748b}
.tpl-dark .r-contact-item{display:flex;align-items:center;gap:4px}
.tpl-dark .r-body{display:grid;grid-template-columns:1fr 2fr}
.tpl-dark .r-sidebar{background:#1e293b;padding:18px 16px;border-right:1px solid #334155}
.tpl-dark .r-main{padding:18px 20px}
.tpl-dark .r-sec-title{font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#3b82f6;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #334155}
.tpl-dark .r-sec{margin-bottom:14px}
.tpl-dark .r-summary{font-size:9.5px;line-height:1.75;color:#94a3b8}
.tpl-dark .r-skill-item{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.tpl-dark .r-skill-name{font-size:9px;color:#94a3b8;font-weight:600}
.tpl-dark .r-skill-bar{width:56px;height:3px;background:#334155;border-radius:2px;overflow:hidden}
.tpl-dark .r-skill-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#7c3aed)}
.tpl-dark .r-tag{display:inline-block;background:#1e3a5f;color:#60a5fa;font-size:8.5px;padding:2px 7px;border-radius:4px;margin:2px 2px 2px 0;font-weight:600;border:1px solid #1e40af}
.tpl-dark .r-exp-item{margin-bottom:13px}
.tpl-dark .r-exp-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px}
.tpl-dark .r-exp-role{font-size:10.5px;font-weight:800;color:#f1f5f9}
.tpl-dark .r-exp-dur{font-size:8.5px;color:#3b82f6;font-weight:600}
.tpl-dark .r-exp-co{font-size:9px;color:#64748b;margin-bottom:4px}
.tpl-dark .r-bullet{display:flex;gap:5px;font-size:9px;color:#94a3b8;margin-bottom:3px;line-height:1.5}
.tpl-dark .r-dot{width:3px;height:3px;background:#3b82f6;border-radius:50%;margin-top:4px;flex-shrink:0}
.tpl-dark .r-edu-item{margin-bottom:9px}
.tpl-dark .r-edu-deg{font-size:10px;font-weight:700;color:#f1f5f9}
.tpl-dark .r-edu-school{font-size:9px;color:#64748b}
.tpl-dark .r-edu-meta{font-size:8.5px;color:#475569}

.tpl-orange{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1a1a}
.tpl-orange .r-header{padding:20px 24px;border-top:5px solid #ea580c}
.tpl-orange .r-header-inner{display:flex;justify-content:space-between;align-items:flex-start;padding-bottom:14px;border-bottom:1px solid #fed7aa}
.tpl-orange .r-name{font-size:23px;font-weight:900;letter-spacing:-1px;color:#ea580c;margin-bottom:3px}
.tpl-orange .r-title{font-size:10px;color:#78716c}
.tpl-orange .r-contacts{display:flex;flex-direction:column;gap:3px;align-items:flex-end;font-size:8.5px;color:#78716c}
.tpl-orange .r-contact-item{display:flex;align-items:center;gap:4px}
.tpl-orange .r-body{padding:0 24px 20px}
.tpl-orange .r-two-col{display:grid;grid-template-columns:1.3fr 2fr;gap:20px;padding-top:14px}
.tpl-orange .r-sec-title{font-size:8.5px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#ea580c;margin-bottom:8px;padding-left:7px;border-left:3px solid #ea580c}
.tpl-orange .r-sec{margin-bottom:14px}
.tpl-orange .r-summary{font-size:9.5px;line-height:1.75;color:#57534e}
.tpl-orange .r-tag{display:inline-block;background:#fff7ed;color:#ea580c;font-size:8.5px;padding:2px 7px;border-radius:4px;margin:2px 2px 2px 0;font-weight:600;border:1px solid #fed7aa}
.tpl-orange .r-exp-item{margin-bottom:12px}
.tpl-orange .r-exp-role{font-size:10.5px;font-weight:800;color:#1a1a1a}
.tpl-orange .r-exp-co{font-size:9px;color:#78716c;margin-bottom:2px}
.tpl-orange .r-exp-dur{font-size:8.5px;color:#ea580c;font-weight:600;margin-bottom:4px}
.tpl-orange .r-bullet{display:flex;gap:5px;font-size:9px;color:#57534e;margin-bottom:3px;line-height:1.5}
.tpl-orange .r-dot{width:4px;height:4px;background:#ea580c;border-radius:50%;margin-top:3px;flex-shrink:0}
.tpl-orange .r-edu-deg{font-size:10px;font-weight:700;color:#1a1a1a}
.tpl-orange .r-edu-school{font-size:9px;color:#78716c}
.tpl-orange .r-edu-meta{font-size:8.5px;color:#a8a29e}

.tpl-minimal{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#111;padding:28px 30px}
.tpl-minimal .r-name{font-size:26px;font-weight:900;letter-spacing:-1.5px;color:#111;margin-bottom:3px}
.tpl-minimal .r-title{font-size:11px;color:#666;font-weight:400;margin-bottom:8px}
.tpl-minimal .r-contacts{display:flex;flex-wrap:wrap;gap:16px;font-size:9px;color:#666;margin-bottom:18px;padding-bottom:12px;border-bottom:2px solid #111}
.tpl-minimal .r-contact-item{display:flex;align-items:center;gap:4px}
.tpl-minimal .r-sec-title{font-size:8.5px;font-weight:900;letter-spacing:3px;text-transform:uppercase;color:#111;margin-bottom:7px;margin-top:16px}
.tpl-minimal .r-summary{font-size:9.5px;line-height:1.8;color:#444}
.tpl-minimal .r-exp-item{margin-bottom:11px;padding-bottom:11px;border-bottom:1px solid #eee}
.tpl-minimal .r-exp-top{display:flex;justify-content:space-between}
.tpl-minimal .r-exp-role{font-size:10.5px;font-weight:800;color:#111}
.tpl-minimal .r-exp-dur{font-size:8.5px;color:#999;font-weight:500}
.tpl-minimal .r-exp-co{font-size:9px;color:#666;margin-bottom:4px;font-weight:600}
.tpl-minimal .r-bullet{display:flex;gap:5px;font-size:9px;color:#444;margin-bottom:2px;line-height:1.6}
.tpl-minimal .r-dot{font-size:8px;color:#999;margin-top:1px;flex-shrink:0}
.tpl-minimal .r-tag{display:inline-block;border:1px solid #ddd;color:#444;font-size:8.5px;padding:2px 8px;margin:2px 2px 2px 0}
.tpl-minimal .r-edu-deg{font-size:10px;font-weight:800;color:#111}
.tpl-minimal .r-edu-school{font-size:9px;color:#666}
.tpl-minimal .r-edu-meta{font-size:8.5px;color:#999}

.tpl-rose{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1a2e}
.tpl-rose .r-header{background:linear-gradient(135deg,#be185d,#e11d48);color:#fff;padding:22px 28px 18px;position:relative;overflow:hidden}
.tpl-rose .r-header::before{content:'';position:absolute;right:-20px;bottom:-20px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,.07)}
.tpl-rose .r-name{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px}
.tpl-rose .r-title{font-size:10px;color:rgba(255,255,255,.7);margin-bottom:10px}
.tpl-rose .r-contacts{display:flex;flex-wrap:wrap;gap:10px;font-size:9px;color:rgba(255,255,255,.7)}
.tpl-rose .r-contact-item{display:flex;align-items:center;gap:4px}
.tpl-rose .r-body{display:grid;grid-template-columns:1fr 2.2fr}
.tpl-rose .r-sidebar{background:#fff1f2;padding:18px 16px;border-right:1px solid #fecdd3}
.tpl-rose .r-main{padding:18px 20px}
.tpl-rose .r-sec-title{font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#be185d;margin-bottom:7px;padding-bottom:4px;border-bottom:2px solid #e11d48}
.tpl-rose .r-sec{margin-bottom:14px}
.tpl-rose .r-summary{font-size:9.5px;line-height:1.75;color:#4a5568}
.tpl-rose .r-skill-item{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.tpl-rose .r-skill-name{font-size:9px;color:#374151;font-weight:600}
.tpl-rose .r-skill-bar{width:56px;height:3px;background:#fecdd3;border-radius:2px;overflow:hidden}
.tpl-rose .r-skill-fill{height:100%;background:linear-gradient(90deg,#be185d,#e11d48)}
.tpl-rose .r-tag{display:inline-block;background:#fff1f2;color:#be185d;font-size:8.5px;padding:2px 6px;border-radius:8px;margin:2px 2px 2px 0;font-weight:600;border:1px solid #fecdd3}
.tpl-rose .r-exp-item{margin-bottom:12px}
.tpl-rose .r-exp-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px}
.tpl-rose .r-exp-role{font-size:10.5px;font-weight:800;color:#1a1a2e}
.tpl-rose .r-exp-dur{font-size:8.5px;color:#be185d;font-weight:600}
.tpl-rose .r-exp-co{font-size:9px;color:#6b7280;margin-bottom:4px}
.tpl-rose .r-bullet{display:flex;gap:5px;font-size:9px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-rose .r-dot{width:3px;height:3px;background:#e11d48;border-radius:50%;margin-top:4px;flex-shrink:0}
.tpl-rose .r-edu-item{margin-bottom:9px}
.tpl-rose .r-edu-deg{font-size:10px;font-weight:700;color:#1a1a2e}
.tpl-rose .r-edu-school{font-size:9px;color:#6b7280}
.tpl-rose .r-edu-meta{font-size:8.5px;color:#94a3b8}
`;

/* Smart bullet splitter: splits on newlines AND full stops (sentence-level) */
function parseBullets(text) {
  if (!text) return [];
  // First try splitting by newlines
  const byNewline = text.split("\n").map(s => s.trim()).filter(Boolean);
  // If only one line and it has multiple sentences, split by ". "
  if (byNewline.length === 1 && byNewline[0].includes('. ')) {
    return byNewline[0]
      .split(/\.\s+/)
      .map(s => s.trim().replace(/^[•\-*]\s*/, ''))
      .filter(Boolean)
      .map((s, i, arr) => i < arr.length - 1 ? s : s.replace(/\.$/, ''));
  }
  return byNewline.map(s => s.replace(/^[•\-*]\s*/, ''));
}

const INIT = {
  personal: { name: "", title: "", email: "", phone: "", location: "", linkedin: "", summary: "" },
  experience: [{ id: 1, company: "", role: "", duration: "", bullets: "" }],
  education: [{ id: 1, school: "", degree: "", year: "", gpa: "" }],
  skills: { technical: "", soft: "", languages: "" },
  certifications: ""
};
let uid = 100; const nid = () => ++uid;

const STEPS = ["Build", "Template", "Score", "Download"];

/* ══════════════════════════════════════════════════════
   TEMPLATE THUMBNAILS
══════════════════════════════════════════════════════ */

function Thumb({ id }) {
  if (id === "modern") return (
    <div className="thumb-modern">
      <div className="thumb-modern-name" />
      <div className="thumb-modern-title" />
      <div className="thumb-modern-body">
        <div className="thumb-modern-sidebar">{[80,60,40,70,50,30].map((w,i)=><div key={i} className="thumb-line" style={{width:w+'%'}}/>)}</div>
        <div className="thumb-modern-main">{[90,70,60,80,50,75,40,65].map((w,i)=><div key={i} className="thumb-line thumb-dark" style={{width:w+'%'}}/>)}</div>
      </div>
    </div>
  );
  if (id === "corp") return (
    <div className="thumb-corp">
      <div className="thumb-corp-header"><div className="thumb-corp-name"/><div className="thumb-corp-title"/></div>
      <div className="thumb-corp-lines">{[90,70,80,60,75,50,65,80].map((w,i)=><div key={i} className="thumb-line-dark" style={{width:w+'%'}}/>)}</div>
    </div>
  );
  if (id === "simple") return (
    <div className="thumb-simple">
      <div className="thumb-simple-name"/>
      <div className="thumb-simple-line"/>
      <div className="thumb-simple-lines">{[90,70,60,80,50,75,40,65].map((w,i)=><div key={i} className="thumb-line-dark" style={{width:w+'%'}}/>)}</div>
    </div>
  );
  if (id === "elegant") return (
    <div className="thumb-elegant">
      <div style={{padding:'8px 10px',background:'#1a1a2e'}}>
        <div style={{height:7,background:'rgba(255,255,255,0.8)',borderRadius:2,width:'55%',marginBottom:3}}/>
        <div style={{height:3,background:'rgba(212,168,83,0.8)',borderRadius:1,width:'35%'}}/>
      </div>
      <div style={{height:2,background:'linear-gradient(90deg,#B7860D,#D4A853)'}}/>
      <div className="thumb-elegant-body">
        <div className="thumb-elegant-sidebar">{[80,60,70,50,65,40].map((w,i)=><div key={i} style={{height:3,background:i===0?'#B7860D':'#e8e0d5',borderRadius:1,width:w+'%',marginBottom:1}}/>)}</div>
        <div className="thumb-elegant-main">{[90,70,60,80,50,75,40].map((w,i)=><div key={i} style={{height:3,background:i===0?'#B7860D':'#e2e8f0',borderRadius:1,width:w+'%',marginBottom:1}}/>)}</div>
      </div>
    </div>
  );
  if (id === "creative") return (
    <div className="thumb-creative">
      <div className="thumb-creative-name"/>
      <div className="thumb-creative-title"/>
      <div className="thumb-creative-body">
        <div className="thumb-creative-sidebar">{[80,60,40,70,50].map((w,i)=><div key={i} className="thumb-line" style={{width:w+'%'}}/>)}</div>
        <div className="thumb-creative-main">{[90,70,60,80,50,75,40].map((w,i)=><div key={i} className="thumb-line" style={{width:w+'%',opacity:0.6}}/>)}</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   RESUME RENDERERS
══════════════════════════════════════════════════════ */
function ContactItem({ type, c }) {
  if (!c) return null;
  const labels = { email:'Email', phone:'Mobile', location:'Location', linkedin:'LinkedIn' };
  const label = labels[type] || '';
  return (
    <span className="r-contact-item" style={{display:'inline-flex', alignItems:'center'}}>
      {label && <span style={{fontWeight:700, marginRight:3}}>{label}:</span>}
      {c}
    </span>
  );
}

function ResumeContent({ data, tpl }) {
  const p = data.personal || {};
  // Typed contacts — preserves field names so labels are always correct
  const contacts = [
    p.email    && { type:'email',    val:p.email },
    p.phone    && { type:'phone',    val:p.phone },
    p.location && { type:'location', val:p.location },
    p.linkedin && { type:'linkedin', val:p.linkedin },
  ].filter(Boolean);

  const tech = data.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const soft = data.skills?.soft?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const langs = data.skills?.languages?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const certs = data.certifications?.split("\n").filter(Boolean)||[];
  const exps = data.experience?.filter(e=>e.company||e.role)||[];
  const edus = data.education?.filter(e=>e.school||e.degree)||[];

  const Bullets = ({ bullets, dotEl }) => {
    const bs = parseBullets(bullets);
    return <>{bs.map((b,j)=><div key={j} className="r-bullet">{dotEl}<span>{b}</span></div>)}</>;
  };

  // Shared contacts renderer used by all templates
  const Contacts = ({ className }) => (
    <div className={className||"r-contacts"}>
      {contacts.map((ct,i)=><ContactItem key={i} type={ct.type} c={ct.val}/>)}
    </div>
  );

  if (tpl === "modern") return (
    <div className="tpl-modern">
      <div className="r-header">
        <div className="r-name">{p.name||"Your Name"}</div>
        {p.title&&<div className="r-title">{p.title}</div>}
        <div className="r-contacts">{<Contacts/>}</div>
      </div>
      <div className="r-body">
        <div className="r-sidebar">
          {p.summary&&<div className="r-sec"><div className="r-sec-title">About</div><div className="r-summary">{p.summary}</div></div>}
          {(tech.length||soft.length||langs.length)>0&&<div className="r-sec"><div className="r-sec-title">Skills</div>
            {tech.map((s,i)=><div key={i} className="r-skill-item"><span className="r-skill-name">{s}</span><div className="r-skill-bar"><div className="r-skill-fill" style={{width:[70,85,75,90,80,65,95][i%7]+'%'}}/></div></div>)}
            {soft.map((s,i)=><div key={i} className="r-tag" style={{marginTop:4}}>{s}</div>)}
          </div>}
          {langs.length>0&&<div className="r-sec"><div className="r-sec-title">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
          {edus.length>0&&<div className="r-sec"><div className="r-sec-title">Education</div>{edus.map((e,i)=><div key={i} className="r-edu-item"><div className="r-edu-deg">{e.degree}</div><div className="r-edu-school">{e.school}</div><div className="r-edu-meta">{[e.year,e.gpa&&`GPA: ${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
          {certs.length>0&&<div className="r-sec"><div className="r-sec-title">Certs</div>{certs.map((c,i)=><div key={i} className="r-cert-item">✓ {c}</div>)}</div>}
        </div>
        <div className="r-main">
          {exps.length>0&&<div className="r-sec"><div className="r-sec-title">Experience</div>
            {exps.map((e,i)=>(
              <div key={i} className="r-exp-item"><div className="r-exp-top"><span className="r-exp-role">{e.role}</span>{e.duration&&<span className="r-exp-dur">{e.duration}</span>}</div><div className="r-exp-co">{e.company}</div><Bullets bullets={e.bullets} dotEl={<span className="r-dot"/>}/></div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );

  if (tpl === "corp") return (
    <div className="tpl-corp">
      <div className="r-header">
        <div className="r-header-left"><div className="r-name">{p.name||"Your Name"}</div>{p.title&&<div className="r-title">{p.title}</div>}</div>
        <div className="r-header-right"><div className="r-contacts">{<Contacts/>}</div></div>
      </div>
      <div className="r-body">
        {p.summary&&<div className="r-sec" style={{paddingTop:16,borderBottom:'1px solid #f1f5f9',paddingBottom:14,paddingLeft:0,paddingRight:0}}><div className="r-sec-title">Professional Summary</div><div className="r-summary">{p.summary}</div></div>}
        <div className="r-two-col">
          <div>
            {(tech.length||soft.length)>0&&<div className="r-sec"><div className="r-sec-title">Core Skills</div>{[...tech,...soft].map((s,i)=><div key={i} className="r-tag">{s}</div>)}</div>}
            {edus.length>0&&<div className="r-sec"><div className="r-sec-title">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:10}}><div className="r-edu-deg">{e.degree}</div><div className="r-edu-school">{e.school}</div><div className="r-edu-meta">{[e.year,e.gpa&&`GPA: ${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
            {certs.length>0&&<div className="r-sec"><div className="r-sec-title">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9.5,color:'#4a5568',marginBottom:3,display:'flex',gap:5,alignItems:'flex-start'}}><span style={{color:'#1e3a5f',marginTop:-1}}>▸</span>{c}</div>)}</div>}
            {langs.length>0&&<div className="r-sec"><div className="r-sec-title">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
          </div>
          <div>
            {exps.length>0&&<div className="r-sec"><div className="r-sec-title">Work Experience</div>
              {exps.map((e,i)=>(
                <div key={i} style={{marginBottom:14}}><div className="r-exp-role">{e.role}</div><div className="r-exp-co">{e.company}</div><div className="r-exp-dur">{e.duration}</div><Bullets bullets={e.bullets} dotEl={<span className="r-dot"/>}/></div>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );

  if (tpl === "simple") return (
    <div className="tpl-simple">
      <div className="r-name">{p.name||"Your Name"}</div>
      {p.title&&<div className="r-title">{p.title}</div>}
      <div className="r-contacts">{<Contacts/>}</div>
      {p.summary&&<><div className="r-sec-title">Summary</div><div className="r-summary">{p.summary}</div></>}
      {exps.length>0&&<><div className="r-sec-title" style={{marginTop:14}}>Experience</div>{exps.map((e,i)=>(
        <div key={i} className="r-exp-item"><div className="r-exp-top"><span className="r-exp-role">{e.role}</span><span className="r-exp-dur">{e.duration}</span></div><div className="r-exp-co">{e.company}</div><Bullets bullets={e.bullets} dotEl={<span className="r-dot">–</span>}/></div>
      ))}</>}
      {(tech.length||soft.length||langs.length)>0&&<><div className="r-sec-title" style={{marginTop:14}}>Skills</div><div className="r-skills-row">{[...tech,...soft,...langs].map((s,i)=><span key={i} className="r-tag">{s}</span>)}</div></>}
      {edus.length>0&&<><div className="r-sec-title" style={{marginTop:14}}>Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:8}}><div className="r-edu-deg">{e.degree}</div><div className="r-edu-school">{e.school}  {e.year&&`· ${e.year}`}{e.gpa&&`· GPA: ${e.gpa}`}</div></div>)}</>}
      {certs.length>0&&<><div className="r-sec-title" style={{marginTop:14}}>Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9.5,color:'#4a5568',marginBottom:3}}>→ {c}</div>)}</>}
    </div>
  );

  if (tpl === "elegant") return (
    <div className="tpl-elegant">
      <div className="r-header">
        <div className="r-header-accent"/>
        <div className="r-name">{p.name||"Your Name"}</div>
        {p.title&&<div className="r-title">{p.title}</div>}
        <div className="r-contacts">{<Contacts/>}</div>
      </div>
      <div className="r-body">
        <div className="r-sidebar">
          {p.summary&&<div className="r-sec"><div className="r-sec-title">Profile</div><div className="r-summary">{p.summary}</div></div>}
          {(tech.length||soft.length)>0&&<div className="r-sec"><div className="r-sec-title">Skills</div>{[...tech,...soft].map((s,i)=><div key={i} className="r-tag">{s}</div>)}</div>}
          {langs.length>0&&<div className="r-sec"><div className="r-sec-title">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
          {edus.length>0&&<div className="r-sec"><div className="r-sec-title">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:10}}><div className="r-edu-deg">{e.degree}</div><div className="r-edu-school">{e.school}</div><div className="r-edu-meta">{[e.year,e.gpa&&`GPA: ${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
          {certs.length>0&&<div className="r-sec"><div className="r-sec-title">Awards</div>{certs.map((c,i)=><div key={i} style={{fontSize:9.5,color:'#555',marginBottom:4,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>✦ {c}</div>)}</div>}
        </div>
        <div className="r-main">
          {exps.length>0&&<div className="r-sec"><div className="r-sec-title">Experience</div>
            {exps.map((e,i)=>(
              <div key={i} style={{marginBottom:14}}><div className="r-exp-role">{e.role}</div><div className="r-exp-co">{e.company}</div><div className="r-exp-dur">{e.duration}</div><Bullets bullets={e.bullets} dotEl={<span className="r-dot">◈</span>}/></div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );

  if (tpl === "creative") return (
    <div className="tpl-creative">
      <div className="r-header">
        <div className="r-header-shape"/><div className="r-header-shape2"/>
        <div className="r-name">{p.name||"Your Name"}</div>
        {p.title&&<div className="r-title">{p.title}</div>}
        <div className="r-contacts">{<Contacts/>}</div>
      </div>
      <div className="r-body">
        <div className="r-sidebar">
          {p.summary&&<div className="r-sec"><div className="r-sec-title">About</div><div className="r-summary">{p.summary}</div></div>}
          {(tech.length||soft.length)>0&&<div className="r-sec"><div className="r-sec-title">Skills</div>{[...tech,...soft].map((s,i)=><div key={i} style={{display:'flex',alignItems:'flex-start',gap:5,marginBottom:4,fontSize:9.5,color:'#4a5568',fontFamily:"'Plus Jakarta Sans',sans-serif"}}><span className="r-skill-dot"/>{s}</div>)}</div>}
          {langs.length>0&&<div className="r-sec"><div className="r-sec-title">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
          {edus.length>0&&<div className="r-sec"><div className="r-sec-title">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:10}}><div className="r-edu-deg">{e.degree}</div><div className="r-edu-school">{e.school}</div><div className="r-edu-meta">{[e.year,e.gpa&&`GPA: ${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
          {certs.length>0&&<div className="r-sec"><div className="r-sec-title">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9.5,color:'#4a5568',marginBottom:3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>✓ {c}</div>)}</div>}
        </div>
        <div className="r-main">
          {exps.length>0&&<div className="r-sec"><div className="r-sec-title">Work Experience</div>
            {exps.map((e,i)=>(
              <div key={i} style={{marginBottom:14}}><div className="r-exp-role">{e.role}</div><div className="r-exp-co">{e.company}</div><div className="r-exp-dur">{e.duration}</div><Bullets bullets={e.bullets} dotEl={<span className="r-dot">▸</span>}/></div>
            ))}
          </div>}
        </div>
      </div>
    </div>
  );

  // ── NEW TEMPLATES (teal, dark, orange, minimal, rose) ──
  const sidebarNew = () => (
    <>
      {p.summary&&<div className="r-sec"><div className="r-sec-title">About</div><div className="r-summary">{p.summary}</div></div>}
      {(tech.length||soft.length)>0&&<div className="r-sec"><div className="r-sec-title">Skills</div>
        {tech.map((s,i)=><div key={i} className="r-skill-item"><span className="r-skill-name">{s}</span><div className="r-skill-bar"><div className="r-skill-fill" style={{width:[70,85,75,90,80][i%5]+"%"}}/></div></div>)}
        {soft.map((s,i)=><span key={i} className="r-tag">{s}</span>)}
      </div>}
      {langs.length>0&&<div className="r-sec"><div className="r-sec-title">Languages</div>{langs.map((s,i)=><span key={i} className="r-tag">{s}</span>)}</div>}
      {edus.length>0&&<div className="r-sec"><div className="r-sec-title">Education</div>{edus.map((e,i)=><div key={i} className="r-edu-item"><div className="r-edu-deg">{e.degree}</div><div className="r-edu-school">{e.school}</div><div className="r-edu-meta">{[e.year,e.gpa&&`GPA:${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
      {certs.length>0&&<div className="r-sec"><div className="r-sec-title">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9,color:"#4a5568",marginBottom:3}}>✓ {c}</div>)}</div>}
    </>
  );
  const mainExpNew = () => exps.length>0?(
    <div className="r-sec"><div className="r-sec-title">Work Experience</div>
      {exps.map((e,i)=><div key={i} className="r-exp-item">
        <div className="r-exp-top"><span className="r-exp-role">{e.role}</span>{e.duration&&<span className="r-exp-dur">{e.duration}</span>}</div>
        <div className="r-exp-co">{e.company}</div>
        <Bullets bullets={e.bullets} dotEl={<span className="r-dot">◆</span>}/>
      </div>)}
    </div>
  ):null;

  if(tpl==="teal"||tpl==="dark"||tpl==="rose") return(
    <div className={`tpl-${tpl}`}>
      <div className="r-header"><div className="r-name">{p.name||"Your Name"}</div>{p.title&&<div className="r-title">{p.title}</div>}<div className="r-contacts">{<Contacts/>}</div></div>
      <div className="r-body"><div className="r-sidebar">{sidebarNew()}</div><div className="r-main">{mainExpNew()}</div></div>
    </div>
  );
  if(tpl==="orange") return(
    <div className="tpl-orange">
      <div className="r-header"><div className="r-header-inner"><div><div className="r-name">{p.name||"Your Name"}</div>{p.title&&<div className="r-title">{p.title}</div>}</div><div className="r-contacts">{<Contacts/>}</div></div></div>
      <div className="r-body"><div className="r-two-col"><div>{sidebarNew()}</div><div>{mainExpNew()}</div></div></div>
    </div>
  );
  if(tpl==="minimal") return(
    <div className="tpl-minimal">
      <div className="r-name">{p.name||"Your Name"}</div>{p.title&&<div className="r-title">{p.title}</div>}
      <div className="r-contacts">{<Contacts/>}</div>
      {p.summary&&<><div className="r-sec-title">Summary</div><div className="r-summary" style={{marginBottom:8}}>{p.summary}</div></>}
      {exps.length>0&&<><div className="r-sec-title">Experience</div>{exps.map((e,i)=><div key={i} className="r-exp-item"><div className="r-exp-top"><span className="r-exp-role">{e.role}</span><span className="r-exp-dur">{e.duration}</span></div><div className="r-exp-co">{e.company}</div><Bullets bullets={e.bullets} dotEl={<span className="r-dot">—</span>}/></div>)}</>}
      {(tech.length||soft.length||langs.length)>0&&<><div className="r-sec-title">Skills</div><div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:10}}>{[...tech,...soft,...langs].map((s,i)=><span key={i} className="r-tag">{s}</span>)}</div></>}
      {edus.length>0&&<><div className="r-sec-title">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:8}}><div className="r-edu-deg">{e.degree}</div><div className="r-edu-school">{e.school}{e.year&&` · ${e.year}`}</div></div>)}</>}
      {certs.length>0&&<><div className="r-sec-title">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9,color:"#444",marginBottom:2}}>— {c}</div>)}</>}
    </div>
  );

  return null;
}

/* ══════════════════════════════════════════════════════
   PDF GENERATOR
══════════════════════════════════════════════════════ */
function genPDF(d, tpl) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit:"mm", format:"a4" });
  const W=210, m=18;
  const colors = {
    modern: { hdr:[30,58,138], acc:[37,99,235], text:[26,29,35] },
    corp:   { hdr:[30,58,95],  acc:[30,58,95],  text:[26,29,35] },
    simple: { hdr:[45,55,72],  acc:[45,55,72],  text:[45,55,72] },
    elegant:{ hdr:[26,26,46],  acc:[183,134,13],text:[44,44,44] },
    creative:{hdr:[124,58,237],acc:[124,58,237],text:[26,26,46] }
  };
  const C = colors[tpl]||colors.modern;
  let y=0;

  // Header
  doc.setFillColor(...C.hdr); doc.rect(0,0,W,38,"F");
  if(tpl==="elegant"){doc.setFillColor(183,134,13);doc.rect(0,38,W,1.5,"F");}
  doc.setTextColor(255,255,255); doc.setFont("helvetica","bold"); doc.setFontSize(20);
  doc.text(d.personal.name||"Your Name", tpl==="elegant"?W/2:m, 14, tpl==="elegant"?{align:"center"}:{});
  if(d.personal.title){doc.setFont("helvetica","italic");doc.setFontSize(10);doc.setTextColor(200,200,200);doc.text(d.personal.title, tpl==="elegant"?W/2:m, 22, tpl==="elegant"?{align:"center"}:{});}
  const p = d.personal || {};
  const contactParts = [
    p.email    && `Email: ${p.email}`,
    p.phone    && `Mobile: ${p.phone}`,
    p.location && `Location: ${p.location}`,
    p.linkedin && `LinkedIn: ${p.linkedin}`,
  ].filter(Boolean);
  doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(180,190,200);
  doc.text(contactParts.join("   |   "),tpl==="elegant"?W/2:m,30,tpl==="elegant"?{align:"center"}:{});
  y=46;

  const secTitle=(t,x,yy,w)=>{
    doc.setFillColor(245,247,250);doc.rect(x,yy-3.5,w,6,"F");
    doc.setTextColor(...C.acc);doc.setFont("helvetica","bold");doc.setFontSize(7);
    doc.text(t.toUpperCase(),x+1,yy);
    doc.setDrawColor(...C.acc);doc.setLineWidth(0.4);doc.line(x,yy+1.5,x+w,yy+1.5);
    return yy+8;
  };

  // Two-column for modern/elegant/creative
  if(["modern","elegant","creative"].includes(tpl)){
    const sW=58,sX=m,mX=m+sW+6,mW=W-mX-m;
    let sY=y,mY=y;
    // Sidebar
    if(d.personal.summary){sY=secTitle("Profile",sX,sY,sW);doc.setFont("helvetica","italic");doc.setFontSize(8.5);doc.setTextColor(80,90,100);const ls=doc.splitTextToSize(d.personal.summary,sW-2);doc.text(ls,sX,sY);sY+=ls.length*4+6;}
    const tech=d.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];
    const soft=d.skills?.soft?.split(",").map(s=>s.trim()).filter(Boolean)||[];
    if(tech.length||soft.length){sY=secTitle("Skills",sX,sY,sW);[...tech,...soft].forEach(s=>{doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(70,80,100);const sw=doc.getTextWidth(s)+4;doc.setFillColor(238,243,255);doc.roundedRect(sX,sY-2,Math.min(sw,sW-2),4.5,.5,.5,"F");doc.text(s.substring(0,15),sX+2,sY+1.5);sY+=5.5;});sY+=3;}
    d.education?.filter(e=>e.school||e.degree).forEach((e,i)=>{if(i===0)sY=secTitle("Education",sX,sY,sW);doc.setFont("helvetica","bold");doc.setFontSize(9);doc.setTextColor(...C.text);doc.text(e.degree?.substring(0,18)||"",sX,sY);sY+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(8);doc.setTextColor(100,110,130);doc.text(e.school?.substring(0,18)||"",sX,sY);sY+=3.5;if(e.year){doc.setFont("helvetica","normal");doc.setFontSize(7.5);doc.setTextColor(140,150,170);doc.text(e.year,sX,sY);sY+=3.5;}sY+=2;});
    // Main
    d.experience?.filter(e=>e.company||e.role).forEach((e,i)=>{if(i===0)mY=secTitle("Experience",mX,mY,mW);doc.setFont("helvetica","bold");doc.setFontSize(10.5);doc.setTextColor(...C.text);doc.text(e.role||"",mX,mY);if(e.duration){doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(...C.acc);doc.text(e.duration,W-m-doc.getTextWidth(e.duration),mY);}mY+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(8.5);doc.setTextColor(100,110,130);doc.text(e.company||"",mX,mY);mY+=4.5;(e.bullets?.split("\n").filter(b=>b.trim())||[]).forEach(b=>{doc.setFillColor(...C.acc);doc.rect(mX,mY-1.2,1.2,1.2,"F");doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(70,80,100);const ls=doc.splitTextToSize(b.replace(/^[•\-*]\s*/,""),mW-6);doc.text(ls,mX+4,mY);mY+=ls.length*3.8+1;});mY+=4;});
  } else {
    // Single column (corp, simple)
    if(d.personal.summary){y=secTitle("Summary",m,y,W-2*m);doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(70,80,100);const ls=doc.splitTextToSize(d.personal.summary,W-2*m-2);doc.text(ls,m,y);y+=ls.length*4+8;}
    d.experience?.filter(e=>e.company||e.role).forEach((e,i)=>{if(i===0)y=secTitle("Experience",m,y,W-2*m);doc.setFont("helvetica","bold");doc.setFontSize(11);doc.setTextColor(...C.text);doc.text(e.role||"",m,y);if(e.duration){doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(...C.acc);doc.text(e.duration,W-m-doc.getTextWidth(e.duration),y);}y+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(100,110,130);doc.text(e.company||"",m,y);y+=4.5;(e.bullets?.split("\n").filter(b=>b.trim())||[]).forEach(b=>{doc.setFillColor(...C.acc);doc.circle(m+1,y-0.8,1,"F");doc.setFont("helvetica","normal");doc.setFontSize(9);doc.setTextColor(70,80,100);const ls=doc.splitTextToSize(b.replace(/^[•\-*]\s*/,""),W-2*m-8);doc.text(ls,m+5,y);y+=ls.length*4+1;});y+=5;});
    const tech=d.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];
    if(tech.length){y=secTitle("Skills",m,y,W-2*m);tech.forEach(s=>{doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(70,80,100);const sw=doc.getTextWidth(s)+5;doc.setFillColor(240,244,255);doc.roundedRect(m,y-2,sw,5,0.5,0.5,"F");doc.text(s,m+2.5,y+1.8);y+=0; });doc.text("",m,y);y+=8;}
    d.education?.filter(e=>e.school||e.degree).forEach((e,i)=>{if(i===0)y=secTitle("Education",m,y,W-2*m);doc.setFont("helvetica","bold");doc.setFontSize(10);doc.setTextColor(...C.text);doc.text(e.degree||"",m,y);y+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(100,110,130);doc.text(e.school||"",m,y);y+=3.5;if(e.year){doc.setFontSize(8);doc.setTextColor(140,150,170);doc.text([e.year,e.gpa&&`GPA: ${e.gpa}`].filter(Boolean).join(" · "),m,y);y+=3.5;}y+=3;});
  }
  doc.save(`${d.personal.name||"resume"}_Resume.pdf`);
}

/* ══════════════════════════════════════════════════════
   WORD GENERATOR
══════════════════════════════════════════════════════ */
async function genWord(d) {
  // Safely access docx — different CDN builds expose differently
  const docxLib = window.docx || window.DocxJS || window;
  const Document = docxLib.Document;
  const Packer   = docxLib.Packer;
  const Paragraph= docxLib.Paragraph;
  const TextRun  = docxLib.TextRun;
  const HeadingLevel = docxLib.HeadingLevel;

  if(!Document||!Packer||!Paragraph||!TextRun) {
    throw new Error("Word library not fully loaded — please refresh and try again");
  }

  const navy  = "1B2A4A";
  const gold  = "B7860D";
  const grey  = "555555";
  const light = "888888";

  const makeSecHdr = (text) => new Paragraph({
    children:[new TextRun({text:text.toUpperCase(), bold:true, size:20, color:navy, font:"Calibri"})],
    spacing:{before:280, after:100},
    border:{bottom:{style:"single", size:6, color:"CBD5E1", space:2}}
  });

  const makeBullet = (text) => new Paragraph({
    children:[new TextRun({
      text:"▸  " + text.replace(/^[•\-*▸]\s*/,"").trim(),
      size:19, font:"Calibri", color:"374151"
    })],
    spacing:{after:60},
    indent:{left:280}
  });

  const children = [];

  // Name
  children.push(new Paragraph({
    children:[new TextRun({text: d.personal?.name||"Your Name", bold:true, size:56, font:"Garamond", color:navy})],
    spacing:{after:60}
  }));

  // Title
  if(d.personal?.title) {
    children.push(new Paragraph({
      children:[new TextRun({text: d.personal.title, italics:true, size:24, font:"Calibri", color:gold})],
      spacing:{after:80}
    }));
  }

  // Contacts with labels
  const contactParts = [
    d.personal?.email    && `Email: ${d.personal.email}`,
    d.personal?.phone    && `Mobile: ${d.personal.phone}`,
    d.personal?.location && `Location: ${d.personal.location}`,
    d.personal?.linkedin && `LinkedIn: ${d.personal.linkedin}`,
  ].filter(Boolean);
  if(contactParts.length) {
    children.push(new Paragraph({
      children:[new TextRun({text: contactParts.join("   |   "), size:17, font:"Calibri", color:grey})],
      spacing:{after:160},
      border:{bottom:{style:"single", size:8, color:gold, space:4}}
    }));
  }

  // Summary
  if(d.personal?.summary) {
    children.push(makeSecHdr("Professional Summary"));
    children.push(new Paragraph({
      children:[new TextRun({text: d.personal.summary, italics:true, size:19, font:"Calibri", color:grey})],
      spacing:{after:200}
    }));
  }

  // Experience
  const exps = d.experience?.filter(e=>e.company||e.role)||[];
  if(exps.length) {
    children.push(makeSecHdr("Work Experience"));
    exps.forEach(e => {
      children.push(new Paragraph({
        children:[
          new TextRun({text: e.role||"", bold:true, size:22, font:"Calibri", color:navy}),
          e.duration ? new TextRun({text:`   ${e.duration}`, size:17, font:"Calibri", color:gold}) : new TextRun("")
        ],
        spacing:{after:40}
      }));
      if(e.company) {
        children.push(new Paragraph({
          children:[new TextRun({text: e.company, italics:true, size:19, font:"Calibri", color:light})],
          spacing:{after:80}
        }));
      }
      // Parse bullets smartly
      const bullets = parseBulletsForWord(e.bullets);
      bullets.forEach(b => children.push(makeBullet(b)));
      children.push(new Paragraph({spacing:{after:140}}));
    });
  }

  // Education
  const edus = d.education?.filter(e=>e.school||e.degree)||[];
  if(edus.length) {
    children.push(makeSecHdr("Education"));
    edus.forEach(e => {
      children.push(new Paragraph({
        children:[new TextRun({text: e.degree||"", bold:true, size:20, font:"Calibri", color:navy})],
        spacing:{after:40}
      }));
      children.push(new Paragraph({
        children:[
          new TextRun({text: e.school||"", italics:true, size:18, font:"Calibri", color:grey}),
          e.year ? new TextRun({text:`   ${e.year}`, size:16, font:"Calibri", color:light}) : new TextRun(""),
          e.gpa  ? new TextRun({text:`   GPA: ${e.gpa}`, size:16, font:"Calibri", color:light}) : new TextRun("")
        ],
        spacing:{after:120}
      }));
    });
  }

  // Skills
  const tech  = d.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const soft  = d.skills?.soft?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const langs = d.skills?.languages?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  if(tech.length||soft.length||langs.length) {
    children.push(makeSecHdr("Skills"));
    if(tech.length)  children.push(new Paragraph({children:[new TextRun({text:"Technical: ",bold:true,size:18,font:"Calibri",color:navy}),new TextRun({text:tech.join(" · "),size:18,font:"Calibri",color:grey})],spacing:{after:80}}));
    if(soft.length)  children.push(new Paragraph({children:[new TextRun({text:"Soft Skills: ",bold:true,size:18,font:"Calibri",color:navy}),new TextRun({text:soft.join(" · "),size:18,font:"Calibri",color:grey})],spacing:{after:80}}));
    if(langs.length) children.push(new Paragraph({children:[new TextRun({text:"Languages: ",bold:true,size:18,font:"Calibri",color:navy}),new TextRun({text:langs.join(" · "),size:18,font:"Calibri",color:grey})],spacing:{after:80}}));
  }

  // Certifications
  const certs = d.certifications?.split("\n").filter(Boolean)||[];
  if(certs.length) {
    children.push(makeSecHdr("Certifications"));
    certs.forEach(c => children.push(makeBullet(c)));
  }

  const doc = new Document({
    sections:[{
      properties:{page:{margin:{top:720,bottom:720,left:900,right:900}}},
      children
    }]
  });

  const blob = await Packer.toBlob(doc);
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `${d.personal?.name||"resume"}_Resume.docx`;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ document.body.removeChild(a); URL.revokeObjectURL(url); }, 300);
}

/* Plain bullet parser for Word (no JSX) */
function parseBulletsForWord(text) {
  if(!text) return [];
  const byNewline = text.split("\n").map(s=>s.trim()).filter(Boolean);
  if(byNewline.length===1 && byNewline[0].includes(". ")) {
    return byNewline[0].split(/\.\s+/).map(s=>s.trim()).filter(Boolean);
  }
  return byNewline;
}

/* ══════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════ */
export default function App() {
  const jsPdfReady = useScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  const docxReady  = useScript("https://unpkg.com/docx@8.5.0/build/index.js");

  const [data, setData]           = useState(INIT);
  const [tpl, setTpl]             = useState("modern");
  const [activeTab, setActiveTab] = useState("build"); // build | template
  const [openSecs, setOpenSecs]   = useState({ personal:true, exp:false, edu:false, skills:false, cert:false });
  const [aiResume, setAiResume]   = useState(null);
  const [generating, setGenerating] = useState(false);
  const [step, setStep]           = useState(0); // 0=build,1=ats,2=download
  const [ats, setAts]             = useState(null);
  const [atsLoading, setAtsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [applied, setApplied]     = useState({});
  const [showDlModal, setShowDlModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [paid, setPaid]           = useState(false);
  const [fmt, setFmt]             = useState("pdf");
  const [card, setCard]           = useState({ num:"", exp:"", cvv:"", name:"" });
  const [dlLoading, setDlLoading] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading]  = useState(false);
  const uploadRef = useRef(null);

  const tog = k => setOpenSecs(p=>({...p,[k]:!p[k]}));
  const setP = (f,v) => setData(p=>({...p,personal:{...p.personal,[f]:v}}));
  const setSk = (f,v) => setData(p=>({...p,skills:{...p.skills,[f]:v}}));
  const addExp = () => setData(p=>({...p,experience:[...p.experience,{id:nid(),company:"",role:"",duration:"",bullets:""}]}));
  const remExp = id => setData(p=>({...p,experience:p.experience.filter(e=>e.id!==id)}));
  const setExp = (id,f,v) => setData(p=>({...p,experience:p.experience.map(e=>e.id===id?{...e,[f]:v}:e)}));
  const addEdu = () => setData(p=>({...p,education:[...p.education,{id:nid(),school:"",degree:"",year:"",gpa:""}]}));
  const remEdu = id => setData(p=>({...p,education:p.education.filter(e=>e.id!==id)}));
  const setEdu = (id,f,v) => setData(p=>({...p,education:p.education.map(e=>e.id===id?{...e,[f]:v}:e)}));

  const resumeText = () => `Name: ${data.personal.name}\nTitle: ${data.personal.title}\nEmail: ${data.personal.email}\nPhone: ${data.personal.phone}\nLocation: ${data.personal.location}\nLinkedIn: ${data.personal.linkedin}\nSummary: ${data.personal.summary}\nExp: ${data.experience.map(e=>`${e.role} at ${e.company} (${e.duration}): ${e.bullets}`).join(" || ")}\nEdu: ${data.education.map(e=>`${e.degree} ${e.school} ${e.year}`).join(", ")}\nSkills: ${data.skills.technical}, ${data.skills.soft}\nLanguages: ${data.skills.languages}\nCerts: ${data.certifications}`;

  /* GENERATE AI RESUME */
  const generate = async () => {
    if(!data.personal.name){alert("Please enter your name to continue.");return;}
    setGenerating(true); setAiResume(null); setAts(null); setSuggestions([]);

    // Always preserve these exact fields from the user's form — never let AI blank them out
    const preserveContacts = (aiData) => ({
      ...aiData,
      personal: {
        ...aiData.personal,
        email:    data.personal.email    || aiData.personal?.email    || "",
        phone:    data.personal.phone    || aiData.personal?.phone    || "",
        location: data.personal.location || aiData.personal?.location || "",
        linkedin: data.personal.linkedin || aiData.personal?.linkedin || "",
      }
    });

    try {
      const res = await fetch("/api/analyze", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ type:"generate", resumeText: resumeText() })
      });
      const json = await res.json();
      if(json.success && json.data) {
        setAiResume(preserveContacts(json.data)); setStep(1);
      } else {
        throw new Error("API route failed");
      }
    } catch(e){ 
      console.error("Generate error:", e);
      setAiResume(preserveContacts(data)); setStep(1); 
    } finally { setGenerating(false); }
  };

  /* ATS ANALYSIS + SUGGESTIONS */
  const runAts = async () => {
    setAtsLoading(true); setAts(null); setSuggestions([]); setApplied({});
    try {
      const res = await fetch("/api/analyze", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ type:"analyze", resumeText: resumeText() })
      });
      const json = await res.json();
      if(json.success && json.data) {
        setAts(json.data); setSuggestions(json.data.suggestions||[]); setStep(2);
      } else { throw new Error("API failed"); }
    } catch(e){
      // Fallback: direct call with deeply personalized prompt
      try {
        const rt = resumeText();
        const r2 = await fetch("https://api.anthropic.com/v1/messages",{
          method:"POST", headers:{"Content-Type":"application/json"},
          body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:2000,messages:[{role:"user",content:`You are a senior ATS expert and career coach. Analyze this specific resume deeply and return ONLY valid JSON.\n\nYou MUST:\n- Read the actual content and provide SPECIFIC feedback (mention their actual role, company, skills)\n- Write autoText that is directly tailored to their background — NOT generic placeholder text\n- For summary autoText: write a full 2-3 sentence summary using their actual name/role/years/skills\n- For skills autoText: add 5-8 specific missing keywords relevant to their exact tech stack/industry\n- For bullets autoText: rewrite their weakest bullet with a specific metric added\n- Make each suggestion description reference something SPECIFIC from their resume\n\nReturn this JSON:\n{\n  "score":<0-100>,\n  "grade":"<Excellent|Good|Fair|Needs Work>",\n  "overall_tip":"One specific actionable tip mentioning their actual role or company",\n  "strengths":["specific strength 1 from their resume","specific strength 2","specific strength 3"],\n  "improvements":["specific improvement 1 referencing their content","improvement 2","improvement 3"],\n  "keywords_found":["actual keyword from resume 1","kw2","kw3","kw4","kw5"],\n  "keywords_missing":["missing kw relevant to their role 1","kw2","kw3","kw4"],\n  "suggestions":[\n    {"id":"s1","type":"enhance","priority":"high","field":"summary","label":"Strengthen Your Professional Summary","description":"<specific description referencing their actual current summary and what is missing>","autoText":"<Full personalized 3-sentence summary using their actual role, company, tech stack, and realistic years of experience>"},\n    {"id":"s2","type":"add","priority":"high","field":"skills","label":"Add High-Demand Industry Keywords","description":"<specific description naming keywords missing from their tech stack>","autoText":"<comma-separated list of 6-8 specific missing skills relevant to their exact role and tech stack>"},\n    {"id":"s3","type":"modify","priority":"medium","field":"bullets","label":"Quantify Your Best Achievement","description":"<reference a specific bullet from their resume that lacks metrics and explain how to improve it>","autoText":"<a rewritten version of one of their actual bullets, improved with specific metric/number/percentage>"},\n    {"id":"s4","type":"enhance","priority":"medium","field":"certifications","label":"Add High-Value Certifications","description":"<specific certifications relevant to their exact role and tech stack that would boost score>","autoText":"<2-3 specific certifications as newline-separated list, relevant to their role>"}\n  ]\n}\n\nResume:\n${rt}`}]})
        });
        const d2 = await r2.json();
        const parsed = JSON.parse(d2.content?.[0]?.text.replace(/```json|```/g,"").trim()||"{}");
        setAts(parsed); setSuggestions(parsed.suggestions||[]); setStep(2);
      } catch(e2) {
        setAts({score:72,strengths:["Relevant technical experience","Education section present","Skills listed"],improvements:["Add quantified metrics to bullet points","Expand professional summary with keywords","Include more industry certifications"],keywords_found:["Leadership","Communication","Management"],keywords_missing:["ROI","Agile","KPIs","Stakeholder"],overall_tip:"Focus on adding specific numbers and percentages to your bullet points."});
        setSuggestions([{id:"s1",type:"enhance",field:"summary",label:"Strengthen Summary",description:"Your summary needs specific years of experience, key technical skills, and quantified achievements.",autoText:""},{id:"s2",type:"add",field:"skills",label:"Add High-Value Keywords",description:"Include trending skills to improve ATS match rate.",autoText:"Agile, KPI Tracking, Stakeholder Management, Data-Driven Decision Making"},{id:"s3",type:"modify",field:"bullets",label:"Quantify Your Impact",description:"Add specific percentages, numbers, or time savings to your bullet points.",autoText:""}]);
      }
    } finally { setAtsLoading(false); }
  };

  /* APPLY SUGGESTION */
  const applySuggestion = (s) => {
    if(s.autoText) {
      if(s.field==="summary") setData(p=>({...p,personal:{...p.personal,summary:s.autoText}}));
      if(s.field==="skills") setData(p=>({...p,skills:{...p.skills,soft:(p.skills.soft?p.skills.soft+", ":"")+s.autoText}}));
      if(s.field==="certifications") setData(p=>({...p,certifications:(p.certifications?p.certifications+"\n":"")+s.autoText}));
      if(aiResume) {
        setAiResume(prev=>{
          const n = {...prev, personal: {
            ...prev.personal,
            // Always keep original contact fields
            email:    data.personal.email    || prev.personal?.email    || "",
            phone:    data.personal.phone    || prev.personal?.phone    || "",
            location: data.personal.location || prev.personal?.location || "",
            linkedin: data.personal.linkedin || prev.personal?.linkedin || "",
          }};
          if(s.field==="summary") n.personal = {...n.personal, summary:s.autoText};
          if(s.field==="skills")  n.skills   = {...n.skills, soft:(n.skills?.soft?n.skills.soft+", ":"")+s.autoText};
          return n;
        });
      }
    }
    setApplied(p=>({...p,[s.id]:true}));
  };

  /* PAY */
  const handlePay = (e) => {
    e.preventDefault();
    if(!card.num||!card.exp||!card.cvv){alert("Please fill all card details.");return;}
    setShowDlModal(false); setShowSuccess(true); setPaid(true);
  };

  /* DOWNLOAD */
  const handleDownload = async (f) => {
    const d = aiResume||data;
    setDlLoading(f);
    try {
      if(f==="pdf"){
        if(!jsPdfReady||!window.jspdf){alert("PDF library loading, try again in a moment.");return;}
        genPDF(d,tpl);
      } else {
        // Try loading docx library with multiple fallback CDNs
        const loadDocx = (src) => new Promise((resolve, reject) => {
          if(window.docx && window.docx.Document) { resolve(); return; }
          const s = document.createElement("script");
          s.src = src; s.async = true;
          s.onload = () => setTimeout(resolve, 800);
          s.onerror = reject;
          document.head.appendChild(s);
        });

        // Wait for existing script or try to load
        let waited = 0;
        while((!window.docx || !window.docx.Document) && waited < 8000) {
          await new Promise(r=>setTimeout(r,500)); waited+=500;
        }

        if(!window.docx || !window.docx.Document) {
          // Try fallback CDN
          try {
            await loadDocx("https://unpkg.com/docx@8.5.0/build/index.js");
          } catch(e2) {
            try { await loadDocx("https://cdn.jsdelivr.net/npm/docx@7.8.2/build/index.js"); }
            catch(e3) { throw new Error("Word library failed to load. Please try PDF format instead."); }
          }
        }

        if(!window.docx || !window.docx.Document) {
          throw new Error("Word library not available. Please try PDF format or refresh the page.");
        }
        await genWord(d);
      }
    } catch(err){ 
      console.error("Download error:", err);
      alert("Download failed: " + (err.message || "Unknown error. Please try PDF format."));
    }
    finally { setDlLoading(null); }
  };

  /* UPLOAD & EXTRACT RESUME */
  const handleUpload = async (file) => {
    if(!file) return;
    setUploading(true); setShowUpload(false);
    try {
      const isPdf = file.type === "application/pdf";
      const isDocx = file.name.toLowerCase().endsWith(".docx") || file.name.toLowerCase().endsWith(".doc");

      if(!isPdf && !isDocx) {
        alert("Please upload a PDF or Word (.docx) file.");
        setUploading(false); return;
      }

      if(isPdf) {
        // Read PDF as base64 and send to secure backend
        const base64 = await new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onload = () => res(reader.result.split(",")[1]);
          reader.onerror = () => rej(new Error("Failed to read file"));
          reader.readAsDataURL(file);
        });

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "extract",
            rawData: { fileBase64: base64, mediaType: "application/pdf", fileName: file.name }
          })
        });

        if(!res.ok) {
          const errJson = await res.json().catch(()=>({}));
          throw new Error(errJson.error || `Server error ${res.status}`);
        }

        const json = await res.json();
        if(json.success && json.data?.personal?.name) {
          applyExtractedData(json.data);
        } else {
          throw new Error("Could not extract resume data from PDF. Please fill in the form manually.");
        }

      } else {
        // DOCX: read as text and send to backend
        let textContent = "";
        try {
          textContent = await file.text();
          // DOCX is binary XML — if it looks garbled, warn
          if(textContent.includes("PK\x03\x04") || textContent.charCodeAt(0) === 80) {
            // Raw DOCX binary, can't parse as plain text
            textContent = "";
          }
        } catch(e) { textContent = ""; }

        if(!textContent || textContent.trim().length < 50) {
          alert("Word (.docx) files cannot be read directly in the browser.\n\nPlease:\n1. Open your .docx in Word or Google Docs\n2. Export/Download as PDF\n3. Upload the PDF version instead");
          setUploading(false); return;
        }

        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "extract", resumeText: textContent })
        });

        if(!res.ok) {
          const errJson = await res.json().catch(()=>({}));
          throw new Error(errJson.error || `Server error ${res.status}`);
        }

        const json = await res.json();
        if(json.success && json.data?.personal?.name) {
          applyExtractedData(json.data);
        } else {
          throw new Error("Could not extract data. Please fill in the form manually.");
        }
      }

    } catch(err) {
      console.error("Upload error:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const applyExtractedData = (parsed) => {
    // Deep-normalize personal fields — handle any key name variations
    const raw = parsed.personal || parsed.Personal || {};
    
    // Normalize personal — look for fields case-insensitively
    const findField = (obj, ...keys) => {
      for(const k of keys) {
        const found = Object.entries(obj).find(([key]) => key.toLowerCase() === k.toLowerCase());
        if(found && found[1]) return String(found[1]).trim();
      }
      return "";
    };

    const personal = {
      name:     findField(raw, "name", "full_name", "fullname"),
      title:    findField(raw, "title", "job_title", "position", "role", "headline"),
      email:    findField(raw, "email", "email_address", "mail"),
      phone:    findField(raw, "phone", "phone_number", "mobile", "cell", "contact", "tel"),
      location: findField(raw, "location", "address", "city", "city_state", "city_country"),
      linkedin: findField(raw, "linkedin", "linkedin_url", "linkedin_profile", "profile"),
      summary:  findField(raw, "summary", "professional_summary", "objective", "about", "profile_summary"),
    };

    // Ensure IDs are valid numbers
    const experience = (parsed.experience || parsed.Experience || [])
      .map((e, i) => ({
        id: i + 1,
        company:  String(e.company  || e.Company  || "").trim(),
        role:     String(e.role     || e.Role     || e.title || e.position || "").trim(),
        duration: String(e.duration || e.Duration || e.dates || e.period   || "").trim(),
        bullets:  String(e.bullets  || e.Bullets  || e.responsibilities || e.achievements || "").trim(),
      }));

    const education = (parsed.education || parsed.Education || [])
      .map((e, i) => ({
        id:     100 + i,
        school: String(e.school || e.School || e.institution || e.university || "").trim(),
        degree: String(e.degree || e.Degree || e.qualification || "").trim(),
        year:   String(e.year   || e.Year   || e.graduation_year || e.passing_year || "").trim(),
        gpa:    String(e.gpa    || e.GPA    || e.cgpa || e.percentage || "").trim(),
      }));

    const rawSkills = parsed.skills || parsed.Skills || {};
    const skills = {
      technical: String(rawSkills.technical || rawSkills.Technical || rawSkills.tech_skills || "").trim(),
      soft:      String(rawSkills.soft      || rawSkills.Soft      || rawSkills.soft_skills || "").trim(),
      languages: String(rawSkills.languages || rawSkills.Languages || "").trim(),
    };

    const certifications = String(parsed.certifications || parsed.Certifications || "").trim();

    const normalized = {
      personal,
      experience: experience.length ? experience : [{id:1,company:"",role:"",duration:"",bullets:""}],
      education:  education.length  ? education  : [{id:100,school:"",degree:"",year:"",gpa:""}],
      skills,
      certifications,
    };

    console.log("Extracted data:", JSON.stringify(normalized.personal, null, 2));

    setData(normalized);
    setOpenSecs({personal:true, exp:true, edu:true, skills:true, cert:false});
    
    const filled = [personal.email, personal.phone, personal.linkedin].filter(Boolean);
    alert(`✅ Resume extracted for ${personal.name}!\n\n` +
      `Found: ${filled.length > 0 ? filled.join(", ") : "basic info"}\n\n` +
      `Review all sections, then click "Generate AI Resume" to enhance it.`);
  };

  const hasName = !!data.personal.name;
  const previewData = aiResume||data;
  const stepIdx = step;

  /* ── RENDER ── */
  return (
    <>
      <style>{G}</style>
      <style>{NEW_TEMPLATE_CSS}</style>
      <div className="app">

        {/* TOPBAR */}
        <nav className="topbar">
          <div className="brand">
            <div className="brand-icon">R</div>
            <span className="brand-name">Resume<span>Pro</span></span>
          </div>
          <div className="topbar-mid">
            {STEPS.map((s,i)=>(
              <span key={s} style={{display:"flex",alignItems:"center"}}>
                <div className={`step-pill${stepIdx===i?" active":stepIdx>i?" done":""}`}>
                  <div className="step-num">{stepIdx>i?"✓":i+1}</div>{s}
                </div>
                {i<STEPS.length-1&&<span className="step-sep" style={{padding:"0 4px"}}>›</span>}
              </span>
            ))}
          </div>
          <div className="topbar-right">
            <button className="nav-btn nav-btn-ghost" onClick={()=>{setData(INIT);setAiResume(null);setAts(null);setSuggestions([]);setStep(0);}}>Reset</button>
          </div>
        </nav>

        {/* MAIN */}
        <div className="main-layout">

          {/* LEFT */}
          <div className="left-panel">
            <div className="panel-tabs">
              <div className={`panel-tab${activeTab==="build"?" active":""}`} onClick={()=>setActiveTab("build")}>✏️ Build</div>
              <div className={`panel-tab${activeTab==="template"?" active":""}`} onClick={()=>setActiveTab("template")}>🎨 Template</div>
            </div>

            {activeTab==="template"&&(
              <div className="tpl-section">
                <div className="tpl-section-title">Choose Your Template</div>
                <div className="tpl-section-sub">Select a design that fits your personality and industry</div>
                <div className="tpl-grid">
                  {TEMPLATES.map(t=>(
                    <div key={t.id} className={`tpl-card${tpl===t.id?" active":""}`} onClick={()=>setTpl(t.id)}>
                      <div className="tpl-check">✓</div>
                      <div className="tpl-card-thumb"><Thumb id={t.id}/></div>
                      <div className="tpl-card-label">
                        <div>
                          <div className="tpl-card-name">{t.name}</div>
                          <div className="tpl-card-tag">{t.desc}</div>
                        </div>
                        {tpl===t.id&&<span style={{fontSize:9,background:"var(--primary)",color:"#fff",padding:"2px 7px",borderRadius:8,fontWeight:700}}>Active</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab==="build"&&(
              <>
                <div className="form-col-inner" style={{flex:1}}>
                  {/* Personal */}
                  <div className="form-section">
                    <div className="form-sec-head" onClick={()=>tog("personal")}>
                      <div className="form-sec-icon">👤</div>
                      <span className="form-sec-title">Personal Info</span>
                      <span className="form-sec-badge">Required</span>
                      <span className={`form-sec-chev${openSecs.personal?" o":""}`}>▼</span>
                    </div>
                    {openSecs.personal&&<div className="form-sec-body">
                      <div className="fgrid"><div className="ffield"><label>Full Name *</label><input value={data.personal.name} onChange={e=>setP("name",e.target.value)} placeholder="Rohan Sharma"/></div><div className="ffield"><label>Professional Title</label><input value={data.personal.title} onChange={e=>setP("title",e.target.value)} placeholder="Software Engineer"/></div></div>
                      <div className="fgrid"><div className="ffield"><label>Email</label><input value={data.personal.email} onChange={e=>setP("email",e.target.value)} placeholder="rohan@email.com"/></div><div className="ffield"><label>Phone</label><input value={data.personal.phone} onChange={e=>setP("phone",e.target.value)} placeholder="+91 98765 43210"/></div></div>
                      <div className="fgrid"><div className="ffield"><label>Location</label><input value={data.personal.location} onChange={e=>setP("location",e.target.value)} placeholder="Mumbai, India"/></div><div className="ffield"><label>LinkedIn</label><input value={data.personal.linkedin} onChange={e=>setP("linkedin",e.target.value)} placeholder="linkedin.com/in/rohan"/></div></div>
                      <div className="fgrid full"><div className="ffield"><label>Professional Summary <span className="badge-new">AI Enhanced</span></label><textarea rows={3} value={data.personal.summary} onChange={e=>setP("summary",e.target.value)} placeholder="Brief intro about yourself — AI will improve this..."/></div></div>
                    </div>}
                  </div>

                  {/* Experience */}
                  <div className="form-section">
                    <div className="form-sec-head" onClick={()=>tog("exp")}>
                      <div className="form-sec-icon">💼</div><span className="form-sec-title">Work Experience</span>
                      <span className={`form-sec-chev${openSecs.exp?" o":""}`}>▼</span>
                    </div>
                    {openSecs.exp&&<div className="form-sec-body">
                      {data.experience.map(exp=>(
                        <div className="entry-card" key={exp.id}>
                          {data.experience.length>1&&<button className="entry-rem" onClick={()=>remExp(exp.id)}>×</button>}
                          <div className="fgrid"><div className="ffield"><label>Company</label><input value={exp.company} onChange={e=>setExp(exp.id,"company",e.target.value)} placeholder="TCS, Infosys, Startup..."/></div><div className="ffield"><label>Job Title</label><input value={exp.role} onChange={e=>setExp(exp.id,"role",e.target.value)} placeholder="Software Developer"/></div></div>
                          <div className="fgrid full"><div className="ffield"><label>Duration</label><input value={exp.duration} onChange={e=>setExp(exp.id,"duration",e.target.value)} placeholder="June 2022 – Present"/></div></div>
                          <div className="fgrid full"><div className="ffield"><label>Key Responsibilities & Achievements <span className="badge-new">AI Rewrites</span></label><textarea rows={4} value={exp.bullets} onChange={e=>setExp(exp.id,"bullets",e.target.value)} placeholder={"Developed REST APIs for mobile app\nReduced load time by 30%\nLed team of 4 developers"}/></div></div>
                        </div>
                      ))}
                      <div className="add-row"><button className="add-entry-btn" onClick={addExp}>+ Add Experience</button></div>
                    </div>}
                  </div>

                  {/* Education */}
                  <div className="form-section">
                    <div className="form-sec-head" onClick={()=>tog("edu")}>
                      <div className="form-sec-icon">🎓</div><span className="form-sec-title">Education</span>
                      <span className={`form-sec-chev${openSecs.edu?" o":""}`}>▼</span>
                    </div>
                    {openSecs.edu&&<div className="form-sec-body">
                      {data.education.map(edu=>(
                        <div className="entry-card" key={edu.id}>
                          {data.education.length>1&&<button className="entry-rem" onClick={()=>remEdu(edu.id)}>×</button>}
                          <div className="fgrid"><div className="ffield"><label>University / College</label><input value={edu.school} onChange={e=>setEdu(edu.id,"school",e.target.value)} placeholder="IIT Mumbai, Pune University..."/></div><div className="ffield"><label>Degree / Course</label><input value={edu.degree} onChange={e=>setEdu(edu.id,"degree",e.target.value)} placeholder="B.Tech Computer Science"/></div></div>
                          <div className="fgrid"><div className="ffield"><label>Passing Year</label><input value={edu.year} onChange={e=>setEdu(edu.id,"year",e.target.value)} placeholder="2023"/></div><div className="ffield"><label>CGPA / Percentage</label><input value={edu.gpa} onChange={e=>setEdu(edu.id,"gpa",e.target.value)} placeholder="8.5 / 75%"/></div></div>
                        </div>
                      ))}
                      <div className="add-row"><button className="add-entry-btn" onClick={addEdu}>+ Add Education</button></div>
                    </div>}
                  </div>

                  {/* Skills */}
                  <div className="form-section">
                    <div className="form-sec-head" onClick={()=>tog("skills")}>
                      <div className="form-sec-icon">⚡</div><span className="form-sec-title">Skills</span>
                      <span className={`form-sec-chev${openSecs.skills?" o":""}`}>▼</span>
                    </div>
                    {openSecs.skills&&<div className="form-sec-body">
                      <div className="fgrid full"><div className="ffield"><label>Technical Skills</label><input value={data.skills.technical} onChange={e=>setSk("technical",e.target.value)} placeholder="React, Node.js, Python, Java, SQL, Git..."/></div></div>
                      <div className="fgrid full"><div className="ffield"><label>Soft Skills</label><input value={data.skills.soft} onChange={e=>setSk("soft",e.target.value)} placeholder="Leadership, Communication, Problem Solving..."/></div></div>
                      <div className="fgrid full"><div className="ffield"><label>Languages</label><input value={data.skills.languages} onChange={e=>setSk("languages",e.target.value)} placeholder="English (Fluent), Hindi (Native)..."/></div></div>
                    </div>}
                  </div>

                  {/* Certifications */}
                  <div className="form-section">
                    <div className="form-sec-head" onClick={()=>tog("cert")}>
                      <div className="form-sec-icon">🏅</div><span className="form-sec-title">Certifications & Projects</span>
                      <span className={`form-sec-chev${openSecs.cert?" o":""}`}>▼</span>
                    </div>
                    {openSecs.cert&&<div className="form-sec-body">
                      <div className="fgrid full"><div className="ffield"><label>Certifications / Awards (one per line)</label><textarea rows={4} value={data.certifications} onChange={e=>setData(p=>({...p,certifications:e.target.value}))} placeholder={"AWS Certified Developer (2024)\nGoogle Analytics Certified\nHackathon Winner – Smart India 2023"}/></div></div>
                    </div>}
                  </div>
                </div>

                <div className="gen-area">
                  <input ref={uploadRef} type="file" accept=".pdf,.doc,.docx" style={{display:"none"}} onChange={e=>{if(e.target.files[0])handleUpload(e.target.files[0]);}}/>
                  <button className="upload-resume-btn" disabled={uploading} onClick={()=>setShowUpload(true)}>
                    {uploading?<><div className="spin-dark"/>Extracting resume data...</>:<>📂 Upload Existing Resume (Auto-fill)</>}
                  </button>
                  <button className="gen-btn" onClick={generate} disabled={generating||!hasName}>
                    {generating?<><div className="spin-sm"/>AI is building your resume...</>:<>✨ Generate AI Resume Preview</>}
                  </button>
                  <div className="gen-sub">AI enhances your content with action verbs, metrics & ATS keywords</div>
                </div>
              </>
            )}
          </div>

          {/* CENTER — PREVIEW */}
          <div className="center-panel">
            <div className="preview-topbar">
              <div className="preview-title">📄 Live Preview — {TEMPLATES.find(t=>t.id===tpl)?.name} Template</div>
            </div>

            {!aiResume&&!generating&&(
              <div className="empty-preview">
                <div className="empty-preview-icon">📄</div>
                <h3>Your Resume Preview</h3>
                <p>Fill in your details on the left and click <strong>Generate AI Resume Preview</strong> to see your professional resume here</p>
              </div>
            )}

            {generating&&(
              <div className="loading-preview">
                <div className="loading-ring"/>
                <h3>AI is building your resume...</h3>
                <p>Enhancing with action verbs, adding metrics & optimizing for ATS systems</p>
              </div>
            )}

            {aiResume&&!generating&&(
              <>
                <div className="preview-edit-notice">
                  ✏️ <span><strong>Tip:</strong> You can click any text in the preview below to edit it directly.</span>
                </div>
                <div className="sheet-wrap" contentEditable suppressContentEditableWarning
                  style={{outline:"none",cursor:"text"}}
                  onInput={()=>{/* edits are visual only in preview */}}>
                  <ResumeContent data={previewData} tpl={tpl}/>
                </div>
              </>
            )}
          </div>

          {/* RIGHT — ATS + SUGGESTIONS */}
          <div className="right-panel">

            {/* ATS Score */}
            <div className="right-section">
              <div className="rs-title">📊 ATS Score</div>
              <div className="rs-sub">Check how your resume performs against ATS systems used by recruiters</div>

              {!ats&&!atsLoading&&(
                <div style={{textAlign:"center",padding:"20px 0",color:"var(--ink3)"}}>
                  <div style={{fontSize:36,marginBottom:10,opacity:0.4}}>🤖</div>
                  <div style={{fontSize:12,lineHeight:1.6}}>Generate your resume first, then analyze your ATS score</div>
                </div>
              )}

              {atsLoading&&(
                <div style={{textAlign:"center",padding:"20px 0",color:"var(--ink3)"}}>
                  <div style={{fontSize:36,marginBottom:10}}>⏳</div>
                  <div style={{fontSize:12}}>Analyzing your resume...</div>
                </div>
              )}

              {ats&&!atsLoading&&(
                <>
                  <div className="ats-score-row">
                    <div className="ats-ring-wrap">
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle className="ats-trk" cx="40" cy="40" r="35"/>
                        <circle className="ats-fill" cx="40" cy="40" r="35" style={{stroke:ats.score>=80?"#059669":ats.score>=60?"#D97706":"#DC2626",strokeDashoffset:220-(ats.score/100)*220}}/>
                      </svg>
                      <div className="ats-center">
                        <span className="ats-num" style={{color:ats.score>=80?"#059669":ats.score>=60?"#D97706":"#DC2626"}}>{ats.score}</span>
                        <span className="ats-of">/100</span>
                      </div>
                    </div>
                    <div className="ats-info">
                      <div className="ats-grade" style={{color:ats.score>=80?"#059669":ats.score>=60?"#D97706":"#DC2626"}}>{ats.score>=80?"Excellent":ats.score>=70?"Good":ats.score>=60?"Fair":"Needs Work"}</div>
                      <div className="ats-desc">{ats.overall_tip||"Improve your score with the suggestions below"}</div>
                    </div>
                  </div>

                  <div className="fb-grid">
                    {ats.strengths?.slice(0,2).map((s,i)=><div key={i} className="fb-item good"><span className="fb-icon">✅</span>{s}</div>)}
                    {ats.improvements?.slice(0,2).map((s,i)=><div key={i} className="fb-item warn"><span className="fb-icon">⚠️</span>{s}</div>)}
                  </div>

                  {(ats.keywords_found?.length||ats.keywords_missing?.length)>0&&(
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"var(--ink3)",marginBottom:6}}>Keywords</div>
                      <div className="kw-row">
                        {ats.keywords_found?.map((k,i)=><span key={i} className="kw-pill found">✓ {k}</span>)}
                        {ats.keywords_missing?.map((k,i)=><span key={i} className="kw-pill miss">✗ {k}</span>)}
                      </div>
                    </div>
                  )}
                </>
              )}

              <button className="ats-run-btn" onClick={runAts} disabled={atsLoading||!hasName}>
                {atsLoading?<><div className="spin-dark"/>Analyzing...</>:"🔍 Run ATS Analysis"}
              </button>
            </div>

            {/* AI SUGGESTIONS */}
            {suggestions.length>0&&(
              <div className="right-section">
                <div className="rs-title">💡 AI Suggestions</div>
                <div className="rs-sub">Smart recommendations to improve your resume</div>
                <div className="ai-sugg-wrap">
                  {suggestions.map(s=>(
                    <div key={s.id} className="sugg-card">
                      <div className="sugg-card-head">
                        <span className={`sugg-tag ${s.type}`}>{s.type}</span>
                        <div>
                          <div style={{fontSize:12,fontWeight:700,color:"var(--ink)",marginBottom:3}}>{s.label}</div>
                          <div className="sugg-text">{s.description}</div>
                        </div>
                      </div>
                      {applied[s.id]
                        ? <div className="sugg-applied">✅ Applied to your resume</div>
                        : <div className="sugg-actions">
                            {s.autoText&&<button className="sugg-btn apply" onClick={()=>applySuggestion(s)}>⚡ Auto-Apply</button>}
                            <button className="sugg-btn skip" onClick={()=>setApplied(p=>({...p,[s.id]:true}))}>Skip</button>
                          </div>
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DOWNLOAD */}
            <div className="dl-area">
              {aiResume&&(
                <div className="dl-hint">
                  <span className="dl-hint-icon">🎉</span>
                  <div className="dl-hint-text">Your resume is ready! Download it as PDF or Word.</div>
                </div>
              )}
              <button className="dl-main-btn" disabled={!aiResume} onClick={()=>setShowDlModal(true)}>
                {!aiResume?"⬇ Download (Generate First)":"⬇ Download Resume"}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* DOWNLOAD / PAYMENT MODAL */}
      {showDlModal&&(
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowDlModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <h2>Download Your Resume</h2>
              <p>One-time payment · Instant download · PDF & Word included</p>
            </div>
            <div className="modal-divider"/>
            <div className="modal-body">
              <div className="price-card">
                <div>
                  <div className="price-amount"><span>₹</span>99</div>
                  <div style={{fontSize:11,color:"var(--ink3)",marginTop:4}}>One-time · No subscription</div>
                </div>
                <div>
                  <div className="price-badge-pill">Best Value</div>
                  <div className="price-desc">AI-Enhanced · ATS-Optimized<br/>PDF + Word included</div>
                </div>
              </div>

              <div className="fmt-label">Choose Format</div>
              <div className="fmt-grid">
                <div className={`fmt-opt${fmt==="pdf"?" sel":""}`} onClick={()=>setFmt("pdf")}>
                  <div className="fmt-opt-icon">📄</div>
                  <div className="fmt-opt-name">PDF</div>
                  <div className="fmt-opt-ext">.PDF</div>
                  <div className="fmt-opt-badge">Most Popular</div>
                </div>
                <div className={`fmt-opt${fmt==="word"?" sel":""}`} onClick={()=>setFmt("word")}>
                  <div className="fmt-opt-icon">📝</div>
                  <div className="fmt-opt-name">Word</div>
                  <div className="fmt-opt-ext">.DOCX</div>
                  <div className="fmt-opt-badge">Editable</div>
                </div>
              </div>

              <div className="feat-grid">
                {["AI-enhanced content","ATS-optimized","Action-verb bullets","Professional template","Instant delivery","30-day refund"].map((f,i)=>(
                  <div key={i} className="feat-item"><span className="feat-check">✓</span>{f}</div>
                ))}
              </div>

              <div className="pay-form-label">Card Details</div>
              <form onSubmit={handlePay}>
                <div className="pay-row"><input className="pay-inp" value={card.name} onChange={e=>setCard(p=>({...p,name:e.target.value}))} placeholder="Cardholder Name"/></div>
                <div className="pay-row"><input className="pay-inp" value={card.num} onChange={e=>setCard(p=>({...p,num:e.target.value}))} placeholder="1234 5678 9012 3456" maxLength={19}/></div>
                <div className="pay-row">
                  <input className="pay-inp" value={card.exp} onChange={e=>setCard(p=>({...p,exp:e.target.value}))} placeholder="MM / YY" maxLength={7}/>
                  <input className="pay-inp" value={card.cvv} onChange={e=>setCard(p=>({...p,cvv:e.target.value}))} placeholder="CVV" maxLength={4}/>
                </div>
                <button type="submit" className="pay-submit">🔒 Pay ₹99 & Download</button>
              </form>
              <div className="modal-cancel-row"><button onClick={()=>setShowDlModal(false)}>Cancel, go back</button></div>
              <div className="modal-secure">🔒 Secured by Razorpay · 256-bit SSL · PCI Compliant</div>
            </div>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {showSuccess&&(
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowSuccess(false)}
          onKeyDown={e=>e.key==="Escape"&&setShowSuccess(false)} tabIndex={-1}
          style={{outline:"none"}} ref={el=>el&&el.focus()}>
          <div className="success-modal" style={{position:"relative"}}>
            <button onClick={()=>setShowSuccess(false)} style={{position:"absolute",top:14,right:16,background:"none",border:"none",fontSize:22,cursor:"pointer",color:"#94a3b8",lineHeight:1,fontFamily:"sans-serif"}}>×</button>
            <div className="success-icon-wrap">🎉</div>
            <h2>Payment Successful!</h2>
            <p>Your AI-enhanced, ATS-optimized resume is ready. Both PDF and Word formats are included in your purchase.</p>
            <div className="success-dl-grid">
              <button className="sdl-btn pdf-btn" onClick={()=>handleDownload("pdf")} disabled={dlLoading==="pdf"}>
                <span className="sdl-btn-icon">📄</span>
                <span className="sdl-btn-name">{dlLoading==="pdf"?"Generating...":"Download PDF"}</span>
                <span className="sdl-btn-ext">ATS FRIENDLY</span>
              </button>
              <button className="sdl-btn word-btn" onClick={()=>handleDownload("word")} disabled={dlLoading==="word"}>
                <span className="sdl-btn-icon">📝</span>
                <span className="sdl-btn-name">{dlLoading==="word"?"Generating...":"Download Word"}</span>
                <span className="sdl-btn-ext">FULLY EDITABLE</span>
              </button>
            </div>
            <div className="success-note">✓ Both formats included · Download multiple times anytime</div>
            <button onClick={()=>setShowSuccess(false)} style={{marginTop:16,background:"none",border:"1.5px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"8px 20px",fontSize:12,color:"var(--ink3)",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,width:"100%"}}>Close</button>
          </div>
        </div>
      )}
      {/* UPLOAD RESUME MODAL */}
      {showUpload&&(
        <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&setShowUpload(false)}>
          <div className="upload-modal">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
              <div>
                <h2 style={{fontSize:18,fontWeight:800,color:"var(--ink)",letterSpacing:"-0.3px",marginBottom:4}}>Upload Existing Resume</h2>
                <p style={{fontSize:11.5,color:"var(--ink3)",lineHeight:1.5}}>We'll extract all your details automatically — no re-typing needed</p>
              </div>
              <button onClick={()=>setShowUpload(false)} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"var(--ink3)",lineHeight:1}}>×</button>
            </div>
            <div className="upload-dropzone" onClick={()=>uploadRef.current?.click()}
              onDragOver={e=>{e.preventDefault();e.currentTarget.classList.add("drag")}}
              onDragLeave={e=>e.currentTarget.classList.remove("drag")}
              onDrop={e=>{e.preventDefault();e.currentTarget.classList.remove("drag");const f=e.dataTransfer.files[0];if(f){setShowUpload(false);handleUpload(f);}}}>
              <div className="upload-dropzone-icon">📄</div>
              <h3>Drop your resume here</h3>
              <p>or click to browse files<br/>AI will extract all your details instantly</p>
              <div className="upload-formats">
                <span className="upload-fmt-pill pdf">PDF</span>
                <span className="upload-fmt-pill docx">DOCX</span>
              </div>
            </div>
            <div style={{marginTop:16,padding:"12px 16px",background:"#f0fdf4",borderRadius:"var(--radius)",border:"1px solid #bbf7d0"}}>
              <div style={{fontSize:11,fontWeight:600,color:"#166534",lineHeight:1.6}}>
                ✅ What gets extracted automatically:<br/>
                Name, contact info, work experience with bullets, education, skills, certifications
              </div>
            </div>
            <button onClick={()=>setShowUpload(false)} style={{marginTop:14,width:"100%",background:"none",border:"1.5px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"9px",fontSize:12,color:"var(--ink3)",cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600}}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}
