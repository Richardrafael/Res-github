/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    backgroundColor: theme => ({
     ...theme('colors'),
     'primary': '#D9D9D9',
     'secondary': '#0B1011',
     'danger': '#e3342f',
    }),
  },
  plugins: [],
}

