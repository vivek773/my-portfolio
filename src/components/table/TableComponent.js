// Data table

// MUI components

import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import ScrollbarComponent from "../scrollbar/ScrollbarComponent";

const DataTable = ({
  rows,
  columns,
  selected,
  pagination = false,
  rowsPerPageOptions = [10],
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <Card sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.04)" }}>
      <ScrollbarComponent>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => {
                  return (
                    <TableCell align="center" key={index}>
                      {column.label}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((rowData, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  hover
                  role="checkbox"
                  selected={selected}
                >
                  {rowData?.map((cellData, cellIndex) => (
                    <TableCell key={cellIndex} align="center">
                      {cellData.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollbarComponent>

      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </Card>
  );
};

export default DataTable;
