import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        red: '#FF7148',
        green: '#8FC161',
        blue: '#08A8DD',
        yellow: '#F3D32C',
      },
      fontFamily: {
        dynapuff: ['dynaPuff'],
        rajdhani: ['rajdhani'],
      },
    },
  },
  plugins: [],
};
export default config;