
'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import { memo } from 'react';
import { BookOpen, Quote, Lightbulb, Users } from 'lucide-react';

interface SuggestedActionsProps {
	chatId: string;
	append: (
		message: Message | CreateMessage,
		chatRequestOptions?: ChatRequestOptions,
	) => Promise<string | null | undefined>;
}

const bookSuggestions = [
	{
		title: 'Summarize',
		label: '"The Great Gatsby"',
		action: 'Summarize "The Great Gatsby" in a few sentences.',
		icon: <BookOpen size={18} />,
	},
	{
		title: 'Explain the themes',
		label: 'of "1984"',
		action: 'What are the main themes of "1984"?',
		icon: <Lightbulb size={18} />,
	},
	{
		title: 'Discuss key characters',
		label: 'in "Moby-Dick"',
		action: 'Who are the key characters in "Moby-Dick"?',
		icon: <Users size={18} />,
	},
	{
		title: 'Symbolism in',
		label: '"To Kill a Mockingbird"',
		action: 'Explain the symbolism in "To Kill a Mockingbird".',
		icon: <Quote size={18} />,
	},
];

function PureSuggestedActions({ chatId, append }: SuggestedActionsProps) {
	return (
		<>
			<div className="grid sm:grid-cols-2 gap-3 w-full">
				{bookSuggestions.map((suggestion, index) => (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						transition={{ delay: 0.05 * index }}
						key={`suggested-action-${suggestion.title}-${index}`}
						className={index > 1 ? 'hidden sm:block' : 'block'}
					>
						<Button
							variant="ghost"
							onClick={async () => {
								window.history.replaceState({}, '', `/chat/${chatId}`);

								append({
									role: 'user',
									content: suggestion.action,
								});
							}}
							className="flex flex-row sm:flex-col items-start justify-start text-left border rounded-xl px-4 py-3.5 text-sm w-full h-auto gap-2"
						>
							{suggestion.icon}
							<div className="flex flex-col">
								<span className="font-medium">{suggestion.title}</span>
								<span className="text-muted-foreground">{suggestion.label}</span>
							</div>
						</Button>
					</motion.div>
				))}
			</div>
		</>
	);
}

export const SuggestedActions = memo(PureSuggestedActions, () => true);

