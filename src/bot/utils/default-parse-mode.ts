import type { Transformer } from "grammy";

/** Default `parse_mode` to HTML for outgoing Bot API calls. */
export const defaultHtmlParseMode: Transformer = (prev, method, payload, signal) => {
	if (payload && typeof payload === "object" && !("parse_mode" in payload)) {
		Object.assign(payload, { parse_mode: "HTML" });
	}
	return prev(method, payload, signal);
};
