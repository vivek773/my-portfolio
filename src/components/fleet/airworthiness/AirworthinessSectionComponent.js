// Airworthiness Section

// Default
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// MUI components
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

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

        {fleet?.airworthinessDirectives?.length === 0 ? (
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
        ) : (
          <Card>
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
                    fleet?.airworthinessDirectives?.map((ad, index) => (
                      <TableRow hover key={index}>
                        <TableCell align="center">{ad?.ad_title}</TableCell>
                        <TableCell align="center">{ad?.due_at_date}</TableCell>
                        <TableCell align="center">
                          {ad?.due_at_hobbs_hours}
                        </TableCell>
                        <TableCell align="center">
                          {ad.prop_one_tach_due_hours}
                        </TableCell>
                        <TableCell align="center">
                          {ad.service_bulletin_id}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10]}
              component="div"
              count={fleet?.airworthinessDirectives?.length}
              rowsPerPage={limit}
              page={page}
              onPageChange={(event, newPage) => setPage(newPage)}
            />
          </Card>
        )}
      </Container>
    </>
  );
};

export default AirworthinessSectionComponent;


