// Spinner component

// MUI component
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

const SpinnerComponent = ({ show, size = 40 }) => {
  return (
    <>
      {show && (
        <Box justifyContent="center" display={"flex"} mt={10}>
          <CircularProgress size={size}/>
        </Box>
      )}
    </>
  );
};

export default SpinnerComponent;
