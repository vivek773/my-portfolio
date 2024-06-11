// MUI Components
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";

// Utils
import { TEXT_FIELD } from "../../utils/Color";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: TEXT_FIELD.labelColor,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: TEXT_FIELD.labelFocusedColor,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: TEXT_FIELD.borderColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: TEXT_FIELD.borderFocusedColor,
    },
  },
  "& input[type=number]": {
    "-moz-appearance": "textfield",
    "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
  },
}));

const CustomInput = ({
  type = "text",
  name,
  label,
  value,
  onChange,
  formik,
  icon,
  required = false,
  onIconClick,
  iconPosition = "end",
  helperText = "",
}) => {
  const error = formik?.errors?.[name] && formik?.touched?.[name];
  return (
    <StyledTextField
      fullWidth
      name={name}
      label={label}
      type={type}
      value={value}
      error={error}
      required={required}
      helperText={(error && formik?.errors?.[name]) ?? helperText}
      onChange={onChange}
      InputProps={{
        [`${iconPosition}Adornment`]: icon ? (
          <InputAdornment position={iconPosition}>
            <IconButton onClick={onIconClick} edge={iconPosition}>
              {icon}
            </IconButton>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default CustomInput;
