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
import { useSelector,useDispatch } from "react-redux";
import ShowUnshowSectionComponent from "./ShowUnShowSectionComponent";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useLoader } from "../../../context/LoaderContext";
import { setAirworthinessDirectives, setFleetDetails, setMaintenanceLogs, setTailNumber } from "../../../store/features/FleetSlice";
import { useLocation } from "react-router-dom";
import { fetchGETRequest } from "../../../utils/Services";
import SpinnerComponent from "../../../components/spinner/SpinnerComponent";

const FleetDetailComponent = () => {
  const params = useLocation();
  const fleet = useSelector((state) => state.fleet);
  const { isLoading, startLoading, stopLoading } = useLoader();
  const dispatch = useDispatch();

  const getPlanData = async () => {
    startLoading();
    const tailNumber = params?.state;
    try {
      const response = await fetchGETRequest(
        `/fleet/owner/get-plane/${tailNumber}`,
        {}
      );
      if (response?.statusCode === 200 && response) {
        const { airworthiness_directives, maintenance_logs, ...rest } =
          response?.data;
        dispatch(setTailNumber(tailNumber));
        dispatch(setFleetDetails(rest));
        dispatch(setMaintenanceLogs(maintenance_logs));
        dispatch(setAirworthinessDirectives(airworthiness_directives));
        stopLoading();
      } else {
        stopLoading();
      }
    } catch (error) {
      stopLoading();
    }
  };

  useEffect(() => {
    getPlanData()
  }, [])

  return (
    <Container maxWidth="xl">
      {(isLoading && !fleet?.details) ? (
        <SpinnerComponent show={isLoading} />
      ) : (
        <>
        <Grid container spacing={2}></Grid>
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
