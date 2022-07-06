import React from "react";
import { Modal, TextField, Box, Typography, Button } from "@mui/material";
import { red, green } from "@mui/material/colors";
import axios from "../../utils/axios";
import { useEffect } from "react";
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

const Login = ({ open, handleClose, setUser }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [responseMsg, setResponseMsg] = React.useState("");
  const [statusCode, setStatusCode] = React.useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    axios
      .post("/user/login", formData)
      .then((res) => {
        if (res.status !== 200) setResponseMsg(res.data.errors[0]);
        else {
          console.log(res.data.token);
          localStorage.setItem("token", res.data.token);
          setUser(true);
          setStatusCode(res.status);
          handleClose();
        }
      })
      .catch((err) => {
        console.log("err", err);
        if (err) setResponseMsg(err.response.data.message);
      });
  };

  useEffect(() => {
    setResponseMsg("");
    setStatusCode(0);
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form method="post" onSubmit={handleSubmit}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Login
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, marginBottom: "10px" }}
          >
            Please fill out the text fields
          </Typography>

          <TextField
            id="email"
            label="Email"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            margin="dense"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Typography
            variant="subtitle2"
            color={statusCode === 200 ? green[500] : red[500]}
          >
            {responseMsg}
          </Typography>
          <Box textAlign="right">
            <Button
              type="submit"
              variant="contained"
              sx={{ margin: "5px" }}
              disabled={!(password.length > 0 && email.length > 0)}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default Login;
