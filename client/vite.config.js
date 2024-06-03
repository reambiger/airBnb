import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import styleX from "vite-plugin-stylex" 

export default defineConfig({
  // Add styleX() to the plugins
  plugins: [react(), styleX()],
})

