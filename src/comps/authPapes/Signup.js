import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Container, Grid, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
// import { AuthContext } from '../../contextApi/AuthContext'
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import { Handshake } from '@mui/icons-material';

// const Signup = ({ open, handleClose }) => {
const Signup = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [pwdErr, setPwdErr] = useState(false);

  const [cookies, setCookies] = useCookies();

  const navigate = useNavigate();

  // const { setIsAuth } = useContext(AuthContext);

  const handleAuth = async (e) => {
    setEmailErr(null);
    setPwdErr(null);
    e.preventDefault();
    try {
      const res = await fetch("https://api.shatokens.com/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password: pwd,
          firstName: fName,
          lastName: lName,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.status === 201) {
        setCookies("jwt", data.token, { path: "/", maxAge: 1800 });
        setCookies("user", data.user, { path: "/", maxAge: 1800 });
        window.location.href = "/";
        // setIsAuth(true)
      } else {
        throw data;
      }
    } catch (error) {
      console.log(error);
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
            Sign up
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={(e) => handleAuth(e)}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={fName}
                onChange={(e) => setFName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) => setLName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="email"
                id="email"
                label="Email Address"
                name="email"
                autoComplete="none"
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <div
                onClick={() => navigate("/login")}
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                variant="body2"
              >
                Already have an account? Sign in
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

export default Signup;

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
