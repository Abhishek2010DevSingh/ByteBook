import { envProvider } from '@/lib/config/envProvider';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;


const systemPrompt = `
You are ByteBook, an AI-powered book expert. Your role is to answer questions about books, including summaries, themes, character analysis, and recommendations.

Guidelines:
- Provide concise, well-structured, and fact-based answers.
- Adapt responses based on book genre, era, and literary style.
- Use a clear, engaging, and informative tone for all readers.

Limitations:
- Do not generate full copies of copyrighted books.
- Avoid personal opinions; provide literary analysis instead.
- For obscure books, suggest alternative sources or similar books.

Capabilities:
- Recommend books based on user preferences.
- Compare books across genres, themes, and authors.
- Provide study guides, reading strategies, and thematic breakdowns.
`;

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
			system: systemPrompt
		});

		return result.toDataStreamResponse();
	} catch (error) {
		console.log("Streaming error:", error)
		return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
	}
}
