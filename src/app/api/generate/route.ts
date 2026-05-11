import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

/**
 * POST handler for /api/generate
 * Takes a job title and returns 3 AI-generated interview questions.
 */
export async function POST(req: Request) {
  try {
    // Extract jobTitle from request body
    const { jobTitle } = await req.json();

    if (!jobTitle) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    // Initialize Gemini AI with API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    // Using gemini-2.5-flash as requested for fast, efficient generation
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Structured prompt to ensure consistent, high-quality interview questions
    const prompt = `You are an experienced hiring manager.

Generate exactly 3 thoughtful and professional interview questions for the following job title:

Job Title: ${jobTitle}

The questions should:
- assess practical ability
- assess communication skills
- be concise and realistic

Return the response as a numbered list only.`;

    const result = await model.generateContent(prompt);
    console.log("Gemini API Result:", result);
    const response = result.response;
    const text = response.text();

    return NextResponse.json({ questions: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 });
  }
}
