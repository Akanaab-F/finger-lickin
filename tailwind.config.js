/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      lightFont: ["TTInterface-Light", "sans-serif"],
      regularFont: ["TTInterface-Regular", "sans-serif"],
      mediumFont: ["TTInterface-Medium", "sans-serif"],
      boldFont: ["TTInterface-Bold", "sans-serif"],
    },
    extend: {
      colors: {
        text100: "#CDCCCC",
        text200: "#9A999A",
        text300: "#686767",
        text400: "#353435",
        background100: "#FEFAFB",
        background200: "#FDF6F7",
        background300: "#FBF1F2",
        background400: "#FAEDEE",
        background600: "#C7BABB",
        primary300: "#F87D6C",
        primary400: "#F6523B",
        primary500: "#F4270A",
      },
      backgroundImage: {
        backgroundLayer:
          "url('./assets/images/background/background-layer-white.png')",
      },
    },
    screens: {
      xxxl: { max: "160em" }, //2560px
      xxl: { max: "120em" }, //1920px
      xl: { max: "90em" }, //1440px
      lg: { max: "64em" }, //1024px
      md: { max: "58.75em" }, //940px
      tablet: { max: "48em" }, //768px
      sm: { max: "40em" }, //640px
      xs: { max: "26.5625em" }, //425px
      xxs: { max: "23.4375em" }, //375px
      xxxs: { max: "20em" }, //320px
    },
  },
  plugins: [],
};
