// Fleet page

// Default
import { Link } from "react-router-dom";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

// Utils
import { DASHBOARD_HELMET, ADD_PLANE, DASHBOARD } from "../../utils/Constants";

// Custom
import MainHelmet from "../../components/helmet";
import CustomButton from "../../forms/button";

const Fleet = () => {
  return (
    <>
      <MainHelmet title={DASHBOARD_HELMET} />

      <Container maxWidth="xl">
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignContent={"center"}
        >
          <Typography variant="h4">Fleet</Typography>
          <CustomButton
            size="large"
            component={Link}
            label={"Add Plane"}
            width={"fit-content"}
            bgColor={"#479DE1"}
            to={`/${DASHBOARD}/${ADD_PLANE}`}
            sx={{ mb: 2 }}
          />
        </Box>
        <Grid container spacing={3}> 
          <Grid item xs={12} sm={6} md={3}>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
export default Fleet;
