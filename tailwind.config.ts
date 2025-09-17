/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Include all JS/TS files in src
    './app/**/*.{js,ts,jsx,tsx}', // Include all JS/TS files in app directory
  ],
  theme: {
    extend: {
      // Custom colors, spacing, etc. can be added here
    },
  },
  plugins: [],
};
//rotate-in-2-ccw
module.exports = {theme:{extend:{ animation:{'rotate-in-2-ccw':'rotate-in-2-ccw 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both'},keyframes:{'rotate-in-2-ccw':{'0%':{'transform':'rotate(45deg)','opacity':'0'},'to':{'transform':'rotate(0)','opacity':'1'}}} }}}