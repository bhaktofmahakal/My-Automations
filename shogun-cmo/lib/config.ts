import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  SHOGUNCMO_DB_PATH: z.string().default(".data/shoguncmo.db"),
  SHOGUNCMO_WORKSPACE_NAME: z.string().default("ShogunAI"),
  SHOGUNCMO_WORKSPACE_DOMAIN: z.string().default("shogun.ai"),
  GROQ_API_KEY: z.string().optional(),
  GROQ_MODEL_FAST: z.string().default("llama-3.3-70b-versatile"),
  ORCAROUTER_API_KEY: z.string().optional(),
  ORCAROUTER_BASE_URL: z.string().default("https://orcarouter.ai/api/v1"),
  ORCAROUTER_MODEL: z.string().default("auto"),
  TAVILY_API_KEY: z.string().optional(),
  FIRECRAWL_API_KEY: z.string().optional(),
  TINYFISH_API_URL: z.string().optional(),
  GITHUB_TOKEN: z.string().optional(),
  GITHUB_WEBHOOK_SECRET: z.string().optional(),
  CORSAIR_BASE_URL: z.string().optional(),
  CORSAIR_API_KEY: z.string().optional(),
  CORSAIR_KEK: z.string().min(32),
  CORSAIR_DEV_API_KEY: z.string().min(1),
  CORSAIR_DEV_SIGNING_SECRET: z.string().min(1),
  APP_URL: z.string().default("http://localhost:3000"),
});

export const config = envSchema.parse(process.env);
