// MUI components
import Container from "@mui/material/Container";

// Custom
import ScheduledPaymentDetailComponent from "./ScheduledPaymentDetailComponent";
import BackButton from "../backButton/BackButton";

const PaymentViewComponent = () => {
  return (
    <Container maxWidth="xl">
      <BackButton title={"Scheduled Payments Details"} />
      <ScheduledPaymentDetailComponent />
    </Container>
  );
};

export default PaymentViewComponent;
