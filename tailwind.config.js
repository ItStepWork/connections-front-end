/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				mainBG: '#191a1f',
				componentBG: '#141519',
				componentBorder: '#313235',
				darkModeBg: '#191a1f',
				darkModeFg: '#ffff',
				whiteModeBg: '#ffff',
				whiteModeFg: '#0000',
			},
		},
	},
	plugins: [],
}
