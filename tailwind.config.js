/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './docs/.vitepress/**/*.js',
      './docs/.vitepress/**/*.vue',
      './docs/.vitepress/**/*.ts',
    ],
    options: {
      safelist: ['html', 'body'],
    }
  },
  content: [
    "./index.html",
		'./docs/.vitepress/**/*.{js,ts,vue}',
    "./docs/**/*.md",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

