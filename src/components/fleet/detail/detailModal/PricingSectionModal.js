// Pricing Section Modal

// Default
import { useFormik } from "formik";
import * as Yup from "yup";

// MUI components
import Stack from "@mui/material/Stack";

// Custom
import Modal from "../../../modal/Modal";

// Context
import { useModal } from "../../../../context/ModalContext";
import CustomInput from "../../../../forms/input/CustomInput";
import CustomButton from "../../../../forms/button/CustomButton";

const PricingSectionModal = () => {
  const { isModal } = useModal();

  const validationSchema = Yup.object({
    hourly_rate: Yup.string().required("Hourly Rate is required."),
  });

  const formik = useFormik({
    initialValues: {
      hourly_rate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "Pricing"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
          <CustomInput
            name="hourly_rate"
            label="Hourly Rate"
            value={formik.values.hourly_rate}
            onChange={formik.handleChange}
            formik={formik}
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

export default PricingSectionModal;
