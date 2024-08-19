import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    daisyui,],

  daisyui: {
    themes: ["dark","cupcake",'autumn','light'],
  },
}