// Business settings for customer

// Default
import { useState, useEffect } from "react";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Custom
import BusinessCardComponent from "./BusinessCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import SwitchComponent from "../../components/switch/SwitchComponent";
import BusinessSettingsForCustomerModal from "./businessModal/BusinessSettingsForCustomerModal";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

// Context
import { useModal } from "../../context/ModalContext";
import { useToast } from "../../context/ToastContext";

// Utils
import { fetchPUTRequest } from "../../utils/Services";
import { Divider } from "@mui/material";

const BusinessSettingsForCustomerComponent = ({ settings }) => {
  const [businessSettingsCustomer, setBusinessSettingsCustomer] =
    useState(null);
  const [editable, setEditable] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { openModal } = useModal();
  const { setToast } = useToast();

  useEffect(() => {
    const items = [
      {
        show: true,
        key: "allow_flight_cancelation",
        label: "Allow Flight Cancelation",
        value: settings.allow_flight_cancelation,
      },
      {
        show: true,
        key: "pay_in_full_at_time_of_booking",
        label: "Pay In Full At Time Of Booking",
        value: settings.pay_in_full_at_time_of_booking,
      },

      {
        show: !settings.pay_in_full_at_time_of_booking,
        key: "percentage_at_time_of_booking",
        label: "Percentage At Time Of Booking",
        value: settings.percentage_at_time_of_booking,
      },
      {
        show: !settings.pay_in_full_at_time_of_booking,
        key: "hours_before_flight_for_remaining_payment",
        label: "Hours Before Flight For Remaining Payment",
        value: settings.hours_before_flight_for_remaining_payment,
      },

      {
        show: true,
        key: "one_way_customer_pays_for_return",
        label: "One Way Customer Pays For Return",
        value: settings.one_way_customer_pays_for_return,
      },

      {
        show: settings.one_way_customer_pays_for_return,
        key: "one_way_customer_pays_for_return_percentage",
        label: "One Way Customer Pays For Return Percentage",
        value: settings.one_way_customer_pays_for_return_percentage,
      },

      {
        show: true,
        key: "allow_search_for_any_arrival_airport",
        label: "Allow Search For Any Arrival Airport",
        value: settings.allow_search_for_any_arrival_airport,
      },
      {
        show: true,
        key: "allow_search_for_any_departure_airport",
        label: "Allow Search For Any Departure Airport",
        value: settings.allow_search_for_any_departure_airport,
      },

      {
        show: true,
        key: "hours_before_flight_for_cancellation",
        label: "Hours Before Flight For Cancellation",
        value: settings.hours_before_flight_for_cancellation,
      },
    ];
    setBusinessSettingsCustomer([...items]);
  }, [settings]);

  const handleBusinessCustomerSettingsChange = async (setting) => {
    setIsLoading(true);
    const payload = { [setting.key]: !setting.value };

    const response = await fetchPUTRequest(
      `/business/owner/update-business-settings-for-customer`,
      payload
    );

    if (response?.statusCode === 200 && response) {
      setToast({
        open: true,
        message: response?.Message,
        severity: "success",
      });

      setIsLoading(false);

      const updatedArray = businessSettingsCustomer.map((item) => {
        if (
          response?.updatedBusiness?.business_settings_for_customer.hasOwnProperty(
            item.key
          )
        ) {
          if (
            item.key === "percentage_at_time_of_booking" ||
            item.key === "hours_before_flight_for_remaining_payment"
          ) {
            return {
              ...item,
              show: !response?.updatedBusiness?.business_settings_for_customer
                .pay_in_full_at_time_of_booking,
              value:
                response?.updatedBusiness?.business_settings_for_customer[
                  item.key
                ],
            };
          } else if (
            item.key === "one_way_customer_pays_for_return_percentage"
          ) {
            return {
              ...item,
              show: response?.updatedBusiness?.business_settings_for_customer
                .one_way_customer_pays_for_return,
              value:
                response?.updatedBusiness?.business_settings_for_customer[
                  item.key
                ],
            };
          } else {
            return {
              ...item,
              value:
                response?.updatedBusiness?.business_settings_for_customer[
                  item.key
                ],
            };
          }
        }
        return item;
      });

      setBusinessSettingsCustomer([...updatedArray]);
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
        title={"Business Settings for Customer"}
        component={
          <Grid
            container
            spacing={{ xs: 5, md: 5 }}
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
            {businessSettingsCustomer?.map((setting, i) => {
              if (setting.show) {
                if (typeof setting?.value === "boolean") {
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
                          handleBusinessCustomerSettingsChange(setting)
                        }
                      />
                    </Grid>
                  );
                } else {
                  return (
                    <Grid
                      item
                      key={i}
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        opacity: isLoading ? 0.5 : 1,
                      }}
                    >
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="subtitle1">
                          {setting?.label}
                        </Typography>
                        <Typography paragraph>
                          {setting?.value ? setting?.value : "N/A"}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <CustomButton
                          label="Edit"
                          size="small"
                          disabled={false}
                          bgColor="#479DE1"
                          sx={{
                            width: "fit-content",
                          }}
                          onClick={() => {
                            setEditable(setting);
                            openModal("businessSettingsForCustomer");
                          }}
                        />
                      </Box>
                    </Grid>
                  );
                }
              }
            })}
          </Grid>
        }
      />
      <BusinessSettingsForCustomerModal
        editable={editable}
        businessSettingsCustomer={businessSettingsCustomer}
        setBusinessSettingsCustomer={setBusinessSettingsCustomer}
      />
    </>
  );
};

export default BusinessSettingsForCustomerComponent;
