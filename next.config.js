/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
	register: true,
	skipWaiting: true,
})

module.exports = {
	images: {
		domains: [
			'loremflickr.com',
			'picsum.photos',
			'cloudflare-ipfs.com',
			'avatars.githubusercontent.com',
		],
		formats: ['image/avif', 'image/webp'],
	},
	withPWA,
}
