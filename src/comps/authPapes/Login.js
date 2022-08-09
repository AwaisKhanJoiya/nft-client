import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
// import { AuthContext } from '../../contextApi/AuthContext'
// import { useContext } from 'react';

// const Login = ({ open, handleClose }) => {
const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const [cookies, setCookies] = useCookies();

  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);

  // const { setIsAuth } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    setEmailErr(null);
    setPwdErr(null);
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ email, password: pwd }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.status === 302) {
        setCookies("jwt", data.token, { path: "/", maxAge: 1800 });
        setCookies("uid", data.user, { path: "/", maxAge: 1800 });
        navigate("/");
      } else {
        throw data;
      }
    } catch (error) {
      if (error.errors) {
        if (error.errors.email) {
          setEmailErr(error.errors.email);
        }
        if (error.errors.password) {
          setPwdErr(error.errors.password);
        }
      }
    }
  };

  return (
    <Container>
      <Box sx={style}>
        <Box sx={{ textAlign: "center" }}>
          <Avatar
            sx={{
              bgcolor: "secondary.main",
              display: "inline-block",
            }}
          >
            <LockIcon sx={{ marginTop: "6px" }} />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ color: "#111" }}>
            Log In
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={(e) => handleAuth(e)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <p style={{ fontWeight: "bold", color: "red" }}>{emailErr}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
              <p style={{ fontWeight: "bold", color: "red" }}>{pwdErr}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <div
                onClick={() => navigate("/signup")}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                variant="body2"
              >
                Don't have a account? Sign up
              </div>
            </Grid>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <div
                onClick={() => navigate("/")}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginTop: ".5em",
                }}
                variant="body2"
              >
                Home
              </div>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  maxWidth: 350,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
