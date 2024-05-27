// Business Tax

// Default
import { useState, useEffect } from "react";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import BusinessCardComponent from "./BusinessCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import BusinessTaxModal from "./businessModal/BusinessTaxModal";

// Context
import { useModal } from "../../context/ModalContext";

const BusinessTaxComponent = ({ tax }) => {
  const [businessTax, setBusinessTax] = useState(null);
  const { openModal } = useModal();
  useEffect(() => {
    const items = [
      {
        key: "tax_name",
        label: "Tax Name",
        value: tax?.tax_name,
      },
      {
        show: true,
        key: "tax_rate",
        label: "Tax Rate",
        value: tax?.tax_rate,
      },
    ];
    setBusinessTax([...items]);
  }, [tax]);

  return (
    <>
      <BusinessCardComponent
        title={"Business Tax"}
        action={
          <CustomButton
            label={"Edit"}
            size={"medium"}
            disabled={false}
            bgColor={"#479DE1"}
            onClick={() => openModal("businessTax")}
          />
        }
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {businessTax?.map((element, i) => (
              <Grid item key={i} xs={3}>
                <Typography variant="subtitle1">{element.label}</Typography>
                <Typography paragraph>
                  {element?.value ? element.value : "-"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        }
      />
      <BusinessTaxModal
        businessTax={businessTax}
        setBusinessTax={setBusinessTax}
      />
    </>
  );
};

export default BusinessTaxComponent;
