import { Modal, Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SuccessModal = ({ success, setSuccess, successType }) => {
  const handleClose = () => setSuccess(false);

  return (
    <Modal
      open={success}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Success Message
        </Typography>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          color={green[500]}
        >
          {successType === "signup" ? "Welcome! Successfully signed up!" : ""}
        </Typography>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
