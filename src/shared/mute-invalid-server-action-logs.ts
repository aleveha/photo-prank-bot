const MUTED_MESSAGE = "The Server Reference ID did not match the expected format";

function shouldMute(args: unknown[]) {
	return args.some((arg) => {
		const message = arg instanceof Error ? arg.message : typeof arg === "string" ? arg : "";
		return message.includes(MUTED_MESSAGE);
	});
}

/**
 * Next.js logs scanner probes that send junk `Next-Action` headers
 * (e.g. `Next-Action: x`) via console.warn/error. Those are not app bugs —
 * upgrading Next does not stop them. Patch console to drop only that message.
 */
export function muteInvalidServerActionLogs() {
	for (const method of ["warn", "error"] as const) {
		const original = console[method].bind(console);
		console[method] = (...args: Parameters<typeof console.warn>) => {
			if (shouldMute(args)) return;
			original(...args);
		};
	}
}
