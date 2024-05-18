// Fleet Details page

// Default
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import Container from "@mui/material/Container";

// Custom
import GroundSectionComponent from "./GroundSectionComponent";
import DetailsSectionComponent from "./DetailsSectionComponent";
import DocumentsSectionComponent from "./DocumentsSectionComponent";
import HobbsAndTachSectionsComponent from "./HobbsAndTachSectionComponent";
import MaintenanceSectionComponent from "./MaitenanceSectionComponent";

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
  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPlanData = async () => {
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
      } else {
      }
    };

    getPlanData();
    // eslint-disable-next-line
  }, [state]);

  return (
    <Container maxWidth="lg">
      <>
        <GroundSectionComponent />
        <DetailsSectionComponent />
        <DocumentsSectionComponent />
        <HobbsAndTachSectionsComponent />
        <MaintenanceSectionComponent />
      </>
    </Container>
  );
};

export default FleetDetailComponent;
