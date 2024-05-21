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
}));

const BusinessMerchantAccountDetailsCardComponent = ({
  merchantAccountDetails,
  onEdit,
}) => {
  const classes = useStyles();

  return (
    <Container>
      <Card className={classes.cardRoot}>
        <CardHeader
          className={classes.cardHeaderRoot}
          title={
            <Typography className={classes.headerTitle} variant={"h6"}>
              Merchant Account Details
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
          <Typography variant="body2">
            {merchantAccountDetails
              ? JSON.stringify(merchantAccountDetails)
              : "No merchant account details available"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BusinessMerchantAccountDetailsCardComponent;
