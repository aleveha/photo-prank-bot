import { useTranslations } from "next-intl";
import { RichText } from "~/app/_components/ui/rich-text";
import { envs } from "~/configs/envs";

type Rules = keyof IntlMessages["privacy-policy"]["rules"];
const RULES = [
	"purpose",
	"link-sharing",
	"data-privacy",
	"prohibited-content",
	"false-complaints",
	"respectful-use"
] as Rules[];

export default function Page() {
	const t = useTranslations("privacy-policy");

	return (
		<div className="space-y-4 pb-8">
			<h1 className="text-3xl font-bold">{t("title")}</h1>
			<RichText>
				{(messages) =>
					t.rich("subtitle", {
						...messages,
						botTag: `@${envs.NEXT_PUBLIC_BOT_NAME}`
					})
				}
			</RichText>
			<ol className="space-y-4 [&_h3]:font-bold [&_h3]:inline [&_h3]:text-lg [&_p]:leading-loose">
				{RULES.map((rule) => (
					<li key={rule}>
						<h3>{t(`rules.${rule}.title`)}</h3>
						<RichText>{(messages) => t.rich(`rules.${rule}.content`, messages)}</RichText>
					</li>
				))}
			</ol>
			<p className="font-semibold">{t("agreement")}</p>
		</div>
	);
}
