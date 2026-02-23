/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#000000',
          neutral: '#404040',
          white: '#ffffff'
        },
        zinc: {
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          500: '#71717a',
          800: '#27272a'
        },
        error: '#ef4444'
      },
      fontFamily: {
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'teko': ['Teko', 'sans-serif']
      },
      fontSize: {
        'display': ['48px', '1.16'],
        'display-m': ['24px', '1.14'],
        'heading-1': ['36px', '1.22'],
        'heading-2': ['32px', '1.25'],
        'heading-3': ['28px', '1.14'],
        'heading-4': ['24px', '1.16'],
        'heading-5': ['20px', '1.2'],
        'p1': ['20px', '1.4'],
        'p2': ['16px', '1.5']
      },
      width: {
        'burger': '36px'
      },
      screens: {
        'tablet': '768px',
        'desktop': '1024px'
      }
    },
  },
  plugins: [],
}
