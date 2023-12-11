// import React from "react";
import App from "./App.jsx";
import theme from "./theme";

import ReactDOM from "react-dom/client";

import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
//* Cấu hinh react toastify
import { ToastContainer } from "react-toastify";
//* Cấu hình MUI dialog
import { ConfirmProvider } from "material-ui-confirm";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <CssVarsProvider theme={theme}>
    <ConfirmProvider
      defaultOptions={{
        allowClose: false,
        dialogProps: { maxWidth: "xs" },
        buttonOrder: ["confirm", "cancel"],
        cancellationButtonProps: { color: "inherit" },
        confirmationButtonProps: { color: "error", variant: "outlined" },
      }}
    >
      <CssBaseline />
      <App />
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={2000}
      />
    </ConfirmProvider>
  </CssVarsProvider>
  // </React.StrictMode>
);
