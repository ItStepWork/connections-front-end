const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	customWorkerSrc: "worker",
	disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
	// Your Next.js config
	reactStrictMode: true,
	images: {
		domains: [
			'loremflickr.com',
			'picsum.photos',
			'cloudflare-ipfs.com',
			'avatars.githubusercontent.com',
			'firebasestorage.googleapis.com',
			'news.google.com',
		],
		formats: ['image/avif', 'image/webp'],
	},
});
