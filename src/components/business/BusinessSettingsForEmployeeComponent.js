// Business settings for customer

// Default
import { useState, useEffect } from "react";

// MUI components
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Custom
import BusinessCardComponent from "./BusinessCardComponent";
import SwitchComponent from "../../components/switch/SwitchComponent";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

// Context
import { useToast } from "../../context/ToastContext";

// Utils
import { fetchPUTRequest } from "../../utils/Services";

const BusinessSettingsForCustomerComponent = ({ settings }) => {
  const [businessSettingsEmployee, setBusinessSettingsEmployee] =
    useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setToast } = useToast();

  useEffect(() => {
    const items = [
      {
        key: "automatically_add_pic_to_booking",
        label: "Automatically Add Pic To Booking",
        value: settings?.automatically_add_pic_to_booking,
      },
    ];
    setBusinessSettingsEmployee([...items]);
  }, [settings]);

  const handleBusinessEmployeeSettingsChange = async (setting) => {
    setIsLoading(true);

    const payload = { [setting.key]: !setting.value };

    const response = await fetchPUTRequest(
      `/business/owner/update-business-settings-for-employee`,
      payload
    );

    if (response?.statusCode === 200 && response) {
      setToast({
        open: true,
        message: response?.Message,
        severity: "success",
      });

      setIsLoading(false);

      const updatedArray = businessSettingsEmployee.map((item) => {
        if (
          response?.updatedBusiness?.business_settings_for_employee.hasOwnProperty(
            item.key
          )
        ) {
          return {
            ...item,
            value:
              response?.updatedBusiness?.business_settings_for_employee[
                item.key
              ],
          };
        }
        return item;
      });
      setBusinessSettingsEmployee([...updatedArray]);
    } else {
      setToast({
        open: true,
        message: response?.Message,
        severity: "error",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <BusinessCardComponent
        title={"Business Settings for Employee"}
        component={
          <Grid
            container
            spacing={{ xs: 5, md: 3 }}
            columns={12}
            style={{ position: "relative" }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1,
              }}
            >
              <SpinnerComponent show={isLoading} size={30} />
            </Box>
            {businessSettingsEmployee?.map((setting, i) => {
              return (
                <Grid
                  item
                  key={i}
                  xs={12}
                  sx={{ opacity: isLoading ? 0.5 : 1 }}
                >
                  <SwitchComponent
                    label={setting.label}
                    value={setting?.value}
                    onChange={() =>
                      handleBusinessEmployeeSettingsChange(setting)
                    }
                  />
                </Grid>
              );
            })}
          </Grid>
        }
      />
    </>
  );
};

export default BusinessSettingsForCustomerComponent;
