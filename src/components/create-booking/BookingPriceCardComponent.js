import React from "react";
import { useSelector } from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { formatCurrency } from "../../utils/Helper";

const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid #ddd",
  margin: "20px 0",
  boxShadow: "none",
  borderRadius: "10px",
  padding: "20px",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "#f2f5f7",
  borderBottom: "1px solid #ddd",
  padding: "15px 25px",
}));

const headerTitleStyle = {
  alignItems: "center",
  display: "flex",
};

const BookingPriceCardComponent = () => {
  const quotedPrice = useSelector((state) => state.createBooking.quotedPrice);

  return (
    <StyledCard>
      <StyledCardHeader
        title={
          <Typography sx={headerTitleStyle} variant={"h6"}>
            Quoted Price
          </Typography>
        }
      />
      <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Base Price:
          </Typography>
          <Typography paragraph>
            {formatCurrency(quotedPrice.basePrice)}
          </Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Tax:
          </Typography>
          <Typography paragraph>{formatCurrency(quotedPrice.tax)}</Typography>

          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Total Due Now:
          </Typography>
          <Typography paragraph>
            {formatCurrency(quotedPrice.totalDueNow)}
          </Typography>

          {quotedPrice.amountDueLater > 0 && (
            <>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Amount Due Now:
              </Typography>
              <Typography paragraph>
                {formatCurrency(quotedPrice.amountAtTimeOfBooking)}
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Amount Due Later:
              </Typography>
              <Typography paragraph>
                {formatCurrency(quotedPrice.amountDueLater)}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Tax Due Later:
              </Typography>
              <Typography paragraph>
                {formatCurrency(quotedPrice.taxDueLater)}
              </Typography>

              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                Due Later Date:
              </Typography>
              <Typography paragraph>
                {quotedPrice.amountDueLaterDate}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default BookingPriceCardComponent;
