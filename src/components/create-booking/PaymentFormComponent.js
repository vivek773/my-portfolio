import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Container,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
  MX_MERCHANT_CONNECTION_AIR_TOKEN,
  MX_MERCHANT_CONNECTION_AIR_TPN_NUMBER,
  MX_PAYMENT_FORM_URL,
} from "../../utils/Constants";
import { fetchPOSTRequest } from "../../utils/Services";
import { useSelector } from "react-redux";

function PaymentFormComponent({ isParentFormValid = true }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [ccNumber, setCcNumber] = useState("");
  const [ccExpiry, setCcExpiry] = useState("");
  const [ccCvv, setCcCvv] = useState("");
  const [ccName, setCcName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);

  const customer = useSelector((state) => state.createBooking.customerDetails);
  const quotedPrice = useSelector((state) => state.createBooking.quotedPrice);
  const flightSegments = useSelector(
    (state) => state.createBooking.selectedPlaneDetails.flight_segments
  );

  const tailNumber = useSelector(
    (state) => state.createBooking.selectedPlaneDetails.selectedPlaneTailNumber
  );

  const tripType = useSelector(
    (state) => state.createBooking.searchTripDetails.tripType
  );

  useEffect(() => {
    const existingScript = document.getElementById("ftd");

    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "ftd";
      script.src = MX_PAYMENT_FORM_URL;
      script.setAttribute("security_key", MX_MERCHANT_CONNECTION_AIR_TOKEN);
      script.setAttribute("merchantId", MX_MERCHANT_CONNECTION_AIR_TPN_NUMBER);
      script.onload = () => setIsScriptLoaded(true);
      document.body.appendChild(script);
    } else {
      setIsScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    const isFormValid =
      ccNumber.length === 19 && // 16 digits + 3 spaces
      ccExpiry.length === 5 && // MM/YY
      ccCvv.length === 3 &&
      ccName.trim() !== "";
    setIsPaymentFormValid(isFormValid);
  }, [ccNumber, ccExpiry, ccCvv, ccName]);

  const postData = () => {
    return new Promise((resolve, reject) => {
      const scriptElement = document.getElementById("ftd");
      const hostname = new URL(scriptElement.getAttribute("src")).hostname;
      const url = `https://${hostname}/api/v1/paymentCardToken`;
      const securityKey = scriptElement.getAttribute("security_key");

      const payload = {
        ccNumber: ccNumber.replace(/\s+/g, ""),
        ccExpiry: ccExpiry.replace(/\//g, ""),
        ccCvv: ccCvv,
      };

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ftd-origin": window.location.origin,
          token: securityKey,
        },
        body: JSON.stringify(payload),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok.");
          return response.json();
        })
        .then((data) => {
          resolve({
            ...data,
            cc_last_four: ccNumber.slice(-4),
          });
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          reject(error);
        });
    });
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const paymentTokenData = await postData();

      const bookingPayload = {
        customer_id: customer.customerId,
        passenger_ids: [], // Add logic to get passenger ids
        first_name: customer.firstName,
        last_name: customer.lastName,
        email: customer.email,
        phone_country_code: customer.phoneCountryCode,
        phone_number: customer.phoneNumber,
        tail_number: tailNumber,
        trip_type: tripType,
        flight_segments: flightSegments,
        nationality: customer.nationality,
        number_of_passengers: quotedPrice.flight_segments.length,
        extra_passengers: [], // Assuming there are no extra passengers
        payment_token: paymentTokenData.payment_token,
        cc_last_four: paymentTokenData.cc_last_four,
        base_price: quotedPrice.basePrice,
        total_price: quotedPrice.tripTotal,
        amount_due_at_time_of_booking: quotedPrice.totalDueNow,
        amount_due_later: quotedPrice.amountDueLater,
        amount_due_later_date: quotedPrice.amountDueLaterDate,
        tax_due_now: quotedPrice.taxDueNow,
        tax_due_later: quotedPrice.taxDueLater,
      };

      const response = await fetchPOSTRequest(
        "/booking/owner/create-booking",
        bookingPayload
      );

      if (response.statusCode === 201) {
        console.log("Booking created successfully:", response);
        // Handle successful booking creation (e.g., navigate to a confirmation page)
      } else {
        console.error("Error creating booking:", response);
        // Handle booking creation error
      }
    } catch (error) {
      console.error("Payment error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    if (value.length <= 16) {
      setCcNumber(formattedValue);
    }
  };

  const handleCvvChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    if (value.length <= 3) {
      setCcCvv(value);
    }
  };

  const handleExpirationDateChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, "$1/");
    if (value.length <= 4) {
      setCcExpiry(formattedValue);
    }
  };

  return (
    <>
      <form onSubmit={handlePaymentSubmit}>
        <Card sx={{ marginTop: 3 }}>
          <CardHeader
            title="Payment Details"
            style={{ backgroundColor: "#f5f5f5" }}
          />
          <CardContent>
            <Container>
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="ccnumber"
                  label="Credit Card Number"
                  variant="outlined"
                  required
                  value={ccNumber}
                  onChange={handleCardNumberChange}
                />
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <TextField
                  id="ccexpiry"
                  label="Expiry Date"
                  variant="outlined"
                  required
                  value={ccExpiry}
                  onChange={handleExpirationDateChange}
                  inputProps={{ maxLength: 5 }}
                  style={{ flex: 1, marginRight: 8 }}
                />
                <TextField
                  id="cccvv"
                  label="CVV"
                  variant="outlined"
                  required
                  value={ccCvv}
                  onChange={handleCvvChange}
                  inputProps={{ maxLength: 3 }}
                  style={{ flex: 1, marginLeft: 8 }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="ccname"
                  label="Name on Card"
                  variant="outlined"
                  required
                  value={ccName}
                  onChange={(e) => setCcName(e.target.value)}
                />
              </Box>
            </Container>
            <LoadingButton
              type="submit"
              id="payButton"
              variant="contained"
              size="large"
              fullWidth
              color="primary"
              disabled={
                !isScriptLoaded ||
                !isPaymentFormValid ||
                !isParentFormValid ||
                isLoading
              }
              loading={isLoading}
            >
              Purchase
            </LoadingButton>
          </CardContent>
        </Card>
      </form>
      <Box mt={2}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={handlePaymentSubmit}
          disabled={isLoading}
        >
          Test API
        </Button>
      </Box>
    </>
  );
}

export default PaymentFormComponent;
