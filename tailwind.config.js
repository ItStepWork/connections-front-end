/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
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
				main_background: '#191a1f',
				dark_background: '#141519',
				dark_border: '#313235',
				dark_text_gray: '#A1A1A8',
				dark_button_BG: '#202227',
				light_background: '#eff2f6',
				light_button_BG: '#eef0f2',
				light_text: '#676a79',
				light_border: '#e1e4e6',
				light_button_BG_hover: '#caccce',
				button_blue_opacity: '#0f6fec1a',
				button_red_opacity: '#d6293e1a',
				button_green_opacity: '#0cbc871a',
				button_blue_BG: '#0f6fec',
				button_red_BG: '#d6293e',
				button_green_BG: '#0cbc87',
				glass_gray: 'rgba(49, 50, 53, 0.2 )',
				glass_white: 'rgba( 255, 255, 255, 0 )',

			},
			fontFamily: {
				logo : '--logo-font',
			}
		},
	},
	plugins: [],
}
