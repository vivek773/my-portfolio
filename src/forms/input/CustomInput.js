// Custom input component

// MUI Components
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

// MUI styles
import { makeStyles } from "@mui/styles";

// Utils
import { TEXT_FIELD } from "../../utils/Color";

const useStyles = makeStyles(() => ({
  root: {
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
  helperText=""
}) => {
  const classes = useStyles();
  const error = formik?.errors?.[name] && formik?.touched?.[name];
  return (
    <TextField
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
      className={classes.root}
    />
  );
};

export default CustomInput;
