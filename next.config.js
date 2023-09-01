const withPWA = require("@ducanh2912/next-pwa").default({
	dest: "public",
	customWorkerSrc: "worker",
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
		],
		formats: ['image/avif', 'image/webp'],
	},
});
