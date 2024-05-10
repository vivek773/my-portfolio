// Login page

// Default
import { useState } from "react";
import { Helmet } from "react-helmet-async";

// Formik
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

// MUI styles
import { styled } from "@mui/material/styles";

// Custom
import CustomInput from "../../forms/input";
import CustomIcon from "../../components/icon";
import CustomButton from "../../forms/button";

// Utils
import { LOGIN_HELMET } from "../../utils/HelmetTitle";

// Assets
import LOGO from "../../assets/logo-1024.png";

const StyledContent = styled("div")(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  maxWidth: 480,
}));

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Please enter a  email address.")
      .email("Enter valid email address."),
    password: Yup.string().required("Please enter a password."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values, "values");
    },
  });

  return (
    <>
      <Helmet>
        <title>{LOGIN_HELMET}</title>
      </Helmet>

      <Container maxWidth="sm">
      <StyledContent>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <img
            src={LOGO}
            alt="Logo"
            style={{
              width: "180px",
              height: "180px",
              background: "transparent",
            }}
          />
        </Box>
        
        <Typography variant="h4" gutterBottom>
          Sign in to eDispatched
        </Typography>

        <Typography variant="body2" sx={{ mb: 5 }}>
          Don’t have an account? {""}
          <Link href="/register" variant="subtitle2">
            Get started
          </Link>
        </Typography>

        <Box display={"flex"} flexDirection={"column"} gap={4}>
          <CustomInput
            name="email"
            label="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            formik={formik}
          />
          <CustomInput
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            icon={
              <CustomIcon
                icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
              />
            }
            onIconClick={() => setShowPassword(!showPassword)}
            formik={formik}
          />
          <CustomButton
            label={"Login"}
            size={"large"}
            onClick={formik.handleSubmit}
            disabled={false}
            bgColor={"#479DE1"}
          />
        </Box>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          sx={{ my: 2 }}
        >
          <Link variant="subtitle2" underline="hover" href="/forgot-password">
            Forgot password?
          </Link>
        </Box>
      </StyledContent>
      </Container>
    </>
  );
};

export default Login;
