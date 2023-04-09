/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
		'./docs/.vitepress/**/*.{js,ts,vue}',
    "./docs/**/*.md",
  ],
}

