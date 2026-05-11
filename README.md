# 🚀 Interview Quest

A modern, minimal web application that generates thoughtful, role-specific interview questions using AI. Built with Next.js, Tailwind CSS, and the Gemini API.

## ✨ Features

- **AI-Powered Generation**: Uses `gemini-2.5-flash` to create professional questions that assess practical ability and communication skills.
- **Modern Minimal UI**: Dark-themed interface with subtle gradients, soft blur effects, and smooth animations.
- **One-Click Actions**:
  - 📋 **Copy to Clipboard**: Quickly copy generated questions.
  - 🔄 **Regenerate**: Instantly get a new set of questions for the same role.
- **Responsive Design**: Fully optimized for all screen sizes.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/) (`gemini-2.5-flash`)
- **Icons**: [Heroicons](https://heroicons.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Google Gemini API Key (Get one from [Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview-quest-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🏗️ Project Structure

- `src/app/page.tsx` - The main frontend interface and state management.
- `src/app/api/generate/route.ts` - Backend API route that handles communication with Gemini AI.
- `src/app/globals.css` - Global styles and Tailwind configuration for the dark theme.

## 📝 Prompt Logic

The app uses a specialized hiring manager prompt to ensure high-quality output:
*"You are an experienced hiring manager. Generate exactly 3 thoughtful and professional interview questions... assess practical ability, assess communication skills, be concise and realistic."*

---
Built with ❤️ using Next.js and Gemini AI.
