import ky, { HTTPError } from "ky";
import { envs } from "~/configs/envs";

type MiniAdSendResponse = {
	code?: number;
	message: string;
	status: string;
};

export const AdminService = {
	miniAds: {
		async send(chatId: number, type: "greeting" | "regular" = "regular") {
			try {
				await ky.get<MiniAdSendResponse>(
					`${envs.ADMIN_SERVICE_URL}/v1/api/bots/${envs.ADMIN_SERVICE_API_KEY}/mini-ads/send?` +
						new URLSearchParams({ "chat-id": chatId.toString(), type }).toString()
				);
			} catch (err) {
				if (err instanceof HTTPError) {
					const { status } = err.response;
					const body = await err.response.text().catch(() => "<unreadable body>");

					try {
						const error = JSON.parse(body) as unknown;
						console.warn(`[AdminService.miniAds.send]: HTTP ${status}:`, JSON.stringify(error));
					} catch {
						// Admin service sometimes returns a non-JSON body (e.g. "[object Object]"
						// when an object is sent without JSON.stringify). Log status + raw text instead.
						console.error(`[AdminService.miniAds.send]: HTTP ${status}, non-JSON body:`, body);
					}
					return;
				}

				console.error("[AdminService.miniAds.send]: Unknown error: ", err);
			}
		}
	}
};
