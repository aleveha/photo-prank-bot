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

	const getCameraPermission = useCallback(async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });

			setStatus("granted");
			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		} catch (err) {
			// @ts-expect-error untyped error
			if (err.message.includes("denied")) {
				setStatus("denied");
			}
			console.error(err);
		}
	}, []);

	useEffect(() => {
		getCameraPermission().catch((err) => console.error(err));
	}, [getCameraPermission]);

	useEffect(() => {
		if (!canvasRef.current) return;

		canvasRef.current.width = window.innerWidth > window.innerHeight ? WIDTH : HEIGHT;
		canvasRef.current.height = window.innerWidth > window.innerHeight ? HEIGHT : WIDTH;
		setContext(canvasRef.current.getContext("2d"));
	}, []);

	const takePhoto = () => {
		if (!context || !videoRef.current || !canvasRef.current || status !== "granted") {
			return null;
		}

		context.drawImage(
			videoRef.current,
			0,
			0,
			window.innerWidth > window.innerHeight ? WIDTH : HEIGHT,
			window.innerWidth > window.innerHeight ? HEIGHT : WIDTH,
		);

		return canvasRef.current.toDataURL("image/png");
	};

	return { videoRef, canvasRef, takePhoto, status } as const;
};
