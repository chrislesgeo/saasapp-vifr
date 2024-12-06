// export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;


export const config = {
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API!,
  modelName: 'gemini-pro',
  temperature: 0.7,
  maxOutputTokens: 2048,
} as const;