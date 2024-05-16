// Custom radio button

// MUI components
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const CustomRadio = ({
  label,
  name,
  value,
  onChange,
  required = false,
  radioOption,
}) => {
  console.log(value,"valuyeeeee");
  return (
    <FormControl>
      <FormLabel id="">{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      >
        {radioOption.map((option) => {
          return (
            <FormControlLabel
             key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadio;
