// Add plan

// Default
import { useFormik, FormikProvider, Form } from "formik";
import * as Yup from "yup";

// MUI components
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

// Custom
import CustomInput from "../../../forms/input/CustomInput";
import CustomButton from "../../../forms/button/CustomButton";
import CustomTextArea from "../../../forms/textarea/CustomTextArea";
import CustomDatePicker from "../../../forms/datePicker/CustomDatePicker";

// Redux
import { useSelector } from "react-redux";

// Context
import { useToast } from "../../../context/ToastContext";
import { useLoader } from "../../../context/LoaderContext";
import { fetchPOSTRequest } from "../../../utils/Services";

// Utils
import { formatDate } from "../../../utils/Helper";

const AddAirworthinessComponent = () => {
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const fleet = useSelector((state) => state.fleet)

  const validationSchema = Yup.object({
    tail_number: Yup.string().optional(),
    ad_title: Yup.string().required("Ad title is required."),
    due_at_engine_one_tach_hours: Yup.string().required(
      "Due at engine one tach hours is required."
    ),
    prop_one_tach_due_hours: Yup.string().required(
      "Prop one tach due hours is required."
    ),
    due_at_hobbs_hours: Yup.string().required(
      "Due at hobbs hours is required."
    ),
    due_at_date: Yup.string().required("Due at date is required."),
    service_bulletin_id: Yup.string().required(
      "Service bulletin id is required."
    ),
    ad_description: Yup.string().required("Ad description is required."),
    service_bulletin_description: Yup.string().required(
      "Service bulletin description is required."
    ),
  });

  const formik = useFormik({
    initialValues: {
      tail_number: "",
      ad_title: "",
      due_at_engine_one_tach_hours: "",
      prop_one_tach_due_hours: "",
      due_at_hobbs_hours: "",
      due_at_date: "",
      service_bulletin_id: "",
      ad_description: "",
      service_bulletin_description: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
    values["tail_number"] = fleet.tail_number
     values["due_at_date"] = formatDate(values["due_at_date"],"YYYY-MM-DD") 
     startLoading()
     const response = await fetchPOSTRequest(`/fleet/owner/add-airworthiness-directive`, values);
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
      <Typography variant="h4" gutterBottom mt={5} mb={3} textAlign={"center"}>Add Airworthiness Directives</Typography>
      <Container>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={3}>
              <CustomInput
                name="ad_title"
                value={formik.values.ad_title}
                label="Ad Title"
                onChange={formik.handleChange}
                formik={formik}
                required={true}
              />
              <CustomInput
                name="due_at_engine_one_tach_hours"
                value={formik.values.due_at_engine_one_tach_hours}
                label="Due At Engine One Tach Hours"
                onChange={formik.handleChange}
                type="number"
                formik={formik}
                required={true}
              />
              <CustomInput
                name="prop_one_tach_due_hours"
                label="Prop One Tach Due Hours"
                value={formik.values.prop_one_tach_due_hours}
                onChange={formik.handleChange}
                formik={formik}
                type="number"
                required={true}
              />
              <CustomInput
                name="due_at_hobbs_hours"
                label="Due At Hobbs Hours"
                value={formik.values.due_at_hobbs_hours}
                onChange={formik.handleChange}
                formik={formik}
                type="number"
                required={true}
              />
              <CustomDatePicker name={"due_at_date"} label={"Due At Date"} />
              <CustomInput
                name="service_bulletin_id"
                label="Service Bulletin Id"
                value={formik.values.service_bulletin_id}
                onChange={formik.handleChange}
                formik={formik}
                required={true}
              />
              <CustomTextArea
                name="ad_description"
                label="Ad Description"
                value={formik.values.ad_description}
                onChange={formik.handleChange}
                formik={formik}
                required={true}
              />
              <CustomTextArea
                name="service_bulletin_description"
                label="Service Bulletin Description"
                value={formik.values.service_bulletin_description}
                onChange={formik.handleChange}
                formik={formik}
                required={true}
              />
              <CustomButton
                label={"Add Airworthiness Directives"}
                size={"large"}
                onClick={formik.handleSubmit}
                disabled={false}
                bgColor={"#479DE1"}
                isLoading={isLoading}
              />
            </Stack>
          </Form>
        </FormikProvider>
      </Container>
    </Container>
  );
};

export default AddAirworthinessComponent;
