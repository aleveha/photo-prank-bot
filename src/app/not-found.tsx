import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations("not-found");

	return (
		<div className="w-full h-full flex flex-col justify-center text-white gap-y-4">
			<h1 className="text-3xl font-semibold">{t("title")}</h1>
			<p className="text-lg">{t("content")}</p>
		</div>
	);
}
