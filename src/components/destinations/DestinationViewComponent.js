// Destination view component

// MUI components
import Container from "@mui/material/Container";

// Custom
import DestinationDetailComponent from "./DestinationDetailComponent";
import BackButton from "../backButton/BackButton";

const DestinationViewComponent = () => {
  return (
    <Container maxWidth="lg">
      <BackButton title={"Destinations"} />
      <DestinationDetailComponent />
    </Container>
  );
};

export default DestinationViewComponent;
