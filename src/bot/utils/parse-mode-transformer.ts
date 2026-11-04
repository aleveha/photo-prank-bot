import type { Transformer } from "grammy";

export const parseModeTransformer: Transformer = (prev, method, payload, signal) => {
	if (payload && typeof payload === "object" && !("parse_mode" in payload)) {
		Object.assign(payload, { parse_mode: "HTML" });
	}
	return prev(method, payload, signal);
};
