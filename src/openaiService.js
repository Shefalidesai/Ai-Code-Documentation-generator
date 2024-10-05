// src/api/groqService.js
import Groq from "groq-sdk";

// Initialize Groq with API key from environment variable
const groq = new Groq({ 
  apiKey: process.env.REACT_APP_GROQ_API_KEY, 
  dangerouslyAllowBrowser: true  
});
console.log('API Key:', process.env.REACT_APP_GROQ_API_KEY);  // Check if API Key is being loaded

const getGroqChatCompletion = async (prompt) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,  // Pass the user prompt here
        },
      ],
      model: "mixtral-8x7b-32768",  // Use the desired model
    });

    // Return the chat completion response content
    return chatCompletion.choices[0]?.message?.content || "No content generated";
  } catch (error) {
    console.error("Error in Groq chat completion:", error);
    return "Error generating content";
  }
};

export default getGroqChatCompletion;
