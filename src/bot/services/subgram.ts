import ky from "ky";
import { envs } from "~/configs/envs";

const SUBGRAM_API_BASE_URL = "https://api.subgram.org";

type CheckParams = {
	chatId: number;
	userId: number;
};

type SubgramResponse = {
	status: string;
	message?: string;
};

async function isSubscribed(params: CheckParams): Promise<boolean> {
	const response = await ky.post<SubgramResponse>(`${SUBGRAM_API_BASE_URL}/get-sponsors`, {
		headers: {
			Auth: envs.SUBGRAM_API_KEY
		},
		json: {
			chat_id: params.chatId,
			user_id: params.userId
		}
	});
	const data = await response.json();

	if (data.status === "ok") {
		return true;
	}

	if (data.status === "warning") {
		return false;
	}

	console.error("[Subgram] API error:", data);
	return true;
}

export const subgram = {
	isSubscribed
};
