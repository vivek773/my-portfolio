// Payment view component

// MUI components
import Container from "@mui/material/Container";

// Custom
import PaymentDetailComponent from "./PaymentDetailComponent";
import PaymentPendingComponent from "./PaymentPendingComponent";

const PaymentViewComponent = () => {
  return (
    <Container maxWidth="lg">
      <PaymentDetailComponent />
      <PaymentPendingComponent />
    </Container>
  );
};

export default PaymentViewComponent;
