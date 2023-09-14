import { nextui } from "@nextui-org/react"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            focus: "#FF00E5",
            primary: {
              100: "#FFCCE7",
              200: "#FF99D8",
              300: "#FF66D3",
              400: "#FF3FDA",
              500: "#FF00E5",
              600: "#DB00D8",
              700: "#A800B7",
              800: "#7A0093",
              900: "#5A007A",
              DEFAULT: "#FF00E5",
              foreground: "#ffffff",
            },
          },
        },
      },
    }),
  ],
}
