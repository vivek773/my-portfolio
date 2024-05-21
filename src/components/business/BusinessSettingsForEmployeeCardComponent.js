import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Grid,
  Container,
  Switch,
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
  detailLabel: {
    fontWeight: 600,
  },
}));

const BusinessSettingsForEmployeeCardComponent = ({ settings, onEdit }) => {
  const classes = useStyles();

  const renderSettingValue = (key, value) => {
    switch (typeof value) {
      case "boolean":
        return (
          <Switch checked={value} disabled inputProps={{ "aria-label": key }} />
        );
      case "number":
        return value;
      default:
        return value || "N/A";
    }
  };

  return (
    <Container>
      <Card className={classes.cardRoot}>
        <CardHeader
          className={classes.cardHeaderRoot}
          title={
            <Typography className={classes.headerTitle} variant={"h6"}>
              Business Settings for Employee
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
            {settings
              ? Object.entries(settings).map(([key, value], i) => (
                  <Grid item key={i} xs={3}>
                    <Typography
                      variant="subtitle1"
                      className={classes.detailLabel}
                    >
                      {key.split("_").join(" ")}:
                    </Typography>
                    <Typography paragraph>
                      {renderSettingValue(key, value)}
                    </Typography>
                  </Grid>
                ))
              : "No settings available"}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default BusinessSettingsForEmployeeCardComponent;
