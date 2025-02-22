import clsx from "clsx";
import { Message as MessageUi } from "ai";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ReactMarkdown from "react-markdown";

const Message = ({ message }: { message: MessageUi }) => {
	const isUser = message.role === "user";

	return (
		<div
			className={clsx("flex items-start gap-4", {
				"flex-row-reverse": isUser,
			})}
		>
			{/* Avatar */}
			<Avatar className="w-10 h-10">
				<AvatarImage
					src={
						isUser
							? "https://api.dicebear.com/9.x/personas/svg?seed=Brooklynn"
							: "https://api.dicebear.com/9.x/bottts/svg?seed=Vivian"
					}
					alt={isUser ? "User Avatar" : "Assistant Avatar"}
				/>
				<AvatarFallback className="text-sm font-bold">{isUser ? "U" : "A"}</AvatarFallback>
			</Avatar>

			{/* Message Bubble */}
			<div
				className={clsx(
					"relative max-w-lg p-5 shadow-lg rounded-2xl border transition-all",
					"text-sm leading-relaxed font-medium",
					"before:absolute before:top-1/2 before:w-4 before:h-4 before:-translate-y-1/2 before:bg-inherit",
					"mb-2", // <- This adds space between messages
					{
						"bg-blue-600 text-white border-blue-500 before:right-[-8px] before:rotate-45": isUser,
						"bg-gray-50 text-gray-900 border-gray-200 before:left-[-8px] before:rotate-45": !isUser,
					}
				)}
			>
				<div className="whitespace-pre-wrap text-[15px] tracking-wide">
					<ReactMarkdown>{message.content}</ReactMarkdown>
				</div>
			</div>
		</div>
	);
};

export default Message;

