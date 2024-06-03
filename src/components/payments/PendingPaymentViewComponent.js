
// MUI components
import Container from "@mui/material/Container";

// Custom
import PendingPaymentDetailComponent from "./PendingPaymentDetailComponent";
import BackButton from "../backButton/BackButton";

const PaymentViewComponent = () => {
  return (
    <Container maxWidth="xl">
      <BackButton title={'Schedule Payment Details'} />
      <PendingPaymentDetailComponent />
    </Container>
  );
};

export default PaymentViewComponent;
