import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// MUI components
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Custom
import CustomInput from "../../forms/input/CustomInput";
import CustomButton from "../../forms/button/CustomButton";
import CustomSelect from "../../forms/select/CustomSelect";

// Context
import { useToast } from "../../context/ToastContext";
import { useLoader } from "../../context/LoaderContext";
import { fetchPOSTRequest } from "../../utils/Services";

// Utils

const AddPlaneComponent = () => {
  const { setToast } = useToast();
  const navigate = useNavigate();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const CATEGORY_OPTIONS = [
    { label: "ASEL", value: "airplane_single_engine_land" },
    { label: "AMEL", value: "airplane_multi_engine_land" },
  ];

  const validationSchema = Yup.object({
    tail_number: Yup.string().required("Tail number is required."),
    year: Yup.string().required("Year is required."),
    make: Yup.string().required("Make is required."),
    model: Yup.string().required("Model is required."),
    number_of_seats: Yup.string().required("Number of seats is required."),
    hourly_rate: Yup.string().required("Hourly rate is required."),
    category: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
    })
      .nullable()
      .required("Category is required"),
    cruise_speed_kts: Yup.string().required("Cruise Speed kts is required."),
  });

  const formik = useFormik({
    initialValues: {
      tail_number: "",
      home_based_airport: "",
      year: "",
      make: "",
      model: "",
      number_of_seats: "",
      hourly_rate: "",
      category: "",
      hobbs: "",
      tach_engine_one: "",
      tach_engine_two: "",
      cruise_speed_kts: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      startLoading();

      const modifiedValues = { ...values };
      modifiedValues["category"] = values["category"].value;
      modifiedValues["hourly_rate"] = parseFloat(values["hourly_rate"]) * 100;

      const response = await fetchPOSTRequest(
        `/fleet/owner/add-plane`,
        modifiedValues
      );
      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });
        stopLoading();
        navigate("/fleet");
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
      <h2 style={{ justifyContent: "center" }}>Add Plane</h2>
      <Container>
        <form>
          <Stack spacing={3}>
            <CustomInput
              name="tail_number"
              value={formik.values.tail_number}
              label="Tail Number"
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="home_based_airport"
              value={formik.values.home_based_airport}
              label="Home Based Airport"
              onChange={formik.handleChange}
              formik={formik}
              required={false}
            />
            <CustomInput
              name="year"
              label="Year"
              value={formik.values.year}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="make"
              label="Make"
              value={formik.values.make}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="model"
              label="Model"
              value={formik.values.model}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="number_of_seats"
              label="Number Of Seats"
              type="number"
              value={formik.values.number_of_seats}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomInput
              name="hourly_rate"
              label="Hourly Rate"
              value={formik.values.hourly_rate}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
            />
            <CustomSelect
              name="category"
              label="Category"
              onChange={(_, newValue) => {
                formik.setFieldValue("category", newValue);
              }}
              options={CATEGORY_OPTIONS}
              formik={formik}
              value={formik.values.category}
              required={true}
            />
            <CustomInput
              name="hobbs"
              label="Hobbs"
              type="number"
              value={formik.values.hobbs}
              onChange={formik.handleChange}
              formik={formik}
            />
            <CustomInput
              name="tach_engine_one"
              label="Tach Engine One"
              type="number"
              value={formik.values.tach_engine_one}
              onChange={formik.handleChange}
              formik={formik}
            />
            {formik.values.category["label"] === "AMEL" && (
              <CustomInput
                name="tach_engine_two"
                label="Tach Engine Two"
                type="number"
                value={formik.values.tach_engine_two}
                onChange={formik.handleChange}
                formik={formik}
              />
            )}
            <CustomInput
              name="cruise_speed_kts"
              label="Cruise Speed kts"
              type="number"
              value={formik.values.cruise_speed_kts}
              onChange={formik.handleChange}
              formik={formik}
              required={true}
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

export default AddPlaneComponent;
