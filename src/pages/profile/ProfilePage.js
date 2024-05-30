// Profile page

// Default
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI components
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Custom
import ProfileCardComponent from "../../components/profile/ProfileCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import CustomInput from "../../forms/input/CustomInput";
import CustomIconComponent from "../../components/icon/CustomIconComponent";

// Redux
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const auth = useSelector((state) => state.auth);
  const [showPass, setShowPass] =  useState(false);
  const [showOldPass, setShowOldPass] =  useState(false);
  const [showConfirmPass, setShowConfirmPass] =  useState(false)

  const validationSchema = Yup.object({
    old_password: Yup.string().required("Old Password is required."),
    password: Yup.string().required("Password is required."),
    confirm_password: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return (
    <Container maxWidth="md">
      <ProfileCardComponent
        title="User Information"
        component={
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <Avatar alt="user-initials" sx={{ bgcolor: "#479DE1" }}>
              {`${auth?.first_name.charAt(0)}${auth?.last_name.charAt(0)}`}
            </Avatar>
            <Typography sx={{ margin: "3px 0px" }} variant="subtitle1">
              {auth.first_name} {auth.last_name}
            </Typography>
            <Typography variant="body">{auth.email}</Typography>
          </Stack>
        }
      />

      <ProfileCardComponent
        title="Update Password"
        component={
          <Box display={"flex"} flexDirection={"column"} gap={4}>
            <CustomInput
              name="old_password"
              label="Old Password"
              type={showOldPass ? "text" : "password"}
              value={formik.values.old_password}
              onChange={formik.handleChange}
              icon={
                <CustomIconComponent
                  icon={showOldPass ? "eva:eye-fill" : "eva:eye-off-fill"}
                />
              }
              onIconClick={() => setShowOldPass(!showOldPass)}
              formik={formik}
            />

            <CustomInput
              name="password"
              label="New Password"
              type={showPass ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              icon={
                <CustomIconComponent
                  icon={showPass ? "eva:eye-fill" : "eva:eye-off-fill"}
                />
              }
              onIconClick={() => setShowPass(!showPass)}
              formik={formik}
            />

            <CustomInput
              name="confirm_password"
              label="Confirm Password"
              type={showConfirmPass ? "text" : "password"}
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              icon={
                <CustomIconComponent
                  icon={showConfirmPass ? "eva:eye-fill" : "eva:eye-off-fill"}
                />
              }
              onIconClick={() => setShowConfirmPass(!showConfirmPass)}
              formik={formik}
            />
            <CustomButton
              label={"Update"}
              size={"small"}
              onClick={formik.handleSubmit}
              disabled={false}
              bgColor={"#479DE1"}
              isLoading={false}
            />  

          </Box>
        }
      />
    </Container>
  );
};

export default ProfilePage;
