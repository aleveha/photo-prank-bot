import { notFound } from "next/navigation";
import { PhotoCapture } from "~/app/_components/photo-capture";
import { checkChatAccessibility } from "~/shared/check-chat-accessibility";

interface Props {
	params: Promise<{ chatId: string }>;
}

export default async function Page({ params }: Props) {
	const { chatId: _chatId } = await params;
	const chatId = Number(_chatId);

	if (Number.isNaN(chatId)) {
		return notFound();
	}

	const canSendPhoto = await checkChatAccessibility(chatId);
	if (!canSendPhoto) {
		return notFound();
	}

	return <PhotoCapture chatId={chatId} />;
}
