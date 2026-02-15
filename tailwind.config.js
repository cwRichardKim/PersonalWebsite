/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './_layouts/**/*.html',
    './_includes/**/*.html',
    './_posts/**/*.{md,markdown,html}',
    './_jobs/**/*.{md,markdown,html}',
    './_highlights/**/*.{md,markdown,html}',
    './projects/**/*.{html,md,markdown}'
  ],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {}
  },
  plugins: []
};
