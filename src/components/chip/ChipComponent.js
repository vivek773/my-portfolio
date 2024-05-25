// Chip component

// MUI components
import Box from "@mui/material/Box";

// MUI styles
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  root: {
    height: "24px",
    minWidth: "22px",
    lineHeight: 0,
    borderRadius: "6px",
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    textTransform: "capitalize",
    padding: "0px 8px",
    fontSize: "0.75rem",
    fontWeight: 700,
  },
}));

const ChipComponent = ({ label, bgColor, color }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.root}
      sx={{ backgroundColor: bgColor, color: color }}
    >
      {label}
    </Box>
  );
};

export default ChipComponent;
