// Helmet components

// Default
import { Helmet } from "react-helmet-async";

const HelmetComponent = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetComponent;
