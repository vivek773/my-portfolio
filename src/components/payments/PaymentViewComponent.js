
// MUI components
import Container from "@mui/material/Container";

// Custom
import PaymentDetailComponent from "./PaymentDetailComponent";
import BackButton from "../backButton/BackButton";

const PaymentViewComponent = () => {
  return (
    <Container maxWidth="xl">
      <BackButton title={'Payment Details'} />
      <PaymentDetailComponent />
    </Container>
  );
};

export default PaymentViewComponent;
