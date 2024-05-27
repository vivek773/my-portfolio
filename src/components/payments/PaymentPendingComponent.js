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

const BookingFlightSegmentsComponent = () => {
  const params = useLocation();
  const [pendingPayments, setPendingPayments] = useState(null);

  const TABLE_HEAD = [
    { id: "amount", label: "Amount" },
    { id: "due_date", label: "Due Date" },
    { id: "notes", label: "Notes" },
  ];

  useEffect(() => {
    setPendingPayments([... params?.state?.pending_payments]);
    // eslint-disable-next-line
  }, [params]);

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
                            {pending?.amount}
                          </TableCell>
                          <TableCell align="center">
                            {pending?.due_date}
                          </TableCell>
                          <TableCell align="center">
                            {pending?.notes}
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
    </>
  );
};

export default BookingFlightSegmentsComponent;
