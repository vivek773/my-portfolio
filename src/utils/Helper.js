// Helpers

// Moment
import moment from "moment";

export const formatDate = (date, format = "MM/DD/YYYY") => {
  if (date) {
    // return moment(date).utc().format(format)
    return moment(date).format(format);
  }
  return null;
};

// FormatCurrency

export const formatCurrency = (amountInCents) =>{ 
  return "$" + (amountInCents / 100).toFixed(2);

} 


// Chip
export const renderChipColorByStatus = (status) => {
  if (status === "active") {
    return "success";
  } else if (status === "inactive") {
    return "error";
  } else if (status === "invited") {
    return "info";
  } else if (status === "banned") {
    return "error";
  } else if (status === "inactive") {
    return "warning";
  }
};
