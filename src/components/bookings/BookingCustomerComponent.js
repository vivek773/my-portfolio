import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import BookingCardComponent from "./BookingCardComponent";
import { formatDate } from "../../utils/Helper";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

import { jpegDownloadRequest } from "../../utils/Services";
import ImageModal from "../imageModal/ImageModal";
import SpinnerComponent from "../spinner/SpinnerComponent";

const BookingCustomerComponent = () => {
  const params = useLocation();
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const viewImage = async () => {
    setIsLoading(true);
    const response = await jpegDownloadRequest(
      `/document/owner/customer/download-customer-document/${params?.state?.customer?.customer_id}/passport`,
      {}
    );
    if (response) {
      const file = new Blob([response], { type: "image/jpeg" });
      const fileURL = URL.createObjectURL(file);
      setImageUrl(fileURL);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const downloadImage = async () => {
    setIsLoading(true);
    const response = await jpegDownloadRequest(
      `/document/owner/customer/download-customer-document/${params?.state?.customer?.customer_id}/passport`,
      {}
    );

    if (response) {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "image.jpg");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BookingCardComponent
        title={"Booking Customer"}
        component={
          <>
            <Grid
              container
              spacing={{ xs: 5, md: 3 }}
              columns={{ md: 12 }}
              style={{ position: "relative" }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 1,
                }}
              >
                <SpinnerComponent show={isLoading} size={30} />
              </Box>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  First Name
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.first_name || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Last Name
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.last_name || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Email
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.email || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Phone Number
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.phone_number || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Nationality
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.nationality || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Date Of Birth
                </Typography>
                <Typography paragraph align="center">
                  {formatDate(params?.state?.customer?.date_of_birth) || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Weight
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.weight || "-"} Ibs
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Passport Number
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.documents?.passport?.number ||
                    "Not uploaded"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Passport Expiration
                </Typography>
                <Typography paragraph align="center">
                  {formatDate(
                    params?.state?.customer?.documents?.passport?.expiration
                  ) || "Not uploaded"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Passport Date Of Issue
                </Typography>
                <Typography paragraph align="center">
                  {formatDate(
                    params?.state?.customer?.documents?.passport?.date_of_issue
                  ) || "Not uploaded"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  View Passport
                </Typography>
                <Box>
                  {params?.state?.customer?.documents?.passport ? (
                    <>
                      <IconButton
                        color="primary"
                        onClick={viewImage}
                        sx={{ padding: 0 }}
                      >
                        <VisibilityIcon />
                      </IconButton>

                      <IconButton color="primary" onClick={downloadImage}>
                        <DownloadIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Typography paragraph align="center">
                      Not uploaded
                    </Typography>
                  )}
                </Box>
              </Grid>

              <Grid
                item
                xs={12}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1, mt: 3 }}
              >
                <Typography variant="h6" align="center">
                  Residential Address
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Street
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.residential_address?.street || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Unit
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.residential_address?.unit || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  City
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.residential_address?.city || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  State
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.residential_address?.state || "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  Zip Code
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.residential_address?.zip_code ||
                    "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ opacity: isLoading ? 0.5 : 1, mb: 3 }}
              >
                <Typography variant="subtitle1" align="center">
                  Country
                </Typography>
                <Typography paragraph align="center">
                  {params?.state?.customer?.residential_address?.country || "-"}
                </Typography>
              </Grid>
            </Grid>
          </>
        }
      />
      <ImageModal imageUrl={imageUrl} setImageUrl={setImageUrl} />
    </>
  );
};

export default BookingCustomerComponent;
