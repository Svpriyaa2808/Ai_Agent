# Standalone AI Agent (100% FREE!)

An autonomous AI agent built with Next.js, TypeScript, and Google's Gemini AI. This agent can autonomously use tools to accomplish tasks, including calculations, web searches, task planning, and more.

**No payment or credit card required!** Uses Google's generous free Gemini API tier.

## Features

- **100% FREE**: Powered by Google Gemini's free tier - no payment or credit card needed!
- **Autonomous Tool Calling**: The agent can independently decide when and which tools to use
- **Interactive Chat Interface**: Clean, modern UI for conversing with the agent
- **Multiple Tools**:
  - Calculator: Perform mathematical calculations
  - Web Search: Search for information (simulated, can be integrated with real APIs)
  - Task Planner: Break down complex goals into actionable steps
  - Current Time: Get current date and time
  - Knowledge Base: Query information on various topics
- **Conversation Memory**: Maintains context throughout the conversation
- **Real-time Responses**: See the agent thinking and responding in real-time

## Architecture

### Components

1. **Frontend** (`src/components/AgentChat.tsx`): React component providing the chat interface
2. **API Routes**:
   - `src/app/api/gemini-agent/route.ts`: FREE Gemini-powered agent (default)
   - `src/app/api/agent/route.ts`: Claude-powered agent (optional, requires payment)
3. **Agent Tools**:
   - `src/lib/gemini-agent-tools.ts`: Tool definitions for Gemini (FREE)
   - `src/lib/agent-tools.ts`: Tool definitions for Claude (optional)

### How It Works

1. User sends a message through the chat interface
2. The message is sent to the `/api/gemini-agent` endpoint
3. The agent (Google Gemini) receives the message and decides if it needs to use any tools
4. If tools are needed, the agent calls them and processes the results
5. The agent formulates a response incorporating tool results
6. The response is sent back to the user

The agent runs in a loop, allowing it to use multiple tools in sequence to accomplish complex tasks.

## Setup (5 Minutes, 100% FREE!)

### Prerequisites

- Node.js 18+ installed
- A FREE Google Gemini API key (no credit card needed!)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Get your FREE Gemini API key:
   - Visit https://makersuite.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your key (no credit card required!)

3. Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

4. Add your FREE Gemini API key to `.env.local`:
   ```
   GEMINI_API_KEY=your_free_gemini_api_key_here
   ```

### Running the Agent

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

3. Start chatting with the agent!

## Example Interactions

Try these prompts to see the agent's FREE capabilities:

- **Math**: "What is 25 multiplied by 48?" or "Calculate sqrt(144)"
- **Search**: "Search for the latest AI developments"
- **Planning**: "Help me plan a project to learn web development"
- **Time**: "What time is it right now?"
- **Knowledge**: "Tell me about machine learning" or "What is blockchain?"
- **Complex**: "I need to calculate 15% tip on $85.50, then plan my day around a 2pm meeting"

All of these work completely FREE with no payment required!

## Extending the Agent

### Adding New Tools

1. Define the tool in `src/lib/agent-tools.ts`:

```typescript
export const myNewTool: Tool = {
  name: "my_tool",
  description: "What this tool does",
  input_schema: {
    type: "object",
    properties: {
      param1: {
        type: "string",
        description: "Parameter description"
      }
    },
    required: ["param1"]
  }
};
```

2. Implement the execution function:

```typescript
export async function executeMyTool(param1: string): Promise<string> {
  // Your tool logic here
  return "Tool result";
}
```

3. Add it to the `executeTool` function and the `allTools` array.

### Integrating Real APIs

The web search tool is currently simulated. To integrate a real search API:

1. Choose a search API (Google Custom Search, Bing Search, Brave Search, etc.)
2. Add the API key to `.env.local`
3. Update `executeWebSearch` in `src/lib/agent-tools.ts` to call the real API

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **AI**: Google Gemini 1.5 Flash (FREE tier!)
- **Language**: TypeScript
- **Runtime**: Node.js

### Why Gemini?

- **100% Free**: Generous free tier with no credit card required
- **Fast**: Gemini 1.5 Flash is optimized for speed
- **Capable**: Full function calling and tool use support
- **Generous Limits**: 15 requests per minute, 1 million tokens per day (free tier)
- **No Payment**: Never asks for payment or credit card info

## Project Structure

```
Ai_Agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── gemini-agent/
│   │   │   │   └── route.ts       # FREE Gemini agent endpoint (default)
│   │   │   └── agent/
│   │   │       └── route.ts       # Claude agent endpoint (optional, paid)
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   └── AgentChat.tsx          # Chat interface component
│   └── lib/
│       ├── gemini-agent-tools.ts  # FREE Gemini tools (default)
│       └── agent-tools.ts         # Claude tools (optional)
├── public/                        # Static assets
├── .env.example                   # Environment variable template
├── package.json                   # Dependencies
└── README.md                      # This file
```

## Security Notes

- Never commit your `.env.local` file with real API keys
- The calculator uses `eval()` for simplicity - for production, use a proper math parser
- Validate and sanitize all user inputs in production
- Implement rate limiting for the API endpoint

## Deployment (Still FREE!)

### Vercel (Recommended - FREE)

1. Push your code to GitHub
2. Import the project in Vercel (FREE tier available)
3. Add your `GEMINI_API_KEY` environment variable in Vercel settings
4. Deploy! (Vercel + Gemini = 100% FREE hosting!)

### Other FREE Platforms

The agent can be deployed to any platform that supports Next.js:
- **Netlify** (FREE tier)
- **Railway** (FREE tier)
- **Render** (FREE tier)
- **AWS Amplify** (FREE tier available)

Make sure to set the `GEMINI_API_KEY` environment variable in your deployment platform.

### Cost Breakdown

- **Hosting**: FREE (Vercel/Netlify free tier)
- **AI API**: FREE (Google Gemini free tier)
- **Total Cost**: $0.00/month 🎉

## License

MIT
