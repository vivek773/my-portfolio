// Fleet Details page

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
import {
  setFleetDetails,
  setMaintenanceLogs,
  setAirworthinessDirectives,
} from "../../../store/features/FleetSlice";
import { useDispatch } from "react-redux";

// Utils
import { fetchGETRequest } from "../../../utils/Services";

const FleetDetailComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPlanData = async () => {
      setIsLoading(true);
      const response = await fetchGETRequest(
        `/fleet/owner/get-plane/${state.tail_number}`,
        {}
      );

      if (response.statusCode === 200 && response) {
        const { airworthiness_directives, maintenance_logs, ...rest } =
          response?.data;
        dispatch(setFleetDetails(rest));
        dispatch(setMaintenanceLogs(maintenance_logs));
        dispatch(setAirworthinessDirectives(airworthiness_directives));
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    getPlanData();
    // eslint-disable-next-line
  }, [state]);

  return (
    <Container maxWidth="lg">
      {isLoading ? (
        <Box mt={5}>
          <Spinner show={isLoading}/>
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
