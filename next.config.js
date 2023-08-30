const withPWA = require('next-pwa');

const config = {
	// your next config...
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
}

module.exports = withPWA({
	dest: 'public',
	register: true,
	skipWaiting: true,
	// disable: process.env.NODE_ENV === 'development',
})(config);

