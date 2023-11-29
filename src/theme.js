// import { teal, orange, cyan, deepOrange } from "@mui/material/colors";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
const APP_BAR_HEIGHT = "58px";
const BOARD_BAR_HEIGHT = "60px";
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
const COL_HEADER_HEIGHT = "50px";
const COL_FOOTER_HEIGHT = "56px";
// Create a theme instance.
const theme = extendTheme({
  soTay: {
    appBarHeight: APP_BAR_HEIGHT,
    boardHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columHeaderHeight: COL_HEADER_HEIGHT,
    columFooterHeight: COL_FOOTER_HEIGHT,
  },
  colorSchemes: {
    light: {},
    dark: {},
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderWidth: "0.5px",
          // "&:hover": { borderWidth: "0.5px" },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "*::-webkit-scrollbar": { width: "8px", height: "8px" },
          "*::-webkit-scrollbar-thumb": { backgroundColor: "#bdc3c7" },
          "*::-webkit-scrollbar-thumb:hover": { backgroundColor: "white" },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // color: theme.palette.primary.main,
          fontSize: "0.875rem",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": { fontSize: "0.875rem" },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",

          "& fieldset": {
            borderWidth: "0.2px !important",
          },
          "&:hover fieldset": {
            borderWidth: "2px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "2px !important",
          },
        },
      },
    },
  },
});

export default theme;
