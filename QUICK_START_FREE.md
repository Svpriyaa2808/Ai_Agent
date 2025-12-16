# Quick Start - FREE AI Agent

Get your free AI agent running in 5 minutes with ZERO payment required!

## Step 1: Get Your FREE Gemini API Key (2 minutes)

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

**No credit card required!** Gemini's free tier is generous:
- 15 requests per minute
- 1 million tokens per day
- Never expires

## Step 2: Configure Your Agent (1 minute)

1. Create `.env.local` file in the project root:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and add your key:
   ```
   GEMINI_API_KEY=your_key_here
   ```

## Step 3: Run Your Agent (1 minute)

```bash
npm install
npm run dev
```

Open http://localhost:3000 and start chatting!

## What Can It Do?

Your FREE agent can:
- Perform calculations: "What's 25 * 48?"
- Plan tasks: "Help me plan learning Python"
- Search info: "Search for AI news"
- Get time: "What time is it?"
- Answer questions: "Tell me about machine learning"

## Example Conversations

**Math:**
```
You: Calculate 15% tip on $85.50
Agent: [Uses calculator tool] The 15% tip is $12.83
```

**Planning:**
```
You: Help me plan a website project
Agent: [Uses task planner] Here's your structured plan:
1. Design phase...
2. Development phase...
[Full detailed plan]
```

**Complex:**
```
You: Calculate 20% of 500, then plan how to save that amount monthly
Agent: [Uses calculator, then planner]
20% of 500 is $100.
Here's your savings plan:
1. Set up automatic transfers...
[Complete plan]
```

## Deployment (Also FREE!)

Deploy to Vercel for FREE:
```bash
git push
# Then import to Vercel and add GEMINI_API_KEY
```

**Total cost: $0.00/month!**

## Troubleshooting

**"API key not set" error?**
- Make sure `.env.local` exists and has `GEMINI_API_KEY=your_key`
- Restart the dev server after adding the key

**"Quota exceeded" error?**
- You've hit the free tier limit (very generous)
- Wait a bit or upgrade if needed
- Free tier resets daily

**Agent not responding?**
- Check your internet connection
- Verify API key is valid
- Check browser console for errors

## Want More?

The agent is easily extensible:
- Add new tools in `src/lib/gemini-agent-tools.ts`
- Integrate real APIs (many have free tiers!)
- Customize the UI in `src/components/AgentChat.tsx`

Enjoy your FREE autonomous AI agent! 🎉
