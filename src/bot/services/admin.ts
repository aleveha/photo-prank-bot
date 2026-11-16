import ky, { HTTPError } from "ky";
import { envs } from "~/configs/envs";

type MiniAdSendResponse = {
	code?: number;
	message: string;
	status: string;
};

export const AdminService = {
	miniAds: {
		async send(chatId: number, options?: { firstName?: string; type?: "greeting" | "regular" }) {
			try {
				const params = new URLSearchParams({
					"chat-id": chatId.toString(),
					type: options?.type ?? "regular"
				});
				if (options?.firstName) {
					params.set("first-name", options.firstName);
				}

				await ky.get<MiniAdSendResponse>(
					`${envs.ADMIN_SERVICE_URL}/v1/api/bots/${envs.ADMIN_SERVICE_API_KEY}/mini-ads/send?` + params.toString()
				);
			} catch (err) {
				if (err instanceof HTTPError) {
					const { status } = err.response;
					console.warn(`[AdminService.miniAds.send]: HTTP ${status}:`, JSON.stringify(err.data));
					return;
				}

				console.error("[AdminService.miniAds.send]: Unknown error: ", err);
			}
		}
	}
};
