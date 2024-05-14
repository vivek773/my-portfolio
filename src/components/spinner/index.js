// Spinner component

// MUI component
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

const Spinner = ({ show }) => {
  return (
    <>
      {show && (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </>
  );
};

export default Spinner;
