const RED_FLAGS = ["Android", "Version/"];

export function isSupportedBrowser() {
	if (typeof navigator === "undefined") {
		return true;
	}

	return !RED_FLAGS.every((flag) => navigator.userAgent.includes(flag));
}
