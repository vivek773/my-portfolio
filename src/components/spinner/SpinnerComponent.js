// Spinner component

// MUI component
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const SpinnerComponent = ({ show, size = 40 }) => {
  return (
    <>
      {show && (
        <Stack alignItems="center">
          <CircularProgress size={size}/>
        </Stack>
      )}
    </>
  );
};

export default SpinnerComponent;
