// Config

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";

// Utils
import {
  DASHBOARD,
  BOOKINGS,
  STATS,
  FLIGHT_LOGS,
  CALENDAR,
  MAINTENANCE_LOGS,
  USERS,
  PAYMENTS,
  BUSINESS_SETTINGS,
  PROFILE,
} from "./Constants";

export const ADMIN_CONFIG = [
  {
    title: "Fleet",
    path: DASHBOARD,
    icon: <AirplanemodeActiveIcon />,
  },
  {
    title: "Bookings",
    path: BOOKINGS,
    icon: <ScheduleIcon />,
  },
  {
    title: "Calendar",
    path: CALENDAR,
    icon: <CalendarTodayIcon />,
  },
  {
    title: "Statistics",
    path: STATS,
    icon: <AssessmentIcon />,
  },
  {
    title: "Flight Logs",
    path: FLIGHT_LOGS,
    icon: <MenuBookIcon />,
  },
  {
    title: "Maintenance Logs",
    path: MAINTENANCE_LOGS,
    icon: <BuildIcon />,
  },
  {
    title: "People",
    path: USERS,
    icon: <GroupIcon />,
  },
  {
    title: "Payments",
    path: PAYMENTS,
    icon: <MonetizationOnIcon />,
  },
  {
    title: "Business Settings",
    path: BUSINESS_SETTINGS,
    icon: <SettingsIcon />,
  },
  {
    title: "Profile",
    path: PROFILE,
    icon: <AccountCircleIcon />,
  },
];
