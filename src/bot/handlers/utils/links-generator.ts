import { envs } from "~/configs/envs";

const SOCIAL_MEDIAS = {
	tiktok: {
		name: "TikTok",
		domains: ["tiktok", "m.tiktok", "vm.tiktok", "vt.tiktok"],
	},
	instagram: {
		name: "Instagram",
		domains: ["instagram", "m.instagram"],
	},
	youtube: {
		name: "YouTube",
		domains: ["youtube", "m.youtube"],
	},
	vk: {
		name: "VK",
		domains: ["vk", "m.vk"],
	},
	yandex: {
		name: "Yandex",
		domains: ["yandex", "ya"],
	},
	google: {
		name: "Google",
		domains: ["google"],
	},
	goldapple: {
		name: "Gold Apple",
		domains: ["goldapple"],
	},
	lamoda: {
		name: "Lamoda",
		domains: ["lamoda"],
	},
	steam: {
		name: "Steam",
		domains: ["steamcommunity", "steamgames"],
	},
	drom: {
		name: "Drom",
		domains: ["drom"],
	},
	pornhub: {
		name: "Pornhub",
		domains: ["pornhub", "m.pornhub", "rt.pornhub", "ru.pornhub"],
	},
	onlyfans: {
		name: "OnlyFans",
		domains: ["onlyfans", "onlyfans-slivy"],
	},
} as const;

export function generateLinks(chatId: number) {
	const link = `${envs.APP_URL}/${chatId}`;

	return Object.entries(SOCIAL_MEDIAS)
		.map(([_, value]) => `<b><u>${value.name}</u></b>:\n` + `https://${value.domains[0]}.${link}`)
		.join("\n\n");
}
