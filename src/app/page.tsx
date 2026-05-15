"use client";

import React, { useState, useEffect } from "react";
import { ClipboardDocumentIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

const LOADING_PHRASES = [
  "Analyzing role requirements...",
  "Sourcing industry-standard questions...",
  "Crafting behavioral prompts...",
  "Optimizing for candidate experience...",
  "Polishing technical assessments...",
  "Gathering expert insights...",
  "Almost there...",
];

/**
 * Home Component
 * Main entry point for the Interview Quest application.
 * Handles state for input, API results, and loading status.
 */
export default function Home() {
  const [jobTitle, setJobTitle] = useState("");
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  /**
   * Effect to cycle through loading phrases while the API is thinking.
   */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setPhraseIndex((prev) => (prev + 1) % LOADING_PHRASES.length);
      }, 3000);
    } else {
      // Use a cleanup or just let it reset on next start to avoid lint error
      // if we really want to reset it, we can use a separate effect or just ignore the lint warning
      // but usually resetting it to 0 is fine if it's not visible.
      // However, to satisfy the lint rule, we can just do it in the cleanup or omit it.
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  /**
   * Triggers the API request to generate interview questions
   * based on the provided job title.
   */
  const generateQuestions = async () => {
    if (!jobTitle) return;
    setLoading(true);
    setPhraseIndex(0);
    setQuestions("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobTitle }),
      });
      const data = await response.json();
      if (data.questions) {
        setQuestions(data.questions);
      } else {
        alert(data.error || "An error occurred");
      }
    } catch {
      alert("An error occurred while generating questions");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Copies the generated questions string to the system clipboard.
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(questions);
      alert("Copied to clipboard!");
    } catch {
      alert("Failed to copy");
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements: Soft blur gradients to create a modern atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      {/* Hero Section: Main title and description */}
      <div className="max-w-2xl w-full text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
          Interview Quest
        </h1>
        <p className="text-gray-400 text-lg">
          Generate thoughtful, role-specific interview questions using AI.
        </p>
      </div>

      {/* Input Card: User interaction area */}
      <div className={`max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl transition-all duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
        <div className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-400 ml-1">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g. Customer Success Manager"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            onKeyDown={(e) => e.key === "Enter" && generateQuestions()}
          />
          <button
            onClick={generateQuestions}
            disabled={loading || !jobTitle}
            className="w-full py-3 px-6 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 disabled:bg-gray-700 disabled:text-gray-400 transition-all active:scale-[0.98]"
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </div>
      </div>

      {/* Loading Overlay: Displayed while the API call is in progress */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            <p key={phraseIndex} className="text-white font-medium animate-fade-in-out">
              {LOADING_PHRASES[phraseIndex]}
            </p>
          </div>
        </div>
      )}

      {/* Results Section: Displays the AI generated questions */}
      {questions && (
        <div className="max-w-2xl w-full mt-12 animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Generated Questions</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all"
                  title="Copy to clipboard"
                >
                  <ClipboardDocumentIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={generateQuestions}
                  className="p-2 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 transition-all"
                  title="Regenerate"
                >
                  <ArrowPathIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-gray-300 leading-relaxed whitespace-pre-wrap font-mono text-sm bg-black/30 p-6 rounded-xl border border-white/5">
              {questions}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
