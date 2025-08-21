import { TextField, Button, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const alphanumericWithSpecialChars =
    /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/;

  // Validation function
  const validateField = (name, value) => {
    let error = "";
    if (name === "username") {
      if (!value) {
        error = "Username is required";
      } else if (!alphanumericWithSpecialChars.test(value)) {
        console.log("Inside alpha");
        error =
          "Username can only contain alphanumeric characters and special characters";
      }
    } else if (name === "password") {
      if (!value) {
        error = "Password is required";
      } else if (!alphanumericWithSpecialChars.test(value)) {
        error =
          "Password can only contain alphanumeric characters and special characters";
      } else if (value === formData.username) {
        error = "Password cannot be the same as username";
      }
    }

    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate the changed field immediately
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  useEffect(() => {
    // Check if all fields are filled and no errors
    const hasValues = formData.username.trim() && formData.password.trim();
    const hasNoErrors = !errors.username && !errors.password;

    setIsFormValid(hasValues && hasNoErrors);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Header */}
        <div className="login-header">
          <h2>Login</h2>
          <p>Sign in to continue</p>
        </div>

        {/* Form */}
        <div className="form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              variant="filled"
              fullWidth
              className="login-input"
              value={formData.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
            />

            <TextField
              name="password"
              label="New Password"
              variant="filled"
              type={showPassword ? "text" : "password"}
              fullWidth
              className="login-input"
              value={formData.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              className="login-btn"
              fullWidth
            >
              LOGIN
            </Button>
          </form>
        </div>

        {/* Footer */}
        <p className="signup-text">
          Don’t have Account? <Link to="/signup">SignUp</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
