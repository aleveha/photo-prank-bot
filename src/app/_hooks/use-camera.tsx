"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CameraStatus = "granted" | "denied";

const WIDTH = 640;
const HEIGHT = 480;

const getProperSize = (width: number, height: number) => {
	if (width > height) {
		return { width: WIDTH, height: HEIGHT };
	}
	return { width: HEIGHT, height: WIDTH };
};

export const useCamera = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [status, setStatus] = useState<CameraStatus | null>(null);
	const [photo, setPhoto] = useState<string | null>(null);
	const [hasAttempted, setHasAttempted] = useState(false);

	const takePhoto = useCallback(() => {
		if (context && videoRef.current && canvasRef.current) {
			const { width, height } = getProperSize(window.innerWidth, window.innerHeight);
			canvasRef.current.width = width;
			canvasRef.current.height = height;

			context.drawImage(videoRef.current, 0, 0, width, height);
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
			}, 750);
		},
		[takePhoto],
	);

	useEffect(() => {
		const requestCamera = async () => {
			if (hasAttempted) return;

			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				handleStream(stream);
				setHasAttempted(true);
			} catch (error) {
				console.error("Failed to get user media:", error);
				setStatus("denied");
			}
		};

		requestCamera();
	}, [handleStream, hasAttempted]);

	useEffect(() => {
		if (canvasRef.current) {
			setContext(canvasRef.current.getContext("2d"));
		}
	}, []);

	return { videoRef, canvasRef, status, photo } as const;
};
