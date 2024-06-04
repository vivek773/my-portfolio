import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import BookingCardComponent from "./BookingCardComponent";
import { formatDateTime } from "../../utils/Helper";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

import { jpegDownloadRequest } from "../../utils/Services";
import ImageModal from "../imageModal/ImageModal";
import SpinnerComponent from "../spinner/SpinnerComponent";

const BookingCustomerComponent = () => {
  const params = useLocation();
  const [bookingCustomer, setBookingCustomer] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const viewImage = async () => {
    setIsLoading(true)
    const response = await jpegDownloadRequest(
      `/document/owner/customer/download-customer-document/${params?.state?.customer?.customer_id}/passport`,
      {}
    );
    if (response) {
      const file = new Blob([response], { type: "application/jpeg" });
      const fileURL = URL.createObjectURL(file);
      setImageUrl(fileURL);
      setIsLoading(false)

    } else {
      setIsLoading(false)
    }
  }

  const downloadImage = async () => {
    setIsLoading(true)
    const response = await jpegDownloadRequest(
      `/document/owner/customer/download-customer-document/${params?.state?.customer?.customer_id}/passport`,
      {}
    );

    if (response) {
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'image.jpg');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setIsLoading(false)
    } else {
      setIsLoading(false)
    }
  };

  const getAddress = (payload) => {
    const addressParts = [
      payload?.street,
      payload?.unit,
      payload?.city,
      payload?.state,
      payload?.zip_code,
      payload?.country,
    ];

    if (addressParts) {
      return addressParts?.filter((item) => item).join(", ");
    }
  };

  useEffect(() => {
    const items = [
      {
        key: "first_name",
        label: "First Name",
        value: params?.state?.customer?.first_name,
      },
      {
        key: "last_name",
        label: "Last Name",
        value: params?.state?.customer?.last_name,
      },
      { key: "email", label: "Email", value: params?.state?.customer?.email },
      {
        key: "phone_number",
        label: "Phone Number",
        value: params?.state?.customer?.phone_number,
      },
      {
        key: "nationality",
        label: "Nationality",
        value: params?.state?.customer?.nationality,
      },
      {
        key: "date_of_birth",
        label: "Date Of Birth",
        value: formatDateTime(params?.state?.customer?.date_of_birth),
      },
      {
        key: "address",
        label: "Address",
        value: getAddress(params?.state?.customer),
      },
      {
        key: "weight",
        label: "Weight",
        value: params?.state?.customer?.weight,
      },
      {
        key: "number",
        label: "Passport Number",
        value: params?.state?.customer?.documents?.passport?.number,
      },
      {
        key: "expiration",
        label: "Passport Expiration",
        value: params?.state?.customer?.documents?.passport?.expiration,
      },
      {
        key: "date_of_issue",
        label: "Passport Date Of Issue",
        value: params?.state?.customer?.documents?.passport?.date_of_issue,
      },
      {
        key: "",
        label: "Passport View",
        value: "",
      },
    ];
    setBookingCustomer([...items]);
  }, [params]);

  return (
    <>
      <BookingCardComponent
        title={"Booking Customer"}
        component={

          <>
            <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }} style={{ position: "relative" }}>

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
                  {bookingCustomer?.[0]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[0]?.value ? bookingCustomer?.[0]?.value : "-"}
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
                  {bookingCustomer?.[0]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[0]?.value ? bookingCustomer[0]?.value : "-"}
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
                  {bookingCustomer?.[1]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[1]?.value ? bookingCustomer?.[1]?.value : "-"}
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
                  {bookingCustomer?.[2]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[2]?.value ? bookingCustomer?.[2]?.value : "-"}
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
                  {bookingCustomer?.[3]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[3]?.value ? bookingCustomer?.[3]?.value : "-"}
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
                  {bookingCustomer?.[4]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[4]?.value ? bookingCustomer?.[4]?.value : "-"}
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
                  {bookingCustomer?.[5]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[5]?.value ? bookingCustomer?.[5]?.value : "-"}
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
                  {bookingCustomer?.[6]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[6]?.value ? bookingCustomer?.[6]?.value : "-"}
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
                  {bookingCustomer?.[7]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[7]?.value ? bookingCustomer?.[7]?.value : "-"}
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
                  {bookingCustomer?.[8]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[8]?.value ? bookingCustomer?.[8]?.value : "-"}
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
                  {bookingCustomer?.[9]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[9]?.value ? bookingCustomer?.[9]?.value : "-"}
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
                  {bookingCustomer?.[10]?.label}
                </Typography>
                <Typography paragraph align="center">
                  {bookingCustomer?.[10]?.value ? bookingCustomer?.[10]?.value : "-"}
                </Typography>
              </Grid>

              <Grid
                item
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{ opacity: isLoading ? 0.5 : 1 }}
              >
                <Typography variant="subtitle1" align="center">
                  {bookingCustomer?.[11]?.label}
                </Typography>
                <Box>
                  <IconButton
                    color="primary"
                    onClick={viewImage}
                    sx={{ padding: 0 }}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    color="primary"
                    onClick={downloadImage}
                  >
                    <DownloadIcon />
                  </IconButton>

                </Box>
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
