import "./globals.css";

export const metadata = {
  title: "ResuméAI — Build an ATS-Optimized Resume in 5 Minutes",
  description: "AI-powered resume builder for Indian job seekers. Get ATS score, AI suggestions, 5 professional templates. Download PDF + Word for just ₹199. Powered by Claude AI.",
  keywords: "resume builder india, ATS resume, AI resume, resume for freshers, job resume india, ₹199 resume",
  openGraph: {
    title: "ResuméAI — AI Resume Builder for India",
    description: "Build a job-winning resume in 5 minutes. ATS score, 5 templates, PDF + Word. ₹199 one-time.",
    type: "website",
  },
};

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
        {/* Razorpay Checkout — loaded globally so it's ready instantly */}
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body>{children}</body>
    </html>
  );
}
