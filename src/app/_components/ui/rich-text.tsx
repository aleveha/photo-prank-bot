import { clsx } from "clsx";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { TelegramIcon } from "../icons/telegram-icon";

type Tag = "botLink" | "underline" | "bold" | "botLinkButton";

type Props = {
	className?: string;
	children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

export function RichText({ children, className }: Props) {
	return (
		<p className={clsx(className, "leading-relaxed")}>
			{children({
				bold: (content) => <span className="font-semibold">{content}</span>,
				botLink: (content) => (
					<a href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}`} target="_blank" rel="noreferrer">
						{content}
					</a>
				),
				botLinkButton: (content) => (
					<a
						className="relative flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg text-center bg-slate-700 hover:bg-slate-600 transition duration-200 text-white font-medium"
						href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}`}
						rel="noreferrer noopener"
						target="_blank"
					>
						<TelegramIcon className="size-6" />
						{content}
						<ArrowUpRight className="absolute top-0.5 right-0.5 size-4" />
					</a>
				),
				underline: (content) => <span className="underline underline-offset-4">{content}</span>
			})}
		</p>
	);
}
