// Schedule payment card

// MUI components
import Container from "@mui/material/Container";

// Custom
import SchedulePaymentDetailComponent from "./SchedulePaymentDetailComponent";
import BackButton from "../backButton/BackButton";

const SchedulePaymentViewComponent = () => {
  return (
    <Container maxWidth="xl">
      <BackButton title={"Scheduled Payments Details"} />
      <SchedulePaymentDetailComponent />
    </Container>
  );
};

export default SchedulePaymentViewComponent;
