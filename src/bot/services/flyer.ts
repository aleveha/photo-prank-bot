import ky from "ky";
import { envs } from "~/configs/envs";

const FLYER_API_BASE_URL = "https://api.flyerservice.io";

type CheckParams = {
	languageCode?: string;
	userId: number;
};
type CheckResponse = {
	error: string;
	info: string;
	skip: true;
	warning: string;
};

async function check(params: CheckParams): Promise<CheckResponse> {
	const response = await ky.post<CheckResponse>(`${FLYER_API_BASE_URL}/check`, {
		json: {
			key: envs.FLYER_API_KEY,
			user_id: params.userId,
			language_code: params.languageCode
		}
	});

	return response.json();
}

export default {
	check
};
