// Login page

// Default
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import CustomInput from "../../forms/input/CustomInput";
import CustomIconComponent from "../../components/icon/CustomIconComponent";
import CustomButton from "../../forms/button/CustomButton";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/features/AuthSlice";

// Utils
import { EDISPATCHED } from "../../utils/Constants";
import { fetchPOSTRequest } from "../../utils/Services";

// Assets
import LOGO from "../../assets/images/logo-1024.png";

// Context
import { useLoader } from "../../context/LoaderContext";
import { useToast } from "../../context/ToastContext";
import { setBusinessDetails } from "../../store/features/BusinessSlice";

const StyledContent = styled("div")(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  maxWidth: 480,
  padding: theme.spacing(8, 0),
}));

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const { business } = useSelector((state) => state.business)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required.")
      .email("Enter valid email."),
    password: Yup.string().required("Password in required."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      startLoading();
      const response = await fetchPOSTRequest(`/auth/login`, values);
      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.message,
          severity: "success",
        });
        stopLoading();
        dispatch(loginUser(response));
        dispatch(setBusinessDetails({ ...business?.business_details, name: response?.business_name}));
        navigate(`/fleet`);
        formik.resetForm();
      } else {
        setToast({
          open: true,
          message: response?.message,
          severity: "error",
        });
        stopLoading();
      }
    },
  });

  return (
    <>
      <HelmetComponent title={`${EDISPATCHED} | Login`} />

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
            <Link href={"register"} variant="subtitle2">
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
                <CustomIconComponent
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
              isLoading={isLoading}
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

export default LoginPage;
