// Pending Payment

// Default
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// MUI components
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Custom
import PaymentCardComponent from "./PaymentCardComponent";
import CustomButton from "../../forms/button/CustomButton";
import PaymentPendingModal from "./paymentsModal/PaymentPendingModal";
import Label from "../label/Label";

// Redux
import { useSelector } from "react-redux";

// Context
import { useModal } from "../../context/ModalContext";

// Utils
import { formatCurrency, renderChipColorByStatus } from "../../utils/Helper"

const BookingFlightSegmentsComponent = () => {
  const params = useLocation();
  const { openModal } = useModal();
  const [pendingPayments, setPendingPayments] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  const state = useSelector((state) => state.payments)

  const TABLE_HEAD = [
    { id: "amount", label: "Amount" },
    { id: "due_date", label: "Due Date" },
    { id: "status", label: "Status" },
    { id: "action", label: "Action" },
  ];

  useEffect(() => {
    if(state?.payments?.length > 0) {
     const findData =  state?.payments?.find((item) => item?.payment_id === params?.state?.payment_id)
      setPendingPayments([...findData?.pending_payments]);
    }
    // eslint-disable-next-line
  }, [params, state]);

  return (
    <>
      <PaymentCardComponent
        title={"Pending Payments"}
        component={
          pendingPayments?.length > 0 ? (
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
                    {Array.isArray(pendingPayments) &&
                      pendingPayments?.map((pending, index) => (
                        <TableRow hover key={index}>
                          <TableCell align="center">
                            {formatCurrency(pending?.amount)}
                          </TableCell>
                          <TableCell align="center">
                            {pending?.due_date}
                          </TableCell>
                          <TableCell align="center">
                            <Label
                              color={renderChipColorByStatus(pending.status)}
                            >
                              {pending.status}
                            </Label>
                          </TableCell>
                          <TableCell align="center">
                            <CustomButton
                              width={"fit-content"}
                              onClick={() => {
                                openModal("pendingPayment")
                                setPaymentData(pending)
                              }
                              }
                              label={"View"}
                              size={"small"}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          ) : (
            <Box>
              <Typography
                variant="h6"
                gutterBottom
                fontWeight={500}
                textAlign={"center"}
                color={"Gray"}
              >
                No data available
              </Typography>
            </Box>
          )
        }
      />
      <PaymentPendingModal data={params?.state} paymentData={paymentData} />
    </>
  );
};

export default BookingFlightSegmentsComponent;
