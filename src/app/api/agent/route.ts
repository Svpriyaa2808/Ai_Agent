import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { allTools, executeTool } from "@/lib/agent-tools";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY is not set. Please add it to your .env.local file." },
        { status: 500 }
      );
    }

    // Initialize conversation with system prompt
    const systemPrompt = `You are an autonomous AI agent with access to various tools. You can:
- Perform calculations
- Search for information (simulated)
- Create task plans
- Get current time

You should proactively use these tools when they would help answer the user's question or accomplish their goal. Always think step-by-step and explain your reasoning.

When you use a tool, the result will be provided back to you, and you should incorporate it into your response to the user.`;

    let conversationMessages = messages;
    let response;
    let toolUseIterations = 0;
    const maxIterations = 5; // Prevent infinite loops

    // Agent loop: continues until no more tool calls are needed
    while (toolUseIterations < maxIterations) {
      response = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 4096,
        system: systemPrompt,
        messages: conversationMessages,
        tools: allTools,
      });

      // Check if the agent wants to use any tools
      const toolUseBlock = response.content.find(
        (block): block is Anthropic.Messages.ToolUseBlock => block.type === "tool_use"
      );

      if (!toolUseBlock) {
        // No tool use, agent has final response
        break;
      }

      // Execute the tool
      const toolResult = await executeTool(toolUseBlock.name, toolUseBlock.input);

      // Add assistant's response and tool result to conversation
      conversationMessages = [
        ...conversationMessages,
        {
          role: "assistant" as const,
          content: response.content,
        },
        {
          role: "user" as const,
          content: [
            {
              type: "tool_result" as const,
              tool_use_id: toolUseBlock.id,
              content: toolResult,
            },
          ],
        },
      ];

      toolUseIterations++;
    }

    // Extract the final text response
    const textBlock = response?.content.find(
      (block): block is Anthropic.Messages.TextBlock => block.type === "text"
    );

    return NextResponse.json({
      response: textBlock?.text || "I apologize, but I couldn't generate a response.",
      fullResponse: response,
    });
  } catch (error) {
    console.error("Agent error:", error);
    return NextResponse.json(
      {
        error: "Failed to process request",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
