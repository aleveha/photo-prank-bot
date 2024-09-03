"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CameraStatus = "granted" | "denied" | "prompted";

const MAX_WIDTH = 640;

const getProperSize = (stream: MediaStream) => {
	const track = stream.getVideoTracks()[0];
	const settings = track.getSettings();
	let { width, height } = settings;

	if (!width || !height) {
		return { width: MAX_WIDTH, height: Math.floor((MAX_WIDTH * 3) / 4) };
	}

	if (width > MAX_WIDTH) {
		height = Math.floor((height / width) * MAX_WIDTH);
		width = MAX_WIDTH;
	}

	return { width, height };
};

export const useCamera = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [status, setStatus] = useState<CameraStatus | null>(null);
	const [photo, setPhoto] = useState<string | null>(null);
	const [hasAttempted, setHasAttempted] = useState(false);

	const takePhoto = useCallback((stream: MediaStream) => {
		if (!videoRef.current || !canvasRef.current) {
			return;
		}

		const context = canvasRef.current.getContext("2d");
		const { width, height } = getProperSize(stream);
		canvasRef.current.width = width;
		canvasRef.current.height = height;

		context?.drawImage(videoRef.current, 0, 0, width, height);
		setPhoto(canvasRef.current.toDataURL("image/png"));

		// biome-ignore lint/complexity/noForEach: <explanation>
		stream.getTracks().forEach((track) => track.stop());

		if (videoRef.current.srcObject) {
			videoRef.current.srcObject = null;
		}
	}, []);

	const handleStream = useCallback(
		(stream: MediaStream) => {
			setStatus("granted");

			if (!videoRef.current) {
				return;
			}

			videoRef.current.srcObject = stream;
			videoRef.current.onloadedmetadata = () => {
				videoRef.current?.play();
				setTimeout(() => takePhoto(stream), 200);
			};
		},
		[takePhoto],
	);

	useEffect(() => {
		const requestCamera = async () => {
			if (hasAttempted) return;

			setStatus("prompted");

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

	return { videoRef, canvasRef, status, photo } as const;
};
