// User view component

// MUI components
import Container from "@mui/material/Container";

// Custom
import UserDetailComponent from "./UserDetailComponent";
import UserDocumentsComponent from "./UserDocumentsComponent";

const UserViewComponent = () => {
  return (
    <Container maxWidth="lg">
      <UserDetailComponent />
      {/* <UserDocumentsComponent /> */}
    </Container>
  );
};

export default UserViewComponent;
