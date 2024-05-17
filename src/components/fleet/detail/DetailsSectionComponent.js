// Details section

// MUI components
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
import CustomButton from "../../../forms/button/CustomButton";

// Context
import { useModal } from "../../../context/ModalContext";

const DetailsSectionComponent = () => {
  const itemArr = [
    { label: "Tail Number ", value: "N12345" },
    { label: "Tail Number ", value: "N12345" },
    { label: "Tail Number ", value: "N12345" },
    { label: "Tail Number ", value: "N12345" },
    { label: "Tail Number ", value: "N12345" },
    { label: "Tail Number ", value: "N12345" },
    { label: "Tail Number ", value: "N12345" },
    { label: "Tail Number ", value: "N12345" },
  ];

  const { openModal } = useModal();

  return (
    <FleetDetailCardComponent
      title="Details"
      action={
        <CustomButton
          label={"Edit"}
          size={"medium"}
          disabled={false}
          bgColor={"#479DE1"}
          onClick={() => openModal("Details")}
        />
      }
      component={
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
      }
    />
  );
};

export default DetailsSectionComponent;
