// Fleet Details page

// MUI components
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

// MUI styles
import { makeStyles } from "@mui/styles";

// Custom
import GroundSectionComponent from "./GroundSectionComponent";
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
    padding: "15px 25px",
  },
}));

const ALL_DETAILS_SECTIONS = [
  {
    title: "",
    type: "grounded",
    component: <GroundSectionComponent />,
  },
  {
    title: "Details",
    type: "input",
    component: null,
  },
  {
    title: "Pricing",
    type: "input",
    component: null,
  },
  {
    title: "Documents",
    type: "documents",
    component: null,
  },
  {
    title: "Hobbs & Tach",
    type: "input",
    component: null,
  },
  {
    title: "Force Return",
    type: "input",
    component: null,
  },
  {
    title: "Maintenance",
    type: "input",
    component: null,
  },
  {
    title: "Upcoming Maintenance Predictions",
    type: "input",
    component: null,
  },
];

const FleetDetailComponent = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      {ALL_DETAILS_SECTIONS.map((item) => {
        return (
          <Card className={classes.cardRoot}>
            {item.title !== "" && (
              <CardHeader
                className={classes.cardHeaderRoot}
                action={
                  <CustomButton
                    size="medium"
                    label={"Edit"}
                    disabled={false}
                    bgColor={"#479DE1"}
                  />
                }
                title={
                  <Typography className={classes.headerTitle} variant={"h6"}>
                    {item.title}
                  </Typography>
                }
              />
            )}
            {item.component}
          </Card>
        );
      })}
    </Container>
  );
};

export default FleetDetailComponent;
