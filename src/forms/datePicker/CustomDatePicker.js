
// Custom date picker

// Default 
import { useFormikContext } from "formik";
import moment from "moment";

// MUI components
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TextField from "@mui/material/TextField";

const CustomDatePicker = ({ name, label }) => {
  const { setFieldValue, values } = useFormikContext();

  const handleChange = (newValue) => {
    // const formattedDate = newValue ? moment(newValue).utc().format() : "";
    const formattedDate = newValue ? moment(newValue).format() : "";
    setFieldValue(name, formattedDate);
  };

  // const currentValue = values[name] ? moment.utc(values[name]) : null;
  const currentValue = values[name] ? moment(values[name]) : null;

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        value={currentValue}
        onChange={handleChange}
        label={label}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
