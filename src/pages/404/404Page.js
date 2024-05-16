// 404 page

// Default
import { useNavigate } from "react-router-dom";

// MUI styles
import { styled } from "@mui/material/styles";

// MUI components
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Utils
import { EDISPATCHED } from "../../utils/Constants";

// Custom
import CustomButton from "../../forms/button/CustomButton";
import HelmetComponent from "../../components/helmet/HelmetComponent";

// Assets
import Svg404 from "../../assets/svg/404";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  // padding: theme.spacing(8, 0),
}));

const Page404 = () => {
  const navigate =  useNavigate();
  return (
    <>
      <HelmetComponent title={`${EDISPATCHED} | 404 Page Not Found`} />

      <Container>
        <StyledContent>
          <Typography variant="h3" paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
            mistyped the URL? Be sure to check your spelling.
          </Typography>

          <Box mt={4}>
            <Svg404 />
          </Box>

          <Box mt={4}>
            <CustomButton
              label={"Go to Home"}
              size={"large"}
              onClick={() => navigate("/")}
              disabled={false}
              width={"fit-content"}
              bgColor={"#479DE1"}
            />
          </Box>
        </StyledContent>
      </Container>
    </>
  );
};

export default Page404;
