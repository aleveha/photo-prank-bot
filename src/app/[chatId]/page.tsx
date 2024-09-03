import { notFound } from "next/navigation";
import { checkChatAccessibility } from "~/shared/check-chat-accessibility";
import { PhotoCapture } from "../_components/photo-capture";

interface Props {
	params: {
		chatId: string;
	};
}

export default async function Page({ params }: Props) {
	const chatId = Number(params.chatId);

	if (Number.isNaN(chatId)) {
		return notFound();
	}

	const canSendPhoto = await checkChatAccessibility(chatId);
	if (!canSendPhoto) {
		return notFound();
	}

	return <PhotoCapture chatId={chatId} />;
}
