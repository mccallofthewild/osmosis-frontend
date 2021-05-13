const defaultTheme = require('tailwindcss/defaultTheme');

const spacing = {
	0: '0px',
	0.25: '1px',
	0.5: '2px',
	0.75: '3px',
	1: '4px',
	1.25: '5px',
	1.5: '6px',
	2: '8px',
	2.5: '10px',
	3: '12px',
	3.5: '14px',
	3.75: '15px',
	4: '16px',
	4.5: '18px',
	5: '20px',
	6: '24px',
	7: '28px',
	7.5: '30px',
	8: '32px',
	8.75: '35px',
	9: '36px',
	10: '40px',
	12.5: '50px',
	15: '60px',
	17.5: '70px',
	20: '80px',
};
const sizes = {
	0: '0px',
	3: '0.75rem',
	3.5: '0.875rem',
	4: '1rem',
	4.5: '1.125rem',
	5: '1.25rem',
	6: '1.5rem',
	7: '1.75rem',
	8: '2rem',
	9: '2.25rem',
	10: '2.5rem',
	11: '2.75rem',
	12: '3rem',
	13: '3.25rem',
	14: '3.5rem',
	15: '3.75rem',
	16: '4rem',
	18: '4.5rem',
	20: '5rem',
	24: '6rem',
	28: '7rem',
	30: '7.5rem',
	32: '8rem',
	40: '10rem',
	50: '12.5rem',
	75: '18.75rem',
	150: '37.5rem',
};
const screenWidths = {
	// 'screen-md': 'var(--screens-md)',
	'screen-lg': 'var(--screens-lg)',
	'true-screen': 'calc(100vw - var(--sidebar-open))',
};
const sidebarWidths = {
	'sidebar-open': 'var(--sidebar-open)',
	'sidebar-closed': 'var(--sidebar-closed)',
};
const genericWidths = {
	table: '1000px',
	max: '1920px',
};
module.exports = {
	future: {
		removeDeprecatedGapUtilities: false,
		purgeLayersByDefault: false,
	},
	purge: ['./components/**/*.js', './pages/**/*.js', './constants/**/*.js'],
	theme: {
		fontFamily: {
			title: ['Poppins', 'ui-sans-serif', 'system-ui'],
			body: ['Inter', 'ui-sans-serif', 'system-ui'],
		},
		fontSize: {
			xs: '12px',
			sm: '14px',
			base: '16px',
			lg: '20px',
			xl: '24px',
			'2xl': '36px',
			'3xl': '48px',
			'4xl': '60px',
			'5xl': '96px',
		},
		boxShadow: {
			container: '0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
			'elevation-08dp':
				'0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)',
			'elevation-24dp':
				'0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)',
			'elevation-04dp':
				'0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.2)',
		},
		colors: {
			white: {
				high: 'rgba(255, 255, 255, 0.95)',
				emphasis: 'rgba(255, 255, 255, 0.87)',
				mid: 'rgba(255, 255, 255, 0.6)',
				disabled: 'rgba(255, 255, 255, 0.38)',
				faint: 'rgba(255, 255, 255, 0.12)',
			},
			transparent: 'transparent',
			primary: {
				50: '#8A86FF',
				100: '#4540D8',
				200: '#322DC2',
				300: '#2722BB',
				400: '#1D18A8',
				500: '#16119E',
				600: '#110D8B',
				700: '#0A0674',
				800: '#080559',
				900: '#02003F',
			},
			primaryVariant: '#0A0674',
			secondary: {
				50: '#F4CC82',
				100: '#D9B575',
				200: '#C4A46A',
				300: '#BC9856',
				400: '#B88E42',
				500: '#AA7E2D',
				600: '#9C701D',
				700: '#92630B',
				800: '#875903',
				900: '#734B00',
			},
			wireframes: {
				grey: '#818181',
				lightGrey: '#B7B7B7',
			},
			background: '#170F34',
			surface: '#231D4B',
			card: '#2D2755',
			cardInner: '#3C356D',
			iconDefault: '#8E83AA',
			error: '#CF6679',
			enabledGold: '#C4A46A',
			pass: '#34EF52',
			missionError: '#EF3456',
			black: '#000000',
		},
		backgroundColor: themes => ({
			...themes('colors'),
			container: {
				hover: 'rgba(255, 255, 255, 0.04)',
				focus: 'rgba(255, 255, 255, 0.12)',
				selected: 'rgba(255, 255, 255, 0.08)',
			},
			button: {
				hover: 'rgba(196, 164, 106, 0.08)',
			},
		}),
		backgroundImage: {
			'gradients-socialLive': 'linear-gradient(180deg, #89EAFB 0%, #1377B0 100%)',
			'gradients-greenBeach': 'linear-gradient(180deg, #00CEBA 0%, #008A7D 100%)',
			'gradients-kashmir': 'linear-gradient(180deg, #6976FE 0%, #3339FF 100%)',
			'gradients-frost': 'linear-gradient(180deg, #0069C4 0%, #00396A 100%)',
			'gradients-cherry': 'linear-gradient(180deg, #FF652D 0%, #FF0000 100%)',
			'gradients-sunset': 'linear-gradient(180deg, #FFBC00 0%, #FF8E00 100%)',
			'gradients-orangeCoral': 'linear-gradient(180deg, #FF8200 0%, #FF2C00 100%)',
			'gradients-pinky': 'linear-gradient(180deg, #FF7A45 0%, #FF00A7 100%)',
		},
		screens: {
			...defaultTheme.screens,
			// sm: '820px',
			// base: '1060px',
			// md: 'var(--screens-md)',
			// XXX: 이 부분의 의미를 모르겠슴...
			// lg: 'var(--screens-lg)',
		},
		spacing: {
			...spacing,
		},
		extend: {
			height: {
				...sizes,
				screen: '100vh',
			},
			minHeight: {
				...sizes,
				screen: '100vh',
				'sidebar-minHeight': 'var(--sidebar-minHeight)',
			},
			maxHeight: {
				...sizes,
				screen: '100vh',
			},
			width: {
				screen: '100vw',
				fit: 'fit-content',
				...sizes,
				...screenWidths,
				modal: '41.25rem',
			},
			minWidth: {
				...screenWidths,
				...sidebarWidths,
				...genericWidths,
				modal: '41.25rem',
			},
			maxWidth: {
				...sizes,
				...screenWidths,
				...sidebarWidths,
				...genericWidths,
				modal: '41.25rem',
			},
			borderOpacity: {
				40: '0.4',
				75: '0.75',
			},
			borderColor: theme => ({
				...theme('colors'),
				DEFAULT: 'rgba(255, 255, 255, 0.12)',
			}),
			zIndex: {
				50: 50,
				60: 60,
				70: 70,
				80: 80,
				90: 90,
				100: 100,
			},
			variants: {
				rotate: ['hover', 'group-hover'],
				display: ['responsive', 'hover', 'group-hover'],
				opacity: ['hover'],
				borderWidth: ['hover', 'responsive'],
				backgroundColor: ['even', 'hover'],
				fontSize: ['responsive'],
				zIndex: ['hover'],
			},
		},
	},
	plugins: [require('tailwindcss'), require('precss'), require('autoprefixer')],
};
