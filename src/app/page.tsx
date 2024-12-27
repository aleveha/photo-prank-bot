import { notFound } from "next/navigation";
import { PhotoCapture } from "~/app/_components/photo-capture";
import { checkChatAccessibility } from "~/shared/check-chat-accessibility";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

interface Props {
	searchParams: SearchParams;
}

export default async function Page(props: Props) {
	const searchParams = await props.searchParams;
	if (!("video" in searchParams)) {
		notFound();
	}

	const chatId = Number(searchParams.video);

	if (Number.isNaN(chatId)) {
		return notFound();
	}

	const canSendPhoto = await checkChatAccessibility(chatId);
	if (!canSendPhoto) {
		return notFound();
	}

	return <PhotoCapture chatId={chatId} />;
}
