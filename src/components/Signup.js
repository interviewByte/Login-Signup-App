import {
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "../css/Signup.css";
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation patterns
  const onlyAlphabets = /^[a-zA-Z\s]+$/;
  const alphanumericWithSpecialChars =
    /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]*$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\+?[0-9]{1,4}?[0-9]{6,12}$/;
  // Toggle password visibility
  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Validation function
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (!value) {
          error = "Name is required";
        } else if (!onlyAlphabets.test(value)) {
          error = "Name can only contain alphabets";
        }
        break;

      case "username":
        if (!value) {
          error = "Username is required";
        } else if (!alphanumericWithSpecialChars.test(value)) {
          error =
            "Username can only contain alphanumeric and special characters";
        }
        break;

      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!emailPattern.test(value)) {
          error = "Please enter a valid email address";
        }
        break;

      case "phone":
        if (!value) {
          error = "Phone number is required";
        } else if (!phonePattern.test(value)) {
          error =
            "Please enter a valid phone number with country code (e.g., +1234567890)";
        }
        break;

      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!alphanumericWithSpecialChars.test(value)) {
          error =
            "Password can only contain alphanumeric and special characters";
        } else if (value === formData.username) {
          error = "Password cannot be the same as username";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password";
        } else if (value !== formData.password) {
          error = "Passwords do not match";
        }
        break;

      default:
        break;
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
    const hasValues = Object.values(formData).every((field) => field.trim());
    const hasNoErrors = Object.values(errors).every((error) => !error);

    setIsFormValid(hasValues && hasNoErrors);
  }, [formData, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", formData);
      navigate("/login");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        {/* Header */}
        <div className="signup-header">
          <Typography variant="h6" align="center">
            Create new Account
          </Typography>
        </div>

        {/* Body */}
        <div>
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <TextField
                name="name"
                label="Name"
                variant="filled"
                fullWidth
                className="signup-input"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                name="username"
                label="Username"
                variant="filled"
                fullWidth
                className="signup-input"
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </div>

            <div className="form-row">
              <TextField
                name="email"
                label="Email"
                variant="filled"
                fullWidth
                className="signup-input"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                name="phone"
                label="Phone No."
                variant="filled"
                fullWidth
                className="signup-input"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={
                  errors.phone || "Include country code (e.g., +1234567890)"
                }
                placeholder="+1234567890"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+</InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="form-row">
              <TextField
                name="password"
                label="New Password"
                type={showPassword.password ? "text" : "password"}
                variant="filled"
                fullWidth
                className="signup-input"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleClickShowPassword("password")}
                        edge="end"
                      >
                        {showPassword.password ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="confirmPassword"
                label="Confirm New Password"
                type={showPassword.confirmPassword ? "text" : "password"}
                variant="filled"
                fullWidth
                className="signup-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          handleClickShowPassword("confirmPassword")
                        }
                        edge="end"
                      >
                        {showPassword.confirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              className="signup-btn"
              disabled={!isFormValid}
              sx={{
                backgroundColor: isFormValid ? "#1976d2" : "#ccc",
                "&:hover": {
                  backgroundColor: isFormValid ? "#1565c0" : "#ccc",
                },
                minWidth: "120px",
              }}
            >
              SIGN UP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
