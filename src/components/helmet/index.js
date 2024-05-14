// Helmet components

// Default
import { Helmet } from "react-helmet-async";

const  MainHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MainHelmet;
