// Fleet Details page

// MUI components
import Container from "@mui/material/Container";

// Custom
import GroundSectionComponent from "./GroundSectionComponent";
import DetailsSectionComponent from "./DetailsSectionComponent";
import PricingSectionComponent from "./PricingSectionComponent";
import DocumentsSectionComponent from "./DocumentsSectionComponent";
import HobbsAndTachSectionsComponent from "./HobbsAndTachSectionComponent";
import ForceSectionComponent from "./ForceSectionComponent";
import MaintenanceSectionComponent from "./MaitenanceSectionComponent";
import MaintenancePredictionSectionComponent from "./MaintenancePredictionSectionComponent";

// Modals
import DetailsSectionModal from "./detailModal/DetailsSectionModal";
import PricingSectionModal from "./detailModal/PricingSectionModal";
import HobbsAndTachSectionModal from "./detailModal/HobbsAndTachSectionModal";
import MaintenanceSectionModal from "./detailModal/MaintenanceSectionModal";

const FleetDetailComponent = () => {
  return (
    <Container maxWidth="lg">
      <>
        <GroundSectionComponent />
        <DetailsSectionComponent />
        <PricingSectionComponent />
        <DocumentsSectionComponent />
        <HobbsAndTachSectionsComponent />
        <ForceSectionComponent />
        <MaintenanceSectionComponent />
        <MaintenancePredictionSectionComponent />
      </>
      <>
        <DetailsSectionModal />
        <PricingSectionModal />
        <HobbsAndTachSectionModal />
        <MaintenanceSectionModal />
      </>
    </Container>
  );
};

export default FleetDetailComponent;
