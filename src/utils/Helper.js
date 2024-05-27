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

// src/utils/FormatCurrency.js

export const formatCurrency = (amountInCents) =>
  (amountInCents / 100).toFixed(2);
