"use client";

import { LanguagesIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import type { FC } from "react";
import { setUserLocale } from "~/app/_actions/user-locale";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/app/_components/ui/dropdown-menu";
import { cn } from "~/app/_utils/cn";
import { LOCALES, type Locale } from "~/configs/i18n";

export const LocaleSwitcher: FC = () => {
	const t = useTranslations("common");
	const userLocale = useLocale();

	const handleLocaleChange = async (locale: Locale) => {
		await setUserLocale(locale);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<LanguagesIcon className="size-5" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{t("components.locale-switcher.label")}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				{LOCALES.map((locale) => (
					<DropdownMenuItem
						className={cn(locale === userLocale && "underline underline-offset-4")}
						key={locale}
						onSelect={() => handleLocaleChange(locale)}
					>
						{t(`locales.${locale}`)}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
