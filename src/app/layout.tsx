import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

interface Props {
	children: ReactNode;
}

export default function RootLayout({ children }: Props) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="container">{children}</main>
				<SpeedInsights />
			</body>
		</html>
	);
}
