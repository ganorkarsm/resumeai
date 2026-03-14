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
      let messageContent;

      if (mediaType === "application/pdf" && fileBase64) {
        messageContent = [
          { type: "document", source: { type: "base64", media_type: "application/pdf", data: fileBase64 } },
          { type: "text", text: `Extract ALL content from this resume and return ONLY valid JSON. Do NOT rewrite — extract exactly as written.\n\n{"personal":{"name":"","title":"","email":"","phone":"","location":"","linkedin":"","summary":""},"experience":[{"id":1,"company":"","role":"","duration":"","bullets":"bullet1\\nbullet2"}],"education":[{"id":1,"school":"","degree":"","year":"","gpa":""}],"skills":{"technical":"comma-separated","soft":"comma-separated","languages":"comma-separated"},"certifications":"one per line"}\n\nRules: Extract EXACTLY as written. bullets = all points joined with \\n. Empty fields = "". IDs = sequential integers from 1.` }
        ];
      } else if (resumeText) {
        messageContent = `Extract resume data from the text below. Return ONLY valid JSON, no markdown.\n\n{"personal":{"name":"","title":"","email":"","phone":"","location":"","linkedin":"","summary":""},"experience":[{"id":1,"company":"","role":"","duration":"","bullets":"bullet1\\nbullet2"}],"education":[{"id":1,"school":"","degree":"","year":"","gpa":""}],"skills":{"technical":"comma-separated","soft":"comma-separated","languages":"comma-separated"},"certifications":"one per line"}\n\nRules: Extract EXACTLY as written. bullets = all points joined with \\n. Empty = "". IDs sequential from 1.\n\nResume text:\n${resumeText}`;
      } else {
        return NextResponse.json({ error: "No file data provided" }, { status: 400 });
      }

      const msg = await client.messages.create({ model: "claude-opus-4-5", max_tokens: 3000, messages: [{ role: "user", content: messageContent }] });
      const parsed = JSON.parse(msg.content[0].text.replace(/```json|```/g, "").trim());
      return NextResponse.json({ success: true, data: parsed });
    }

    if (!resumeText && type !== "extract") {
      return NextResponse.json({ error: "No resume data provided" }, { status: 400 });
    }

    // ── GENERATE ──────────────────────────────────────────
    if (type === "generate") {
      const msg = await client.messages.create({
        model: "claude-opus-4-5", max_tokens: 2400,
        messages: [{ role: "user", content: `You are an expert resume writer. Polish this resume and return ONLY valid JSON, no markdown.\n\nReturn:\n{"personal":{"name":"","title":"specific strong title","email":"","phone":"","location":"","linkedin":"","summary":"3 powerful ATS-rich sentences with keywords, years of experience, measurable outcomes"},"experience":[{"id":1,"company":"","role":"","duration":"","bullets":"Strong action verb + metric\\nAnother achievement\\nThird impact bullet\\nFourth leadership bullet"}],"education":[{"id":1,"school":"","degree":"","year":"","gpa":""}],"skills":{"technical":"comma-separated, add 3-5 relevant missing ones","soft":"comma-separated","languages":"comma-separated"},"certifications":"one per line"}\n\nRules: Strong action verbs (Led,Architected,Delivered,Grew,Reduced,Built,Engineered). Add realistic metrics. 4-5 bullets per experience. Do NOT invent companies/schools.\n\n${resumeText}` }]
      });
      const parsed = JSON.parse(msg.content[0].text.replace(/```json|```/g, "").trim());
      return NextResponse.json({ success: true, data: parsed });
    }

    // ── ANALYZE ───────────────────────────────────────────
    if (type === "analyze") {
      const msg = await client.messages.create({
        model: "claude-opus-4-5", max_tokens: 2000,
        messages: [{ role: "user", content: `Senior ATS expert. Analyze this resume. Return ONLY valid JSON, no markdown. Reference their SPECIFIC role/company/tech in every field. autoText must be personalized, not generic.\n\n{"score":<0-100>,"grade":"Excellent|Good|Fair|Needs Work","overall_tip":"specific tip mentioning their actual role","strengths":["specific strength 1","strength 2","strength 3"],"improvements":["specific improvement 1","improvement 2","improvement 3"],"keywords_found":["actual keyword 1","kw2","kw3","kw4","kw5"],"keywords_missing":["missing kw 1","kw2","kw3","kw4"],"suggestions":[{"id":"s1","type":"enhance","priority":"high","field":"summary","label":"Strengthen Your Professional Summary","description":"specific feedback referencing their actual summary","autoText":"full personalized 3-sentence summary using their actual role/company/tech"},{"id":"s2","type":"add","priority":"high","field":"skills","label":"Add Missing High-Demand Keywords","description":"name the specific missing keywords","autoText":"comma-separated 6-8 specific missing skills for their exact role"},{"id":"s3","type":"modify","priority":"medium","field":"bullets","label":"Quantify Your Best Achievement","description":"reference a specific weak bullet from their resume","autoText":"rewritten version of one of their actual bullets with metric added"},{"id":"s4","type":"enhance","priority":"medium","field":"certifications","label":"Add High-Value Certifications","description":"specific certs for their exact role and stack","autoText":"2-3 relevant certs as newline-separated list"}]}\n\nResume:\n${resumeText}` }]
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
