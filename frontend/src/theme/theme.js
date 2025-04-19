import { createTheme } from "@mui/material";

const main = "#ff5733";
const lightMain = "#fca592";
const darkMain = "#C70039";

const { breakpoints } = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main,
      soft: "#fff8f6",
      green: "#92cf23",
      yellow: "#FFC300",
      maroon: "#900C3F",
      white: "#FFFFFF",
      black: "#000000",
      grey: "90a4ae",
    },
    light: {
      lightMain,
      green: "#DAF7A6",
      yellow: "#fbe088",
      maroon: "#f5a1c2",
      white: "#FFFFFF",
      black: "#000000",
      grey: "e0e0e0",
    },
    dark: {
      darkMain,
      green: "#beda8b",
      yellow: "e4af02",
      maroon: "#581845",
      grey: "#616161",
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
      fontWeight: 500,
      color: "#00000",
    },
    h4: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#90a4ae",
    },
    body: {
      fontSize: "1rem",
      fontWeight: 400,
      color: "#900C3F",
    },
  },
});

export default theme;
