import { useRef, useEffect, useCallback } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendHorizontal, Loader } from "lucide-react";
import { SuggestedActions } from "./suggested-action";
import { ChatRequestOptions, CreateMessage, Message } from "ai";
import Image from "next/image";

type ChatInputProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	isLoading: boolean;
	messages: Array<Message>;
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>;
	input: string;
};

export default function ChatInput({
	handleSubmit,
	handleChange,
	isLoading,
	input,
	append,
	messages
}: ChatInputProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	// Auto-resize textarea
	useEffect(() => {
		const textarea = textareaRef.current;
		if (!textarea) return;

		const resizeObserver = new ResizeObserver(() => {
			textarea.style.height = "auto";
			textarea.style.height = `${textarea.scrollHeight}px`;
		});

		resizeObserver.observe(textarea);
		return () => resizeObserver.disconnect();
	}, []);

	// Handles sending message on Enter key press
	const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			formRef.current?.requestSubmit();
		}
	}, []);

	return (
		<div className="fixed bottom-0 w-full flex flex-col items-center space-y-3 p-5 pb-3 sm:px-0 bg-background">
			{messages.length === 0 &&
				<div className="relative flex w-full max-w-screen-md items-center gap-2 pb-10 flex-col">
					<Image src="/logo.png" alt="Logo" width={500} height={500} />
					<SuggestedActions chatId="default-chat" append={append} />
				</div>
			}
			<form
				ref={formRef}
				onSubmit={handleSubmit}
				className="relative flex w-full max-w-screen-md items-center gap-2"
				aria-label="Chat input form"
			>
				<div className="relative w-full">
					<Textarea
						ref={textareaRef}
						tabIndex={0}
						required
						autoFocus
						placeholder="Send a message..."
						spellCheck={false}
						value={input}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						className="px-4 py-3 min-h-[50px] max-h-[75vh] overflow-hidden resize-none rounded-2xl !text-base bg-muted dark:border-zinc-700 focus:ring-2 focus:ring-primary"
						rows={1}
						aria-label="Type your message"
						aria-live="polite"
					/>

					<Button
						type="submit"
						disabled={!input.trim() || isLoading}
						aria-label="Send message"
						className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 p-2 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
					>
						{isLoading ? (
							<Loader className="h-5 w-5 animate-spin text-gray-600 dark:text-gray-300" />
						) : (
							<SendHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-300" />
						)}
					</Button>
				</div>
			</form>
		</div >
	);
}

