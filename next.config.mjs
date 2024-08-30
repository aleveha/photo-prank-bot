/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["grammy", "@grammyjs/auto-retry", "@grammyjs/ratelimiter"],
	},
};

export default nextConfig;
