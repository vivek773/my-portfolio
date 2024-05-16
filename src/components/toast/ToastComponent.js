// Toast alert component

// Default
import React from "react";

// MUI component
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

// Context
import { useToast } from "../../context/ToastContext"; 

const ToastAlertComponent = () => {
  const { toast, setToast } = useToast();

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({
      ...toast,
      open: false,
    });
  };

  return (
    <Snackbar
      open={toast.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert severity={toast.severity} onClose={handleClose}>
        {toast.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ToastAlertComponent;
