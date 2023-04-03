module.exports = {
	content: ['./*/*.php', './*.php', './templates/**/*.twig'],
	theme: {
		fontSize: {
			base: '14px',
			sm: '12px',
			lg: '1.125rem',
			xl: '1.25rem',
			'2xl': '1.5rem',
			'3xl': '1.875rem',
			'4xl': '2.25rem',
			'5xl': '3rem',
			'6xl': '3.75rem',
			'7xl': '4.5rem',
			'8xl': '5.25rem',
			'9xl': '6rem',
		  },
		extend: {
			aspectRatio: {
				'16/9': '16/9',
				'3/2': '3/2',
				'4/3': '4/3',
				'3/4': '3/4',
				'5/7': '5/7',
				'1/1': '1/1',
			},
			colors: {
				white: '#FFFFFF',
				black: '#000000',
				body: 'F5F1EB',
				bodyDark: '#4B4B4B',
				brand: '#9A5026',
				brandLight: '#F5F1EB',
				brandDark: '#534C44',
				footerGrey: '#707070'
			},
			fontFamily: {
				display: ['Inter', 'sans-serif'],
				body: ['Inter', 'sans-serif'],
			},
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1260px',
				'2xl': '1690px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
