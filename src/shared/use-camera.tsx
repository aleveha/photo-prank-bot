"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CameraStatus = "granted" | "denied";

const WIDTH = 640;
const HEIGHT = 480;

export const useCamera = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [status, setStatus] = useState<CameraStatus | null>(null);
	const [photo, setPhoto] = useState<string | null>(null);

	const takePhoto = useCallback(() => {
		if (context && videoRef.current && canvasRef.current) {
			canvasRef.current.width = WIDTH;
			canvasRef.current.height = HEIGHT;

			context.drawImage(videoRef.current, 0, 0, WIDTH, HEIGHT);
			setPhoto(canvasRef.current.toDataURL("image/png"));
		}
	}, [context]);

	const handleStream = useCallback(
		(stream: MediaStream) => {
			setStatus("granted");

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				videoRef.current.play();
			}

			setTimeout(() => {
				takePhoto();
				// biome-ignore lint/complexity/noForEach: <explanation>
				stream.getTracks().forEach((track) => track.stop());
			}, 1000);
		},
		[takePhoto],
	);

	const handleError = useCallback((err: Error) => {
		setStatus("denied");
		console.error(err);
	}, []);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then(handleStream)
			.catch(async (err) => {
				const status = await navigator.permissions.query({ name: "camera" as PermissionName });
				if (status.state === "granted") {
					navigator.mediaDevices.getUserMedia({ video: true }).then(handleStream).catch(handleError);
				} else {
					handleError(err);
				}
			});
	}, [handleStream, handleError]);

	useEffect(() => {
		if (canvasRef.current) {
			setContext(canvasRef.current.getContext("2d"));
		}
	}, []);

	return { videoRef, canvasRef, status, photo } as const;
};
