//  Schedule card

// MUI components
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

// MUI styles
import { makeStyles } from "@mui/styles";

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
}));

const ScheduledPaymentCard = ({ action = <></>, title = "", component }) => {
  const classes = useStyles();
  return (
    <Card className={classes.cardRoot}>
      {title !== "" && (
        <CardHeader
          className={classes.cardHeaderRoot}
          action={action}
          title={
            <Typography className={classes.headerTitle} variant={"h6"}>
              {title}
            </Typography>
          }
        />
      )}
      <CardContent sx={{ "&:last-child": { paddingBottom: "16px" } }}>
        {component}
      </CardContent>
    </Card>
  );
};

export default ScheduledPaymentCard;
