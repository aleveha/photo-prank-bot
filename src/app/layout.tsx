import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "~/app/_components/locale-switcher";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

interface Props {
	children: ReactNode;
}

export default async function RootLayout({ children }: Props) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html className="dark" lang={locale}>
			<body className={inter.className}>
				<NextIntlClientProvider messages={messages}>
					<main className="w-full h-full container px-6 py-12">
						<div className="text-end">
							<LocaleSwitcher />
						</div>
						{children}
					</main>
					<SpeedInsights />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
