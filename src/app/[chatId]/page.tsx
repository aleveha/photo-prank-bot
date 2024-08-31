import { notFound } from "next/navigation";
import { checkChat } from "../_actions/check-chat";
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

	const canSendPhoto = await checkChat(chatId);
	if (!canSendPhoto) {
		return notFound();
	}

	return <PhotoCapture chatId={chatId} />;
}
