// Business Merchant Account

// MUI components
import Typography from "@mui/material/Typography";

// Custom
import BusinessCardComponent from "./BusinessCardComponent";
import CustomButton from "../../forms/button/CustomButton";

const BusinessMerchantAccountDetailsComponent = ({
  merchantAccountDetails,
}) => {
  return (
    <BusinessCardComponent
      title={"Merchant Account Details"}
      action={
        <CustomButton
          label={"Edit"}
          size={"medium"}
          disabled={false}
          bgColor={"#479DE1"}
        />
      }
      component={
        <Typography variant="body2">
          {merchantAccountDetails
            ? JSON.stringify(merchantAccountDetails)
            : "No merchant account details available"}
        </Typography>
      }
    />
  );
};

export default BusinessMerchantAccountDetailsComponent;
