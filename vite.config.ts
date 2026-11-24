import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // GitHub Pages 및 로컬 실행 하위 호환성을 위해 상대 경로 사용
  server: {
    port: 3000,
    open: true
  }
})
