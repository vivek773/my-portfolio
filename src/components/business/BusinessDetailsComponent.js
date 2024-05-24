// Business details

// Default
import { useEffect, useState } from "react";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import CustomButton from "../../forms/button/CustomButton";
import BusinessCardComponent from "./BusinessCardComponent";
import BusinessDetailsModal from "./businessModal/BusinessDetailsModal";

// Context
import { useModal } from "../../context/ModalContext";

const BusinessDetailsComponent = ({ details }) => {
  const { openModal } = useModal();
  const [businessDetails, setBusinessDetails] = useState(null);

  useEffect(() => {
    const items = [
      { key: "name", label: "Name", value: details.name },
      { key: "street", label: "Street", value: details.street },
      { key: "unit", label: "Unit", value: details.unit || "N/A" },
      { key: "city", label: "City", value: details.city },
      { key: "state", label: "State", value: details.state },
      { key: "zip_code", label: "Zip Code", value: details.zip_code },
      {
        key: "phone_number",
        label: "Phone Number",
        value: details.phone_number,
      },
      {
        key: "primary_airport_code",
        label: "Primary Airport Code",
        value: details.primary_airport_code,
      },
    ];
    setBusinessDetails([...items]);
  }, [details]);

  return (
    <>
      <BusinessCardComponent
        title={"Details"}
        action={
          <CustomButton
            label={"Edit"}
            size={"medium"}
            disabled={false}
            bgColor={"#479DE1"}
            onClick={() => openModal("businessDetails")}
          />
        }
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {businessDetails?.map((element, i) => (
              <Grid item key={i} xs={3}>
                <Typography variant="subtitle1">{element.label}:</Typography>
                <Typography paragraph>
                  {element?.value ? element.value : "-"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        }
      />
      <BusinessDetailsModal
        businessDetails={businessDetails}
        setBusinessDetails={setBusinessDetails}
      />
    </>
  );
};

export default BusinessDetailsComponent;
