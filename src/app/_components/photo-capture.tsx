"use client";

import type { FC } from "react";
import { useCamera } from "../_hooks/use-camera";
import { Camera, CameraNotAllowed } from "./camera";

interface Props {
	chatId: number;
}

export const PhotoCapture: FC<Props> = ({ chatId }) => {
	const { status } = useCamera();

	if (status === "granted") {
		return <Camera chatId={chatId} />;
	}

	return <CameraNotAllowed />;
};
