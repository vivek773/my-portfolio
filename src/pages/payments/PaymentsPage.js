// Payments page

// Default
import { useEffect, useState } from "react";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setPayments } from "../../store/features/PaymentsSlice";

// Custom
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Utils
import { fetchGETRequest } from "../../utils/Services";
import { EDISPATCHED } from "../../utils/Constants";

// Context
import { useLoader } from "../../context/LoaderContext";
import { Card, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../forms/button/CustomButton";
import Label from "../../components/label";
import { formatCurrency, formatDateTimeWithoutYear, renderChipColorByStatus } from "../../utils/Helper";

const PaymentsPage = () => {
  const navigate = useNavigate();

  const TABLE_HEAD = [
    { id: "index", label: "#" },
    { id: "name", label: "Customer Name" },
    { id: "email", label: "Email" },
    { id: "amount_paid", label: "Amount" },
    { id: "transaction_date", label: "Date" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const { isLoading, startLoading, stopLoading } = useLoader();
  const dispatch = useDispatch();
  const { payments, } = useSelector((state) => state.payments);
  const handleView = (data) => {
    navigate(`/payments/${data?.payment_id}`, { state: data });
  };
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
  }, []); return (
    <>
      <HelmetComponent title={`${EDISPATCHED} | Payments`} />
      <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom mb={5}>
            Payments
          </Typography>
    
        {isLoading ? (
          <Box mt={10}>
            <SpinnerComponent show={isLoading} />
          </Box>
        )
          :
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
                          $
                          {formatCurrency(
                            payment?.processor_details?.amount_paid
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {formatDateTimeWithoutYear(payment?.created_at)}
                        </TableCell>
                        <TableCell align="center">
                          <Label color={renderChipColorByStatus(payment?.status)}>
                            {payment?.status}
                          </Label>
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
        }
      </Container>
    </>
  );
};
export default PaymentsPage;
