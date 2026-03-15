// app/api/analyze/route.js
import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const body = await req.json();
    const { type, resumeText, rawData } = body;

    // ── EXTRACT: Parse uploaded PDF/text resume ────────────
    if (type === "extract") {
      const { fileBase64, mediaType } = rawData || {};

      const extractPrompt = `Extract ALL contact and resume data. Return ONLY valid JSON, no markdown, no explanation.

CRITICAL: You MUST extract every piece of contact information visible — email address, phone number, LinkedIn URL, location/city. Do not skip any field that exists in the document.

Return this EXACT structure:
{
  "personal": {
    "name": "full name exactly as written",
    "title": "job title / current role",
    "email": "email@example.com",
    "phone": "+91 99999 99999 (exactly as written)",
    "location": "City, Country",
    "linkedin": "linkedin.com/in/username or full URL",
    "summary": "professional summary paragraph exactly as written"
  },
  "experience": [
    {
      "id": 1,
      "company": "Company Name",
      "role": "Job Title",
      "duration": "Month Year – Month Year",
      "bullets": "First bullet point\nSecond bullet point\nThird bullet point"
    }
  ],
  "education": [
    {
      "id": 1,
      "school": "University/College Name",
      "degree": "Degree Name",
      "year": "Graduation Year",
      "gpa": "GPA or percentage if present"
    }
  ],
  "skills": {
    "technical": "skill1, skill2, skill3 (comma separated)",
    "soft": "soft skill1, soft skill2 (comma separated)",
    "languages": "language1, language2 (comma separated)"
  },
  "certifications": "Certification 1\nCertification 2"
}

Rules:
- Extract EXACTLY as written — do NOT rewrite or improve
- For bullets: join ALL bullet points for that job with \\n separator
- If a field is not present, use empty string ""
- IDs must be sequential integers starting at 1
- Phone numbers: copy EXACTLY including country code and formatting
- Email: copy EXACTLY as it appears
- LinkedIn: copy the URL or profile path exactly`;

      let messageContent;
      if (mediaType === "application/pdf" && fileBase64) {
        messageContent = [
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileBase64 } },
          { type: "text", text: extractPrompt }
        ];
      } else if (resumeText) {
        messageContent = extractPrompt + "\n\nResume text:\n" + resumeText;
      } else {
        return NextResponse.json({ error: "No file data provided" }, { status: 400 });
      }

      const msg = await client.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 3000,
        messages: [{ role: "user", content: messageContent }]
      });

      const text = msg.content[0].text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      return NextResponse.json({ success: true, data: parsed });
    }

    if (!resumeText) {
      return NextResponse.json({ error: "No resume data provided" }, { status: 400 });
    }

    // ── GENERATE ──────────────────────────────────────────
    if (type === "generate") {
      const msg = await client.messages.create({
        model: "claude-opus-4-5", max_tokens: 2400,
        messages: [{ role: "user", content: `You are an expert resume writer. Polish this resume and return ONLY valid JSON, no markdown.

{
  "personal": { "name":"", "title":"specific strong title", "email":"", "phone":"", "location":"", "linkedin":"", "summary":"3 powerful ATS-rich sentences with keywords, years of experience, measurable outcomes" },
  "experience": [{ "id":1, "company":"", "role":"", "duration":"", "bullets":"Strong action verb + metric\\nAnother achievement\\nThird impact bullet\\nFourth leadership bullet" }],
  "education": [{ "id":1, "school":"", "degree":"", "year":"", "gpa":"" }],
  "skills": { "technical":"comma-separated, add 3-5 relevant missing ones", "soft":"comma-separated", "languages":"comma-separated" },
  "certifications":"one per line"
}

Rules: Strong verbs (Led,Architected,Delivered,Grew,Reduced,Built,Engineered). Realistic metrics. 4-5 bullets per job. Keep email/phone/location/linkedin EXACTLY as given. Do NOT invent companies/schools.

Resume:
${resumeText}` }]
      });
      const parsed = JSON.parse(msg.content[0].text.replace(/```json|```/g, "").trim());
      return NextResponse.json({ success: true, data: parsed });
    }

    // ── ANALYZE ───────────────────────────────────────────
    if (type === "analyze") {
      const msg = await client.messages.create({
        model: "claude-opus-4-5", max_tokens: 2000,
        messages: [{ role: "user", content: `Senior ATS expert. Analyze this resume deeply. Return ONLY valid JSON, no markdown. Reference the candidate's SPECIFIC role/company/tech in every field. autoText must be personalized to their actual background.

{
  "score": <0-100>,
  "grade": "Excellent|Good|Fair|Needs Work",
  "overall_tip": "specific tip mentioning their actual role or tech stack",
  "strengths": ["specific strength from their resume 1","strength 2","strength 3"],
  "improvements": ["specific improvement referencing their content 1","improvement 2","improvement 3"],
  "keywords_found": ["actual keyword from their resume 1","kw2","kw3","kw4","kw5"],
  "keywords_missing": ["relevant missing keyword 1","kw2","kw3","kw4"],
  "suggestions": [
    { "id":"s1", "type":"enhance", "priority":"high", "field":"summary", "label":"Strengthen Your Professional Summary", "description":"specific feedback about their actual current summary", "autoText":"full personalized 3-sentence summary using their actual role/company/tech stack" },
    { "id":"s2", "type":"add", "priority":"high", "field":"skills", "label":"Add Missing High-Demand Keywords", "description":"name the specific missing keywords for their exact tech stack", "autoText":"comma-separated 6-8 specific missing skills for their exact role" },
    { "id":"s3", "type":"modify", "priority":"medium", "field":"bullets", "label":"Quantify Your Best Achievement", "description":"reference a specific weak bullet from their resume", "autoText":"rewritten version of one of their actual bullets with a specific metric added" },
    { "id":"s4", "type":"enhance", "priority":"medium", "field":"certifications", "label":"Add High-Value Certifications", "description":"specific certs relevant to their exact role and tech stack", "autoText":"2-3 relevant certifications as newline-separated list" }
  ]
}

Resume:
${resumeText}` }]
      });
      const parsed = JSON.parse(msg.content[0].text.replace(/```json|```/g, "").trim());
      return NextResponse.json({ success: true, data: parsed });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
