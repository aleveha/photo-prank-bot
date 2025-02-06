import ky from "ky";
import { envs } from "~/configs/envs";

const BASE_URL = "https://admin-bot.aleveha.xyz";

type MiniAdSendResponse = {
	code?: number;
	message: string;
	status: string;
};

export const AdminService = {
	miniAds: {
		async send(chatId: number) {
			const response = await ky
				.get<MiniAdSendResponse>(
					`${BASE_URL}/v1/api/bots/${envs.ADMIN_API_KEY}/mini-ads/send?` +
						new URLSearchParams({ "chat-id": chatId.toString() }).toString()
				)
				.json();

			if (response.message === "SUCCESS") {
				return true;
			}

			console.warn("[AdminService.miniAds.send]:", JSON.stringify({ chatId, response }));
			return false;
		}
	}
};
