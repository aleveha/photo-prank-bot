import { useTranslations } from "next-intl";

export default function Page() {
	const t = useTranslations("not-supported-browser");

	return (
		<div className="flex flex-col gap-8 [&>p]:text-lg md:[&>p]:leading-loose md:text-center md:items-center">
			<h1 className="text-3xl font-bold">{t("title")}</h1>
			<p>
				{t.rich("content.tg-browser", {
					ub: (content) => (
						<span className="block underline underline-offset-4 font-semibold">{content}</span>
					),
				})}
			</p>
			<p>{t("content.external-browser")}</p>
		</div>
	);
}
