// Constants

// API url
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;
export const WEB_PORTAL_URL = process.env.REACT_APP_WEB_PORTAL_URL;

// Helmet title
export const EDISPATCHED = "eDispatched-135";

// US States
export const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
  "American Samoa",
  "District of Columbia",
  "Federated States of Micronesia",
  "Guam",
  "Marshall Islands",
  "Northern Mariana Islands",
  "Palau",
  "Puerto Rico",
  "Virgin Islands",
];

// Documents Types
export const DOCUMENTS_TYPES = [
  "pilot_operating_handbook",
  "checklist",
  "weight_and_balance",
  "airworthiness_certificate",
  "registration",
  "insurance",
];

// Time Zone
export const TIME_ZONE = [
  { label: "America/New_York - Eastern Time (ET)", value: "America/New_York" },
  { label: "America/Chicago - Central Time (CT)", value: "America/Chicago" },
  { label: "America/Denver - Mountain Time (MT)", value: "America/Denver" },
  {
    label: "America/Los_Angeles - Pacific Time (PT)",
    value: "America/Los_Angeles",
  },
  {
    label: "America/Puerto_Rico - Atlantic Standard Time (AST)",
    value: "America/Puerto_Rico",
  },
];

export const SYNC_FUSION_SCHEDULER_KEY =
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXtdcHRURGhZVUZ1WUQ=";

export const STATUS = (status) => {
  if (status === "mx_merchant") {
    return "MX Merchant";
  } else if (status === "active") {
    return "Active";
  } else if (status === "invited") {
    return "Invited";
  } else if (status === "banned") {
    return "Banned";
  } else if (status === "inactive") {
    return "Inactive";
  } else if (status === "confirmed_with_balance_due") {
    return "Confirmed - Balance Due";
  } else if (status === "confirmed") {
    return "Confirmed";
  } else if (status === "completed") {
    return "Completed";
  } else if (status === "one_way") {
    return "One Way";
  } else if (status === "round_trip") {
    return "Round Trip";
  }
};
