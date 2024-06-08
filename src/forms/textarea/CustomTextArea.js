// MUI components
import TextField from "@mui/material/TextField";
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
}));

const CustomTextArea = ({
  label,
  name,
  value,
  onChange,
  rows = 4,
  formik,
  required,
}) => {
  const error = formik?.errors?.[name] && formik?.touched?.[name];
  return (
    <StyledTextField
      label={label}
      multiline
      rows={rows}
      value={value}
      name={name}
      onChange={onChange}
      error={error}
      required={required}
      helperText={error && formik?.errors?.[name]}
    />
  );
};

export default CustomTextArea;
