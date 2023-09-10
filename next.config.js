const withPWA = require("@ducanh2912/next-pwa").default({
	
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
		],
		formats: ['image/avif', 'image/webp'],
	},
});
