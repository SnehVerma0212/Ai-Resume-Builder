import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// Initialize the API key
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Available models for fallback
const models = ["gemini-1.5-flash", "gemini-1.5", "gemini-1", "gemini-2"]; // More models to fall back to

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Function to initialize a chat session with fallback handling
export const initializeAIChatSession = async () => {
  let chatSession;
  let attempt = 0;
  const maxAttempts = 5; // Retry up to 5 times
  const retryDelay = 5000; // 5 seconds delay between retries

  while (attempt < maxAttempts) {
    for (const modelName of models) {
      try {
        // Attempt to initialize the model
        const model = genAI.getGenerativeModel({ model: modelName });
        chatSession = model.startChat({
          generationConfig,
          history: [],
        });
        console.log(`Successfully connected to model: ${modelName}`);
        return chatSession; // Exit on success
      } catch (error) {
        console.error(`Failed to connect to model ${modelName}:`, error.message);
        if (models.indexOf(modelName) === models.length - 1 && attempt === maxAttempts - 1) {
          throw new Error("All models are overloaded. Please try again later.");
        }
      }
    }
    attempt++;
    console.log(`Retrying... Attempt ${attempt}`);
    await new Promise((resolve) => setTimeout(resolve, retryDelay)); // wait for 5 seconds before retrying
  }
};

// Call the function to initialize and export the AIChatSession
export const AIChatSession = await initializeAIChatSession();
