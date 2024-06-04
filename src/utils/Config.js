// Config

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import GroupIcon from "@mui/icons-material/Group";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PriceChangeIcon from "@mui/icons-material/PriceChange";

export const ADMIN_CONFIG = [
  {
    title: "Fleet",
    path: "fleet",
    icon: <AirplanemodeActiveIcon />,
  },
  {
    title: "Bookings",
    path: "bookings",
    icon: <ScheduleIcon />,
  },
  {
    title: "Calendar",
    path: "calendar",
    icon: <CalendarTodayIcon />,
  },
  {
    title: "Payments",
    path: "payments",
    icon: <MonetizationOnIcon />,
  },
  {
    title: "Scheduled Payments",
    path: "schedule-payments",
    icon: <PriceChangeIcon />,
  },
  {
    title: "Destinations",
    path: "destinations",
    icon: <FmdGoodIcon />,
  },
  {
    title: "Statistics",
    path: "stats",
    icon: <AssessmentIcon />,
  },
  {
    title: "Flight Logs",
    path: "flight-logs",
    icon: <MenuBookIcon />,
  },
  {
    title: "Maintenance Logs",
    path: "maintenance-logs",
    icon: <BuildIcon />,
  },
  {
    title: "People",
    path: "people",
    icon: <GroupIcon />,
  },
  {
    title: "Settings",
    path: "settings",
    icon: <SettingsIcon />,
  },
  {
    title: "Profile",
    path: "profile",
    icon: <AccountCircleIcon />,
  },
];
