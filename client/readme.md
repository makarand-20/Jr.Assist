// react installation
npm create vite@latest
cd client
npm install
npm run dev

// Install tailwind css and headless ui (using react & vite)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

//tailwind file code
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
  ],
}

//index.css file code
@tailwind base;
@tailwind components;
@tailwind utilities;


//head less ui
npm install @headlessui/react @heroicons/react

// install react router dom
npm i react-router-dom

//react icons
npm i react-icons

// install jodit react for editor
npm i jodit-react

//react spinner for loader
npm i react-spinners