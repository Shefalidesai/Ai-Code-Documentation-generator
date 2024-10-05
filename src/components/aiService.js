// src/openaiService.js
import OpenAI from "openai";

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.REACT_APP_GROQ_API_KEY, // Ensure this is set in your environment variables
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true  
});

// Function to analyze code and get suggestions
export const analyzeCodeSnippet = async (codeSnippet) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama3-8b-8192", // Specify the model
      messages: [
        {
          role: "user",
          content: `Analyze the following code and provide suggestions:\n\n${codeSnippet}`
        }
      ]
    });

    return response.choices[0]?.message?.content || "No suggestions available.";
  } catch (error) {
    console.error("Error in OpenAI API request:", error);
    return "Error retrieving suggestions.";
  }
};
