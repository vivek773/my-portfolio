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
  bgColor,
  hoverBgColor,
}) => {
  return (
    <LoadingButton
      fullWidth
      size={size}
      variant={variant}
      loading={isLoading}
      onClick={onClick}
      disabled={disabled}
      sx={{
        backgroundColor: bgColor,
        textTransform: "none",
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
