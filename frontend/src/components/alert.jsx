import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
} from "@mui/material";

const AlertDialog = ({
  open,
  onClose,
  title = "",
  message = "",
  severity = "",
  confirmText = "",
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          width: "70%",
          maxWidth: "600px",
          height: "auto",
        },
      }}
    >
      <DialogTitle sx={{ fontSize: "1.5rem" }}>{title}</DialogTitle>

      <DialogContent>
        <Alert severity={severity} sx={{ fontSize: "1.1rem" }}>
          {message}
        </Alert>
      </DialogContent>

      <DialogActions sx={{ mb: 1, justifyContent: "center" }}>
        <Button onClick={onConfirm || onClose} autoFocus variant="contained">
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
