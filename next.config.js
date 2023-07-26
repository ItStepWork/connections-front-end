/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
	dest: 'public',
})

module.exports = withPWA({
	images: {
		domains: [
			'loremflickr.com',
			'picsum.photos',
			'cloudflare-ipfs.com',
			'avatars.githubusercontent.com',
		],
		formats: ['image/avif', 'image/webp'],
	},
})
