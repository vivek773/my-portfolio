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

// Assets
import LOGO from "../../assets/images/logo-1024.png";

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

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required."),
    lastName: Yup.string().required("Last name is required."),
    email: Yup.string().required("Email is required.").email("Enter valid email."),
    password: Yup.string().required("Password in required."),
    confirmPassword: Yup.string().required("Confirm password in required.").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    businessName: Yup.string().required("Business name in required."),
    phoneNumber: Yup.string().required("Phone number in required."),
    businessStreet: Yup.string().required("Business street in required."),
    businessUnit: Yup.string().required("Business Unit in required."),
    businessCity: Yup.string().required("Business City in required."),
    businessState: Yup.string().required("Business State in required."),
    businessZipCode: Yup.string().required("Business zip code in required.")
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      businessName: "",
      phoneNumber: "",
      businessStreet: "",
      businessUnit: "",
      businessCity: "",
      businessState: "",
      businessZipCode: ""
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values, "values");
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
            <Typography variant="h5">
              Customer Information
            </Typography>
            <CustomInput
              name="firstName"
              label="First Name"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="lastName"
              label="Last Name"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="email"
              label="Email"
              value={formik.values.firstName}
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
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              formik={formik}
            />
          </Box>

          <Box display={"flex"} flexDirection={"column"} gap={4} mt={5}>
            <Typography variant="h5">
              Business Information
            </Typography>
            <CustomInput
              name="businessName"
              label="Business Name"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="phoneNumber"
              label="Phone Number"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              formik={formik}
              helperText="123-456-7890"
            />
            <CustomInput
              name="businessStreet"
              label="Business Street"
              value={formik.values.businessStreet}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="businessUnit"
              label="Business Unit"
              value={formik.values.businessUnit}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="businessCity"
              label="Business City"
              value={formik.values.businessCity}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomSelect 
              name="businessState"
              label="Business State"
              value={formik.values.businessState}
              onChange={formik.handleChange}
              options={US_STATES}
              formik={formik}
            />
            <CustomInput
              name="businessZipCode"
              label="Business Zip Code"
              value={formik.values.businessZipCode}
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