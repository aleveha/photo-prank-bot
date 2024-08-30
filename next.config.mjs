/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: ["grammy", "@grammyjs/auto-retry", "@grammyjs/ratelimiter"],
		// instrumentationHook: true,
	},
};

export default nextConfig;
