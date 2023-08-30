/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
	// register: true,
	// skipWaiting: true,
	// disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
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

//   experimental: {
//     serverActions: true,
//   },
//   typescript: {
// 	ignoreBuildErrors: true,
//  },
})
