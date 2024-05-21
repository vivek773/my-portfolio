// CustomTextArea

// MUI components
import TextField from "@mui/material/TextField";

// MUI styles
import { makeStyles } from "@mui/styles";

// Utils
import { TEXT_FIELD } from "../../utils/Color";

const CustomTextArea = ({ label, name, value, onChange, rows = 4, formik, required }) => {
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
  const classes = useStyles();
  const error = formik?.errors?.[name] && formik?.touched?.[name];
  return (
    <TextField
      label={label}
      multiline
      rows={rows}
      value={value}
      name={name}
      onChange={onChange}
      error={error}
      required={required}
      helperText={(error && formik?.errors?.[name])}
      className={classes.root}
    />
  );
};

export default CustomTextArea;
