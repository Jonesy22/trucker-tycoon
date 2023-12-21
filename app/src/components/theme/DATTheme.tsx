import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const COLORS = {
  //DAT Grey
  "$dat-grey-50": "#F6F7F9",
  "$dat-grey-100": "#E9ECF1",
  "$dat-grey-200": "#C7CFD6",
  "$dat-grey-300": "#9CA5AF",
  "$dat-grey-400": "#7B8793",
  "$dat-grey-500": "#636D79",
  "$dat-grey-600": "#4E5A65",
  "$dat-grey-700": "#3B4854",
  "$dat-grey-800": "#2D3943",
  "$dat-grey-900": "#192129",
  "$dat-grey-1000": "#0A0D10",

  //DAT Blue
  "$dat-blue-50": "#E9EFFE",
  "$dat-blue-100": "#C7D7FA",
  "$dat-blue-200": "#9FBBF7",
  "$dat-blue-300": "#5789F4",
  "$dat-blue-400": "#1C60F2",
  "$dat-blue-500": "#0046E0",
  "$dat-blue-600": "#0041CD",
  "$dat-blue-700": "#0032A8",
  "$dat-blue-800": "#002480",
  "$dat-blue-900": "#001A66",

  //DAT Signal Red
  "$dat-signal-red-100": "#FFE1E0",
  "$dat-signal-red-200": "#FF9C99",
  "$dat-signal-red-300": "#FF6C66",
  "$dat-signal-red-400": "#FF211A",
  "$dat-signal-red-500": "#E10600",
  "$dat-signal-red-600": "#AD0600",
  "$dat-signal-red-700": "#7A0400",

  //DAT Signal Yellow
  "$dat-signal-yellow-100": "#FFF9C0",
  "$dat-signal-yellow-200": "#FFF595",
  "$dat-signal-yellow-300": "#FEF167",
  "$dat-signal-yellow-400": "#FAE700",
  "$dat-signal-yellow-500": "#FFD700",
  "$dat-signal-yellow-600": "#FFC000",
  "$dat-signal-yellow-700": "#FFA700",

  //DAT Flame
  "$dat-flame-50": "#FFF5DA",
  "$dat-flame-100": "#FFEAB2",
  "$dat-flame-200": "#FFDD81",
  "$dat-flame-300": "#FFD14D",
  "$dat-flame-400": "#FFBC04",
  "$dat-flame-500": "#FFAE00",
  "$dat-flame-600": "#FF9B02",
  "$dat-flame-700": "#FE6A07",
  "$dat-flame-special": "#C24E00",

  //DAT Success
  "$dat-success-100": "#CDF8C3",
  "$dat-success-200": "#A9F39B",
  "$dat-success-300": "#7FED6E",
  "$dat-success-400": "#00E107",
  "$dat-success-500": "#00D000",
  "$dat-success-600": "#00BA00",
  "$dat-success-700": "#008002",

  //DAT Regal
  "$dat-regal-100": "#E1BDF5",
  "$dat-regal-200": "#CE91F0",
  "$dat-regal-300": "#B962EB",
  "$dat-regal-400": "#9900E0",
  "$dat-regal-500": "#6D0AD3",
  "$dat-regal-600": "#5000C5",
  "$dat-regal-700": "#3600A3",

  //DAT Pool
  "$dat-pool-100": "#AFF2FF",
  "$dat-pool-200": "#74EAFF",
  "$dat-pool-300": "#00E1FF",
  "$dat-pool-400": "#00DAFD",
  "$dat-pool-500": "#00C1E5",
  "$dat-pool-600": "#00ACC9",
  "$dat-pool-700": "#0097AF",

  //DAT White
  "$dat-white": "#FFFFFF",
  "$dat-white-74-opacity": "rgba($dat-white, 0.74)",
  "$dat-white-87-opacity": "rgba($dat-white, 0.87)",

  //DAT Black
  "$dat-black": "#000000",
  "$dat-black-74-opacity": "rgba($dat-black, 0.74)",
  "$dat-black-87-opacity": "rgba($dat-black, 0.87)",
};

const GRADIENTS = {
  //DAT Gradients

  //DAT Grad Blue
  "$dat-grad-blue-1": `linear-gradient(90deg, ${COLORS["$dat-blue-500"]} 0%, ${COLORS["$dat-blue-800"]} 100%)`,
  "$dat-grad-blue-2": `linear-gradient(90deg, ${COLORS["$dat-blue-400"]} 0%, ${COLORS["$dat-blue-700"]} 100%)`,
  "$dat-grad-blue-3": `linear-gradient(90deg, ${COLORS["$dat-blue-400"]} 0%, ${COLORS["$dat-blue-500"]} 100%)`,
  "$dat-grad-blue-4": `linear-gradient(90deg, ${COLORS["$dat-pool-400"]} 0%, ${COLORS["$dat-blue-500"]} 48.44%, $dat-regal-400 100%)`,
  "$dat-grad-blue-5": `linear-gradient(90deg, ${COLORS["$dat-blue-500"]} 0%, $dat-regal-400 100%)`,
  "$dat-grad-blue-6": `linear-gradient(90deg, ${COLORS["$dat-pool-400"]} 0%, ${COLORS["$dat-blue-500"]} 100%)`,

  //DAT Grad Red
  "$dat-grad-red-1": `linear-gradient(90deg, ${COLORS["$dat-signal-red-500"]} 0%, ${COLORS["$dat-blue-700"]} 100%)`,
  "$dat-grad-red-2": `linear-gradient(90deg, ${COLORS["$dat-signal-red-500"]} 0%, ${COLORS["$dat-signal-yellow-500"]} 100%)`,
  "$dat-grad-red-3": `linear-gradient(90deg, ${COLORS["$dat-signal-red-500"]} 0%, $dat-flame-400 100%)`,
  "$dat-grad-red-4": `linear-gradient(90deg, ${COLORS["$dat-signal-red-500"]} 0%, $dat-regal-400 100%)`,

  //DAT Grad Green
  "$dat-grad-green-1": `linear-gradient(90deg, ${COLORS["$dat-pool-400"]} 0%, $dat-success-300 48.44%, ${COLORS["$dat-signal-yellow-400"]} 100%)`,
  "$dat-grad-green-2": `linear-gradient(90deg, ${COLORS["$dat-signal-yellow-400"]} 0%, $dat-success-400 100%)`,

  //DAT Grad Temp
  "$dat-grad-temp": `linear-gradient(90deg, $dat-success-400 0%, ${COLORS["$dat-signal-yellow-400"]} 49.48%, ${COLORS["$dat-signal-red-400"]} 100%)`,
};

const theme = createTheme({
  palette: {
    primary: {
      main: COLORS["$dat-blue-500"],
      light: COLORS["$dat-blue-100"],
      dark: COLORS["$dat-blue-700"],
      contrastText: COLORS["$dat-white"],
    },
    secondary: {
      main: COLORS["$dat-regal-500"],
      light: COLORS["$dat-regal-100"],
      dark: COLORS["$dat-regal-700"],
      contrastText: COLORS["$dat-white"],
    },
    error: {
      main: COLORS["$dat-signal-red-500"],
      light: COLORS["$dat-signal-red-100"],
      dark: COLORS["$dat-signal-red-700"],
      contrastText: COLORS["$dat-white"],
    },
    warning: {
      main: COLORS["$dat-signal-yellow-500"],
      light: COLORS["$dat-signal-yellow-100"],
      dark: COLORS["$dat-signal-yellow-700"],
      contrastText: COLORS["$dat-white"],
    },
    info: {
      main: COLORS["$dat-blue-500"],
      light: COLORS["$dat-blue-100"],
      dark: COLORS["$dat-blue-700"],
      contrastText: COLORS["$dat-white"],
    },
    success: {
      main: COLORS["$dat-success-500"],
      light: COLORS["$dat-success-100"],
      dark: COLORS["$dat-success-700"],
      contrastText: COLORS["$dat-white"],
    },
  },
});

export function DATTheme({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
