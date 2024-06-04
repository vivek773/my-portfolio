import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import PeopleCardComponent from "./PeopleCardComponent";

const PeopleDetailComponent = () => {
  const params = useLocation();
  const [peopleDetails, setPeopleDetails] = useState(null);

  const getAddress = (payload) => {
    const addressParts = [
      payload?.address,
      payload?.unit,
      payload?.city,
      payload?.state,
      payload?.zip_code,
      payload?.country,
    ];

    if (addressParts) {
      return addressParts.filter((item) => item).join(", ");
    }
  };

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
      {
        key: "address",
        label: "Address",
        value: getAddress(params?.state?.details),
      },
      {
        key: "date_of_birth",
        label: "Date Of Birth",
        value: params?.state?.details?.date_of_birth,
      },
      {
        key: "role",
        label: "Role",
        value: params?.state?.user_tenant_profile[0]?.role,
      },
      {
        key: "status",
        label: "Status",
        value: params?.state?.user_tenant_profile[0]?.status,
      },
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
              <Grid
                item
                key={i}
                xs={3}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
              >
                <Typography variant="subtitle1" align="center">
                  {element.label}
                </Typography>
                <Typography paragraph align="center">
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
