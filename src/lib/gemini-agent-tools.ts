// Gemini AI Agent Tools - Free tier compatible
import { FunctionDeclaration, SchemaType } from "@google/generative-ai";

// Calculator tool for Gemini
export const calculatorTool: FunctionDeclaration = {
  name: "calculator",
  description: "Performs mathematical calculations. Supports basic arithmetic, exponents, and common math functions like sqrt and pow.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      expression: {
        type: SchemaType.STRING,
        description: "The mathematical expression to evaluate (e.g., '2 + 2', '10 * 5', 'sqrt(16)', 'pow(2,3)')"
      }
    },
    required: ["expression"]
  }
};

// Web search tool (simulated)
export const webSearchTool: FunctionDeclaration = {
  name: "web_search",
  description: "Searches the web for information. Returns relevant results about the query.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      query: {
        type: SchemaType.STRING,
        description: "The search query"
      }
    },
    required: ["query"]
  }
};

// Task planner tool
export const taskPlannerTool: FunctionDeclaration = {
  name: "task_planner",
  description: "Creates a structured plan to accomplish a complex goal by breaking it down into actionable steps.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      goal: {
        type: SchemaType.STRING,
        description: "The goal or task to plan for"
      },
      context: {
        type: SchemaType.STRING,
        description: "Additional context or constraints (optional)"
      }
    },
    required: ["goal"]
  }
};

// Get current time tool
export const getCurrentTimeTool: FunctionDeclaration = {
  name: "get_current_time",
  description: "Gets the current date and time in a readable format.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {}
  }
};

// Knowledge base tool
export const knowledgeBaseTool: FunctionDeclaration = {
  name: "knowledge_base",
  description: "Retrieves information from a knowledge base on various topics including science, history, technology, and general knowledge.",
  parameters: {
    type: SchemaType.OBJECT,
    properties: {
      topic: {
        type: SchemaType.STRING,
        description: "The topic to retrieve information about"
      }
    },
    required: ["topic"]
  }
};

export const allTools: FunctionDeclaration[] = [
  calculatorTool,
  webSearchTool,
  taskPlannerTool,
  getCurrentTimeTool,
  knowledgeBaseTool
];

// Tool execution functions
export async function executeCalculator(expression: string): Promise<string> {
  try {
    // Safe mathematical expression evaluation
    let result: number;

    if (expression.includes('sqrt')) {
      const num = parseFloat(expression.match(/\d+\.?\d*/)?.[0] || '0');
      result = Math.sqrt(num);
    } else if (expression.includes('pow')) {
      const nums = expression.match(/\d+\.?\d*/g) || [];
      result = Math.pow(parseFloat(nums[0] || '0'), parseFloat(nums[1] || '0'));
    } else {
      // Remove any characters that aren't numbers or basic operators
      const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
      result = eval(sanitized);
    }

    return `Calculation result: ${expression} = ${result}`;
  } catch (error) {
    return `Error calculating expression: ${error instanceof Error ? error.message : 'Invalid expression'}`;
  }
}

export async function executeWebSearch(query: string): Promise<string> {
  // Simulated web search - replace with real API in production
  const timestamp = new Date().toLocaleDateString();

  return `Search results for "${query}" (${timestamp}):\n\n` +
    `📰 Recent developments in ${query}:\n` +
    `- This is a simulated search result providing information about ${query}\n` +
    `- To enable real web search, integrate with free APIs like:\n` +
    `  • SerpAPI (free tier available)\n` +
    `  • Brave Search API (free tier)\n` +
    `  • DuckDuckGo Instant Answer API (free)\n\n` +
    `💡 Note: This agent uses Google's Gemini with a FREE API tier - no payment required!\n` +
    `You can extend it with real search APIs to get actual web results.`;
}

export async function executeTaskPlanner(goal: string, context?: string): Promise<string> {
  const contextStr = context ? `\n📋 Context: ${context}\n` : '';

  return `🎯 Task Plan: ${goal}${contextStr}\n\n` +
    `Step 1: 📊 Analyze Requirements\n` +
    `   - Define clear objectives\n` +
    `   - Identify constraints and resources\n` +
    `   - Set success criteria\n\n` +
    `Step 2: 🗂️ Break Down the Goal\n` +
    `   - Divide into manageable sub-tasks\n` +
    `   - Establish task dependencies\n` +
    `   - Prioritize based on importance\n\n` +
    `Step 3: 📅 Create Timeline\n` +
    `   - Estimate time for each task\n` +
    `   - Set milestones and deadlines\n` +
    `   - Build in buffer time\n\n` +
    `Step 4: ⚡ Execute and Monitor\n` +
    `   - Start with highest priority tasks\n` +
    `   - Track progress regularly\n` +
    `   - Adjust plan as needed\n\n` +
    `Step 5: ✅ Review and Validate\n` +
    `   - Check completion against criteria\n` +
    `   - Document lessons learned\n` +
    `   - Celebrate achievements\n\n` +
    `💡 This plan can be customized based on your specific needs!`;
}

export async function executeGetCurrentTime(): Promise<string> {
  const now = new Date();
  return `🕐 Current date and time:\n\n` +
    `📅 Date: ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n` +
    `⏰ Time: ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' })}\n` +
    `🌍 Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
}

export async function executeKnowledgeBase(topic: string): Promise<string> {
  // Simulated knowledge base - can be replaced with vector DB or real knowledge base
  const knowledgeMap: Record<string, string> = {
    "ai": "Artificial Intelligence (AI) is the simulation of human intelligence by machines. It includes machine learning, deep learning, natural language processing, and computer vision.",
    "machine learning": "Machine Learning is a subset of AI that enables systems to learn and improve from experience without explicit programming. Common types include supervised, unsupervised, and reinforcement learning.",
    "javascript": "JavaScript is a high-level, interpreted programming language used primarily for web development. It runs in browsers and on servers (Node.js).",
    "python": "Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in data science, AI, web development, and automation.",
    "blockchain": "Blockchain is a distributed ledger technology that records transactions across multiple computers securely and transparently. It's the foundation of cryptocurrencies.",
  };

  const lowerTopic = topic.toLowerCase();

  for (const [key, value] of Object.entries(knowledgeMap)) {
    if (lowerTopic.includes(key)) {
      return `📚 Knowledge Base - ${topic}:\n\n${value}\n\n💡 This is from a simulated knowledge base. In production, integrate with:\n- Vector databases (Pinecone, Weaviate)\n- Document stores (Elasticsearch)\n- Or your own custom knowledge base`;
    }
  }

  return `📚 Knowledge Base Query: "${topic}"\n\n` +
    `No specific information found in the current knowledge base.\n\n` +
    `💡 Tip: This agent can be extended with a real knowledge base containing your organization's data, documentation, or any custom information you need!`;
}

export async function executeTool(toolName: string, args: any): Promise<string> {
  try {
    switch (toolName) {
      case "calculator":
        return await executeCalculator(args.expression);
      case "web_search":
        return await executeWebSearch(args.query);
      case "task_planner":
        return await executeTaskPlanner(args.goal, args.context);
      case "get_current_time":
        return await executeGetCurrentTime();
      case "knowledge_base":
        return await executeKnowledgeBase(args.topic);
      default:
        return `Unknown tool: ${toolName}`;
    }
  } catch (error) {
    return `Error executing ${toolName}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}
