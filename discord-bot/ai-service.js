// AI Service using Google Gemini (FREE)
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

class AIService {
  constructor() {
    if (!config.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set in environment variables');
    }

    this.genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  /**
   * Generate AI response for a given question
   * @param {string} question - The question to ask the AI
   * @returns {Promise<string>} - The AI-generated response
   */
  async generateResponse(question) {
    try {
      console.log(`🤖 Asking AI: "${question}"`);

      const prompt = `You are a knowledgeable AI assistant sharing information on Discord.
Answer this question in a clear, engaging, and informative way.
Keep the response concise (2-4 paragraphs) and easy to understand.
Add a relevant emoji at the beginning if appropriate.

Question: ${question}`;

      const result = await this.model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      console.log(`✅ AI response generated (${text.length} characters)`);
      return text;

    } catch (error) {
      console.error('❌ Error generating AI response:', error.message);

      // Return a fallback response
      return `I apologize, but I encountered an error while generating a response. Please try again later. 🤖

Error details: ${error.message}`;
    }
  }

  /**
   * Get a random topic from the configured topics list
   * @returns {string} - A random topic
   */
  getRandomTopic() {
    const topics = config.BOT_CONFIG.topics;
    return topics[Math.floor(Math.random() * topics.length)];
  }

  /**
   * Generate a response for a random topic
   * @returns {Promise<Object>} - Object containing question and answer
   */
  async generateRandomPost() {
    const question = this.getRandomTopic();
    const answer = await this.generateResponse(question);

    return {
      question,
      answer,
      timestamp: new Date()
    };
  }
}

module.exports = AIService;
