#!/usr/bin/env node

// Discord AI Assistant Bot
// A bot that automatically posts AI-generated content to Discord channels

const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const AIService = require('./ai-service');
const config = require('./config');

// Initialize Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

// Initialize AI service
let aiService;

// Bot statistics
const stats = {
  startTime: new Date(),
  postsGenerated: 0,
  errors: 0,
  lastPostTime: null
};

/**
 * Post AI-generated content to Discord channel
 */
async function postAIContent() {
  try {
    // Get the configured channel
    const channel = await client.channels.fetch(config.CHANNEL_ID);

    if (!channel) {
      console.error('❌ Could not find channel with ID:', config.CHANNEL_ID);
      stats.errors++;
      return;
    }

    if (!channel.isTextBased()) {
      console.error('❌ Channel is not a text channel');
      stats.errors++;
      return;
    }

    // Generate AI content
    console.log('\n📝 Generating new AI post...');
    const { question, answer } = await aiService.generateRandomPost();

    // Format the message
    const message = `## 🤖 AI Knowledge Share\n\n**Question:** ${question}\n\n**Answer:**\n${answer}\n\n---\n*Powered by AI • Posted automatically*`;

    // Send to Discord
    await channel.send(message);

    // Update statistics
    stats.postsGenerated++;
    stats.lastPostTime = new Date();

    console.log('✅ Successfully posted to Discord!');
    console.log(`📊 Total posts: ${stats.postsGenerated} | Errors: ${stats.errors}`);

  } catch (error) {
    console.error('❌ Error posting to Discord:', error.message);
    stats.errors++;
  }
}

/**
 * Start the automated posting scheduler
 */
function startScheduler() {
  const intervalMs = config.POST_INTERVAL_MINUTES * 60 * 1000;

  console.log(`\n⏰ Scheduler started!`);
  console.log(`📅 Posting every ${config.POST_INTERVAL_MINUTES} minutes`);
  console.log(`⏱️  Next post in ${config.POST_INTERVAL_MINUTES} minutes\n`);

  // Post immediately on start (optional - comment out if you don't want this)
  setTimeout(postAIContent, 5000); // Wait 5 seconds after bot connects

  // Then post at regular intervals
  setInterval(postAIContent, intervalMs);
}

/**
 * Display bot statistics
 */
function displayStats() {
  const uptime = Math.floor((new Date() - stats.startTime) / 1000 / 60); // minutes

  console.log('\n📊 === Bot Statistics ===');
  console.log(`⏱️  Uptime: ${uptime} minutes`);
  console.log(`📝 Posts generated: ${stats.postsGenerated}`);
  console.log(`❌ Errors: ${stats.errors}`);
  console.log(`🕐 Last post: ${stats.lastPostTime ? stats.lastPostTime.toLocaleString() : 'Never'}`);
  console.log('========================\n');
}

// Bot ready event
client.once('ready', () => {
  console.log('\n🚀 ================================');
  console.log('🤖 Discord AI Assistant Bot Started!');
  console.log('🚀 ================================\n');
  console.log(`✅ Logged in as: ${client.user.tag}`);
  console.log(`🆔 Bot ID: ${client.user.id}`);
  console.log(`📺 Channel ID: ${config.CHANNEL_ID}`);
  console.log(`⏱️  Post interval: ${config.POST_INTERVAL_MINUTES} minutes`);
  console.log(`🤖 AI Model: Google Gemini 1.5 Flash (FREE)\n`);

  // Set bot status
  client.user.setActivity(config.BOT_CONFIG.status, {
    type: ActivityType[config.BOT_CONFIG.activityType]
  });

  // Initialize AI service
  try {
    aiService = new AIService();
    console.log('✅ AI Service initialized\n');

    // Start the scheduler
    startScheduler();

    // Display stats every 30 minutes
    setInterval(displayStats, 30 * 60 * 1000);

  } catch (error) {
    console.error('❌ Failed to initialize AI Service:', error.message);
    console.error('❌ Bot will shut down.');
    process.exit(1);
  }
});

// Handle bot mentions or direct messages
client.on('messageCreate', async (message) => {
  // Ignore messages from bots (including itself)
  if (message.author.bot) return;

  // Only respond if bot is mentioned
  if (message.mentions.has(client.user)) {
    try {
      // Extract the question (remove the bot mention)
      const question = message.content.replace(`<@${client.user.id}>`, '').trim();

      if (!question) {
        await message.reply('Hi! Ask me any question about AI, technology, or general knowledge! 🤖');
        return;
      }

      // Show typing indicator
      await message.channel.sendTyping();

      // Generate AI response
      const answer = await aiService.generateResponse(question);

      // Send response
      await message.reply(answer);

      console.log(`💬 Responded to user question: "${question}"`);

    } catch (error) {
      console.error('❌ Error responding to user:', error.message);
      await message.reply('Sorry, I encountered an error processing your question. Please try again! 😕');
    }
  }
});

// Error handling
client.on('error', (error) => {
  console.error('❌ Discord client error:', error.message);
  stats.errors++;
});

process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error.message);
  stats.errors++;
});

process.on('SIGINT', () => {
  console.log('\n\n👋 Bot shutting down...');
  displayStats();
  client.destroy();
  process.exit(0);
});

// Validate configuration
if (!config.DISCORD_TOKEN) {
  console.error('❌ DISCORD_TOKEN is not set in environment variables');
  console.error('❌ Please set DISCORD_TOKEN in your .env file');
  process.exit(1);
}

if (!config.CHANNEL_ID) {
  console.error('❌ DISCORD_CHANNEL_ID is not set in environment variables');
  console.error('❌ Please set DISCORD_CHANNEL_ID in your .env file');
  process.exit(1);
}

if (!config.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY is not set in environment variables');
  console.error('❌ Please set GEMINI_API_KEY in your .env file');
  process.exit(1);
}

// Login to Discord
console.log('🔐 Logging in to Discord...\n');
client.login(config.DISCORD_TOKEN);
