import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  CircularProgress,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Custom theme with primary color
const theme = createTheme({
  palette: {
    primary: {
      main: "#CB6040",
    },
  },
});

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    // Basic validation
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      return;
    }
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "Password is required" }));
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setErrors({ password: "Invalid email or password" });
      }
    } catch (err) {
      setErrors({ password: "An error occurred during login" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box className="flex justify-center items-center min-h-screen bg-gray-100">
        <Paper className="w-full sm:max-w-md max-w-sm p-8 rounded-lg shadow-md bg-white">
          <Typography
            variant="h5"
            component="h2"
            className="text-center font-semibold mb-6 text-gray-800"
          >
            Login
          </Typography>

          {isSuccess && (
            <Typography variant="body2" color="primary" className="mb-4 text-center">
              Login Successful! Redirecting...
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mb-4"
              error={!!errors.email}
              helperText={errors.email}
              autoFocus
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mb-6"
              error={!!errors.password}
              helperText={errors.password}
              sx={{ marginBottom: 3 }}
            />

            {isLoading ? (
              <Box className="flex justify-center mb-4">
                <CircularProgress />
              </Box>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="mt-4 py-2"
              >
                Login
              </Button>
            )}
          </form>

          <Box className="flex justify-center mt-4">
            <Typography
              variant="body2"
              color="primary"
              sx={{
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Sign Up
            </Typography>
          </Box>

          <Box className="flex justify-center mt-2">
            <Typography
              variant="body2"
              color="primary"
              sx={{
                textAlign: "center",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}
