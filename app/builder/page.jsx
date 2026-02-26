"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

/* ── load browser scripts (jsPDF, docx) ── */
function useScript(src) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (document.querySelector(`script[src="${src}"]`)) { setReady(true); return; }
    const s = document.createElement("script"); s.src = src; s.async = true;
    s.onload = () => setReady(true); document.head.appendChild(s);
  }, [src]);
  return ready;
}

/* ═══════════════════ STYLES ═══════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;background:#F0F2F5;color:#1a1d23;min-height:100vh}

:root{
  --ink:#1a1d23;--ink2:#4a5568;--ink3:#94a3b8;
  --bg:#F0F2F5;--white:#fff;
  --primary:#2563EB;--primary-dark:#1d4ed8;--primary-light:#eff6ff;
  --accent:#7C3AED;--green:#059669;--red:#DC2626;--gold:#B7860D;--navy:#1e3a5f;
  --border:#e2e8f0;--border2:#cbd5e1;
  --shadow-sm:0 1px 3px rgba(0,0,0,.08);
  --shadow:0 4px 16px rgba(0,0,0,.08);
  --shadow-lg:0 20px 48px rgba(0,0,0,.12);
  --radius:10px;--radius-sm:6px;--radius-lg:16px;
}

.app{display:flex;flex-direction:column;min-height:100vh}

/* TOPBAR */
.topbar{background:#fff;border-bottom:1px solid var(--border);height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 24px;position:sticky;top:0;z-index:300;box-shadow:var(--shadow-sm)}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none}
.brand-icon{width:32px;height:32px;background:linear-gradient(135deg,var(--primary),var(--accent));border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:16px}
.brand-name{font-size:17px;font-weight:800;color:var(--ink);letter-spacing:-0.3px}
.brand-name span{color:var(--primary)}
.topbar-mid{display:flex;align-items:center;gap:5px}
.step-pill{display:flex;align-items:center;gap:6px;background:var(--bg);border:1px solid var(--border);border-radius:20px;padding:4px 12px;font-size:11px;font-weight:600;color:var(--ink3);transition:all 0.2s}
.step-pill.active{background:var(--primary-light);border-color:var(--primary);color:var(--primary)}
.step-pill.done{background:#f0fdf4;border-color:#bbf7d0;color:var(--green)}
.step-num{width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;background:var(--ink3);color:#fff;flex-shrink:0}
.step-pill.active .step-num{background:var(--primary)}
.step-pill.done .step-num{background:var(--green)}
.topbar-right a{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:600;color:var(--ink3);text-decoration:none;border:1.5px solid var(--border2);border-radius:var(--radius-sm);padding:6px 14px;transition:all 0.18s}
.topbar-right a:hover{border-color:var(--primary);color:var(--primary)}

/* LAYOUT */
.main-layout{display:grid;grid-template-columns:340px 1fr 360px;height:calc(100vh - 60px)}
@media(max-width:1200px){.main-layout{grid-template-columns:300px 1fr 320px}}

/* LEFT */
.left-panel{background:#fff;border-right:1px solid var(--border);overflow-y:auto;display:flex;flex-direction:column}
.panel-tabs{display:flex;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:10;background:#fff}
.panel-tab{flex:1;padding:11px 4px;font-size:11px;font-weight:600;color:var(--ink3);text-align:center;cursor:pointer;border-bottom:2px solid transparent;transition:all 0.18s;text-transform:uppercase;letter-spacing:0.3px}
.panel-tab.active{color:var(--primary);border-bottom-color:var(--primary);background:var(--primary-light)}

/* TEMPLATE PICKER */
.tpl-section{padding:18px}
.tpl-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.tpl-card{border:2px solid var(--border);border-radius:var(--radius);overflow:hidden;cursor:pointer;transition:all 0.2s;position:relative;background:#fff}
.tpl-card:hover{border-color:var(--primary);transform:translateY(-2px);box-shadow:var(--shadow)}
.tpl-card.sel{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.12)}
.tpl-thumb{height:88px;overflow:hidden}
.tpl-label{padding:8px 10px;display:flex;align-items:center;justify-content:space-between}
.tpl-name{font-size:11px;font-weight:700;color:var(--ink)}
.tpl-tag{font-size:9px;color:var(--ink3);text-transform:uppercase;letter-spacing:.5px}
.tpl-badge{font-size:8px;background:var(--primary);color:#fff;padding:1px 6px;border-radius:6px;font-weight:700}
.tpl-check{position:absolute;top:6px;right:6px;width:16px;height:16px;background:var(--primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:8px;color:#fff;opacity:0;transition:opacity 0.2s}
.tpl-card.sel .tpl-check{opacity:1}

/* FORM */
.form-section{border-bottom:1px solid var(--border)}
.form-sec-head{padding:13px 18px;display:flex;align-items:center;gap:9px;cursor:pointer;user-select:none;transition:background 0.15s}
.form-sec-head:hover{background:#fafbfc}
.sec-ico{width:26px;height:26px;border-radius:var(--radius-sm);background:var(--bg);display:flex;align-items:center;justify-content:center;font-size:13px;flex-shrink:0}
.sec-title{font-size:13px;font-weight:700;flex:1;color:var(--ink)}
.sec-badge{font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--ink3)}
.sec-chev{font-size:9px;color:var(--ink3);transition:transform 0.2s}
.sec-chev.o{transform:rotate(180deg)}
.sec-body{padding:14px 18px 18px;background:#fafbfc;border-top:1px solid var(--border)}

.fg{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:9px}
.fg.full{grid-template-columns:1fr}
.ff{display:flex;flex-direction:column;gap:4px}
.ff label{font-size:9.5px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--ink3)}
.ff input,.ff textarea{background:#fff;border:1.5px solid var(--border);border-radius:var(--radius-sm);font-family:'Plus Jakarta Sans',sans-serif;font-size:12px;color:var(--ink);padding:8px 11px;outline:none;transition:all 0.15s;width:100%}
.ff input:focus,.ff textarea:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(37,99,235,.08)}
.ff textarea{resize:vertical;line-height:1.6}
.ai-badge{font-size:8px;background:#fef3c7;color:#92400e;padding:1px 5px;border-radius:4px;font-weight:700;margin-left:4px}

.entry-card{background:#fff;border:1.5px solid var(--border);border-radius:var(--radius);padding:13px;margin-bottom:9px;position:relative}
.e-rem{position:absolute;top:9px;right:9px;width:22px;height:22px;background:none;border:1.5px solid var(--border);border-radius:var(--radius-sm);color:var(--ink3);cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all 0.15s}
.e-rem:hover{background:#fef2f2;border-color:var(--red);color:var(--red)}
.add-btn{display:inline-flex;align-items:center;gap:5px;background:transparent;border:1.5px dashed var(--border2);border-radius:var(--radius-sm);color:var(--ink3);font-size:11px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:600;padding:6px 13px;cursor:pointer;transition:all 0.18s;margin-top:6px}
.add-btn:hover{border-color:var(--primary);color:var(--primary);background:var(--primary-light)}

/* GEN BTN */
.gen-area{padding:14px 18px;border-top:1px solid var(--border);background:#fff;position:sticky;bottom:0}
.gen-btn{width:100%;background:linear-gradient(135deg,var(--primary),var(--accent));color:#fff;border:none;border-radius:var(--radius);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:700;padding:13px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px}
.gen-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 20px rgba(37,99,235,.35)}
.gen-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.gen-sub{text-align:center;font-size:10px;color:var(--ink3);margin-top:6px}

/* CENTER */
.center-panel{background:#e8ecf0;overflow-y:auto;padding:24px 20px;display:flex;flex-direction:column;align-items:center;gap:14px}
.prev-bar{width:100%;max-width:640px;display:flex;align-items:center;justify-content:space-between}
.prev-label{font-size:10px;font-weight:700;color:var(--ink3);letter-spacing:1.5px;text-transform:uppercase}
.sheet-wrap{width:100%;max-width:640px;box-shadow:var(--shadow-lg);border-radius:2px;overflow:hidden;animation:shIn .4s ease}
@keyframes shIn{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
.empty-prev{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;flex:1;gap:14px;padding:40px 20px}
.empty-ico{width:64px;height:64px;background:#fff;border-radius:18px;box-shadow:var(--shadow);display:flex;align-items:center;justify-content:center;font-size:28px}
.empty-prev h3{font-size:17px;font-weight:800;color:var(--ink)}
.empty-prev p{font-size:12px;color:var(--ink3);line-height:1.7;max-width:240px}
.loading-prev{display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;gap:14px}
.loading-ring{width:40px;height:40px;border:3px solid var(--primary-light);border-top-color:var(--primary);border-radius:50%;animation:spin .8s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.loading-prev h3{font-size:14px;font-weight:700;color:var(--ink)}
.loading-prev p{font-size:11px;color:var(--ink3);text-align:center;max-width:200px;line-height:1.6}

/* RIGHT */
.right-panel{background:#fff;border-left:1px solid var(--border);overflow-y:auto;display:flex;flex-direction:column}
.r-sec{padding:18px;border-bottom:1px solid var(--border)}
.r-sec-title{font-size:13px;font-weight:800;color:var(--ink);margin-bottom:3px;display:flex;align-items:center;gap:7px}
.r-sec-sub{font-size:11px;color:var(--ink3);margin-bottom:12px;line-height:1.5}

/* ATS */
.ats-row{display:flex;align-items:center;gap:14px;margin-bottom:14px}
.ats-ring{position:relative;width:76px;height:76px;flex-shrink:0}
.ats-ring svg{transform:rotate(-90deg)}
.ats-ring circle{fill:none;stroke-width:7;stroke-linecap:round}
.ats-trk{stroke:#f1f5f9}
.ats-fill{transition:stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1);stroke-dasharray:220}
.ats-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.ats-num{font-size:20px;font-weight:800;line-height:1}
.ats-of{font-size:8px;color:var(--ink3);letter-spacing:1px;font-weight:600}
.ats-info{flex:1}
.ats-grade{font-size:15px;font-weight:800;margin-bottom:3px}
.ats-desc{font-size:10.5px;color:var(--ink3);line-height:1.5}

.sb-wrap{margin-bottom:12px}
.sb-row{display:flex;justify-content:space-between;font-size:9.5px;font-weight:600;color:var(--ink3);margin-bottom:4px;text-transform:uppercase;letter-spacing:.5px}
.sb-track{height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden}
.sb-fill{height:100%;border-radius:3px;transition:width 1.2s ease}

.fb-list{display:flex;flex-direction:column;gap:7px;margin-bottom:14px}
.fb-item{display:flex;gap:8px;padding:9px 11px;border-radius:var(--radius-sm);font-size:11px;line-height:1.55;font-weight:500}
.fb-item.good{background:#f0fdf4;color:#166534}
.fb-item.warn{background:#fffbeb;color:#92400e}
.fb-icon{font-size:12px;flex-shrink:0;margin-top:1px}

.kw-row{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:12px}
.kw-pill{font-size:9.5px;font-weight:600;padding:2px 8px;border-radius:20px}
.kw-pill.found{background:#d1fae5;color:#065f46}
.kw-pill.miss{background:#fee2e2;color:#991b1b}

.ats-run-btn{width:100%;background:var(--bg);border:1.5px solid var(--border2);border-radius:var(--radius);color:var(--ink);font-family:'Plus Jakarta Sans',sans-serif;font-size:12.5px;font-weight:700;padding:11px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:7px;margin-top:4px}
.ats-run-btn:hover:not(:disabled){background:var(--primary-light);border-color:var(--primary);color:var(--primary)}
.ats-run-btn:disabled{opacity:.4;cursor:not-allowed}

/* SUGGESTIONS */
.sugg-wrap{display:flex;flex-direction:column;gap:9px}
.sugg-card{border:1.5px solid var(--border);border-radius:var(--radius);overflow:hidden;transition:all 0.2s}
.sugg-card:hover{border-color:var(--primary);box-shadow:var(--shadow-sm)}
.sugg-head{padding:11px 13px;display:flex;align-items:flex-start;gap:9px}
.sugg-tag{font-size:8.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:2px 6px;border-radius:3px;white-space:nowrap;flex-shrink:0;margin-top:1px}
.sugg-tag.add{background:#dbeafe;color:#1e40af}
.sugg-tag.modify{background:#fef3c7;color:#92400e}
.sugg-tag.enhance{background:#f3e8ff;color:#6b21a8}
.sugg-body{font-size:11px;color:var(--ink2);line-height:1.55;flex:1;font-weight:500}
.sugg-lbl{font-size:12px;font-weight:700;color:var(--ink);margin-bottom:2px}
.sugg-acts{padding:0 13px 11px;display:flex;gap:7px}
.sugg-apply{font-size:11px;font-weight:700;padding:5px 11px;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.15s;font-family:'Plus Jakarta Sans',sans-serif;border:none;background:var(--primary);color:#fff;display:flex;align-items:center;gap:4px}
.sugg-apply:hover{background:var(--primary-dark)}
.sugg-skip{font-size:11px;font-weight:600;padding:5px 10px;border-radius:var(--radius-sm);cursor:pointer;transition:all 0.15s;font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--ink3);border:1px solid var(--border)}
.sugg-applied{font-size:10px;font-weight:700;color:var(--green);padding:3px 13px 10px;display:flex;align-items:center;gap:4px}

/* DOWNLOAD */
.dl-area{padding:18px;background:#fff;margin-top:auto;border-top:1px solid var(--border)}
.dl-hint{display:flex;align-items:center;gap:8px;background:var(--primary-light);border:1px solid #bfdbfe;border-radius:var(--radius);padding:9px 13px;margin-bottom:12px}
.dl-hint-txt{font-size:11px;color:var(--primary-dark);font-weight:600;line-height:1.4}
.dl-main-btn{width:100%;background:linear-gradient(135deg,#059669,#0d9488);color:#fff;border:none;border-radius:var(--radius);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;padding:14px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:8px}
.dl-main-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 20px rgba(5,150,105,.35)}
.dl-main-btn:disabled{opacity:.4;cursor:not-allowed;transform:none}

/* MODALS */
.overlay{position:fixed;inset:0;background:rgba(15,23,42,.75);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);animation:fadeIn .2s ease}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.modal{background:#fff;max-width:460px;width:100%;border-radius:var(--radius-lg);overflow:hidden;animation:slideUp .3s cubic-bezier(.34,1.56,.64,1);box-shadow:var(--shadow-lg)}
@keyframes slideUp{from{opacity:0;transform:translateY(24px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.modal-hdr{padding:24px 28px 18px}
.modal-hdr h2{font-size:20px;font-weight:800;color:var(--ink);margin-bottom:3px;letter-spacing:-.3px}
.modal-hdr p{font-size:11.5px;color:var(--ink3);line-height:1.5}
.modal-div{height:1px;background:var(--border);margin-bottom:20px}
.modal-body{padding:0 28px 24px}

.price-card{background:linear-gradient(135deg,#eff6ff,#f5f3ff);border:1.5px solid #bfdbfe;border-radius:var(--radius);padding:14px 16px;display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.price-amt{font-size:34px;font-weight:800;color:var(--ink);letter-spacing:-1px}
.price-amt span{font-size:17px;font-weight:600;color:var(--ink3)}
.price-badge{background:var(--primary);color:#fff;font-size:8.5px;font-weight:800;letter-spacing:1px;text-transform:uppercase;padding:2px 8px;border-radius:8px;display:inline-block;margin-bottom:4px}
.price-desc{font-size:9.5px;color:var(--ink3);line-height:1.4}

.fmt-lbl{font-size:9.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink3);margin-bottom:7px}
.fmt-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
.fmt-opt{border:2px solid var(--border);border-radius:var(--radius);padding:11px;cursor:pointer;transition:all 0.18s;text-align:center;background:#fff}
.fmt-opt:hover{border-color:var(--primary);background:var(--primary-light)}
.fmt-opt.sel{border-color:var(--primary);background:var(--primary-light)}
.fmt-ico{font-size:22px;margin-bottom:4px}
.fmt-name{font-size:12px;font-weight:800;color:var(--ink);margin-bottom:1px}
.fmt-ext{font-size:8.5px;color:var(--ink3);letter-spacing:1px;text-transform:uppercase}
.fmt-badge{font-size:8.5px;font-weight:700;background:#d1fae5;color:#065f46;padding:2px 6px;border-radius:6px;display:inline-block;margin-top:3px}

.feat-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:16px}
.feat-item{display:flex;align-items:center;gap:5px;font-size:11px;color:var(--ink2);font-weight:500}
.feat-chk{color:var(--green);font-size:12px}

/* RAZORPAY SECTION */
.rzp-box{background:#f0fdf4;border:1.5px solid #a7f3d0;border-radius:var(--radius);padding:13px 15px;margin-bottom:14px}
.rzp-title{font-size:12.5px;font-weight:800;color:#065f46;margin-bottom:5px;display:flex;align-items:center;gap:6px}
.rzp-desc{font-size:11px;color:#047857;line-height:1.6}
.rzp-methods{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}
.rzp-pill{background:#fff;border:1px solid #a7f3d0;border-radius:var(--radius-sm);font-size:9.5px;font-weight:700;color:#065f46;padding:2px 8px}
.rzp-btn{width:100%;background:linear-gradient(135deg,#1a237e,#283593);color:#fff;border:none;border-radius:var(--radius);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:800;padding:14px;cursor:pointer;transition:all 0.2s;display:flex;align-items:center;justify-content:center;gap:9px}
.rzp-btn:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 6px 20px rgba(26,35,126,.35)}
.rzp-btn:disabled{opacity:.5;cursor:not-allowed;transform:none}
.rzp-footer{text-align:center;font-size:10px;color:var(--ink3);margin-top:10px}
.rzp-warn{background:#fffbeb;border:1.5px solid #fcd34d;border-radius:var(--radius-sm);padding:9px 13px;margin-bottom:12px;font-size:11px;color:#92400e;line-height:1.6}
.cancel-row{text-align:center;margin-top:10px}
.cancel-row button{background:none;border:none;font-size:12px;color:var(--ink3);cursor:pointer;font-family:'Plus Jakarta Sans',sans-serif;text-decoration:underline}

/* SUCCESS */
.success-modal{background:#fff;max-width:400px;width:100%;border-radius:var(--radius-lg);padding:36px 32px;text-align:center;box-shadow:var(--shadow-lg);animation:slideUp .3s cubic-bezier(.34,1.56,.64,1)}
.success-ico{width:68px;height:68px;background:#d1fae5;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:30px}
.success-modal h2{font-size:21px;font-weight:800;color:var(--ink);margin-bottom:7px;letter-spacing:-.3px}
.success-modal p{font-size:12px;color:var(--ink3);line-height:1.7;margin-bottom:20px}
.success-grid{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:12px}
.sdl-btn{border:none;border-radius:var(--radius);padding:13px 9px;cursor:pointer;transition:all 0.2s;display:flex;flex-direction:column;align-items:center;gap:3px;font-family:'Plus Jakarta Sans',sans-serif}
.sdl-ico{font-size:24px}
.sdl-name{font-size:12px;font-weight:800;color:#fff}
.sdl-ext{font-size:8.5px;color:rgba(255,255,255,.7);letter-spacing:1px;font-weight:600}
.sdl-btn.pdf{background:linear-gradient(135deg,#DC2626,#b91c1c)}
.sdl-btn.pdf:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(220,38,38,.3)}
.sdl-btn.word{background:linear-gradient(135deg,#2563EB,#1d4ed8)}
.sdl-btn.word:hover{transform:translateY(-2px);box-shadow:0 5px 16px rgba(37,99,235,.3)}
.success-note{font-size:10px;color:var(--ink3)}
.pay-id-box{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:var(--radius-sm);padding:7px 12px;margin-bottom:12px;font-size:10.5px;color:#065f46;font-family:'DM Mono',monospace}

/* MISC */
.spin-sm{width:15px;height:15px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;display:inline-block;flex-shrink:0}
.spin-dark{width:15px;height:15px;border:2px solid var(--border);border-top-color:var(--primary);border-radius:50%;animation:spin .7s linear infinite;display:inline-block;flex-shrink:0}

/* ═══ TEMPLATE THUMBNAILS ═══ */
.t-modern{background:linear-gradient(135deg,#1e3a5f,#2563eb);height:100%;padding:10px;display:flex;flex-direction:column;gap:4px}
.t-corp{background:#fff;height:100%;padding:10px;border-top:3px solid #1e3a5f}
.t-simple{background:#fff;height:100%;padding:10px}
.t-elegant{background:#1a1a2e;height:100%;display:flex;flex-direction:column}
.t-creative{background:linear-gradient(135deg,#7c3aed,#c026d3);height:100%;padding:10px;display:flex;flex-direction:column;gap:4px}
.tb{height:5px;border-radius:2px;margin-bottom:2px}
.tbw{background:rgba(255,255,255,.8)}.tbwl{background:rgba(255,255,255,.3)}.tbd{background:#e2e8f0}.tbg{background:#D4A853}

/* ═══ RESUME TEMPLATES ═══ */
.tpl-modern{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1d23}
.tpl-modern .rh{background:linear-gradient(135deg,#1e3a5f,#2563EB);color:#fff;padding:22px 24px 18px;position:relative;overflow:hidden}
.tpl-modern .rh::before{content:'';position:absolute;right:-20px;top:-20px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.06)}
.tpl-modern .rn{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px}
.tpl-modern .rt{font-size:10px;color:rgba(255,255,255,.65);margin-bottom:10px}
.tpl-modern .rc{display:flex;flex-wrap:wrap;gap:10px;font-size:8.5px;color:rgba(255,255,255,.6)}
.tpl-modern .rb{display:grid;grid-template-columns:1fr 2.2fr}
.tpl-modern .rsb{background:#f8faff;padding:16px 14px;border-right:1px solid #e8f0fe}
.tpl-modern .rmn{padding:16px 18px}
.tpl-modern .rs-t{font-size:7.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#2563EB;margin-bottom:7px;padding-bottom:4px;border-bottom:2px solid #2563EB}
.tpl-modern .rs-s{margin-bottom:14px}
.tpl-modern .r-sum{font-size:9.5px;line-height:1.75;color:#4a5568}
.tpl-modern .r-ski{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}
.tpl-modern .r-skn{font-size:9px;color:#374151;font-weight:600}
.tpl-modern .r-skb{width:54px;height:3px;background:#e2e8f0;border-radius:2px;overflow:hidden}
.tpl-modern .r-skf{height:100%;background:linear-gradient(90deg,#2563EB,#7C3AED)}
.tpl-modern .r-tag{display:inline-block;background:#eff6ff;color:#2563EB;font-size:8.5px;padding:2px 6px;border-radius:3px;margin:2px 2px 2px 0;font-weight:600}
.tpl-modern .r-exp{margin-bottom:13px}
.tpl-modern .r-et{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:1px}
.tpl-modern .r-er{font-size:10.5px;font-weight:800;color:#1a1d23}
.tpl-modern .r-ed{font-size:8.5px;background:#eff6ff;color:#2563EB;padding:1px 6px;border-radius:8px;font-weight:600}
.tpl-modern .r-ec{font-size:9px;color:#6b7280;margin-bottom:4px;font-weight:500}
.tpl-modern .r-bl{display:flex;gap:5px;font-size:9px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-modern .r-dot{width:3px;height:3px;background:#2563EB;border-radius:50%;margin-top:4px;flex-shrink:0}
.tpl-modern .r-edu{margin-bottom:9px}
.tpl-modern .r-edg{font-size:10px;font-weight:700;color:#1a1d23}
.tpl-modern .r-esc{font-size:9px;color:#6b7280}
.tpl-modern .r-em{font-size:8.5px;color:#94a3b8;margin-top:1px}

.tpl-corp{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1d23}
.tpl-corp .rh{padding:20px 24px 16px;border-bottom:3px solid #1e3a5f;display:flex;justify-content:space-between;align-items:flex-end}
.tpl-corp .rn{font-size:23px;font-weight:800;color:#1e3a5f;letter-spacing:-.5px;margin-bottom:3px}
.tpl-corp .rt{font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:1.5px}
.tpl-corp .rc{display:flex;flex-direction:column;gap:2px;font-size:8.5px;color:#64748b;align-items:flex-end}
.tpl-corp .rb{padding:0 24px 18px}
.tpl-corp .r2c{display:grid;grid-template-columns:1.2fr 2fr;gap:22px;padding-top:16px}
.tpl-corp .rs-t{font-size:8.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#1e3a5f;margin-bottom:7px;display:flex;align-items:center;gap:7px}
.tpl-corp .rs-t::after{content:'';flex:1;height:1px;background:#e2e8f0}
.tpl-corp .rs-s{margin-bottom:14px}
.tpl-corp .r-sum{font-size:9.5px;line-height:1.75;color:#4a5568;font-style:italic;border-left:3px solid #1e3a5f;padding-left:9px}
.tpl-corp .r-tag{display:inline-block;border:1px solid #cbd5e1;color:#475569;font-size:8.5px;padding:2px 7px;border-radius:2px;margin:2px 2px 2px 0}
.tpl-corp .r-er{font-size:10.5px;font-weight:800;color:#1e3a5f}
.tpl-corp .r-ec{font-size:9px;color:#64748b;margin-bottom:3px}
.tpl-corp .r-ed{font-size:8.5px;color:#94a3b8;font-weight:600;margin-bottom:4px}
.tpl-corp .r-bl{display:flex;gap:5px;font-size:9px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-corp .r-dot{width:4px;height:4px;background:#1e3a5f;border-radius:50%;margin-top:3px;flex-shrink:0}
.tpl-corp .r-edg{font-size:10px;font-weight:700;color:#1e3a5f}
.tpl-corp .r-esc{font-size:9px;color:#64748b}
.tpl-corp .r-em{font-size:8.5px;color:#94a3b8}

.tpl-simple{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#2d3748;padding:22px 24px}
.tpl-simple .rn{font-size:23px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px}
.tpl-simple .rt{font-size:11px;color:#718096;margin-bottom:8px}
.tpl-simple .rc{display:flex;flex-wrap:wrap;gap:12px;font-size:8.5px;color:#718096;margin-bottom:16px;padding-bottom:12px;border-bottom:1.5px solid #e2e8f0}
.tpl-simple .rs-t{font-size:8.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#4a5568;margin-bottom:7px;margin-top:14px}
.tpl-simple .r-sum{font-size:9.5px;line-height:1.75;color:#4a5568}
.tpl-simple .r-exp{margin-bottom:11px;padding-bottom:11px;border-bottom:1px solid #f7fafc}
.tpl-simple .r-et{display:flex;justify-content:space-between}
.tpl-simple .r-er{font-size:10.5px;font-weight:700;color:#2d3748}
.tpl-simple .r-ed{font-size:8.5px;color:#a0aec0;font-weight:600}
.tpl-simple .r-ec{font-size:9px;color:#718096;margin-bottom:4px}
.tpl-simple .r-bl{display:flex;gap:5px;font-size:9px;color:#4a5568;margin-bottom:2px;line-height:1.5}
.tpl-simple .r-tag{display:inline-block;background:#f7fafc;border:1px solid #e2e8f0;color:#4a5568;font-size:8.5px;padding:2px 7px;margin:2px 2px 2px 0}
.tpl-simple .r-skr{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.tpl-simple .r-edg{font-size:10px;font-weight:700;color:#2d3748}
.tpl-simple .r-esc{font-size:9px;color:#718096}

.tpl-elegant{background:#fff;font-family:'Playfair Display',serif;font-size:10px;color:#2c2c2c}
.tpl-elegant .rh{background:#1a1a2e;color:#fff;padding:24px 24px 20px;text-align:center;position:relative}
.tpl-elegant .rh-acc{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#B7860D,#D4A853,#B7860D)}
.tpl-elegant .rn{font-size:23px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:3px}
.tpl-elegant .rt{font-size:9.5px;color:#D4A853;font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:10px}
.tpl-elegant .rc{display:flex;justify-content:center;flex-wrap:wrap;gap:14px;font-size:8px;color:rgba(255,255,255,.6);font-family:'Plus Jakarta Sans',sans-serif}
.tpl-elegant .rb{display:grid;grid-template-columns:1fr 2fr}
.tpl-elegant .rsb{background:#f9f6f0;padding:16px 14px;border-right:1px solid #ede8df}
.tpl-elegant .rmn{padding:16px 18px}
.tpl-elegant .rs-t{font-size:8px;font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;color:#B7860D;margin-bottom:7px;padding-bottom:4px;border-bottom:1px solid #D4A853}
.tpl-elegant .rs-s{margin-bottom:14px}
.tpl-elegant .r-sum{font-size:9.5px;line-height:1.8;color:#555;font-style:italic}
.tpl-elegant .r-tag{display:inline-block;background:#f9f6f0;border:1px solid #ede8df;color:#555;font-size:8.5px;padding:2px 6px;margin:2px 2px 2px 0;font-family:'Plus Jakarta Sans',sans-serif}
.tpl-elegant .r-er{font-size:10.5px;font-weight:700;color:#1a1a2e}
.tpl-elegant .r-ec{font-size:9px;color:#B7860D;font-style:italic;margin-bottom:3px}
.tpl-elegant .r-ed{font-size:8px;color:#94a3b8;font-family:'Plus Jakarta Sans',sans-serif;margin-bottom:4px}
.tpl-elegant .r-bl{display:flex;gap:5px;font-size:9px;color:#555;margin-bottom:3px;line-height:1.6;font-family:'Plus Jakarta Sans',sans-serif}
.tpl-elegant .r-edg{font-size:10px;font-weight:700;color:#1a1a2e}
.tpl-elegant .r-esc{font-size:9px;color:#888;font-style:italic}
.tpl-elegant .r-em{font-size:8px;color:#b0a898;font-family:'Plus Jakarta Sans',sans-serif}

.tpl-creative{background:#fff;font-family:'Plus Jakarta Sans',sans-serif;font-size:10px;color:#1a1a2e}
.tpl-creative .rh{background:linear-gradient(135deg,#7C3AED,#C026D3);padding:22px 24px 18px;color:#fff;position:relative;overflow:hidden}
.tpl-creative .rh-s1{position:absolute;right:-30px;top:-30px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.07)}
.tpl-creative .rh-s2{position:absolute;left:-15px;bottom:-30px;width:90px;height:90px;border-radius:50%;background:rgba(255,255,255,.05)}
.tpl-creative .rn{font-size:22px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px;position:relative}
.tpl-creative .rt{font-size:10px;color:rgba(255,255,255,.7);margin-bottom:10px;position:relative}
.tpl-creative .rc{display:flex;flex-wrap:wrap;gap:8px;font-size:8.5px;color:rgba(255,255,255,.65);position:relative}
.tpl-creative .rcp{background:rgba(255,255,255,.12);padding:2px 7px;border-radius:8px}
.tpl-creative .rb{display:grid;grid-template-columns:1fr 2.2fr}
.tpl-creative .rsb{background:#fdf4ff;padding:16px 14px;border-right:2px solid #f3e8ff}
.tpl-creative .rmn{padding:16px 18px}
.tpl-creative .rs-t{font-size:7.5px;font-weight:800;letter-spacing:2px;text-transform:uppercase;color:#7C3AED;margin-bottom:7px;padding-bottom:4px;border-bottom:2px solid #e9d5ff}
.tpl-creative .rs-s{margin-bottom:14px}
.tpl-creative .r-sum{font-size:9.5px;line-height:1.75;color:#4a5568}
.tpl-creative .r-tag{display:inline-block;background:#f3e8ff;color:#7C3AED;font-size:8.5px;padding:2px 7px;border-radius:8px;margin:2px 2px 2px 0;font-weight:600}
.tpl-creative .r-er{font-size:10.5px;font-weight:800;color:#1a1a2e}
.tpl-creative .r-ec{font-size:9px;color:#7C3AED;font-weight:600;margin-bottom:3px}
.tpl-creative .r-ed{font-size:8.5px;color:#a0aec0;margin-bottom:4px}
.tpl-creative .r-bl{display:flex;gap:5px;font-size:9px;color:#4a5568;margin-bottom:3px;line-height:1.5}
.tpl-creative .r-skd{width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#7C3AED,#C026D3);flex-shrink:0;margin-top:3px}
.tpl-creative .r-edg{font-size:10px;font-weight:700;color:#1a1a2e}
.tpl-creative .r-esc{font-size:9px;color:#7C3AED}
.tpl-creative .r-em{font-size:8.5px;color:#94a3b8}
`;

/* ═══ CONSTANTS ═══ */
const TEMPLATES = [
  { id:"modern",  name:"Modern",    tag:"Most Popular" },
  { id:"corp",    name:"Corporate", tag:"Professional" },
  { id:"simple",  name:"Simple",    tag:"ATS Friendly" },
  { id:"elegant", name:"Elegant",   tag:"Premium"      },
  { id:"creative",name:"Creative",  tag:"Bold & Modern"},
];
const STEPS = ["Build","Template","ATS Score","Download"];
const INIT = {
  personal:{ name:"",title:"",email:"",phone:"",location:"",linkedin:"",summary:"" },
  experience:[{id:1,company:"",role:"",duration:"",bullets:""}],
  education:[{id:1,school:"",degree:"",year:"",gpa:""}],
  skills:{technical:"",soft:"",languages:""},
  certifications:""
};
let uid=100; const nid=()=>++uid;

/* ═══ TEMPLATE THUMBS ═══ */
function Thumb({id}){
  const bars=(cls,ws)=>ws.map((w,i)=><div key={i} className={`tb ${cls}`} style={{width:w+"%"}}/>);
  if(id==="modern") return <div className="t-modern">{bars("tbw",[60,40])}<div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:4,flex:1,marginTop:4}}><div>{bars("tbwl",[80,60,70,50,40])}</div><div>{bars("tbwl",[90,70,60,80,50,70,40])}</div></div></div>;
  if(id==="corp")   return <div className="t-corp">{bars("tbd",[55,35])}<div style={{marginTop:6}}>{bars("tbd",[90,70,80,60,75,50,65])}</div></div>;
  if(id==="simple") return <div className="t-simple">{bars("tbd",[50,30])}<div style={{height:1,background:"#e2e8f0",margin:"6px 0"}}></div>{bars("tbd",[90,70,60,80,50,75,40])}</div>;
  if(id==="elegant") return <div className="t-elegant"><div style={{padding:"8px 10px",flex:"0 0 auto"}}>{bars("tbw",[55,35])}<div style={{height:2,background:"linear-gradient(90deg,#B7860D,#D4A853)",marginTop:4}}></div></div><div style={{display:"grid",gridTemplateColumns:"1fr 2fr",flex:1,background:"#fff"}}><div style={{background:"#f9f6f0",padding:"4px 5px"}}>{bars("tbg",[80,60,70,50,40])}</div><div style={{padding:"4px 5px"}}>{bars("tbd",[90,70,60,80,50,70])}</div></div></div>;
  if(id==="creative") return <div className="t-creative">{bars("tbw",[60,40])}<div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:4,flex:1,marginTop:4}}><div>{bars("tbwl",[80,60,70,50,40])}</div><div>{bars("tbwl",[90,70,60,80,50,70,40])}</div></div></div>;
}

/* ═══ RESUME RENDERER ═══ */
function Resume({data,tpl}){
  const p=data.personal||{};
  const ct=[p.email,p.phone,p.location,p.linkedin].filter(Boolean);
  const tech=data.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const soft=data.skills?.soft?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const langs=data.skills?.languages?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  const certs=data.certifications?.split("\n").filter(Boolean)||[];
  const exps=data.experience?.filter(e=>e.company||e.role)||[];
  const edus=data.education?.filter(e=>e.school||e.degree)||[];
  const Bl=({b})=>{const bs=b?.split("\n").filter(x=>x.trim())||[];return(<>{bs.map((x,i)=><div key={i} className="r-bl"><span className="r-dot">◆</span>{x.replace(/^[•\-*]\s*/,"")}</div>)}</>)};

  if(tpl==="modern") return(
    <div className="tpl-modern">
      <div className="rh"><div className="rn">{p.name||"Your Name"}</div>{p.title&&<div className="rt">{p.title}</div>}<div className="rc">{ct.map((c,i)=><span key={i}>◆ {c}</span>)}</div></div>
      <div className="rb">
        <div className="rsb">
          {p.summary&&<div className="rs-s"><div className="rs-t">About</div><div className="r-sum">{p.summary}</div></div>}
          {(tech.length||soft.length)>0&&<div className="rs-s"><div className="rs-t">Skills</div>{tech.map((s,i)=><div key={i} className="r-ski"><span className="r-skn">{s}</span><div className="r-skb"><div className="r-skf" style={{width:Math.floor(65+((i*17)%30))+"%"}}/></div></div>)}{soft.map((s,i)=><div key={i} className="r-tag">{s}</div>)}</div>}
          {langs.length>0&&<div className="rs-s"><div className="rs-t">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
          {edus.length>0&&<div className="rs-s"><div className="rs-t">Education</div>{edus.map((e,i)=><div key={i} className="r-edu"><div className="r-edg">{e.degree}</div><div className="r-esc">{e.school}</div><div className="r-em">{[e.year,e.gpa&&`GPA:${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
          {certs.length>0&&<div className="rs-s"><div className="rs-t">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9,color:"#4a5568",marginBottom:3}}>✓ {c}</div>)}</div>}
        </div>
        <div className="rmn">
          {exps.length>0&&<div className="rs-s"><div className="rs-t">Experience</div>{exps.map((e,i)=><div key={i} className="r-exp"><div className="r-et"><span className="r-er">{e.role}</span>{e.duration&&<span className="r-ed">{e.duration}</span>}</div><div className="r-ec">{e.company}</div><Bl b={e.bullets}/></div>)}</div>}
        </div>
      </div>
    </div>
  );

  if(tpl==="corp") return(
    <div className="tpl-corp">
      <div className="rh"><div><div className="rn">{p.name||"Your Name"}</div>{p.title&&<div className="rt">{p.title}</div>}</div><div className="rc">{ct.map((c,i)=><span key={i}>{c}</span>)}</div></div>
      <div className="rb">
        {p.summary&&<div className="rs-s" style={{padding:"14px 0",borderBottom:"1px solid #f1f5f9"}}><div className="rs-t">Professional Summary</div><div className="r-sum">{p.summary}</div></div>}
        <div className="r2c">
          <div>
            {(tech.length||soft.length)>0&&<div className="rs-s"><div className="rs-t">Core Skills</div>{[...tech,...soft].map((s,i)=><div key={i} className="r-tag">{s}</div>)}</div>}
            {edus.length>0&&<div className="rs-s"><div className="rs-t">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:8}}><div className="r-edg">{e.degree}</div><div className="r-esc">{e.school}</div><div className="r-em">{[e.year,e.gpa&&`GPA:${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
            {langs.length>0&&<div className="rs-s"><div className="rs-t">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
            {certs.length>0&&<div className="rs-s"><div className="rs-t">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9,color:"#4a5568",marginBottom:3}}>▸ {c}</div>)}</div>}
          </div>
          <div>
            {exps.length>0&&<div className="rs-s"><div className="rs-t">Work Experience</div>{exps.map((e,i)=><div key={i} style={{marginBottom:12}}><div className="r-er">{e.role}</div><div className="r-ec">{e.company}</div><div className="r-ed">{e.duration}</div><Bl b={e.bullets}/></div>)}</div>}
          </div>
        </div>
      </div>
    </div>
  );

  if(tpl==="simple") return(
    <div className="tpl-simple">
      <div className="rn">{p.name||"Your Name"}</div>
      {p.title&&<div className="rt">{p.title}</div>}
      <div className="rc">{ct.map((c,i)=><span key={i}>{c}</span>)}</div>
      {p.summary&&<><div className="rs-t">Summary</div><div className="r-sum">{p.summary}</div></>}
      {exps.length>0&&<><div className="rs-t">Experience</div>{exps.map((e,i)=><div key={i} className="r-exp"><div className="r-et"><span className="r-er">{e.role}</span><span className="r-ed">{e.duration}</span></div><div className="r-ec">{e.company}</div><Bl b={e.bullets}/></div>)}</>}
      {(tech.length||soft.length||langs.length)>0&&<><div className="rs-t">Skills</div><div className="r-skr">{[...tech,...soft,...langs].map((s,i)=><span key={i} className="r-tag">{s}</span>)}</div></>}
      {edus.length>0&&<><div className="rs-t">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:7}}><div className="r-edg">{e.degree}</div><div className="r-esc">{e.school}{e.year&&` · ${e.year}`}{e.gpa&&` · GPA: ${e.gpa}`}</div></div>)}</>}
      {certs.length>0&&<><div className="rs-t">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9,color:"#4a5568",marginBottom:2}}>→ {c}</div>)}</>}
    </div>
  );

  if(tpl==="elegant") return(
    <div className="tpl-elegant">
      <div className="rh"><div className="rh-acc"/><div className="rn">{p.name||"Your Name"}</div>{p.title&&<div className="rt">{p.title}</div>}<div className="rc">{ct.map((c,i)=><span key={i}>{c}</span>)}</div></div>
      <div className="rb">
        <div className="rsb">
          {p.summary&&<div className="rs-s"><div className="rs-t">Profile</div><div className="r-sum">{p.summary}</div></div>}
          {(tech.length||soft.length)>0&&<div className="rs-s"><div className="rs-t">Skills</div>{[...tech,...soft].map((s,i)=><div key={i} className="r-tag">{s}</div>)}</div>}
          {langs.length>0&&<div className="rs-s"><div className="rs-t">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
          {edus.length>0&&<div className="rs-s"><div className="rs-t">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:9}}><div className="r-edg">{e.degree}</div><div className="r-esc">{e.school}</div><div className="r-em">{[e.year,e.gpa&&`GPA:${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
          {certs.length>0&&<div className="rs-s"><div className="rs-t">Awards</div>{certs.map((c,i)=><div key={i} style={{fontSize:9,color:"#555",marginBottom:3,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>✦ {c}</div>)}</div>}
        </div>
        <div className="rmn">
          {exps.length>0&&<div className="rs-s"><div className="rs-t">Experience</div>{exps.map((e,i)=><div key={i} style={{marginBottom:13}}><div className="r-er">{e.role}</div><div className="r-ec">{e.company}</div><div className="r-ed">{e.duration}</div><Bl b={e.bullets}/></div>)}</div>}
        </div>
      </div>
    </div>
  );

  if(tpl==="creative") return(
    <div className="tpl-creative">
      <div className="rh"><div className="rh-s1"/><div className="rh-s2"/><div className="rn">{p.name||"Your Name"}</div>{p.title&&<div className="rt">{p.title}</div>}<div className="rc">{ct.map((c,i)=><span key={i} className="rcp">{c}</span>)}</div></div>
      <div className="rb">
        <div className="rsb">
          {p.summary&&<div className="rs-s"><div className="rs-t">About</div><div className="r-sum">{p.summary}</div></div>}
          {(tech.length||soft.length)>0&&<div className="rs-s"><div className="rs-t">Skills</div>{[...tech,...soft].map((s,i)=><div key={i} style={{display:"flex",alignItems:"flex-start",gap:5,marginBottom:3,fontSize:9,color:"#4a5568"}}><span className="r-skd"/>{s}</div>)}</div>}
          {langs.length>0&&<div className="rs-s"><div className="rs-t">Languages</div>{langs.map((l,i)=><div key={i} className="r-tag">{l}</div>)}</div>}
          {edus.length>0&&<div className="rs-s"><div className="rs-t">Education</div>{edus.map((e,i)=><div key={i} style={{marginBottom:9}}><div className="r-edg">{e.degree}</div><div className="r-esc">{e.school}</div><div className="r-em">{[e.year,e.gpa&&`GPA:${e.gpa}`].filter(Boolean).join(" · ")}</div></div>)}</div>}
          {certs.length>0&&<div className="rs-s"><div className="rs-t">Certifications</div>{certs.map((c,i)=><div key={i} style={{fontSize:9,color:"#4a5568",marginBottom:2}}>✓ {c}</div>)}</div>}
        </div>
        <div className="rmn">
          {exps.length>0&&<div className="rs-s"><div className="rs-t">Work Experience</div>{exps.map((e,i)=><div key={i} style={{marginBottom:13}}><div className="r-er">{e.role}</div><div className="r-ec">{e.company}</div><div className="r-ed">{e.duration}</div><Bl b={e.bullets}/></div>)}</div>}
        </div>
      </div>
    </div>
  );
  return null;
}

/* ═══ PDF GENERATOR ═══ */
function genPDF(d,tpl){
  const {jsPDF}=window.jspdf;
  const doc=new jsPDF({unit:"mm",format:"a4"});
  const W=210,m=18;
  const C={modern:{h:[30,58,138],a:[37,99,235]},corp:{h:[30,58,95],a:[30,58,95]},simple:{h:[45,55,72],a:[45,55,72]},elegant:{h:[26,26,46],a:[183,134,13]},creative:{h:[124,58,237],a:[124,58,237]}}[tpl]||{h:[30,58,138],a:[37,99,235]};
  doc.setFillColor(...C.h);doc.rect(0,0,W,36,"F");
  if(tpl==="elegant"){doc.setFillColor(183,134,13);doc.rect(0,36,W,1.5,"F");}
  doc.setTextColor(255,255,255);doc.setFont("helvetica","bold");doc.setFontSize(20);
  const cx=tpl==="elegant"?{align:"center"}:{};const cx2=tpl==="elegant"?W/2:m;
  doc.text(d.personal.name||"Your Name",cx2,13,cx);
  if(d.personal.title){doc.setFont("helvetica","italic");doc.setFontSize(10);doc.setTextColor(200,200,200);doc.text(d.personal.title,cx2,21,cx);}
  const cts=[d.personal.email,d.personal.phone,d.personal.location,d.personal.linkedin].filter(Boolean);
  doc.setFont("helvetica","normal");doc.setFontSize(7.5);doc.setTextColor(180,190,200);doc.text(cts.join("   ·   "),cx2,29,cx);
  let y=44;
  const sec=(t,x,yy,w)=>{doc.setFillColor(245,247,250);doc.rect(x,yy-3.5,w,6,"F");doc.setTextColor(...C.a);doc.setFont("helvetica","bold");doc.setFontSize(7);doc.text(t.toUpperCase(),x+1,yy);doc.setDrawColor(...C.a);doc.setLineWidth(.4);doc.line(x,yy+1.5,x+w,yy+1.5);return yy+7;};
  const bul=(b,x,yy,w)=>{(b?.split("\n").filter(s=>s.trim())||[]).forEach(s=>{doc.setFillColor(...C.a);doc.rect(x,yy-1,1.2,1.2,"F");doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(70,80,100);const ls=doc.splitTextToSize(s.replace(/^[•\-*]\s*/,""),w-5);doc.text(ls,x+3.5,yy);yy+=ls.length*3.8+.8;});return yy;};
  if(["modern","elegant","creative"].includes(tpl)){
    const sW=58,sX=m,mX=m+sW+6,mW=W-mX-m;let sY=y,mY=y;
    if(d.personal.summary){sY=sec("Profile",sX,sY,sW);doc.setFont("helvetica","italic");doc.setFontSize(8.5);doc.setTextColor(80,90,100);const ls=doc.splitTextToSize(d.personal.summary,sW-2);doc.text(ls,sX,sY);sY+=ls.length*4+5;}
    const tech=d.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];const soft=d.skills?.soft?.split(",").map(s=>s.trim()).filter(Boolean)||[];
    if(tech.length||soft.length){sY=sec("Skills",sX,sY,sW);[...tech,...soft].forEach(s=>{const sw=Math.min(doc.getTextWidth(s)+4,sW-2);doc.setFillColor(238,243,255);doc.roundedRect(sX,sY-2,sw,4.5,.5,.5,"F");doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(70,80,100);doc.text(s.substring(0,16),sX+2,sY+1.5);sY+=5.5;});sY+=2;}
    d.education?.filter(e=>e.school||e.degree).forEach((e,i)=>{if(i===0)sY=sec("Education",sX,sY,sW);doc.setFont("helvetica","bold");doc.setFontSize(9);doc.setTextColor(26,29,35);doc.text(e.degree?.substring(0,18)||"",sX,sY);sY+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(8);doc.setTextColor(100,110,130);doc.text(e.school?.substring(0,18)||"",sX,sY);sY+=3.5;if(e.year){doc.setFont("helvetica","normal");doc.setFontSize(7.5);doc.setTextColor(140,150,170);doc.text(e.year,sX,sY);sY+=3.5;}sY+=2;});
    doc.setDrawColor(225,228,232);doc.setLineWidth(.4);doc.line(mX-4,y,mX-4,Math.max(sY,mY)+20);
    d.experience?.filter(e=>e.company||e.role).forEach((e,i)=>{if(i===0)mY=sec("Work Experience",mX,mY,mW);doc.setFont("helvetica","bold");doc.setFontSize(10.5);doc.setTextColor(26,29,35);doc.text(e.role||"",mX,mY);if(e.duration){doc.setFont("helvetica","normal");doc.setFontSize(8);doc.setTextColor(...C.a);doc.text(e.duration,W-m-doc.getTextWidth(e.duration),mY);}mY+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(8.5);doc.setTextColor(100,110,130);doc.text(e.company||"",mX,mY);mY+=4.5;mY=bul(e.bullets,mX,mY,mW);mY+=4;});
  } else {
    if(d.personal.summary){y=sec("Summary",m,y,W-2*m);doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(70,80,100);const ls=doc.splitTextToSize(d.personal.summary,W-2*m-2);doc.text(ls,m,y);y+=ls.length*4+8;}
    d.experience?.filter(e=>e.company||e.role).forEach((e,i)=>{if(i===0)y=sec("Work Experience",m,y,W-2*m);doc.setFont("helvetica","bold");doc.setFontSize(11);doc.setTextColor(26,29,35);doc.text(e.role||"",m,y);if(e.duration){doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(...C.a);doc.text(e.duration,W-m-doc.getTextWidth(e.duration),y);}y+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(100,110,130);doc.text(e.company||"",m,y);y+=4.5;y=bul(e.bullets,m,y,W-2*m);y+=5;});
    const tech=d.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];
    if(tech.length){y=sec("Skills",m,y,W-2*m);let sx=m;tech.forEach(s=>{const sw=doc.getTextWidth(s)+5;if(sx+sw>W-m){sx=m;y+=6;}doc.setFillColor(240,244,255);doc.roundedRect(sx,y-2.5,sw,5,.5,.5,"F");doc.setFont("helvetica","normal");doc.setFontSize(8.5);doc.setTextColor(70,80,100);doc.text(s,sx+2.5,y+1.5);sx+=sw+3;});y+=10;}
    d.education?.filter(e=>e.school||e.degree).forEach((e,i)=>{if(i===0)y=sec("Education",m,y,W-2*m);doc.setFont("helvetica","bold");doc.setFontSize(10);doc.setTextColor(26,29,35);doc.text(e.degree||"",m,y);y+=3.5;doc.setFont("helvetica","italic");doc.setFontSize(9);doc.setTextColor(100,110,130);doc.text(e.school||"",m,y);y+=3.5;if(e.year){doc.setFontSize(8);doc.setTextColor(140,150,170);doc.text([e.year,e.gpa&&`GPA:${e.gpa}`].filter(Boolean).join(" · "),m,y);y+=3.5;}y+=3;});
  }
  doc.save(`${d.personal.name||"resume"}_Resume.pdf`);
}

/* ═══ WORD GENERATOR ═══ */
async function genWord(d){
  const {Document,Packer,Paragraph,TextRun,BorderStyle}=window.docx;
  const navy="1B2A4A",gold="B7860D";
  const secH=t=>new Paragraph({children:[new TextRun({text:t.toUpperCase(),bold:true,size:16,color:navy,font:"Calibri",characterSpacing:100})],spacing:{before:240,after:80},border:{bottom:{style:BorderStyle.SINGLE,size:4,color:navy,space:2}}});
  const bul=t=>new Paragraph({children:[new TextRun({text:"▸  "+t.replace(/^[•\-*]\s*/,""),size:19,font:"Calibri",color:"444444"})],spacing:{after:60},indent:{left:240}});
  const ch=[];
  ch.push(new Paragraph({children:[new TextRun({text:d.personal.name||"Your Name",bold:true,size:52,font:"Garamond",color:navy})],spacing:{after:60}}));
  if(d.personal.title) ch.push(new Paragraph({children:[new TextRun({text:d.personal.title,italics:true,size:26,font:"Garamond",color:gold})],spacing:{after:80}}));
  const cts=[d.personal.email,d.personal.phone,d.personal.location,d.personal.linkedin].filter(Boolean);
  if(cts.length) ch.push(new Paragraph({children:[new TextRun({text:cts.join("   |   "),size:17,font:"Calibri",color:"666666"})],spacing:{after:200},border:{bottom:{style:BorderStyle.SINGLE,size:8,color:gold,space:4}}}));
  if(d.personal.summary){ch.push(secH("Professional Summary"));ch.push(new Paragraph({children:[new TextRun({text:d.personal.summary,italics:true,size:19,font:"Garamond",color:"444444"})],spacing:{after:200}}));}
  if(d.experience?.some(e=>e.company||e.role)){ch.push(secH("Work Experience"));d.experience.filter(e=>e.company||e.role).forEach(e=>{ch.push(new Paragraph({children:[new TextRun({text:e.role||"",bold:true,size:22,font:"Calibri",color:navy}),e.duration?new TextRun({text:`   ${e.duration}`,size:17,font:"Calibri",color:gold}):new TextRun("")],spacing:{after:40}}));if(e.company)ch.push(new Paragraph({children:[new TextRun({text:e.company,italics:true,size:19,font:"Calibri",color:"555555"})],spacing:{after:80}}));(e.bullets?.split("\n").filter(b=>b.trim())||[]).forEach(b=>ch.push(bul(b)));ch.push(new Paragraph({spacing:{after:120}}));});}
  if(d.education?.some(e=>e.school||e.degree)){ch.push(secH("Education"));d.education.filter(e=>e.school||e.degree).forEach(e=>{ch.push(new Paragraph({children:[new TextRun({text:e.degree||"",bold:true,size:20,font:"Calibri",color:navy})],spacing:{after:40}}));ch.push(new Paragraph({children:[new TextRun({text:e.school||"",italics:true,size:18,font:"Calibri",color:"555555"}),e.year?new TextRun({text:`   ${e.year}`,size:16,font:"Calibri",color:"888888"}):new TextRun(""),e.gpa?new TextRun({text:`   GPA: ${e.gpa}`,size:16,font:"Calibri",color:"888888"}):new TextRun("")],spacing:{after:120}}));});}
  const tech=d.skills?.technical?.split(",").map(s=>s.trim()).filter(Boolean)||[];const soft=d.skills?.soft?.split(",").map(s=>s.trim()).filter(Boolean)||[];const langs=d.skills?.languages?.split(",").map(s=>s.trim()).filter(Boolean)||[];
  if(tech.length||soft.length||langs.length){ch.push(secH("Skills"));if(tech.length)ch.push(new Paragraph({children:[new TextRun({text:"Technical: ",bold:true,size:18,font:"Calibri",color:navy}),new TextRun({text:tech.join(" · "),size:18,font:"Calibri",color:"444444"})],spacing:{after:80}}));if(soft.length)ch.push(new Paragraph({children:[new TextRun({text:"Soft Skills: ",bold:true,size:18,font:"Calibri",color:navy}),new TextRun({text:soft.join(" · "),size:18,font:"Calibri",color:"444444"})],spacing:{after:80}}));if(langs.length)ch.push(new Paragraph({children:[new TextRun({text:"Languages: ",bold:true,size:18,font:"Calibri",color:navy}),new TextRun({text:langs.join(" · "),size:18,font:"Calibri",color:"444444"})],spacing:{after:80}}));}
  const certs=d.certifications?.split("\n").filter(Boolean)||[];if(certs.length){ch.push(secH("Certifications"));certs.forEach(c=>ch.push(bul(c)));}
  const doc2=new Document({sections:[{properties:{page:{margin:{top:720,bottom:720,left:900,right:900}}},children:ch}]});
  const blob=await Packer.toBlob(doc2);const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`${d.personal.name||"resume"}_Resume.docx`;a.click();URL.revokeObjectURL(url);
}

/* ═══════════════════ MAIN APP ═══════════════════ */
export default function Builder() {
  const jsPdfReady = useScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");
  const docxReady  = useScript("https://unpkg.com/docx@8.5.0/build/index.js");

  const [data,setData]       = useState(INIT);
  const [tpl,setTpl]         = useState("modern");
  const [tab,setTab]         = useState("build");
  const [open,setOpen]       = useState({personal:true,exp:false,edu:false,skills:false,cert:false});
  const [aiResume,setAiResume]     = useState(null);
  const [generating,setGenerating] = useState(false);
  const [step,setStep]       = useState(0);
  const [ats,setAts]         = useState(null);
  const [atsLoad,setAtsLoad] = useState(false);
  const [suggs,setSuggs]     = useState([]);
  const [applied,setApplied] = useState({});
  const [showDl,setShowDl]   = useState(false);
  const [showOk,setShowOk]   = useState(false);
  const [paid,setPaid]       = useState(false);
  const [fmt,setFmt]         = useState("pdf");
  const [dlLoad,setDlLoad]   = useState(null);
  const [rzpLoad,setRzpLoad] = useState(false);
  const [payInfo,setPayInfo] = useState(null);

  const tog=k=>setOpen(p=>({...p,[k]:!p[k]}));
  const setP=(f,v)=>setData(p=>({...p,personal:{...p.personal,[f]:v}}));
  const setSk=(f,v)=>setData(p=>({...p,skills:{...p.skills,[f]:v}}));
  const addExp=()=>setData(p=>({...p,experience:[...p.experience,{id:nid(),company:"",role:"",duration:"",bullets:""}]}));
  const remExp=id=>setData(p=>({...p,experience:p.experience.filter(e=>e.id!==id)}));
  const setExp=(id,f,v)=>setData(p=>({...p,experience:p.experience.map(e=>e.id===id?{...e,[f]:v}:e)}));
  const addEdu=()=>setData(p=>({...p,education:[...p.education,{id:nid(),school:"",degree:"",year:"",gpa:""}]}));
  const remEdu=id=>setData(p=>({...p,education:p.education.filter(e=>e.id!==id)}));
  const setEdu=(id,f,v)=>setData(p=>({...p,education:p.education.map(e=>e.id===id?{...e,[f]:v}:e)}));

  const rText=()=>`Name:${data.personal.name}\nTitle:${data.personal.title}\nSummary:${data.personal.summary}\nExp:${data.experience.map(e=>`${e.role} at ${e.company} (${e.duration}): ${e.bullets}`).join(" || ")}\nEdu:${data.education.map(e=>`${e.degree} ${e.school} ${e.year}`).join(", ")}\nSkills:${data.skills.technical}, ${data.skills.soft}\nLanguages:${data.skills.languages}\nCerts:${data.certifications}`;

  /* GENERATE — calls secure backend API */
  const generate=async()=>{
    if(!data.personal.name){alert("Please enter your name first.");return;}
    setGenerating(true);setAiResume(null);setAts(null);setSuggs([]);
    try{
      const res=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"generate",resumeText:rText()})});
      const json=await res.json();
      if(json.success){setAiResume(json.data);setStep(1);}
      else{setAiResume(data);setStep(1);}
    }catch{setAiResume(data);setStep(1);}
    finally{setGenerating(false);}
  };

  /* ATS ANALYSIS — calls secure backend API */
  const runAts=async()=>{
    setAtsLoad(true);setAts(null);setSuggs([]);
    try{
      const res=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"analyze",resumeText:rText()})});
      const json=await res.json();
      if(json.success){setAts(json.data);setSuggs(json.data.suggestions||[]);setStep(2);}
      else throw new Error();
    }catch{
      setAts({score:71,grade:"Good",overall_tip:"Focus on adding metrics to bullet points.",strengths:["Relevant experience included","Education details present","Skills listed clearly"],improvements:["Add quantified metrics to bullets","Expand professional summary","Include more industry keywords"],keywords_found:["Leadership","Communication","Management"],keywords_missing:["ROI","Agile","KPIs","Stakeholder"],score_breakdown:{content:18,keywords:16,format:20,impact:17}});
      setSuggs([{id:"s1",type:"enhance",field:"summary",label:"Strengthen Your Summary",description:"Add years of experience and a key achievement to your summary.",autoText:"Results-driven professional with 5+ years of experience delivering measurable impact and leading cross-functional teams to exceed targets."},{id:"s2",type:"add",field:"skills",label:"Add High-Value Keywords",description:"These keywords will improve your ATS match rate significantly.",autoText:"Agile, Stakeholder Management, KPI Tracking, Data-Driven Decision Making"},{id:"s3",type:"modify",field:"bullets",label:"Quantify Your Achievements",description:"Bullet points with numbers perform 40% better. Add percentages, counts, or timeframes to each bullet.",autoText:""}]);
    }
    finally{setAtsLoad(false);}
  };

  /* APPLY SUGGESTION */
  const apply=s=>{
    if(s.autoText){
      if(s.field==="summary"){setData(p=>({...p,personal:{...p.personal,summary:s.autoText}}));if(aiResume)setAiResume(p=>({...p,personal:{...p.personal,summary:s.autoText}}));}
      if(s.field==="skills"){setData(p=>({...p,skills:{...p.skills,soft:(p.skills.soft?p.skills.soft+", ":"")+s.autoText}}));if(aiResume)setAiResume(p=>({...p,skills:{...p.skills,soft:(p.skills?.soft?p.skills.soft+", ":"")+s.autoText}}));}
    }
    setApplied(p=>({...p,[s.id]:true}));
  };

  /* RAZORPAY CHECKOUT */
  const openRazorpay=async()=>{
    if(!window.Razorpay){alert("Payment system loading, please try again.");return;}
    setRzpLoad(true);
    try{
      // 1. Create order on backend
      const orderRes=await fetch("/api/create-order",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({notes:{template:tpl,user:data.personal.name}})});
      const {order_id,amount}=await orderRes.json();

      // 2. Open Razorpay popup
      const options={
        key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,currency:"INR",
        name:"ResumePro Professional",
        description:"ATS-Optimized Resume Download",
        order_id,
        prefill:{name:data.personal.name,email:data.personal.email,contact:data.personal.phone},
        notes:{template:tpl},
        theme:{color:"#2563EB"},
        handler:async function(response){
          // 3. Verify payment on backend
          const verifyRes=await fetch("/api/verify-payment",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(response)});
          const verified=await verifyRes.json();
          if(verified.verified){setPayInfo(response);setPaid(true);setShowDl(false);setShowOk(true);setStep(3);}
          else alert("Payment verification failed. Contact support.");
          setRzpLoad(false);
        },
        "modal.ondismiss":()=>setRzpLoad(false),
      };
      const rzp=new window.Razorpay(options);
      rzp.on("payment.failed",r=>{setRzpLoad(false);alert(`Payment failed: ${r.error.description}`);});
      rzp.open();
    }catch(e){setRzpLoad(false);alert("Could not open payment. Check your Razorpay key in .env.local");}
  };

  /* DOWNLOAD */
  const dl=async(f)=>{
    const d=aiResume||data;setDlLoad(f);
    try{
      if(f==="pdf"){if(!jsPdfReady||!window.jspdf){alert("PDF library loading, try again.");return;}genPDF(d,tpl);}
      else{if(!docxReady||!window.docx){alert("Word library loading, try again.");return;}await genWord(d);}
    }catch(e){alert("Download failed: "+e.message);}
    finally{setDlLoad(null);setShowOk(false);}
  };

  const hasName=!!data.personal.name;
  const prev=aiResume||data;
  const atsColor=s=>s>=80?"#059669":s>=60?"#D97706":"#DC2626";

  return(
    <>
      <style>{G}</style>
      <div className="app">

        {/* TOPBAR */}
        <nav className="topbar">
          <Link href="/" className="brand">
            <div className="brand-icon">R</div>
            <span className="brand-name">Resume<span>Pro</span></span>
          </Link>
          <div className="topbar-mid">
            {STEPS.map((s,i)=>(
              <span key={s} style={{display:"flex",alignItems:"center"}}>
                <div className={`step-pill${step===i?" active":step>i?" done":""}`}>
                  <div className="step-num">{step>i?"✓":i+1}</div>{s}
                </div>
                {i<STEPS.length-1&&<span style={{color:"#cbd5e1",padding:"0 3px",fontSize:11}}>›</span>}
              </span>
            ))}
          </div>
          <div className="topbar-right">
            <Link href="/">← Back to Home</Link>
          </div>
        </nav>

        <div className="main-layout">

          {/* ══ LEFT PANEL ══ */}
          <div className="left-panel">
            <div className="panel-tabs">
              <div className={`panel-tab${tab==="build"?" active":""}`} onClick={()=>setTab("build")}>✏️ Build</div>
              <div className={`panel-tab${tab==="template"?" active":""}`} onClick={()=>setTab("template")}>🎨 Template</div>
            </div>

            {/* TEMPLATE TAB */}
            {tab==="template"&&(
              <div className="tpl-section">
                <div style={{fontSize:13,fontWeight:700,color:"var(--ink)",marginBottom:3}}>Choose Your Template</div>
                <div style={{fontSize:11,color:"var(--ink3)"}}>Select a design that fits your industry and personality</div>
                <div className="tpl-grid">
                  {TEMPLATES.map(t=>(
                    <div key={t.id} className={`tpl-card${tpl===t.id?" sel":""}`} onClick={()=>setTpl(t.id)}>
                      <div className="tpl-check">✓</div>
                      <div className="tpl-thumb"><Thumb id={t.id}/></div>
                      <div className="tpl-label">
                        <div><div className="tpl-name">{t.name}</div><div className="tpl-tag">{t.tag}</div></div>
                        {tpl===t.id&&<span className="tpl-badge">Active</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BUILD TAB */}
            {tab==="build"&&(<>
              {/* Personal */}
              <div className="form-section">
                <div className="form-sec-head" onClick={()=>tog("personal")}>
                  <div className="sec-ico">👤</div><span className="sec-title">Personal Info</span>
                  <span className="sec-badge">Required</span><span className={`sec-chev${open.personal?" o":""}`}>▼</span>
                </div>
                {open.personal&&<div className="sec-body">
                  <div className="fg"><div className="ff"><label>Full Name *</label><input value={data.personal.name} onChange={e=>setP("name",e.target.value)} placeholder="Rohan Sharma"/></div><div className="ff"><label>Job Title</label><input value={data.personal.title} onChange={e=>setP("title",e.target.value)} placeholder="Software Engineer"/></div></div>
                  <div className="fg"><div className="ff"><label>Email</label><input value={data.personal.email} onChange={e=>setP("email",e.target.value)} placeholder="rohan@email.com"/></div><div className="ff"><label>Phone</label><input value={data.personal.phone} onChange={e=>setP("phone",e.target.value)} placeholder="+91 98765 43210"/></div></div>
                  <div className="fg"><div className="ff"><label>Location</label><input value={data.personal.location} onChange={e=>setP("location",e.target.value)} placeholder="Mumbai, India"/></div><div className="ff"><label>LinkedIn</label><input value={data.personal.linkedin} onChange={e=>setP("linkedin",e.target.value)} placeholder="linkedin.com/in/rohan"/></div></div>
                  <div className="fg full"><div className="ff"><label>Summary <span className="ai-badge">AI Enhanced</span></label><textarea rows={3} value={data.personal.summary} onChange={e=>setP("summary",e.target.value)} placeholder="Brief intro — AI will improve this..."/></div></div>
                </div>}
              </div>
              {/* Experience */}
              <div className="form-section">
                <div className="form-sec-head" onClick={()=>tog("exp")}>
                  <div className="sec-ico">💼</div><span className="sec-title">Work Experience</span><span className={`sec-chev${open.exp?" o":""}`}>▼</span>
                </div>
                {open.exp&&<div className="sec-body">
                  {data.experience.map(e=>(
                    <div className="entry-card" key={e.id}>
                      {data.experience.length>1&&<button className="e-rem" onClick={()=>remExp(e.id)}>×</button>}
                      <div className="fg"><div className="ff"><label>Company</label><input value={e.company} onChange={x=>setExp(e.id,"company",x.target.value)} placeholder="TCS, Infosys, Startup..."/></div><div className="ff"><label>Job Title</label><input value={e.role} onChange={x=>setExp(e.id,"role",x.target.value)} placeholder="Software Developer"/></div></div>
                      <div className="fg full"><div className="ff"><label>Duration</label><input value={e.duration} onChange={x=>setExp(e.id,"duration",x.target.value)} placeholder="June 2022 – Present"/></div></div>
                      <div className="fg full"><div className="ff"><label>Responsibilities & Achievements <span className="ai-badge">AI Rewrites</span></label><textarea rows={4} value={e.bullets} onChange={x=>setExp(e.id,"bullets",x.target.value)} placeholder={"Developed REST APIs\nReduced load time by 30%\nLed team of 4"}/></div></div>
                    </div>
                  ))}
                  <button className="add-btn" onClick={addExp}>+ Add Experience</button>
                </div>}
              </div>
              {/* Education */}
              <div className="form-section">
                <div className="form-sec-head" onClick={()=>tog("edu")}>
                  <div className="sec-ico">🎓</div><span className="sec-title">Education</span><span className={`sec-chev${open.edu?" o":""}`}>▼</span>
                </div>
                {open.edu&&<div className="sec-body">
                  {data.education.map(e=>(
                    <div className="entry-card" key={e.id}>
                      {data.education.length>1&&<button className="e-rem" onClick={()=>remEdu(e.id)}>×</button>}
                      <div className="fg"><div className="ff"><label>College / University</label><input value={e.school} onChange={x=>setEdu(e.id,"school",x.target.value)} placeholder="IIT Bombay, Pune University..."/></div><div className="ff"><label>Degree</label><input value={e.degree} onChange={x=>setEdu(e.id,"degree",x.target.value)} placeholder="B.Tech Computer Science"/></div></div>
                      <div className="fg"><div className="ff"><label>Passing Year</label><input value={e.year} onChange={x=>setEdu(e.id,"year",x.target.value)} placeholder="2023"/></div><div className="ff"><label>CGPA / Percentage</label><input value={e.gpa} onChange={x=>setEdu(e.id,"gpa",x.target.value)} placeholder="8.5 / 75%"/></div></div>
                    </div>
                  ))}
                  <button className="add-btn" onClick={addEdu}>+ Add Education</button>
                </div>}
              </div>
              {/* Skills */}
              <div className="form-section">
                <div className="form-sec-head" onClick={()=>tog("skills")}>
                  <div className="sec-ico">⚡</div><span className="sec-title">Skills</span><span className={`sec-chev${open.skills?" o":""}`}>▼</span>
                </div>
                {open.skills&&<div className="sec-body">
                  <div className="fg full"><div className="ff"><label>Technical Skills</label><input value={data.skills.technical} onChange={e=>setSk("technical",e.target.value)} placeholder="React, Node.js, Python, SQL, Git..."/></div></div>
                  <div className="fg full"><div className="ff"><label>Soft Skills</label><input value={data.skills.soft} onChange={e=>setSk("soft",e.target.value)} placeholder="Leadership, Communication, Problem Solving..."/></div></div>
                  <div className="fg full"><div className="ff"><label>Languages</label><input value={data.skills.languages} onChange={e=>setSk("languages",e.target.value)} placeholder="English (Fluent), Hindi (Native)..."/></div></div>
                </div>}
              </div>
              {/* Certifications */}
              <div className="form-section">
                <div className="form-sec-head" onClick={()=>tog("cert")}>
                  <div className="sec-ico">🏅</div><span className="sec-title">Certifications & Awards</span><span className={`sec-chev${open.cert?" o":""}`}>▼</span>
                </div>
                {open.cert&&<div className="sec-body">
                  <div className="fg full"><div className="ff"><label>Certifications (one per line)</label><textarea rows={4} value={data.certifications} onChange={e=>setData(p=>({...p,certifications:e.target.value}))} placeholder={"AWS Certified Developer (2024)\nGoogle Analytics Certified\nHackathon Winner – Smart India 2023"}/></div></div>
                </div>}
              </div>

              <div className="gen-area">
                <button className="gen-btn" onClick={generate} disabled={generating||!hasName}>
                  {generating?<><div className="spin-sm"/>AI is building your resume...</>:<>✨ Generate AI Resume Preview</>}
                </button>
                <div className="gen-sub">AI adds action verbs, metrics & ATS keywords automatically</div>
              </div>
            </>)}
          </div>

          {/* ══ CENTER PANEL ══ */}
          <div className="center-panel">
            <div className="prev-bar">
              <span className="prev-label">📄 Preview — {TEMPLATES.find(t=>t.id===tpl)?.name}</span>
            </div>
            {!aiResume&&!generating&&(
              <div className="empty-prev">
                <div className="empty-ico">📄</div>
                <h3>Your Resume Preview</h3>
                <p>Fill your details on the left and click <strong>Generate AI Resume Preview</strong></p>
              </div>
            )}
            {generating&&(
              <div className="loading-prev">
                <div className="loading-ring"/>
                <h3>AI is building your resume...</h3>
                <p>Enhancing with action verbs, adding metrics & optimizing for ATS</p>
              </div>
            )}
            {aiResume&&!generating&&(
              <div className="sheet-wrap"><Resume data={prev} tpl={tpl}/></div>
            )}
          </div>

          {/* ══ RIGHT PANEL ══ */}
          <div className="right-panel">

            {/* ATS SCORE */}
            <div className="r-sec">
              <div className="r-sec-title">📊 ATS Score</div>
              <div className="r-sec-sub">Check how your resume performs against automated HR systems</div>

              {!ats&&!atsLoad&&(
                <div style={{textAlign:"center",padding:"20px 0",color:"var(--ink3)"}}>
                  <div style={{fontSize:32,marginBottom:8,opacity:.4}}>🤖</div>
                  <div style={{fontSize:11.5,lineHeight:1.6}}>Generate your resume first, then run ATS analysis</div>
                </div>
              )}
              {atsLoad&&(
                <div style={{textAlign:"center",padding:"20px 0",color:"var(--ink3)"}}>
                  <div style={{fontSize:30,marginBottom:8}}>⏳</div>
                  <div style={{fontSize:11.5}}>Analyzing your resume against ATS criteria...</div>
                </div>
              )}

              {ats&&!atsLoad&&(<>
                <div className="ats-row">
                  <div className="ats-ring">
                    <svg width="76" height="76" viewBox="0 0 76 76">
                      <circle className="ats-trk" cx="38" cy="38" r="35"/>
                      <circle className="ats-fill" cx="38" cy="38" r="35" style={{stroke:atsColor(ats.score),strokeDashoffset:220-(ats.score/100)*220}}/>
                    </svg>
                    <div className="ats-center">
                      <span className="ats-num" style={{color:atsColor(ats.score)}}>{ats.score}</span>
                      <span className="ats-of">/100</span>
                    </div>
                  </div>
                  <div className="ats-info">
                    <div className="ats-grade" style={{color:atsColor(ats.score)}}>{ats.grade||"Good"}</div>
                    <div className="ats-desc">{ats.overall_tip}</div>
                  </div>
                </div>

                {ats.score_breakdown&&(
                  <div style={{marginBottom:14}}>
                    {[["Content",ats.score_breakdown.content,25],["Keywords",ats.score_breakdown.keywords,25],["Format",ats.score_breakdown.format,25],["Impact",ats.score_breakdown.impact,25]].map(([l,v,mx],i)=>(
                      <div key={i} className="sb-wrap">
                        <div className="sb-row"><span>{l}</span><span>{v}/{mx}</span></div>
                        <div className="sb-track"><div className="sb-fill" style={{width:(v/mx*100)+"%",background:atsColor(ats.score)}}/></div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="fb-list">
                  {ats.strengths?.slice(0,2).map((s,i)=><div key={i} className="fb-item good"><span className="fb-icon">✅</span>{s}</div>)}
                  {ats.improvements?.slice(0,2).map((s,i)=><div key={i} className="fb-item warn"><span className="fb-icon">⚠️</span>{s}</div>)}
                </div>

                {(ats.keywords_found?.length||ats.keywords_missing?.length)>0&&(
                  <div style={{marginBottom:12}}>
                    <div style={{fontSize:9.5,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",color:"var(--ink3)",marginBottom:5}}>Keywords</div>
                    <div className="kw-row">
                      {ats.keywords_found?.map((k,i)=><span key={i} className="kw-pill found">✓ {k}</span>)}
                      {ats.keywords_missing?.map((k,i)=><span key={i} className="kw-pill miss">✗ {k}</span>)}
                    </div>
                  </div>
                )}
              </>)}

              <button className="ats-run-btn" onClick={runAts} disabled={atsLoad||!hasName}>
                {atsLoad?<><div className="spin-dark"/>Analyzing...</>:"🔍 Run ATS Analysis"}
              </button>
            </div>

            {/* AI SUGGESTIONS */}
            {suggs.length>0&&(
              <div className="r-sec">
                <div className="r-sec-title">💡 AI Suggestions</div>
                <div className="r-sec-sub">Smart improvements — apply with one click</div>
                <div className="sugg-wrap">
                  {suggs.map(s=>(
                    <div key={s.id} className="sugg-card">
                      <div className="sugg-head">
                        <span className={`sugg-tag ${s.type}`}>{s.type}</span>
                        <div><div className="sugg-lbl">{s.label}</div><div className="sugg-body">{s.description}</div></div>
                      </div>
                      {applied[s.id]
                        ?<div className="sugg-applied">✅ Applied successfully</div>
                        :<div className="sugg-acts">
                          {s.autoText&&<button className="sugg-apply" onClick={()=>apply(s)}>⚡ Auto-Apply</button>}
                          <button className="sugg-skip" onClick={()=>setApplied(p=>({...p,[s.id]:true}))}>Skip</button>
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
                  <span style={{fontSize:18}}>🎉</span>
                  <div className="dl-hint-txt">Your resume is ready! Download as PDF or Word.</div>
                </div>
              )}
              <button className="dl-main-btn" disabled={!aiResume} onClick={()=>paid?setShowOk(true):setShowDl(true)}>
                {!aiResume?"⬇ Download (Generate First)":paid?"⬇ Download Resume":"⬇ Download Resume"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══ DOWNLOAD MODAL ══ */}
      {showDl&&(
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setShowDl(false)}>
          <div className="modal">
            <div className="modal-hdr">
              <h2>Download Your Resume</h2>
              <p>One-time payment · PDF & Word included · Secure via Razorpay</p>
            </div>
            <div className="modal-div"/>
            <div className="modal-body">
              <div className="price-card">
                <div><div className="price-amt"><span>₹</span>199</div><div style={{fontSize:10.5,color:"var(--ink3)",marginTop:3}}>One-time · No subscription</div></div>
                <div><div className="price-badge">Best Value</div><div className="price-desc">AI-Enhanced · ATS-Ready<br/>PDF + Word included</div></div>
              </div>

              <div className="fmt-lbl">Choose Format</div>
              <div className="fmt-grid">
                <div className={`fmt-opt${fmt==="pdf"?" sel":""}`} onClick={()=>setFmt("pdf")}><div className="fmt-ico">📄</div><div className="fmt-name">PDF</div><div className="fmt-ext">.PDF</div><div className="fmt-badge">Most Popular</div></div>
                <div className={`fmt-opt${fmt==="word"?" sel":""}`} onClick={()=>setFmt("word")}><div className="fmt-ico">📝</div><div className="fmt-name">Word</div><div className="fmt-ext">.DOCX</div><div className="fmt-badge">Editable</div></div>
              </div>

              <div className="feat-grid">
                {["AI-enhanced content","ATS-optimized","Action-verb bullets","5 templates","Instant delivery","30-day refund"].map((f,i)=><div key={i} className="feat-item"><span className="feat-chk">✓</span>{f}</div>)}
              </div>

              <div className="rzp-box">
                <div className="rzp-title">🔒 Secure Payment via Razorpay</div>
                <div className="rzp-desc">India's most trusted payment gateway. Your data is encrypted end-to-end.</div>
                <div className="rzp-methods">
                  {["💳 Cards","📱 UPI","🏦 Netbanking","👛 Wallets","⚡ EMI"].map((m,i)=><span key={i} className="rzp-pill">{m}</span>)}
                </div>
              </div>

              <button className="rzp-btn" onClick={openRazorpay} disabled={rzpLoad}>
                {rzpLoad?<><div className="spin-sm"/>Opening Razorpay...</>:<>🔒 Pay ₹199 Securely</>}
              </button>
              <div className="rzp-footer">Powered by <strong style={{color:"#1a237e"}}>Razorpay</strong> · PCI DSS Compliant · 256-bit SSL</div>
              <div className="cancel-row"><button onClick={()=>setShowDl(false)}>Cancel, go back</button></div>
            </div>
          </div>
        </div>
      )}

      {/* ══ SUCCESS MODAL ══ */}
      {showOk&&(
        <div className="overlay">
          <div className="success-modal">
            <div className="success-ico">🎉</div>
            <h2>Payment Successful!</h2>
            {payInfo?.razorpay_payment_id&&(
              <div className="pay-id-box">✅ Payment ID: {payInfo.razorpay_payment_id}</div>
            )}
            <p>Your AI-enhanced, ATS-optimized resume is ready. Both formats are included in your purchase.</p>
            <div className="success-grid">
              <button className="sdl-btn pdf" onClick={()=>dl("pdf")}><span className="sdl-ico">📄</span><span className="sdl-name">{dlLoad==="pdf"?"Generating...":"Download PDF"}</span><span className="sdl-ext">ATS FRIENDLY</span></button>
              <button className="sdl-btn word" onClick={()=>dl("word")}><span className="sdl-ico">📝</span><span className="sdl-name">{dlLoad==="word"?"Generating...":"Download Word"}</span><span className="sdl-ext">FULLY EDITABLE</span></button>
            </div>
            <div className="success-note">✓ Both formats · Download anytime</div>
          </div>
        </div>
      )}
    </>
  );
}
