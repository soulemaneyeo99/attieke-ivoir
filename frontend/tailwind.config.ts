import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2D7A3E', // Forest Green
                    foreground: '#FFFFFF',
                },
                secondary: {
                    DEFAULT: '#FF8C42', // Vibrant Orange
                    foreground: '#FFFFFF',
                },
                accent: {
                    DEFAULT: '#F4F9F5', // Light Green Background
                    foreground: '#2D7A3E',
                },
                background: '#FFFFFF',
                foreground: '#333333',
                muted: {
                    DEFAULT: '#F3F4F6',
                    foreground: '#6B7280',
                },
                danger: '#EF4444',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    '2xl': '1280px',
                },
            },
        },
    },
    plugins: [],
}
export default config
