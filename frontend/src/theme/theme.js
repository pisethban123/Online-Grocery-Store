import { createTheme } from "@mui/material";

const main = "#ff5733";
const lightMain = "#fca592";
const darkMain = "#C70039";

const theme = createTheme({
  palette: {
    primary: {
      main,
      soft: "#fff8f6",
      green: "#92cf23",
      yellow: "#FFC300",
      maroon: "#900C3F",
      grey: "90a4ae",
      lightMain,
      lightGreen: "#DAF7A6",
      lightYellow: "#fbe088",
      ligthMaroon: "#f5a1c2",
      white: "#FFFFFF",
      black: "#000000",
      lightgrey: "e0e0e0",
      darkMain,
      darkGreen: "#beda8b",
      darkYellow: "e4af02",
      darkMaroon: "#581845",
      darkGrey: "#616161",
    },
  },
  typography: {
    fontFamily: ["Outfit", "sans-serif"].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      color: main,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#00000",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#00000",
    },
    h4: {
      fontSize: "1.1rem",
      fontWeight: 500,
      color: "#900C3F",
    },
  },
});

export default theme;
