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
  headerTitle: {
    alignItems: "center",
    display: "flex",
  },
  cardHeaderRoot: {
    background: "#f2f5f7",
    borderBottom: "1px solid #ddd",
    padding: "15px 25px !important",
  },
  cardContentRoot: {
    padding: "15px 25px !important",
  },
  detailItem: {
    textAlign: "center",
  },
  detailLabel: {
    fontWeight: 600,
    marginBottom: "8px",
  },
  centerGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const BusinessEmailsCardComponent = ({ emails, onEdit }) => {
  const classes = useStyles();

  return (
    <Container>
      <Card className={classes.cardRoot}>
        <CardHeader
          className={classes.cardHeaderRoot}
          title={
            <Typography className={classes.headerTitle} variant={"h6"}>
              Emails
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
          <Grid container spacing={2} className={classes.centerGrid}>
            <Grid item xs={6} className={classes.detailItem}>
              <Typography variant="subtitle1" className={classes.detailLabel}>
                Booking Email
              </Typography>
              <Typography variant="body1">
                {emails?.booking_email || "-"}
              </Typography>
            </Grid>
            <Grid item xs={6} className={classes.detailItem}>
              <Typography variant="subtitle1" className={classes.detailLabel}>
                Contact Email
              </Typography>
              <Typography variant="body1">
                {emails?.contact_email || "-"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BusinessEmailsCardComponent;
