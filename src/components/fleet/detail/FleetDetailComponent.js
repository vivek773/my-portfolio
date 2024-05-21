// Fleet Details page

// MUI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

// Custom
import GroundSectionComponent from "./GroundSectionComponent";
import DetailsSectionComponent from "./DetailsSectionComponent";
import DocumentsSectionComponent from "./DocumentsSectionComponent";
import HobbsAndTachSectionsComponent from "./HobbsAndTachSectionComponent";
import MaintenanceSectionComponent from "./MaitenanceSectionComponent";
import Spinner from "../../../components/spinner/SpinnerComponent";

// Redux
import { useSelector } from "react-redux";

const FleetDetailComponent = () => {

  const fleet = useSelector((state) => state.fleet)

  return (
    <Container maxWidth="lg">
      {!fleet.details ? (
        <Box mt={5}>
          <Spinner show={!fleet.details}/>
        </Box>
      ) : (
        <>
          <GroundSectionComponent />
          <DetailsSectionComponent />
          <DocumentsSectionComponent />
          <HobbsAndTachSectionsComponent />
          <MaintenanceSectionComponent />
        </>
      )}
    </Container>
  );
};

export default FleetDetailComponent;
