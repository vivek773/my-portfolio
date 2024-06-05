// Business Merchant Account

// MUI components
import Typography from "@mui/material/Typography";

// Custom
import BusinessCardComponent from "./BusinessCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import { Grid } from "@mui/material";
import { readableStatus } from "../../utils/Constants";

const BusinessMerchantAccountDetailsComponent = ({
  merchantAccountDetails,
}) => {
  return (
    <BusinessCardComponent
      title={"Merchant Account Details"}
      component={
        <Typography variant="body2">
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Account ID:</Typography>
              <Typography paragraph>
                {merchantAccountDetails?.account_id}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="subtitle1">Provider Name:</Typography>
              <Typography paragraph>
                {readableStatus(merchantAccountDetails?.provider_name)}
              </Typography>
            </Grid>
          </Grid>
        </Typography>
      }
    />
  );
};

export default BusinessMerchantAccountDetailsComponent;
