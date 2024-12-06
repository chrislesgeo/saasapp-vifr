import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from './configGem';

export class GeminiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeminiError';
  }
}

let genAI: GoogleGenerativeAI | null = null;
let model: any | null = null;

const initializeGemini = () => {
  if (!config.apiKey) {
    throw new GeminiError('Gemini API key is required');
  }

  genAI = new GoogleGenerativeAI(config.apiKey);
  model = genAI.getGenerativeModel({ model: config.modelName });
};

export const generateResponse = async (prompt: string): Promise<string> => {
  try {
    if (!model) {
      initializeGemini();
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error: any) {
    throw new GeminiError(error.message || 'Failed to generate response');
  }
};