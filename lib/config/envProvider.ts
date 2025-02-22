import { getEnv } from "../utils/env";

export interface EnvProvider {
  getOpenAiApiKey(): string;
}

export class ProcessEnvProvider implements EnvProvider {
  private openAiApiKey: string;

  constructor() {
    try {
      this.openAiApiKey = getEnv("OPENAI_API_KEY");
    } catch (error) {
      console.error("Error loading while .env:", error);
      process.exit(1);
    }
  }

  getOpenAiApiKey(): string {
    return this.openAiApiKey;
  }
}

export const envProvider: EnvProvider = new ProcessEnvProvider();

