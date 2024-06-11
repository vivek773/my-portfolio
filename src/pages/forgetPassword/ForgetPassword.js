// Forget password 

// MUI components
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

// MUI styles
import { styled } from "@mui/material/styles";

// Custom
import CustomButton from "../../forms/button/CustomButton";
import CustomInput from "../../forms/input/CustomInput";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 580,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const ForgetPassword = () => {
  return (
    <StyledContent>
      <Stack spacing={3}>
        <CustomInput
          name="email"
          label="Email address"
        />
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{ my: 2 }}
      ></Stack>
      <CustomButton
        label={"Email reset password link"}
        size={"large"}
        disabled={false}
        bgColor={"#479DE1"}
      />
      <Stack alignItems="left" justifyContent="flex-end" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover" href="/login">
          Back to Login
        </Link>
      </Stack>
    </StyledContent>
  )
}

export default ForgetPassword;