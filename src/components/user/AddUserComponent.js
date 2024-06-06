// Add User

// Default
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI components
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Custom
import CustomInput from "../../forms/input/CustomInput";
import CustomButton from "../../forms/button/CustomButton";
import SwitchComponent from "../switch/SwitchComponent";

// Context
import { useToast } from "../../context/ToastContext";
import { useLoader } from "../../context/LoaderContext";
import { fetchPOSTRequest } from "../../utils/Services";

const AddUserComponent = () => {
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const validationSchema = Yup.object({
    first_name: Yup.string().required("First Name is required."),
    last_name: Yup.string().required("Last Name is required."),
    email: Yup.string().required("Email is required."),
    role: Yup.string().required("Role is required."),
    is_admin: Yup.string().optional(),
    is_pilot: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "member",
      is_admin: false,
      is_pilot: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      startLoading();

      const response = await fetchPOSTRequest(`/user/owner/add-user`, values);
      if (response?.statusCode === 201 && response) {
        setToast({
          open: true,
          message: response?.message,
          severity: "success",
        });
        stopLoading();
        formik.resetForm();
      } else {
        setToast({
          open: true,
          message: response?.message,
          severity: "error",
        });
        stopLoading();
        formik.resetForm();
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <h2 style={{ justifyContent: "center" }}>Add User</h2>

      <form>
        <Stack spacing={3}>
          <CustomInput
            name="first_name"
            value={formik.values.first_name}
            label="First Name"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="last_name"
            value={formik.values.last_name}
            label="Last Name"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />

          <SwitchComponent
            value={formik.values.is_admin}
            label={"Admin"}
            onChange={() =>
              formik.setFieldValue("is_admin", !formik.values.is_admin)
            }
          />

          <SwitchComponent
            value={formik.values.is_pilot}
            label={"Pilot"}
            onChange={() =>
              formik.setFieldValue("is_pilot", !formik.values.is_pilot)
            }
          />

          <CustomButton
            label={"Add User"}
            size={"large"}
            onClick={formik.handleSubmit}
            disabled={false}
            bgColor={"#479DE1"}
            isLoading={isLoading}
          />
        </Stack>
      </form>
    </Container>
  );
};

export default AddUserComponent;
