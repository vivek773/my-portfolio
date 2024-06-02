// Airworthiness Section

// Default
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// MUI components
import {
  Box,
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
} from "@mui/material";

// Custom
import CustomButton from "../../../forms/button/CustomButton";

const AirworthinessSectionComponent = () => {
  const fleet = useSelector((state) => state.fleet);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const TABLE_HEAD = [
    { id: "ad_title", label: "Ad Title" },
    { id: "due_at_date", label: "Due At Date" },
    { id: "due_at_hobbs_hours", label: "Due At Hobs Hours" },
    { id: "prop_one_tach_due_hours", label: "Prop One Due Hours" },
    { id: "service_bulletin_id", label: "Service Bulleting Id" },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          mb={5}
          mt={5}
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
        </Stack>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {TABLE_HEAD.map((header) => (
                    <TableCell key={header.id} align="center">
                      {header.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(fleet?.airworthinessDirectives) &&
                  fleet.airworthinessDirectives.length > 0 ? (
                  fleet.airworthinessDirectives.map((ad, index) => (
                    <TableRow hover key={index}>
                      <TableCell align="center">{ad?.ad_title}</TableCell>
                      <TableCell align="center">{ad?.due_at_date}</TableCell>
                      <TableCell align="center">{ad?.due_at_hobbs_hours}</TableCell>
                      <TableCell align="center">{ad.prop_one_tach_due_hours}</TableCell>
                      <TableCell align="center">{ad.service_bulletin_id}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={TABLE_HEAD.length} align="center">
                      No data available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {fleet?.airworthinessDirectives && fleet.airworthinessDirectives.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={fleet.airworthinessDirectives.length}
              rowsPerPage={limit}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
            />
          )}

      </Container>
    </>
  );
};

export default AirworthinessSectionComponent;


