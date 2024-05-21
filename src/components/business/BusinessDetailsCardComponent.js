import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Grid,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomButton from "../../forms/button/CustomButton";

const useStyles = makeStyles(() => ({
  cardRoot: {
    border: "1px solid #ddd",
    margin: "35px 0",
    boxShadow: "none !important",
    borderRadius: "10px !important",
  },
  headerTitle: { alignItems: "center", display: "flex" },
  cardHeaderRoot: {
    background: "#f2f5f7",
    borderBottom: "1px solid #ddd",
    padding: "15px 25px !important",
  },
  cardContentRoot: {
    padding: "15px 25px !important",
  },
  detailRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
  },
  detailLabel: {
    fontWeight: 600,
  },
}));

const BusinessDetailsCardComponent = ({ details, onEdit }) => {
  const classes = useStyles();

  const detailsItems = [
    { label: "Name", value: details.name },
    { label: "Street", value: details.street },
    { label: "Unit", value: details.unit || "N/A" },
    { label: "City", value: details.city },
    { label: "State", value: details.state },
    { label: "Zip Code", value: details.zip_code },
    { label: "Phone Number", value: details.phone_number },
    { label: "Primary Airport Code", value: details.primary_airport_code },
  ];

  return (
    <Container>
      <Card className={classes.cardRoot}>
        <CardHeader
          className={classes.cardHeaderRoot}
          title={
            <Typography className={classes.headerTitle} variant={"h6"}>
              Details
            </Typography>
          }
          action={
            <CustomButton
              label={"Edit"}
              size={"medium"}
              disabled={false}
              bgColor={"#479DE1"}
              onClick={onEdit}
            />
          }
        />
        <CardContent className={classes.cardContentRoot}>
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {detailsItems.map((element, i) => (
              <Grid item key={i} xs={3}>
                <Typography variant="subtitle1" className={classes.detailLabel}>
                  {element.label}:
                </Typography>
                <Typography paragraph>{element.value}</Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BusinessDetailsCardComponent;
