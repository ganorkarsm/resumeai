// app/api/analyze/route.js
// ─────────────────────────────────────────────────────────
// Secure backend for Claude AI calls.
// The ANTHROPIC_API_KEY never leaves the server.
// ─────────────────────────────────────────────────────────

import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req) {
  try {
    const { type, resumeText, rawData } = await req.json();

    if (!resumeText && !rawData) {
      return NextResponse.json({ error: "No resume data provided" }, { status: 400 });
    }

    // ── GENERATE: AI-enhanced resume ──────────────────────
    if (type === "generate") {
      const message = await client.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 1800,
        messages: [{
          role: "user",
          content: `You are an expert resume writer. Polish this resume and return ONLY valid JSON, no markdown.

Return this exact structure:
{
  "personal": {
    "name": "string",
    "title": "string — improve if vague, make it specific and strong",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "summary": "2-3 powerful sentences packed with ATS keywords, quantified impact, and strong verbs"
  },
  "experience": [
    {
      "id": 1,
      "company": "string",
      "role": "string",
      "duration": "string",
      "bullets": "Strong action verb bullet with metric\nAnother impactful achievement\nThird quantified result"
    }
  ],
  "education": [{"id": 1, "school": "string", "degree": "string", "year": "string", "gpa": "string"}],
  "skills": {
    "technical": "comma-separated optimized technical skills",
    "soft": "comma-separated soft skills",
    "languages": "comma-separated languages"
  },
  "certifications": "one per line"
}

Rules:
- Start every bullet with a strong action verb: Led, Achieved, Delivered, Grew, Reduced, Built, Launched, Increased, Managed, Designed, Optimized
- Add realistic metrics where possible (%, numbers, timeframes, team sizes, revenue)
- Make summary keyword-rich and ATS-optimized
- If a field is empty in input, keep it as empty string
- Do NOT invent companies, schools, or degrees

Resume input:
${resumeText}`
        }]
      });

      const text = message.content[0].text;
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      return NextResponse.json({ success: true, data: parsed });
    }

    // ── ANALYZE: ATS score + suggestions ──────────────────
    if (type === "analyze") {
      const message = await client.messages.create({
        model: "claude-opus-4-5",
        max_tokens: 1400,
        messages: [{
          role: "user",
          content: `You are an expert ATS (Applicant Tracking System) analyzer. Analyze this resume deeply. Return ONLY valid JSON, no markdown.

{
  "score": <number 0-100>,
  "grade": "<Excellent|Good|Fair|Needs Work>",
  "overall_tip": "One specific, actionable insight for this candidate",
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["specific improvement1", "specific improvement2", "specific improvement3"],
  "keywords_found": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "keywords_missing": ["missing1", "missing2", "missing3", "missing4"],
  "score_breakdown": {
    "content": <0-25>,
    "keywords": <0-25>,
    "format": <0-25>,
    "impact": <0-25>
  },
  "suggestions": [
    {
      "id": "s1",
      "type": "enhance",
      "priority": "high",
      "field": "summary",
      "label": "Strengthen Your Summary",
      "description": "Specific description of what to improve and why it matters for ATS",
      "autoText": "Ready-to-use replacement text if applicable, else empty string"
    },
    {
      "id": "s2",
      "type": "add",
      "priority": "high",
      "field": "skills",
      "label": "Add High-Demand Keywords",
      "description": "Specific keywords missing from your resume that ATS systems look for",
      "autoText": "Keyword1, Keyword2, Keyword3"
    },
    {
      "id": "s3",
      "type": "modify",
      "priority": "medium",
      "field": "bullets",
      "label": "Quantify Your Achievements",
      "description": "Specific advice on which bullet points need metrics and how to add them",
      "autoText": ""
    },
    {
      "id": "s4",
      "type": "enhance",
      "priority": "medium",
      "field": "certifications",
      "label": "Boost With Certifications",
      "description": "Specific certifications relevant to their field that would boost ATS score",
      "autoText": ""
    }
  ]
}

Resume to analyze:
${resumeText}`
        }]
      });

      const text = message.content[0].text;
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      return NextResponse.json({ success: true, data: parsed });
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });

  } catch (error) {
    console.error("Analyze API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
