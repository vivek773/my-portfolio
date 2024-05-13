// Custom select component

// MUI Components
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

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

const CustomSelect = ({ name, label, options, value, onChange, formik }) => {
  const classes = useStyles();
  const error = formik?.errors?.[name] && formik?.touched?.[name];
  return (
    <Autocomplete
      name={name}
      options={options}
      value={value}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          error={error}
          helperText={error && formik?.errors?.[name]}
          className={classes.root}
        />
      )}
    />
  )
}

export default CustomSelect
