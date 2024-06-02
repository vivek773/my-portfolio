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

const ShowUnshowSectionComponent = () => {
  const [showToCustomerChecked, setshowToCustomerChecked] = useState(false);

  const fleet = useSelector((state) => state.fleet);
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  useEffect(() => {
    setshowToCustomerChecked(fleet?.details?.is_show_to_customer);
  }, [fleet]);

  const handleshowToCustomerChange = async () => {
    startLoading();
    const payload = {
      tail_number: fleet?.tail_number,
      is_show_to_customer: !showToCustomerChecked,
    };
    const response = await fetchPUTRequest(
      `/fleet/owner/show-unshow-plane`,
      payload
    );

    if (response?.statusCode === 200 && response) {
      setToast({
        open: true,
        message: response?.message,
        severity: "success",
      });
      stopLoading();
      setshowToCustomerChecked(response?.is_show_to_customer);
    } else {
      setToast({
        open: true,
        message: response?.message,
        severity: "error",
      });
    }
    stopLoading();
  };

  return (
    <FleetDetailCardComponent
      component={
        <Box sx={{ position: "relative" }}>
          {isLoading && (
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
          )}
          <Box sx={{ opacity: isLoading ? 0.5 : 1 }}>
            <SwitchComponent
              label="Show to Customer"
              value={showToCustomerChecked}
              onChange={handleshowToCustomerChange}
            />
          </Box>
        </Box>
      }
    />
  );
};

export default ShowUnshowSectionComponent;
