/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Tight"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      colors: {
        research: {
          bg: '#07090B', panel: '#101419', paper: '#F4F4EF', text: '#F4F5F2', muted: '#92999F',
          c1: '#6FD6E8', c2: '#C9A86A', c3: '#A99AF4', c4: '#C7F0D5'
        }
      }
    }
  },
  plugins: []
}
