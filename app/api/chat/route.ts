import { envProvider } from '@/lib/config/envProvider';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openai = createOpenAI({
	apiKey: envProvider.getOpenAiApiKey(),
	baseURL: "https://models.inference.ai.azure.com",
})

export async function POST(req: Request) {
	const { messages } = await req.json();
	try {
		const result = streamText({
			model: openai('gpt-4o'),
			messages,
		});

		return result.toDataStreamResponse();
	} catch (error) {
		console.log("Streaming error:", error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	}
}
