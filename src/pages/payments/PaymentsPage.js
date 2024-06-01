// Payments page

// Default
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI components
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
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
import { setPayments } from "../../store/features/PaymentsSlice";

// Custom
import CustomButton from "../../forms/button/CustomButton";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Utils
import { fetchGETRequest } from "../../utils/Services";
import { EDISPATCHED } from "../../utils/Constants";
import { formatCurrency } from "../../utils/Helper";

// Context
import { useLoader } from "../../context/LoaderContext";

const TABLE_HEAD = [
  { id: "index", label: "#" },
  { id: "name", label: "Customer Name" },
  { id: "email", label: "Email" },
  { id: "amount", label: "Amount" },
  { id: "tax", label: "Tax" },
  { id: "amount_paid", label: "Total" },
  { id: "action", label: "Action" },
];

const PaymentsPage = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { isLoading, startLoading, stopLoading } = useLoader();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { payments } = useSelector((state) => state.payments);

  useEffect(() => {
    const getPaymentsData = async () => {
      startLoading();
      const response = await fetchGETRequest(`/payment/owner/get-payments`, {});

      if (response?.statusCode === 200 && response) {
        dispatch(setPayments(response?.payments));
        stopLoading();
      } else {
        stopLoading();
      }
    };
    getPaymentsData();

    // eslint-disable-next-line
  }, []);

  const handleView = (data) => {
    navigate(`/payments/${data?.payment_id}`, { state: data });
  };

  return (
    <>
      <HelmetComponent title={`${EDISPATCHED} | Payments`} />
      <Container maxWidth="xl">
        <Typography variant="h4" gutterBottom mb={5}>
          Payments
        </Typography>
        {isLoading && (
          <Box mt={10}>
            <SpinnerComponent show={isLoading} />
          </Box>
        )}

        {!isLoading &&
          (payments?.length === 0 ? (
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
                    {Array.isArray(payments) &&
                      payments?.map((payment, index) => (
                        <TableRow hover key={index}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">{`${payment?.customer?.first_name} ${payment?.customer?.last_name}`}</TableCell>
                          <TableCell align="center">
                            {payment?.customer?.email}
                          </TableCell>
                          <TableCell align="center">
                            ${formatCurrency(payment?.amount)}
                          </TableCell>
                          <TableCell align="center">
                            ${formatCurrency(payment?.tax)}
                          </TableCell>
                          <TableCell align="center">
                            $
                            {formatCurrency(
                              payment?.processor_details?.amount_paid
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <CustomButton
                              width={"fit-content"}
                              onClick={() => handleView(payment)}
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
                count={payments?.length}
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
export default PaymentsPage;
