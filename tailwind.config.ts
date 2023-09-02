import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          "2xl": "1200px",
        },
      },
      colors: {
        primary: {
          def: "#1A56DB",
        },
        secondary: {
          def: "#000000",
        },
        grey: {
          def: "#F7F7F7",
        },
      },
      backgroundImage: {},
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
