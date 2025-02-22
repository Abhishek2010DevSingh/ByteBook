import { useRef, useEffect } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { SendHorizontal } from "lucide-react";

type ChatInputProps = {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	isLoading: boolean;
	message: string;
};

export default function ChatInput({ handleSubmit, handleChange, isLoading, message }: ChatInputProps) {
	const formRef = useRef<HTMLFormElement>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustTextareaHeight = () => {
		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
		}
	};

	useEffect(adjustTextareaHeight, [message]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			formRef.current?.requestSubmit();
		}
	};

	return (
		<div className="fixed bottom-0 flex w-full flex-col items-center space-y-3  p-5 pb-3 sm:px-0">
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
						value={message}
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						className="px-4 py-3 min-h-[50px] max-h-[calc(75dvh)] overflow-hidden resize-none rounded-2xl !text-base bg-muted dark:border-zinc-700"
						rows={1}
						aria-label="Type your message"
						aria-live="polite"
					/>

					<Button
						type="submit"
						disabled={!message.trim() || isLoading}
						aria-label="Send message"
						className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-1 flex items-center justify-center rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
					>
						<SendHorizontal className="h-5 w-5 text-gray-600 dark:text-gray-300" />
					</Button>
				</div>
			</form>
		</div>
	);
}

