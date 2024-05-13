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
import CustomSelect from "../../forms/select";

// Utils
import { SIGNUP_HELMET, LOGIN, US_STATES } from "../../utils/Constants";
import { fetchPOSTRequest } from "../../utils/services";

// Assets
import LOGO from "../../assets/images/logo-1024.png";

// Context
import { useLoader } from "../../context/LoaderContext";
import { useToast } from "../../context/ToastContext";

const StyledContent = styled("div")(({ theme }) => ({
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  maxWidth: 480,
  padding: theme.spacing(8, 0),
}));

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required."),
    last_name: Yup.string().required("Last name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Enter valid email."),
    password: Yup.string().required("Password in required."),
    confirm_password: Yup.string()
      .required("Confirm password in required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    business_name: Yup.string().required("Business name in required."),
    phone_number: Yup.string().required("Phone number in required."),
    business_street: Yup.string().required("Business street in required."),
    business_unit: Yup.string().required("Business Unit in required."),
    business_city: Yup.string().required("Business City in required."),
    business_state: Yup.string().required("Business State in required."),
    business_zip_code: Yup.string().required("Business zip code in required."),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      business_name: "",
      phone_number: "",
      business_street: "",
      business_unit: "",
      business_city: "",
      business_state: "",
      business_zip_code: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      startLoading();
      const response = await fetchPOSTRequest(`/auth/owner/sign-up`, values);
      console.log(response, "1111111111111111");
      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.message,
          severity: "success",
        });
        stopLoading();
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
      <Helmet>
        <title>{SIGNUP_HELMET}</title>
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

          <Typography variant="h4" gutterBottom sx={{ mb: 5 }}>
            Create an account
          </Typography>

          <Box display={"flex"} flexDirection={"column"} gap={4}>
            <Typography variant="h5">Customer Information</Typography>
            <CustomInput
              name="first_name"
              label="First Name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="last_name"
              label="Last Name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="email"
              label="Email"
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

            <CustomInput
              name="confirm_password"
              label="Confirm Password"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              formik={formik}
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={4} mt={5}>
            <Typography variant="h5">Business Information</Typography>
            <CustomInput
              name="business_name"
              label="Business Name"
              value={formik.values.business_name}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="phone_number"
              label="Phone Number"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              formik={formik}
              helperText="123-456-7890"
            />
            <CustomInput
              name="business_street"
              label="Business Street"
              value={formik.values.business_street}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="business_unit"
              label="Business Unit"
              value={formik.values.business_unit}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="business_city"
              label="Business City"
              value={formik.values.business_city}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomSelect
              name="business_state"
              label="Business State"
              onChange={(_, newValue) => {
                formik.setFieldValue("business_state", newValue);
              }}
              options={US_STATES}
              formik={formik}
              value={formik.values.business_state}
            />
            <CustomInput
              name="business_zip_code"
              label="Business Zip Code"
              value={formik.values.business_zip_code}
              onChange={formik.handleChange}
              formik={formik}
            />
          </Box>

          <Box mt={5}>
            <CustomButton
              label={"Sign Up"}
              size={"large"}
              onClick={formik.handleSubmit}
              disabled={false}
              bgColor={"#479DE1"}
              isLoading={isLoading}
            />
          </Box>

          <Typography variant="body2" mt={2}>
            Already have an account? {""}
            <Link href={LOGIN} variant="subtitle2">
              Login
            </Link>
          </Typography>
        </StyledContent>
      </Container>
    </>
  );
};

export default Signup;
