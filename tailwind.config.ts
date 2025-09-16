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