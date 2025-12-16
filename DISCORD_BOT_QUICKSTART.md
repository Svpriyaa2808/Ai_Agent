# Discord AI Bot - Quick Start Guide (5 Minutes)

Get your Discord bot running in 5 simple steps!

## Step 1: Create Discord Bot (2 minutes)

1. Go to https://discord.com/developers/applications
2. Click "New Application" → Name it "AI Knowledge Bot"
3. Go to "Bot" section → Click "Add Bot"
4. Enable "Message Content Intent"
5. Click "Reset Token" → **COPY THE TOKEN**

## Step 2: Invite Bot to Server (1 minute)

1. Go to "OAuth2" → "URL Generator"
2. Select: `bot`
3. Select permissions:
   - ✅ Read Messages/View Channels
   - ✅ Send Messages
   - ✅ Embed Links
4. Copy URL → Paste in browser → Select server → Authorize

## Step 3: Get Channel ID (30 seconds)

1. In Discord: Settings → Advanced → Enable "Developer Mode"
2. Right-click your channel → "Copy ID"

## Step 4: Get Gemini API Key - FREE! (1 minute)

1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. **COPY THE KEY** (No credit card needed!)

## Step 5: Configure & Run (1 minute)

```bash
# Create environment file
cp .env.example .env

# Edit .env and add your keys:
# DISCORD_TOKEN=your_discord_bot_token
# DISCORD_CHANNEL_ID=your_channel_id
# GEMINI_API_KEY=your_gemini_key
# POST_INTERVAL_MINUTES=5

# Install dependencies
npm install

# Run the bot!
npm run discord-bot
```

## Done! 🎉

Your bot is now:
- ✅ Posting AI-generated content every 5 minutes
- ✅ Responding to mentions
- ✅ Running 24/7 (until you stop it)

## See It in Action

Wait 5 minutes and check your Discord channel. You should see a beautiful AI-generated post!

## Need Help?

See `DISCORD_BOT_DOCUMENTATION.md` for detailed documentation.

---

**Total Time**: 5 minutes
**Total Cost**: $0.00
**Difficulty**: Easy
