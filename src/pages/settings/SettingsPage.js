import React, { useEffect, useState } from "react";
import HelmetComponent from "../../components/helmet/HelmetComponent";
import { EDISPATCHED } from "../../utils/Constants";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchGETRequest } from "../../utils/Services";
import { setBusinessState } from "../../store/features/BusinessSlice";
import BusinessDetailsCardComponent from "../../components/business/BusinessDetailsCardComponent";
import BusinessEmailsCardComponent from "../../components/business/BusinessEmailsCardComponent";
import BusinessMerchantAccountDetailsCardComponent from "../../components/business/BusinessMerchantAccountComponent";
import BusinessSettingsForCustomerCardComponent from "../../components/business/BusinessSettingsForCustomerCardComponent";
import BusinessSettingsForEmployeeCardComponent from "../../components/business/BusinessSettingsForEmployeeCardComponent";

function SettingsPage() {
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBusinessData = async () => {
      setIsLoading(true);
      const response = await fetchGETRequest(
        `/business/owner/get-business`,
        {}
      );

      if (response.statusCode === 200 && response) {
        dispatch(setBusinessState(response.data));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    getBusinessData();
    // eslint-disable-next-line
  }, [dispatch]);

  const handleEdit = () => {
    // Implement edit functionality
  };

  return (
    <div>
      <HelmetComponent title={`${EDISPATCHED} | Settings`} />
      <Container maxWidth="xl">
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} gap={1} alignItems={"center"}>
            <Typography variant="h4">Settings</Typography>
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <BusinessDetailsCardComponent
              details={business}
              onEdit={handleEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <BusinessEmailsCardComponent
              emails={business.emails}
              onEdit={handleEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <BusinessMerchantAccountDetailsCardComponent
              merchantAccountDetails={business.merchant_account_details}
              onEdit={handleEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <BusinessSettingsForCustomerCardComponent
              settings={business.business_settings_for_customer}
              onEdit={handleEdit}
            />
          </Grid>
          <Grid item xs={12}>
            <BusinessSettingsForEmployeeCardComponent
              settings={business.business_settings_for_employee}
              onEdit={handleEdit}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default SettingsPage;
