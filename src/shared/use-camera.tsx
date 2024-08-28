"use client";

import { match } from "ts-pattern";
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

	const handleError = useCallback((err: Error) => {
		setStatus("denied");
		console.error(err);
	}, []);

	useEffect(() => {
		const requestCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({ video: true });
				handleStream(stream);
			} catch (initialError) {
				try {
					const permissionStatus = await navigator.permissions.query({ name: "camera" as PermissionName });

					await match(permissionStatus)
						.with({ state: "granted" }, async () => {
							const stream = await navigator.mediaDevices.getUserMedia({ video: true });
							handleStream(stream);
						})
						.with({ state: "prompt" }, async () => {
							const stream = await navigator.mediaDevices.getUserMedia({ video: true });
							handleStream(stream);
						})
						.otherwise(async () => handleError(new Error("Camera permission denied")));
				} catch (permissionError) {
					try {
						const stream = await navigator.mediaDevices.getUserMedia({ video: true });
						handleStream(stream);
					} catch (finalError) {
						handleError(finalError as Error);
					}
				}
			}
		};

		requestCamera();
	}, [handleStream, handleError]);

	useEffect(() => {
		if (canvasRef.current) {
			setContext(canvasRef.current.getContext("2d"));
		}
	}, []);

	return { videoRef, canvasRef, status, photo } as const;
};
