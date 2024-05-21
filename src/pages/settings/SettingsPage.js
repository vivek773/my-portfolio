import React, { useEffect, useState } from "react";
import HelmetComponent from "../../components/helmet/HelmetComponent";
import { EDISPATCHED } from "../../utils/Constants";
import {
  Box,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGETRequest } from "../../utils/Services";

function SettingsPage() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBusinessData = async () => {
      setIsLoading(true);
      const response = await fetchGETRequest(
        `/business/owner/get-business`,
        {}
      );

      if (response.statusCode === 200 && response) {
        console.log("SUCCESSFUL: " + JSON.stringify(response));
        setIsLoading(false);
      } else {
        console.log("FAILED: " + response.data);
        setIsLoading(false);
      }
    };

    getBusinessData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <HelmetComponent title={`${EDISPATCHED} | Settings`} />

      <Container maxWidth="xl">
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box display={"flex"} gap={1} alignItems={"center"}>
            {/* <IconButton onClick={() => Navigate(-1)}>
              <ArrowBackIosNewIcon color="#000" />
            </IconButton> */}
            <Typography variant="h4">Settings</Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SettingsPage;
