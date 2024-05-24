// Add plan

// Default
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI components
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Custom
import CustomInput from "../../forms/input/CustomInput";
import CustomButton from "../../forms/button/CustomButton";
import CustomSelect from "../../forms/select/CustomSelect";
import SwitchComponent from "../switch/SwitchComponent";

// Context
import { useToast } from "../../context/ToastContext";
import { useLoader } from "../../context/LoaderContext";
import { fetchPOSTRequest } from "../../utils/Services";

// Utils
import { TIME_ZONE } from "../../utils/Constants";

const AddDestinationComponent = () => {
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();
 
  const validationSchema = Yup.object({
    airport_code: Yup.string().required("Airport code is required."),
    airport_name: Yup.string().required(
      "Airport name is required."
    ),
    city: Yup.string().required("City is required."),
    state: Yup.string().required("State is required."),
    country: Yup.string().required("Country is required."),
    destination_specific_cost: Yup.string().required("Destination specific cost is required."),
    show_in_departure_list: Yup.string().optional(),
    show_in_arrival_list: Yup.string().optional(),
    airport_timezone: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
    })
      .nullable()
      .required("Airport timezone is required."),
  });

  const formik = useFormik({
    initialValues: {
      airport_code: "",
      airport_name: "",
      city: "",
      state: "",
      country: "",
      destination_specific_cost: "",
      show_in_departure_list: false,
      show_in_arrival_list: false,
      airport_timezone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      startLoading();

      const response = await fetchPOSTRequest(`/destination/owner/add-destination`, values);
      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });
        stopLoading();
        formik.resetForm();
      } else {
        setToast({
          open: true,
          message: response?.Message,
          severity: "error",
        });
        stopLoading();
        formik.resetForm();
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <h2 style={{ justifyContent: "center" }}>Add Destination</h2>
      <Container>
        <form>
          <Stack spacing={3}>
            <CustomInput
              name="airport_code"
              value={formik.values.airport_code}
              label="Airport Code"
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="airport_name"
              value={formik.values.airport_name}
              label="Airport Name"
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="country"
              label="Country"
              value={formik.values.country}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="destination_specific_cost"
              label="Destination Specific Cost"
              type="number"
              value={formik.values.destination_specific_cost}
              onChange={formik.handleChange}
              formik={formik}
            />
            
            <SwitchComponent value={formik.values.show_in_departure_list} label={"Show In Departure List"} onChange={() => formik.setFieldValue("show_in_departure_list", !(formik.values.show_in_departure_list))}/>
            
            <SwitchComponent value={formik.values.show_in_arrival_list} label={"Show In Arrival List"} onChange={() => formik.setFieldValue("show_in_arrival_list", !(formik.values.show_in_arrival_list))}/>

            <CustomSelect
              name="airport_timezone"
              label="Airport Timezone"
              onChange={(_, newValue) => {
                formik.setFieldValue("airport_timezone", newValue);
              }}
              options={TIME_ZONE}
              formik={formik}
              value={formik.values.airport_timezone}
            />
            <CustomButton
              label={"Add Plane"}
              size={"large"}
              onClick={formik.handleSubmit}
              disabled={false}
              bgColor={"#479DE1"}
              isLoading={isLoading}
            />
          </Stack>
        </form>
      </Container>
    </Container>
  );
};

export default AddDestinationComponent;
