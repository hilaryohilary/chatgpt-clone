/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green': '#10A37F',
        'dark-green': '#059669',
        'white': 'rgb(255,255,255)',
        'error': '#D00E17',
        'text-dark': '#2DD333A',
        'gray-light': '#dee2e6',
        'gray-lightest': '#f1f2f3',
        'gray-mid': '#c2c8d0',
        'background-focus-dark': '#343541',
      }
    },
    
  },
  plugins: [],
}
