// Setting page

// Default
import { useEffect, useState } from "react";

// MUI components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  setBusinessDetails,
  setEmails,
  setMerchantAccountDetails,
  setBusinessSettingsForCustomer,
  setBusinessSettingsForEmployee,
} from "../../store/features/BusinessSlice";

// Custom
import HelmetComponent from "../../components/helmet/HelmetComponent";
import BusinessDetailsComponent from "../../components/business/BusinessDetailsComponent";
import BusinessEmailsCardComponent from "../../components/business/BusinessEmailsComponent";
import BusinessMerchantAccountDetailsCardComponent from "../../components/business/BusinessMerchantAccountComponent";
import BusinessSettingsForCustomerComponent from "../../components/business/BusinessSettingsForCustomerComponent";
import BusinessSettingsForEmployeeCardComponent from "../../components/business/BusinessSettingsForEmployeeCardComponent";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";


// Utils
import { EDISPATCHED } from "../../utils/Constants";
import { fetchGETRequest } from "../../utils/Services";

function SettingsPage() {
  const dispatch = useDispatch();
  const business = useSelector((state) => state.business);
  const [isLoading, setIsLoading] = useState(false)

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
          merchant_account_details,
          business_settings_for_customer,
          business_settings_for_employee,
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
        dispatch(setEmails(emails));
        dispatch(setMerchantAccountDetails(merchant_account_details));
        dispatch(
          setBusinessSettingsForCustomer(business_settings_for_customer)
        );
        dispatch(
          setBusinessSettingsForEmployee(business_settings_for_employee)
        );
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

        <Container maxWidth="lg"> 
        <SpinnerComponent show={isLoading} />

        {!isLoading && (
          <>
            <BusinessDetailsComponent details={business.business_details} />
            <BusinessEmailsCardComponent emails={business.emails} />
            <BusinessMerchantAccountDetailsCardComponent
              merchantAccountDetails={business?.merchant_account_details}
            />
            <BusinessSettingsForCustomerComponent
              settings={business?.business_settings_for_customer}
            />
            <BusinessSettingsForEmployeeCardComponent
              settings={business?.business_settings_for_employee}
            />
          </>
        )}
      
        </Container>
      </Container>
    </div>
  );
}

export default SettingsPage;
