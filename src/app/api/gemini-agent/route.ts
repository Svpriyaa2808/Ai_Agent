import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import { allTools, executeTool } from "@/lib/gemini-agent-tools";

// Initialize Gemini AI with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "GEMINI_API_KEY is not set",
          details: "Please add your free Gemini API key to .env.local. Get one at https://makersuite.google.com/app/apikey"
        },
        { status: 500 }
      );
    }

    // Get the Gemini Pro model with function calling
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      tools: [{ functionDeclarations: allTools }],
    });

    // Build conversation history for Gemini
    const history = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    // Start chat session
    const chat = model.startChat({
      history,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    });

    // Get the latest user message
    const userMessage = messages[messages.length - 1].content;

    // Send message and handle function calling loop
    let result = await chat.sendMessage(userMessage);
    let response = result.response;

    const maxIterations = 5;
    let iterations = 0;

    // Function calling loop
    while (iterations < maxIterations) {
      const functionCalls = response.functionCalls();

      if (!functionCalls || functionCalls.length === 0) {
        // No more function calls, we have the final response
        break;
      }

      // Execute all function calls
      const functionResponses = await Promise.all(
        functionCalls.map(async (call) => {
          const toolResult = await executeTool(call.name, call.args);
          return {
            name: call.name,
            response: { result: toolResult },
          };
        })
      );

      // Send function results back to the model
      result = await chat.sendMessage(
        functionResponses.map((fr) => ({
          functionResponse: fr,
        }))
      );

      response = result.response;
      iterations++;
    }

    // Extract the final text response
    const finalText = response.text();

    return NextResponse.json({
      response: finalText,
      model: "gemini-1.5-flash",
      free: true,
    });
  } catch (error: any) {
    console.error("Gemini agent error:", error);

    let errorMessage = "Failed to process request";
    let errorDetails = error.message || "Unknown error";

    // Handle specific Gemini API errors
    if (error.message?.includes("API key")) {
      errorMessage = "Invalid or missing API key";
      errorDetails = "Please check your GEMINI_API_KEY in .env.local. Get a free key at https://makersuite.google.com/app/apikey";
    } else if (error.message?.includes("quota")) {
      errorMessage = "API quota exceeded";
      errorDetails = "You've reached your free tier limit. Wait a bit or upgrade your plan.";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
      },
      { status: 500 }
    );
  }
}
