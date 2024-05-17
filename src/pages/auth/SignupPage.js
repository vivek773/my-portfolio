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
import CustomSelect from "../../forms/select/CustomSelect";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Utils
import { US_STATES, EDISPATCHED } from "../../utils/Constants";
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

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First name is required."),
    last_name: Yup.string().required("Last name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Enter valid email."),
    password: Yup.string().required("Password is required."),
    // confirm_password: Yup.string()
    //   .required("Confirm password is required.")
    //   .oneOf([Yup.ref("password"), null], "Passwords must match"),
    business_name: Yup.string().required("Business name is required."),
    business_phone: Yup.string().required("Phone number is required."),
    street_address: Yup.string().required("Business street is required."),
    // business_unit: Yup.string().required("Business Unit is required."),
    business_city: Yup.string().required("Business City is required."),
    business_state: Yup.string().required("Business State is required."),
    business_zip: Yup.string().required("Business zip code is required."),
    primary_airport_code: Yup.string().required("Airport code is required."),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      // confirm_password: "",
      business_name: "",
      business_phone: "",
      street_address: "",
      // business_unit: "",
      business_city: "",
      business_state: "",
      business_zip: "",
      primary_airport_code: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      startLoading();
      const response = await fetchPOSTRequest(`/auth/owner/sign-up`, values);
      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.message,
          severity: "success",
        });
        navigate(`/login`);
        stopLoading();
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
      <HelmetComponent title={`${EDISPATCHED} | Register`} />

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
                <CustomIconComponent
                  icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                />
              }
              onIconClick={() => setShowPassword(!showPassword)}
              formik={formik}
            />

            {/* <CustomInput
              name="confirm_password"
              label="Confirm Password"
              type="password"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              formik={formik}
            /> */}
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
              name="business_phone"
              label="Phone Number"
              value={formik.values.business_phone}
              onChange={formik.handleChange}
              formik={formik}
              helperText="123-456-7890"
            />
            <CustomInput
              name="street_address"
              label="Business Street"
              value={formik.values.street_address}
              onChange={formik.handleChange}
              formik={formik}
            />
            {/* <CustomInput
              name="business_unit"
              label="Business Unit"
              value={formik.values.business_unit}
              onChange={formik.handleChange}
              formik={formik}
            /> */}
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
              name="business_zip"
              label="Business Zip Code"
              value={formik.values.business_zip}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="primary_airport_code"
              label="Airport Code"
              value={formik.values.primary_airport_code}
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
            <Link href={"login"} variant="subtitle2">
              Login
            </Link>
          </Typography>
        </StyledContent>
      </Container>
    </>
  );
};

export default SignupPage;
