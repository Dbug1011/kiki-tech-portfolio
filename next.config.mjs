/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'assets.aceternity.com',
			},
			{
				hostname: 'https://i.imgur.com',
			},
		],
	},
};

export default nextConfig;
