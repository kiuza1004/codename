/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agent: {
          dark: '#0c0f17',
          surface: '#151b28',
          card: '#1e2638',
          border: '#2c364e',
          accent: '#3b82f6',
          red: '#ef4444',
          blue: '#3b82f6',
          neutral: '#e2d9cc',
          assassin: '#18181b',
        }
      },
      fontFamily: {
        spy: ['Pretendard', 'Noto Sans KR', 'sans-serif'],
      },
      boxShadow: {
        'glow-red': '0 0 25px -5px rgba(239, 68, 68, 0.5)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.5)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.5)',
      }
    },
  },
  plugins: [],
}
