// Hobbs & Tach section

// Default
import { useState, useEffect } from "react";

// MUI components
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

// Custom
import FleetDetailCardComponent from "./FleetDetailCardComponent";
import CustomButton from "../../../forms/button/CustomButton";

// Redux
import { useSelector } from "react-redux";

// Context
import { useModal } from "../../../context/ModalContext";

// Modal
import HobbsAndTachSectionModal from "./detailModal/HobbsAndTachSectionModal";

const PricingSectionComponent = () => {
  const { openModal } = useModal();
  const [hobbsItems, setHobbsItems] = useState([]);
  const fleet = useSelector((state) => state.fleet);

  useEffect(() => {
    const items = [
      {
        key: "hobbs",
        label: "Hobbs",
        value: fleet.details.hobbs,
      },
      {
        key: "tach_engine_one",
        label: "Tach Engine One",
        value: fleet.details.tach_engine_one,
      },
    ];
    if (fleet.details.category === "airplane_multi_engine_land") {
      items.push({
        key: "tach_engine_two",
        label: "Tach Engine Two",
        value: fleet.details.tach_engine_two ?? "-",
      });
    }
    setHobbsItems([...items]);
  }, [fleet]);

  return (
    <>
    <FleetDetailCardComponent
      title="Hobbs & Tach"
      action={
        <CustomButton
          label={"Edit"}
          size={"medium"}
          disabled={false}
          bgColor={"#479DE1"}
          onClick={() => openModal("Hobbs & Tach")}
        />
      }
      component={
        <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
          {hobbsItems?.map((element, i) => (
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
    <HobbsAndTachSectionModal hobbsItems={hobbsItems} setHobbsItems={setHobbsItems}/>
    </>
  );
};

export default PricingSectionComponent;
