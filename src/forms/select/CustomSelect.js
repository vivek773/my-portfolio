// MUI Components
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
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

const CustomSelect = ({ name, label, options, value, onChange, formik }) => {
  const error = formik?.errors?.[name] && formik?.touched?.[name];
  return (
    <Autocomplete
      name={name}
      options={options}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          label={label}
          error={error}
          helperText={error && formik?.errors?.[name]}
        />
      )}
    />
  );
};

export default CustomSelect;
