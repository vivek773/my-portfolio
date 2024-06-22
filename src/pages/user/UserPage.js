// Destination page

// Default
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/features/UserSlice";

// Custom
import Label from "../../components/label";
import CustomButton from "../../forms/button/CustomButton";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Utils
import { fetchGETRequest } from "../../utils/Services";
import { EDISPATCHED_HELMET } from "../../utils/Constants";
import { renderChipColorByStatus } from "../../utils/Helper";

// Context
import { useLoader } from "../../context/LoaderContext";

const TABLE_HEAD = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "status", label: "Status" },
  { id: "action", label: "Action" },
];

const UserPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { isLoading, startLoading, stopLoading } = useLoader();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getUserData = async () => {
      startLoading();
      const response = await fetchGETRequest(`/user/owner/get-users`, {});

      if (response?.statusCode === 201 && response) {
        dispatch(setUser(response?.data));
        stopLoading();
      } else {
        stopLoading();
      }
    };
    getUserData();

    // eslint-disable-next-line
  }, []);

  const handleView = (data) => {
    navigate(`/users/${data?.user_id}`, { state: data });
  };

  return (
    <>
      <HelmetComponent title={`${EDISPATCHED_HELMET} User `} />
      <Container maxWidth="xl">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          mb={5}
        >
          <Typography variant="h4" gutterBottom mb={0}>
            User
          </Typography>
          <CustomButton
            label="Add User"
            width={"fit-content"}
            sx={{
              width: "auto",
              whiteSpace: "nowrap",
            }}
            onClick={() => navigate("/users/add-User")}
          />
        </Stack>

        {isLoading && (
          <Box mt={10}>
            <SpinnerComponent show={isLoading} />
          </Box>
        )}

        {!isLoading &&
          (user?.length === 0 ? (
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
                    {Array.isArray(user) &&
                      user?.map((user, index) => (
                        <TableRow hover key={index}>
                          <TableCell align="center">
                            {user?.first_name + " " + user?.last_name}
                          </TableCell>
                          <TableCell align="center">{user?.email}</TableCell>
                          <TableCell align="center">
                            {user?.user_tenant_profile[0]?.role}
                          </TableCell>

                          <TableCell align="center">
                            <Label
                              color={renderChipColorByStatus(
                                user?.user_tenant_profile[0]?.status
                              )}
                            >
                              {user?.user_tenant_profile[0]?.status}
                            </Label>
                          </TableCell>
                          <TableCell align="center">
                            <CustomButton
                              width={"fit-content"}
                              onClick={() => handleView(user)}
                              label={"View"}
                              size={"small"}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={user?.length}
                rowsPerPage={limit}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
              />
            </Card>
          ))}
      </Container>
    </>
  );
};

export default UserPage;
