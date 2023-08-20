/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{ts,tsx}',
		'./public/**/*.html',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			boxShadow: {
        'customTransparent': '0 8px 32px 0 rgba(31, 38, 31, 0.37)',
				'animateDropButton':	'0 0 100px rgb(12 188 135) , inset 0 0 10px rgb(12 188 135),0 0 5px rgb(255, 255, 255)'
      },
			colors: {
				mainBG: '#191a1f',
				componentBG: '#141519',
				componentBorder: '#313235',
				componentText: '#A1A1A8',
				darkModeBg: '#191a1f',
				darkModeButtonBg: '#202227',
				darkModeFg: '#ffff',
				whiteModeBg: '#eff2f6',
				whiteModeButtonBg: '#eef0f2',
				whiteModeFg: '#676a79',
				whiteModeBorder: '#e1e4e6',
				whiteModeHoverBg: '#caccce',
				buttonBlueOpacity: '#0f6fec1a',
				redOpacity: '#d6293e1a',
				greenOpacity: '#0cbc871a',
				buttonBlue: '#0f6fec',
				buttonRed: '#d6293e',
				buttonGreen: '#0cbc87',
				blackOpacity: 'rgba(0,0,0,0.7)',
				glassOpacity: 'rgba(49, 50, 53, 0.2 )',
				glassWhite: 'rgba( 255, 255, 255, 0 )',

			},
			fontFamily: {
				logo : '--logo-font',
			}
		},
	},
	plugins: [],
}
