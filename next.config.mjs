import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/app/_configs/i18n.tsx");

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	serverExternalPackages: [
		"grammy",
		"@grammyjs/auto-retry",
		"@grammyjs/ratelimiter",
		"@grammyjs/commands",
		"@grammyjs/i18n",
		"@grammyjs/parse-mode"
	]
};

export default withNextIntl(nextConfig);
