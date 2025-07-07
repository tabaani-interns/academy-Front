// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        // Headlines
        h1: ["36px", { lineHeight: "auto", fontFamily: "Roboto" }],
        h2: ["31px", { lineHeight: "auto", fontFamily: "Roboto" }],
        h3: ["25px", { lineHeight: "auto", fontFamily: "Roboto" }],
        h4: ["20px", { lineHeight: "auto", fontFamily: "Roboto" }],
        h5: ["16px", { lineHeight: "auto", fontFamily: "Roboto" }],
        h6: ["13px", { lineHeight: "auto", fontFamily: "Roboto" }],
        // Subtitles
        subtitle: [
          "16px",
          { lineHeight: "24px", fontFamily: "Roboto", fontWeight: "400" },
        ],
        subtitle2: [
          "14px",
          { lineHeight: "24px", fontFamily: "Roboto", fontWeight: "500" },
        ],
        // Body text
        body: [
          "16px",
          { lineHeight: "24px", fontFamily: "Roboto", fontWeight: "400" },
        ],
        body2: [
          "14px",
          { lineHeight: "20px", fontFamily: "Roboto", fontWeight: "400" },
        ],
        // Button
        button: [
          "14px",
          { lineHeight: "20px", fontFamily: "Roboto", fontWeight: "500" },
        ],
        // Input
        input: [
          "12px",
          { lineHeight: "auto", fontFamily: "Roboto", fontWeight: "400" },
        ],
        // Overline
        overline: [
          "10px",
          { lineHeight: "16px", fontFamily: "Roboto", fontWeight: "400" },
        ],
        // Legacy paragraph styles
        paragraph: ["14px", "30px"],
        largeParagraph: ["18px", "34px"],
      },
      colors: {
        primary: {
          DEFAULT: "#FFAF20",
          75: "#FFC243",
          50: "#FFD670",
          25: "#FFE7A1",
          10: "#FFF2C4",
          5: "#FFF9E7",
        },
        secondary: {
          DEFAULT: "#F79646",
          75: "#F9A45F",
          50: "#FAB47F",
          25: "#FCD4B1",
          10: "#FEE9D5",
          5: "#FFF6EF",
        },
        black: {
          DEFAULT: "#3E3232",
          75: "#5C4C4C",
          50: "#817575",
          25: "#AAA1A1",
          10: "#D4D0D0",
          5: "#ECEAEA",
        },
        white: {
          DEFAULT: "#FFFFFF",
          75: "#E4E4E4",
          50: "#C9C9C9",
          25: "#AEAEAE",
          10: "#939393",
          5: "#787878",
        },
        dark: {
          DEFAULT: "#080808",
          75: "#1C1C1C",
          50: "#404040",
          25: "#666666",
          10: "#A3A3A3",
          5: "#C7C7C7",
        },
        stroke: "#E0E0E0",
        background: "#FFFFFF",
        gradient: "#FF8F00",
        "gradient-secondary": "#00E676",
        green: "#00C853",
        lightGreen: "#B9F6CA",
        red: "#D50000",
        lightRed: "#FF8A80",
        blue: "#2962FF",
        lightBlue: "#82B1FF",
      },
    },
  },
  plugins: [],
};
