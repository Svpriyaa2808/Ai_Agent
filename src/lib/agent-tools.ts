// AI Agent Tools - Functions the agent can use autonomously

export interface Tool {
  name: string;
  description: string;
  input_schema: {
    type: "object";
    properties: Record<string, any>;
    required?: string[];
  };
}

// Calculator tool
export const calculatorTool: Tool = {
  name: "calculator",
  description: "Performs mathematical calculations. Supports basic arithmetic, exponents, and common math functions.",
  input_schema: {
    type: "object",
    properties: {
      expression: {
        type: "string",
        description: "The mathematical expression to evaluate (e.g., '2 + 2', '10 * 5', 'sqrt(16)')"
      }
    },
    required: ["expression"]
  }
};

// Web search tool (simulated)
export const webSearchTool: Tool = {
  name: "web_search",
  description: "Searches the web for information. Returns relevant results about the query.",
  input_schema: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "The search query"
      }
    },
    required: ["query"]
  }
};

// Task planner tool
export const taskPlannerTool: Tool = {
  name: "task_planner",
  description: "Creates a structured plan to accomplish a complex goal by breaking it down into steps.",
  input_schema: {
    type: "object",
    properties: {
      goal: {
        type: "string",
        description: "The goal or task to plan for"
      },
      context: {
        type: "string",
        description: "Additional context or constraints"
      }
    },
    required: ["goal"]
  }
};

// Get current time tool
export const getCurrentTimeTool: Tool = {
  name: "get_current_time",
  description: "Gets the current date and time.",
  input_schema: {
    type: "object",
    properties: {}
  }
};

export const allTools: Tool[] = [
  calculatorTool,
  webSearchTool,
  taskPlannerTool,
  getCurrentTimeTool
];

// Tool execution functions
export async function executeCalculator(expression: string): Promise<string> {
  try {
    // Safe mathematical expression evaluation
    const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');

    // Support basic math functions
    let result: number;
    if (expression.includes('sqrt')) {
      const num = parseFloat(expression.match(/\d+/)?.[0] || '0');
      result = Math.sqrt(num);
    } else if (expression.includes('pow')) {
      const nums = expression.match(/\d+/g) || [];
      result = Math.pow(parseFloat(nums[0] || '0'), parseFloat(nums[1] || '0'));
    } else {
      result = eval(sanitized);
    }

    return `The result is: ${result}`;
  } catch (error) {
    return `Error calculating expression: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

export async function executeWebSearch(query: string): Promise<string> {
  // Simulated web search - in production, integrate with real search API
  return `Search results for "${query}":\n\n` +
    `1. This is a simulated search result about ${query}.\n` +
    `2. To enable real web search, integrate with APIs like Google Custom Search, Bing Search, or Brave Search.\n` +
    `3. The agent can autonomously decide when to use this tool based on user queries.\n\n` +
    `Note: This is a demo. Add your preferred search API integration.`;
}

export async function executeTaskPlanner(goal: string, context?: string): Promise<string> {
  const contextStr = context ? `\nContext: ${context}` : '';

  return `Task Plan for: ${goal}${contextStr}\n\n` +
    `Step 1: Analyze the requirements and constraints\n` +
    `Step 2: Break down the goal into manageable sub-tasks\n` +
    `Step 3: Identify necessary resources and dependencies\n` +
    `Step 4: Execute tasks in logical order\n` +
    `Step 5: Review and validate completion\n\n` +
    `This is a basic plan structure. The agent can create more specific plans based on the goal.`;
}

export async function executeGetCurrentTime(): Promise<string> {
  const now = new Date();
  return `Current date and time: ${now.toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long'
  })}`;
}

export async function executeTool(toolName: string, input: any): Promise<string> {
  switch (toolName) {
    case "calculator":
      return executeCalculator(input.expression);
    case "web_search":
      return executeWebSearch(input.query);
    case "task_planner":
      return executeTaskPlanner(input.goal, input.context);
    case "get_current_time":
      return executeGetCurrentTime();
    default:
      return `Unknown tool: ${toolName}`;
  }
}
