import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/app/_configs/i18n.tsx");

/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["grammy", "@grammyjs/auto-retry", "@grammyjs/ratelimiter"],
	},
};

export default withNextIntl(nextConfig);
