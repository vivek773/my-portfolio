// MUI icons
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

// Svg icons
import Html5Icon from "../assets/svg/html5";
import Css3Icon from "../assets/svg/css3";
import JavascriptIcon from "../assets/svg/javascript";
import TypescriptIcon from "../assets/svg/typescript";
import ReactIcon from "../assets/svg/react";
import ReduxIcon from "../assets/svg/redux";
import NextjsIcon from "../assets/svg/nextjs";
import NodejsIcon from "../assets/svg/nodejs";

export const CONFIG = {
  username: "Vivek Singh",
  about:
    "I'm a frontend developer with 3+ years of experience specializing in building responsive and user-friendly web applications. My skill set includes React.js, Next.js, HTML, CSS, JavaScript, TypeScript, Redux, Firebase, and React Query. I have successfully delivered a range of web development projects, leveraging technologies like Node.js, MongoDB, and GraphQL. With a focus on frontend development, I ensure seamless integration of design and functionality, contributing to both mobile and web platforms.",
  developer: "Frontend Developer",
  yearOfExperience: 3,
  completedProjects: 7,
  freelancer: "Freelancer",
};

export const DATE = {
  currentYear: new Date().getFullYear(),
};

export const PAGES = [
  { id: 0, name: "Home" },
  { id: 1, name: "About" },
  { id: 2, name: "Skills" },
  { id: 3, name: "Projects" },
  { id: 4, name: "My Journey" },
];

export const RESPONSIVE_PAGES = [
  { id: 0, name: "Home" },
  { id: 1, name: "About" },
  { id: 2, name: "Skills" },
  { id: 3, name: "Projects" },
  { id: 4, name: "My Journey" },
  { id: 5, name: "Contact me" },
];

export const ABOUT_CARD_DATA = [
  {
    title: CONFIG.developer,
    linkText: "Projects",
    link: "",
    icon: "</>",
  },
  {
    title: CONFIG.freelancer,
    linkText: "Hire me!",
    link: "",
    icon: "{ }",
  },
];

export const SKILLS = [
  {
    name: "Html5",
    icon: <Html5Icon />,
    bgColor: "#f08b71",
  },

  {
    name: "Css3",
    icon: <Css3Icon />,
    bgColor: "#82c4f5",
  },
  {
    name: "Javascript",
    icon: <JavascriptIcon />,
    bgColor: "#c3c89f",
  },
  {
    name: "TypeScript",
    icon: <TypescriptIcon />,
    bgColor: "#82c4f5",
  },
  {
    name: "React",
    icon: <ReactIcon />,
    bgColor: "#6c9dab",
  },
  {
    name: "Redux",
    icon: <ReduxIcon />,
    bgColor: "#9584b1",
  },
  {
    name: "Next",
    icon: <NextjsIcon />,
    bgColor: "#848583",
  },
  {
    name: "Nodejs",
    icon: <NodejsIcon />,
    bgColor: "#5a6849",
  },
];

export const SOCIAL_MEDIA = [
  {
    id: 1,
    link: "https://www.instagram.com/ervivek.singh.754?igsh=ZDNpMmF4eWJnZHhi",
    icon: <InstagramIcon fontSize="large" style={{ color: "#f0db4f" }} />,
  },
  {
    id: 2,
    link: "https://www.linkedin.com/in/vivek-singh-5770b41b7?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    icon: <LinkedInIcon fontSize="large" style={{ color: "#f0db4f" }} />,
  },
  {
    id: 3,
    link: "https://github.com/vivek773",
    icon: <GitHubIcon fontSize="large" style={{ color: "#f0db4f" }} />,
  },
];

