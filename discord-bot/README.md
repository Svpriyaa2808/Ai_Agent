# Discord AI Assistant Bot

A fully autonomous Discord bot that posts AI-generated content automatically.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add:
- `DISCORD_TOKEN` - Your Discord bot token
- `DISCORD_CHANNEL_ID` - Channel ID where bot will post
- `GEMINI_API_KEY` - Your free Google Gemini API key
- `POST_INTERVAL_MINUTES` - How often to post (default: 5)

### 3. Run the Bot

```bash
npm run discord-bot
```

## Features

- ✅ **100% FREE** - Uses Google Gemini free tier
- ✅ **Automated Posting** - Posts every N minutes
- ✅ **AI-Powered** - Intelligent responses using Gemini AI
- ✅ **Interactive** - Responds to user mentions
- ✅ **Statistics** - Tracks posts, errors, uptime
- ✅ **Customizable** - Easy to configure topics and behavior

## How It Works

1. Timer triggers every 5 minutes
2. Bot selects random topic
3. Sends to Google Gemini AI
4. AI generates response
5. Bot posts to Discord channel
6. Repeats automatically

## Documentation

See [DISCORD_BOT_DOCUMENTATION.md](../DISCORD_BOT_DOCUMENTATION.md) for complete documentation including:
- Detailed installation guide
- Configuration options
- Troubleshooting
- Customization guide
- API references

## Requirements

- Node.js 18+
- Discord bot token
- Discord channel ID
- Google Gemini API key (FREE)

## Cost

**$0.00/month** - Completely free!

## Support

For detailed instructions and troubleshooting, see the complete documentation.
