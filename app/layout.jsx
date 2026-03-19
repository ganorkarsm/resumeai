import "./globals.css";

export const metadata = {
  title: "ResumePro — Build an ATS-Optimized Resume in 5 Minutes",
  description: "AI-powered resume builder for Indian job seekers. Get ATS score, AI suggestions, 10 professional templates. Download PDF + Word for just ₹99. Powered by Claude AI.",
  keywords: "resume builder india, ATS resume, AI resume, resume for freshers, job resume india, ₹99 resume",
  openGraph: {
    title: "ResumePro — AI Resume Builder for India",
    description: "Build a job-winning resume in 5 minutes. ATS score, 10 templates, PDF + Word. ₹99 one-time.",
    type: "website",
  },
};

// Replace G-D7DKYDK140 below with your actual Google Analytics ID (e.g. G-XXXXXXXXXX)
// Get it free at: https://analytics.google.com → Admin → Create Property
const GA_ID = "G-D7DKYDK140";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Razorpay */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        {/* Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}} />
      </head>
      <body>{children}</body>
    </html>
  );
}
