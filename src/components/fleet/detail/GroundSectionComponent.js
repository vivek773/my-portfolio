// Ground section

// Default
import { useEffect, useState } from "react";

// MUI component
import Box from "@mui/material/Box";

// Redux
import { useSelector } from "react-redux";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
import SwitchComponent from "../../switch/SwitchComponent";
import SpinnerComponent from "../../spinner/SpinnerComponent";

// Context
import { useToast } from "../../../context/ToastContext";
import { useLoader } from "../../../context/LoaderContext";

// Utils
import { fetchPUTRequest } from "../../../utils/Services";

const GroundSectionComponent = () => {
  const [groundedChecked, setGroundedChecked] = useState(false);

  const fleet = useSelector((state) => state.fleet);
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  useEffect(() => {
    setGroundedChecked(fleet?.details?.is_grounded);
  }, [fleet]);

  const handleGroundedChange = async () => {
    const payload = {
      tail_number: fleet?.tail_number,
      is_grounded: !groundedChecked,
    };
    const response = await fetchPUTRequest(
      `/fleet/owner/ground-unground-plane`,
      payload
    );

    if (response?.statusCode === 200 && response) {
      setToast({
        open: true,
        message: response?.message,
        severity: "success",
      });
      setGroundedChecked(response?.is_grounded);
    } else {
      setToast({
        open: true,
        message: response?.message,
        severity: "error",
      });
    }
  };

  return (
    <FleetDetailCardComponent
      component={
        <Box sx={{ position: "relative" }}>
          {/* {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <SpinnerComponent size={20} show={isLoading} />
            </Box>
          )} */}
          <Box sx={{ opacity: isLoading ? 0.5 : 1 }}>
            <SwitchComponent
              label="Ground Plane"
              value={groundedChecked}
              onChange={handleGroundedChange}
            />
          </Box>
        </Box>
      }
    />
  );
};

export default GroundSectionComponent;
