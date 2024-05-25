// Business Emails

// Default
import { useState, useEffect } from "react";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import CustomButton from "../../forms/button/CustomButton";
import BusinessCardComponent from "./BusinessCardComponent";
import BusinessEmailsModal from "./businessModal/BusinessEmailsModal";

// Context
import { useModal } from "../../context/ModalContext";

const BusinessEmailsComponent = ({ emails }) => {
  const [businessEmail, setBusinessEmail] = useState(null);
  const { openModal } = useModal();

  useEffect(() => {
    const items = [
      {
        key: "booking_email",
        label: "Booking Email",
        value: emails?.booking_email,
      },
      {
        key: "contact_email",
        label: "Contact Email",
        value: emails?.contact_email,
      },
    ];
    setBusinessEmail([...items]);
  }, [emails]);

  return (
    <>
      <BusinessCardComponent
        title={"Emails"}
        action={
          <CustomButton
            label={"Edit"}
            size={"medium"}
            disabled={false}
            bgColor={"#479DE1"}
            onClick={() => openModal("businessEmail")}
          />
        }
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {businessEmail?.map((element, i) => (
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
      <BusinessEmailsModal
        businessEmail={businessEmail}
        setBusinessEmail={setBusinessEmail}
      />
    </>
  );
};

export default BusinessEmailsComponent;
