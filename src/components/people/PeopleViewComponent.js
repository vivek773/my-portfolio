// People view component


// MUI components
import Container from "@mui/material/Container";

// Custom
import PeopleDetailComponent from "./PeopleDetailComponent";
import PeopleDocumentsComponent from "./PeopleDocumentsComponent";



const PeopleViewComponent = () => {

  return (
    <Container maxWidth="lg">
       <PeopleDetailComponent />
       <PeopleDocumentsComponent />
    </Container>
  );
};

export default PeopleViewComponent;
