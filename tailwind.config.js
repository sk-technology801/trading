/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
theme: {
  extend: {
    colors: {
      dark: '#0f0f0f',
      neon: '#00ffc6',
      blackish: '#090e15',
      terminal: '#0c0f2f',
      cyberpurple: '#a855f7',
      glass: 'rgba(255, 255, 255, 0.05)', // for backdrop
    },
  },
},
  plugins: [],
};
