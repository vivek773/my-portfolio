// Force return section

// MUI components
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import FormHelperText from "@mui/material/FormHelperText";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
// import CustomButton from "../../../forms/button/CustomButton";

const ForceSectionComponent = () => {
  const itemArr = [
    { label: "Hobbs", value: "88.0" },
    { label: "Tach", value: "88.0" },
  ];

  return (
    <FleetDetailCardComponent
      title="Force Return"
      // action={
      //   <CustomButton
      //     label={"Start Forced Return"}
      //     size={"medium"}
      //     disabled={false}
      //     bgColor={"#479DE1"}
      //   />
      // }
      component={
        true ? (
          <FormHelperText
            sx={{ margin: "10px 22px", fontSize: "16px" }}
            variant="filled"
          >
            This feature will be enabled once plane is checked out.You can use
            this to override plane reurrn.
          </FormHelperText>
        ) : (
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {itemArr.map((element, i) => (
              <Grid item key={i} xs={3}>
                <FormControl>
                  <Typography variant="subtitle1">{element.label}</Typography>
                  <Typography paragraph>
                    {element.value ? element.value : "-"}
                  </Typography>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        )
      }
    />
  );
};

export default ForceSectionComponent;
