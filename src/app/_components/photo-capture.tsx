"use client";

import { redirect } from "next/navigation";
import type { FC } from "react";
import { useCamera } from "../_hooks/use-camera";
import { isSupportedBrowser } from "../_utils/is-supported-browser";
import { Camera, CameraNotAllowed } from "./camera";
import { Loader } from "./loader";

interface Props {
	chatId: number;
}

const PhotoCaptureComponent: FC<Props> = ({ chatId }) => {
	const { status } = useCamera();

	if (status === "granted") {
		return <Camera chatId={chatId} />;
	}

	if (status === "denied") {
		return <CameraNotAllowed />;
	}

	return <Loader />;
};

const withSupportedBrowser = (Component: FC<Props>) => {
	return (props: Props) => {
		if (!isSupportedBrowser()) {
			return redirect("/not-supported-browser");
		}

		return <Component {...props} />;
	};
};

export const PhotoCapture = withSupportedBrowser(PhotoCaptureComponent);
