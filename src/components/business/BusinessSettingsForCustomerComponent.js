// Business settings for customer

// Default
import { useState, useEffect } from "react";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import BusinessCardComponent from "./BusinessCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import SwitchComponent from "../../components/switch/SwitchComponent";

const BusinessSettingsForCustomerComponent = ({ settings }) => {
  const [businessSettings, setBusinessSettings] = useState(null);

  useEffect(() => {
    const items = [
      {
        key: "allow_flight_cancelation",
        label: "Allow Flight Cancelation",
        value: settings.allow_flight_cancelation,
      },
      {
        key: "allow_search_for_any_arrival_airport",
        label: "Allow Search For Any Arrival Airport",
        value: settings.allow_search_for_any_arrival_airport,
      },
      {
        key: "allow_search_for_any_departure_airport",
        label: "Allow Search For Any Departure Airport",
        value: settings.allow_search_for_any_departure_airport,
      },
      {
        key: "hours_before_flight_for_cancellation",
        label: "Hours Before Flight For Cancellation",
        value: settings.hours_before_flight_for_cancellation,
      },
      {
        key: "hours_before_flight_for_remaining_payment",
        label: "Hours Before Flight For Remaining Payment",
        value: settings.hours_before_flight_for_remaining_payment,
      },
      {
        key: "one_way_customer_pays_for_return",
        label: "One Way Customer Pays For Return",
        value: settings.one_way_customer_pays_for_return,
      },
      {
        key: "one_way_customer_pays_for_return_percentage",
        label: "One Way Customer Pays For Return Percentage",
        value: settings.one_way_customer_pays_for_return_percentage,
      },
      {
        key: "pay_in_full_at_time_of_booking",
        label: "Pay In Full At Time Of Booking",
        value: settings.pay_in_full_at_time_of_booking,
      },
      {
        key: "percentage_at_time_of_booking",
        label: "Percentage At Time Of Booking",
        value: settings.percentage_at_time_of_booking,
      },
    ];
    setBusinessSettings([...items]);
  }, [settings]);

  return (
    <BusinessCardComponent
      title={"Business Settings for Customer"}
      action={
        <CustomButton
          label={"Edit"}
          size={"medium"}
          disabled={false}
          bgColor={"#479DE1"}
          // onClick={() => openModal("businessDetails")}
        />
      }
      component={
        <Grid container spacing={{ xs: 5, md: 3 }} columns={12}>
          {businessSettings?.map((setting, i) => {
            if (typeof setting?.value === "boolean") {
              return (
                <Grid item key={i} xs={12}>
                  <SwitchComponent
                    label={setting.label}
                    value={setting?.value}
                  />
                </Grid>
              );
            }
            return (
              <Grid item key={i} xs={4}>
                <Typography variant="subtitle1">{setting?.label}</Typography>
                <Typography paragraph>
                  {setting?.value ? setting?.value : "N/A"}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      }
    />
  );
};

export default BusinessSettingsForCustomerComponent;
