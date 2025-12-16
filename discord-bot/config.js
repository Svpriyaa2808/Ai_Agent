// Discord Bot Configuration
require('dotenv').config();

module.exports = {
  // Discord Bot Token - Get from https://discord.com/developers/applications
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,

  // Discord Channel ID where the bot will post
  CHANNEL_ID: process.env.DISCORD_CHANNEL_ID,

  // Google Gemini API Key (FREE)
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,

  // Posting interval in minutes (default: 5 minutes)
  POST_INTERVAL_MINUTES: parseInt(process.env.POST_INTERVAL_MINUTES || '5'),

  // Bot configuration
  BOT_CONFIG: {
    // Topics for the bot to discuss
    topics: [
      "What is artificial intelligence?",
      "Explain machine learning in simple terms",
      "What are the benefits of AI?",
      "How does deep learning work?",
      "What is natural language processing?",
      "Explain neural networks",
      "What are AI ethics?",
      "How is AI used in everyday life?",
      "What is the difference between AI and machine learning?",
      "What are the future trends in AI?"
    ],

    // Bot activity status
    status: "🤖 AI Knowledge Sharing",

    // Bot presence type: 'PLAYING', 'WATCHING', 'LISTENING', 'COMPETING'
    activityType: "WATCHING"
  }
};
