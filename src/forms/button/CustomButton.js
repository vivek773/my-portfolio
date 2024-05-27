// Custom button component

//  MUI components
import LoadingButton from "@mui/lab/LoadingButton";

const CustomButton = ({
  label,
  onClick,
  disabled = false,
  isLoading,
  variant = "contained",
  size,
  width,
  bgColor = "#479DE1",
  hoverBgColor,
  component,
  to,
  sx,
}) => {
  return (
    <LoadingButton
      fullWidth
      size={size}
      variant={variant}
      loading={isLoading}
      onClick={onClick}
      disabled={disabled}
      component={component}
      to={to}
      sx={{
        ...sx,
        backgroundColor: bgColor,
        textTransform: "none",
        width: width,
        "&:hover": {
          backgroundColor: hoverBgColor,
        },
      }}
    >
      {label}
    </LoadingButton>
  );
};

export default CustomButton;
