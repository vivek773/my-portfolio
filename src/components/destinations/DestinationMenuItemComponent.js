// Create a new file DestinationMenuItemComponent.js under components/destinations/

import React from "react";
import { Grid, MenuItem, Typography } from "@mui/material";

const DestinationMenuItemComponent = ({
  airportCode,
  airportName,
  ...props
}) => {
  return (
    <MenuItem {...props}>
      <Grid container>
        <Grid item xs={3}>
          <Typography component="span" style={{ whiteSpace: "nowrap" }}>
            {airportCode}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography component="span" style={{ whiteSpace: "nowrap" }}>
            {airportName}
          </Typography>
        </Grid>
      </Grid>
    </MenuItem>
  );
};

export default DestinationMenuItemComponent;
