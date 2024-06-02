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
import ShowUnshowSectionComponent from "./ShowUnShowSectionComponent";
import { Grid } from "@mui/material";

const FleetDetailComponent = () => {
  const fleet = useSelector((state) => state.fleet);

  return (
    <Container maxWidth="lg">
      {!fleet.details ? (
        <Box mt={5}>
          <Spinner show={!fleet.details} />
        </Box>
      ) : (
        <>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <ShowUnshowSectionComponent />
            </Grid>
            <Grid item xs={6}>
              <GroundSectionComponent />
            </Grid>
          </Grid>

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
