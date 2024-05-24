// Airworthiness Section

// Default
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// MUI components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

// Custom
import CustomButton from "../../../forms/button/CustomButton";
import DataTable from "../../../components/table/TableComponent";

const AirworthinessSectionComponent = () => {
  const fleet = useSelector((state) => state.fleet);
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

  const columns = [
    // { key: "ad_id", label: "Ad Id" },
    { key: "ad_title", label: "Ad Title" },
    { key: "due_at_date", label: "Due At Date" },
    // { key: "due_at_engine_one_tach_hours", label: "Due At Engine One Hours" },
    // { key: "due_at_engine_two_tach_hours", label: "Due At Engine Two Hours" },
    { key: "due_at_hobbs_hours", label: "Due At Hobs Hours" },
    { key: "prop_one_tach_due_hours", label: "Prop One Due Hours" },
    { key: "service_bulletin_id", label: "Service Bulleting Id" },
    // {
    //   key: "service_bulletin_description",
    //   label: "Service Bulletin Description",
    // },
  ];

  useEffect(() => {
    let newData = [];
    const columnsKeys = columns.map((item) => item.key);

    if (fleet?.airworthinessDirectives?.length > 0) {
      newData = fleet.airworthinessDirectives.map((directive) => {
        return Object.entries(directive)
          .map(([directiveKey, directiveValue]) => {
            if (columnsKeys.includes(directiveKey)) {
              return {
                key: directiveKey,
                value: directiveValue ?? "-",
              };
            }
            return null;
          })
          .filter((entry) => entry !== null);
      });
    }

    setRows([...newData]);
    // eslint-disable-next-line
  }, [fleet]);

  return (
    <>
      <Container maxWidth="xl">
        <Box
          mt={5}
          mb={5}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h4" gutterBottom mb={0}>
            Airworthiness Directives
          </Typography>
          <CustomButton
            label="Create Airworthiness Directives"
            width={"fit-content"}
            sx={{
              width: "auto",
              whiteSpace: "nowrap",
            }}
            onClick={() =>
              navigate(`/fleet/${fleet.tail_number}/create-airworthiness`)
            }
          />
        </Box>
        {rows?.length > 0 ? (
          <DataTable rows={rows} columns={columns} />
        ) : (
          <Box>
            <Typography
              variant="h6"
              gutterBottom
              mt={10}
              fontWeight={500}
              textAlign={"center"}
              color={"Gray"}
            >
              No data available
            </Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default AirworthinessSectionComponent;
