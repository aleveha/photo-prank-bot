import { useTranslations } from "next-intl";
import { envs } from "~/configs/envs";

type Rules = keyof IntlMessages["privacy-policy"]["rules"];
const RULES = [
	"purpose",
	"link-sharing",
	"data-privacy",
	"prohibited-content",
	"false-complaints",
	"respectful-use",
] as Rules[];

export default function Page() {
	const t = useTranslations("privacy-policy");

	return (
		<div className="space-y-4 pb-8">
			<h1 className="text-3xl font-bold">{t("title")}</h1>
			<h2>
				{t.rich("subtitle", {
					botTag: `@${envs.NEXT_PUBLIC_BOT_NAME}`,
					a: (content) => (
						<a
							className="hover:text-orange-500"
							href={`https://t.me/${envs.NEXT_PUBLIC_BOT_NAME}`}
							target="_blank"
							rel="noreferrer"
						>
							{content}
						</a>
					),
				})}
			</h2>
			<ol className="space-y-4 [&_h3]:font-bold [&_h3]:inline [&_h3]:text-lg [&_p]:leading-loose">
				{RULES.map((rule) => (
					<li key={rule}>
						<h3>{t(`rules.${rule}.title`)}</h3>
						<p>{t.rich(`rules.${rule}.content`)}</p>
					</li>
				))}
			</ol>
			<p className="font-semibold">{t("agreement")}</p>
		</div>
	);
}
