import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  MX_AUTH_TOKEN,
  MX_MERCHANT_TPN_NUMBER,
  MX_PAYMENT_FORM_URL,
} from "../../utils/Constants";
import { LoadingButton } from "@mui/lab";

function PaymentFormComponent({ handleSubmit, isParentFormValid = true }) {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [ccNumber, setCcNumber] = useState("");
  const [ccExpiry, setCcExpiry] = useState("");
  const [ccCvv, setCcCvv] = useState("");
  const [ccName, setCcName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymetFormValid, setIsPaymentFormValid] = useState(false);

//   useEffect(() => {
//     const existingScript = document.getElementById("ftd");

//     if (!existingScript) {
//       const script = document.createElement("script");
//       script.id = "ftd";
//       script.src = MX_PAYMENT_FORM_URL;
//       script.setAttribute("security_key", MX_AUTH_TOKEN);
//       script.setAttribute("merchantId", MX_MERCHANT_TPN_NUMBER);
//       script.onload = () => setIsScriptLoaded(true);
//       document.body.appendChild(script);
//     } else {
//       setIsScriptLoaded(true);
//     }
//   }, []);

//   const postData = () => {
//     return new Promise((resolve, reject) => {
//       console.log("pay button clicked!");
//       const scriptElement = document.getElementById("ftd");
//       let hostname = "";
//       if (scriptElement) {
//         const scriptSrc = scriptElement.getAttribute("src");
//         if (scriptSrc) {
//           hostname = new URL(scriptSrc).hostname;
//           console.log("Hostname:", hostname);
//         } else {
//           console.error("data-src attribute is missing.");
//         }
//       } else {
//         console.error('Script element with ID "ftd" not found.');
//       }
//       const url = "https://" + hostname + "/api/v1/paymentCardToken";
//       const securityKey = scriptElement.getAttribute("security_key");

//       const payload = {
//         ccNumber: ccNumber.replace(/\s+/g, ""),
//         ccExpiry: ccExpiry.replace(/\//g, ""),
//         ccCvv: ccCvv,
//       };

//       console.log("Sending request to:", url);
//       console.log("Payload:", payload);
//       console.log("Origin:", window.location.origin);

//       fetch(url, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "ftd-origin": window.location.origin,
//           token: securityKey,
//         },
//         body: JSON.stringify(payload),
//       })
//         .then((response) => {
//           if (!response.ok) throw new Error("Network response was not ok.");
//           return response.json();
//         })
//         .then((data) => {
//           console.log("Payment token received:", data);
//           resolve({
//             ...data,
//             cc_last_four: data.ccNumber.slice(-4),
//           });
//         })
//         .catch((error) => {
//           console.error("Fetch error:", error);
//           reject(error);
//         });
//     });
//   };

//   useEffect(() => {
//     if (
//       ccNumber &&
//       ccExpiry &&
//       ccCvv &&
//       ccName &&
//       ccNumber.length > 16 && // "1234 5678 9101 1213" format
//       ccExpiry.length === 5 && // "MM/YY" format
//       ccCvv.length > 2 // 3 digits CVV
//     ) {
//       setIsPaymentFormValid(true);
//     } else {
//       setIsPaymentFormValid(false);
//     }
//   }, [ccNumber, ccExpiry, ccCvv, ccName]);

  const handlePaymentSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("Payment button pressed!");

    // postData()
    //   .then((data) => {
    //     console.log("Payment token:", data);
    //     handleSubmit(data); // Pass the payment token response to the parent component
    //   })
    //   .catch((error) => {
    //     console.error("Payment error:", error);
    //     setIsLoading(false);
    //   });
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
    <form onSubmit={handlePaymentSubmit}>
      <Card sx={{ marginTop: 3 }}>
        <CardHeader
          title="Payment Details"
          style={{ backgroundColor: "#f5f5f5",padding:16  }}
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
                inputProps={{ maxLength: 5 }} // Adjust input size
                style={{ flex: 1, marginRight: 8 }}
              />
              <TextField
                id="cccvv"
                label="CVV"
                variant="outlined"
                required
                value={ccCvv}
                onChange={handleCvvChange}
                inputProps={{ maxLength: 3 }} // Adjust input size
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
              !isPaymetFormValid ||
              isLoading ||
              !isParentFormValid
            } // Disable button until script is loaded and form is valid
            loading={isLoading}
          >
            Pay
          </LoadingButton>
        </CardContent>
      </Card>
    </form>
  );
}

export default PaymentFormComponent;
