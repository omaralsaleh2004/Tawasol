import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useRef, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/BaseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const LoginPage = () => {
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      setError("Check submitted data");
      return;
    }

    console.log(email, password);
    // Make the call to API  to create user
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const token = await response.json();
    if (!response.ok) {
      setError(token);
      return;
    }
    setError("");
    login(email, token);
    navigate("/home");
    console.log(token);
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: 6,
        }}
      >
        <Typography variant="h5">Login to Your Account</Typography>
        <Box
          sx={{
            minWidth: "35%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: "12%",
            border: 1,
            p: 4,
            borderColor: "#f5f5f5",
          }}
        >
          <TextField inputRef={emailRef} label="Email" name="email" />
          <TextField
            type="password"
            inputRef={passwordRef}
            label="Password"
            name="password"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              pt: 6,
            }}
          >
            <Button
              onClick={onSubmit}
              variant="contained"
              style={{ width: "100%" }}
            >
              Login
            </Button>
            <Typography sx={{ marginTop: "10px", color: "#214cb0" }}>
              Don't have an account?{" "}
              <Link
                style={{ color: "#214cb0", textDecoration: "none" }}
                to="/register"
              >
                Sign Up
              </Link>
            </Typography>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
