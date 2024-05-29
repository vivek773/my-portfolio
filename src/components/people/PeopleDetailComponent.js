// Business details

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Custom
import PeopleCardComponent from "./PeopleCardComponent";

const PeopleDetailComponent = () => {
  const params = useLocation();
  const [peopleDetails, setPeopleDetails] = useState(null);


  useEffect(() => {
    const items = [
      {
        key: "first_name",
        label: "First Name",
        value: params?.state?.first_name,
      },
      {
        key: "last_name",
        label: "Last Name",
        value: params?.state?.last_name,
      },
      { key: "email", label: "Email", value: params?.state?.email },
      { key: "date_of_birth", label: "Date Of Birth", value: params?.state?.details?.date_of_birth },
    ];
    setPeopleDetails([...items]);
  }, [params]);

  return (
    <>
      <PeopleCardComponent
        title={"People Detail"}
        component={
          <Grid container spacing={{ xs: 5, md: 3 }} columns={{ md: 12 }}>
            {peopleDetails?.map((element, i) => (
              <Grid item key={i} xs={3}>
                <Typography variant="subtitle1">{element.label}</Typography>
                <Typography paragraph>
                  {element?.value ? element.value : "-"}
                </Typography>
              </Grid>
            ))}
          </Grid>
        }
      />
    </>
  );
};

export default PeopleDetailComponent;
