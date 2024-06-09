import { useEffect, useState } from "react";

// MUI components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setBusinessDetails,
  setTax,
  setEmails,
  setMerchantAccountDetails,
  setBusinessSettings,
} from "../../store/features/BusinessSlice";

// Custom
import HelmetComponent from "../../components/helmet/HelmetComponent";
import BusinessDetailsComponent from "../../components/business/BusinessDetailsComponent";
import BusinessEmailsComponent from "../../components/business/BusinessEmailsComponent";
import BusinessMerchantAccountDetailsComponent from "../../components/business/BusinessMerchantAccountComponent";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

// Utils
import { EDISPATCHED_HELMET } from "../../utils/Constants";
import { fetchGETRequest } from "../../utils/Services";
import EmbedCustomerAppCard from "../../components/business/EmbedCustomer";
import BusinessTicketPaymentSettingsCardComponent from "../../components/business/BusinessTicketPaymentSettingsCardComponent";
import BusinessTaxSettingsCardComponents from "../../components/business/BusinessTaxSettingsComponentCard";

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
        const {
          name,
          street,
          unit,
          city,
          state,
          zip_code,
          phone_number,
          primary_airport_code,
          emails,
          tax,
          merchant_account_details,
          business_settings,
        } = response.data;
        dispatch(
          setBusinessDetails({
            name,
            street,
            unit,
            city,
            state,
            zip_code,
            phone_number,
            primary_airport_code,
          })
        );
        dispatch(setTax(tax));
        dispatch(setEmails(emails));
        dispatch(setMerchantAccountDetails(merchant_account_details));
        dispatch(setBusinessSettings(business_settings));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    getBusinessData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <HelmetComponent title={`${EDISPATCHED_HELMET} Settings`} />
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

        <Container maxWidth="lg">
          <Box mt={10}>
            <SpinnerComponent show={isLoading} />
          </Box>

          {!isLoading && (
            <>
              <BusinessDetailsComponent details={business.business_details} />

              <BusinessTaxSettingsCardComponents />
              <BusinessTicketPaymentSettingsCardComponent />
              <BusinessEmailsComponent emails={business.emails} />
              <EmbedCustomerAppCard />
            </>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default SettingsPage;
