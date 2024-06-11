import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid #ddd",
  margin: "35px 0",
  boxShadow: "none",
  borderRadius: "10px",
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

const BusinessCardComponent = ({ action = <></>, title = "", component }) => {
  return (
    <StyledCard>
      {title !== "" && (
        <StyledCardHeader
          action={action}
          title={
            <Box sx={headerTitleStyle}>
              <Typography variant="h6">{title}</Typography>
            </Box>
          }
        />
      )}
      <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
        {component}
      </CardContent>
    </StyledCard>
  );
};

export default BusinessCardComponent;
