# Standalone AI Agent

An autonomous AI agent built with Next.js, TypeScript, and Claude AI. This agent can autonomously use tools to accomplish tasks, including calculations, web searches, task planning, and more.

## Features

- **Autonomous Tool Calling**: The agent can independently decide when and which tools to use
- **Interactive Chat Interface**: Clean, modern UI for conversing with the agent
- **Multiple Tools**:
  - Calculator: Perform mathematical calculations
  - Web Search: Search for information (simulated, can be integrated with real APIs)
  - Task Planner: Break down complex goals into actionable steps
  - Current Time: Get current date and time
- **Conversation Memory**: Maintains context throughout the conversation
- **Real-time Streaming**: See the agent thinking and responding in real-time

## Architecture

### Components

1. **Frontend** (`src/components/AgentChat.tsx`): React component providing the chat interface
2. **API Route** (`src/app/api/agent/route.ts`): Backend handler for agent interactions
3. **Agent Tools** (`src/lib/agent-tools.ts`): Tool definitions and execution logic

### How It Works

1. User sends a message through the chat interface
2. The message is sent to the `/api/agent` endpoint
3. The agent (Claude AI) receives the message and decides if it needs to use any tools
4. If tools are needed, the agent calls them and processes the results
5. The agent formulates a response incorporating tool results
6. The response is sent back to the user

The agent runs in a loop, allowing it to use multiple tools in sequence to accomplish complex tasks.

## Setup

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key (get one at https://console.anthropic.com/)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

3. Add your Anthropic API key to `.env.local`:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key_here
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

Try these prompts to see the agent's capabilities:

- **Math**: "What is 25 multiplied by 48?"
- **Search**: "Search for the latest AI developments"
- **Planning**: "Help me plan a project to learn web development"
- **Time**: "What time is it right now?"
- **Complex**: "I need to calculate 15% tip on $85.50, then plan my day around a 2pm meeting"

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
- **AI**: Anthropic Claude 3.5 Sonnet
- **Language**: TypeScript
- **Runtime**: Node.js

## Project Structure

```
Ai_Agent/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── agent/
│   │   │       └── route.ts       # Agent API endpoint
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── globals.css            # Global styles
│   ├── components/
│   │   └── AgentChat.tsx          # Chat interface component
│   └── lib/
│       └── agent-tools.ts         # Tool definitions and execution
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

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add your `ANTHROPIC_API_KEY` environment variable in Vercel settings
4. Deploy!

### Other Platforms

The agent can be deployed to any platform that supports Next.js (Netlify, AWS Amplify, Railway, Render).

Make sure to set the `ANTHROPIC_API_KEY` environment variable in your deployment platform.

## License

MIT
