export const SOCIAL_MEDIA = {
	tiktok: {
		name: "TikTok",
		domain: "tiktok",
		pageTitle: "TikTok - Make Your Day",
		pageDescription:
			"TikTok: здесь рождаются тренды. Миллионы коротких видео, специально подобранных для каждого зрителя, ждут вас на мобильном устройстве или веб-сайте.",
		originalUrl: "https://www.tiktok.com/"
	},
	instagram: {
		name: "Instagram",
		domain: "instagram",
		pageTitle: "Instagram",
		pageDescription:
			"Create an account or log in to Instagram - A simple, fun & creative way to capture, edit & share photos, videos & messages with friends & family.",
		originalUrl: "https://www.instagram.com/"
	},
	youtube: {
		name: "YouTube",
		domain: "youtube",
		pageTitle: "YouTube",
		pageDescription:
			"Смотрите любимые видео, слушайте любимые песни, загружайте собственные ролики и делитесь ими с друзьями, близкими и целым миром.",
		originalUrl: "https://www.youtube.com/"
	},
	vk: {
		name: "VK",
		domain: "vk",
		pageTitle: "VK Видео — смотреть онлайн бесплатно",
		pageDescription: "Смотри в приложении на смартфоне и ТВ лучшие видео: кино, шоу, сериалы!",
		originalUrl: "https://vk.com/"
	},
	yandex: {
		name: "Yandex",
		domain: "yandex",
		pageTitle: "Яндекс — быстрый поиск в интернете",
		pageDescription:
			"Яндекс, найдётся всё: сайты, изображения, музыка, товары. Решайте любые задачи — от повседневных вопросов до научной работы. Можно искать текстом, голосом или по картинке.",
		originalUrl: "https://ya.ru/"
	},
	google: {
		name: "Google",
		domain: "google",
		pageTitle: "Google",
		pageDescription:
			"Search the world's information, including webpages, images, videos and more. Google has many special features to help you find exactly what you're looking for.",
		originalUrl: "https://www.google.com/"
	},
	goldapple: {
		name: "Gold Apple",
		domain: "goldapple",
		pageTitle: "ЗОЛОТОЕ ЯБЛОКО — интернет-магазин косметики, парфюмерии и товаров для дома",
		pageDescription:
			"Торговая сеть по продаже товаров для жизни, красоты и дома — «Золотое Яблоко». Широкий каталог и более 4000 лучших брендов! Техника, ювелирные украшения, товары для детей и подростков, спортивный инвентарь, корейская косметика с быстрой доставкой по Москве и всей России.",
		originalUrl: "https://goldapple.ru/"
	},
	lamoda: {
		name: "Lamoda",
		domain: "lamoda",
		pageTitle: "Lamoda – интернет магазин одежды и обуви",
		pageDescription:
			"В интернет-магазине одежды и обуви Lamoda Вас ждут ТЫСЯЧИ моделей модной брендовой мужской, женской и детской обуви и одежды разных размеров! Профессиональная команда стилистов интернет-магазина отбирает по всему миру самые последние новинки обуви и одежды с учетом трендов индустрии моды!",
		originalUrl: "https://www.lamoda.ru/"
	},
	steam: {
		name: "Steam",
		domain: "steam",
		pageTitle: "Добро пожаловать в Steam",
		pageDescription:
			"Невероятные скидки на игры каждый день. Новые предложения каждый час. Все платежи безопасны. Ваш аккаунт Steam.",
		originalUrl: "https://store.steampowered.com/"
	},
	drom: {
		name: "Drom",
		domain: "drom",
		pageTitle: "Дром - цены на машины",
		pageDescription:
			"Автомобили и запчасти: продажа новых и б/у авто, каталог, отзывы автовладельцев, форумы, ремонт и эксплуатация, приключения, аукционы, спортивные машины, тюнинг, объявления и цены.",
		originalUrl: "https://www.drom.ru/"
	},
	pornhub: {
		name: "Pornhub",
		domain: "pornhub",
		pageTitle: "Бесплатные порно видео | Pornhub",
		pageDescription:
			"Добро пожаловать в Pornhub.com, на родину лучших хардкорных бесплатных порно видео для взрослых с самыми горячими звездами. Смотрите полнометражные видео от ваших любимых порно студий 24/7!",
		originalUrl: "https://rt.pornhub.com/"
	},
	onlyfans: {
		name: "OnlyFans",
		domain: "onlyfans",
		pageTitle: "OnlyFans",
		pageDescription:
			"OnlyFans is the social platform revolutionizing creator and fan connections. The site is inclusive of artists and content creators from all genres and allows them to monetize their content while developing authentic relationships with their fanbase.",
		originalUrl: "https://onlyfans.com"
	}
} as const;

export type Domains = keyof typeof SOCIAL_MEDIA;
