// Details Section Modal


// Default
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI components
import Stack  from "@mui/material/Stack";

// Custom
import Modal from "../../../modal/Modal";

// Context
import { useModal } from "../../../../context/ModalContext";
import CustomInput from "../../../../forms/input/CustomInput";
import CustomButton from "../../../../forms/button/CustomButton";
import CustomSelect from "../../../../forms/select/CustomSelect";

const DetailsSectionModal = () => {
  const { isModal } = useModal();

  const CATEGORY_OPTIONS = [
    { label: "ASEL", value: "airplane_single_engine_land" },
    { label: "AMEL", value: "airplane_multi_engine_land" },
  ];

  const validationSchema = Yup.object({
    home_based_airport: Yup.string().required(
      "Home based airport is required."
    ),
    category: Yup.object({
      label: Yup.string(),
      value: Yup.string(),
    })
      .nullable()
      .required("Category is required"),
  });

  const formik = useFormik({
    initialValues: {
      home_based_airport: "",
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "Details"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
          <CustomInput
            name="home_based_airport"
            value={formik.values.home_based_airport}
            label="Home Based Airport"
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
          />
        </Stack>
      }
      action={
          <CustomButton
            label={"Update"}
            size={"medium"}
            width={"fit-content"}
            onClick={formik.handleSubmit}
            disabled={false}
            bgColor={"#479DE1"}
          />
      }
    />
  );
};

export default DetailsSectionModal;
