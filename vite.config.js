import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Все страницы сайта (multi-page app). Каждая запись — отдельная HTML-страница.
// Чтобы добавить новую страницу, просто создайте файл .html в корне проекта
// и добавьте его здесь — сборка и dev-сервер подхватят его автоматически.
const ROOT = fileURLToPath(new URL('.', import.meta.url))
// index — главная; foreign — единый раздел для иностранцев (документы, медицина,
// общежитие, цены); student — первокурснику; about — о нас.
const pages = ['index', 'foreign', 'student', 'about']

export default defineConfig({
  root: ROOT,
  // Относительные пути в сборке: сайт будет работать и в подпапке
  // (например, https://abituratymgu.github.io/<repo>/ на GitHub Pages),
  // и по любому другому хостингу, и при открытии файлов локально.
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((page) => [page, resolve(ROOT, `${page}.html`)])
      ),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})