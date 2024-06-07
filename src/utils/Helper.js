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

export const formatDateLong = (date, format = "MMM DD, YYYY") => {
  if (date) {
    // return moment(date).utc().format(format)
    return moment(date).format(format);
  }
  return null;
};

export const formatDateTime = (date, format = "MM/DD/YYYY hh:mm A") => {
  if (date) {
    return moment(date).format(format);
  }
  return null;
};

export const formatDateTimeLong = (date, format = "MMM DD, YYYY - hh:mm A") => {
  if (date) {
    return moment(date).format(format);
  }
  return null;
};

export const formatDateTimeWithoutYear = (date, format = "MMM D, h:mm A") => {
  if (date) {
    return moment(date).format(format);
  }
  return null;
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export const validatePhoneNumber = (phoneNumber) => {
  return /^\d{10,15}$/.test(phoneNumber);
};

// FormatCurrency

export const formatCurrency = (amountInCents) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amountInCents / 100);
};

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
  } else if (status === "confirmed_with_balance_due") {
    return "info";
  } else if (status === "confirmed") {
    return "success";
  } else if (status === "completed") {
    return "success";
  }
};

// Phone Number Formatter
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "";

  // Remove all non-digit characters
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");

  // Assuming phone number includes country code
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]}`;
  }

  return phoneNumber;
};
