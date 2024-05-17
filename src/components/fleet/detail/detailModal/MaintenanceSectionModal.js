// Maintenance Section Modal

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

const MaintenanceSectionModal = () => {
  const { isModal } = useModal();

  const validationSchema = Yup.object({
    hobbs: Yup.string().required("Hobbs is required."),
  });

  const formik = useFormik({
    initialValues: {
      hobbs: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {},
  });

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "Maintenance"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
          <CustomInput
            name="hobbs"
            label="Hobbs"
            type="number"
            value={formik.values.hobbs}
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

export default MaintenanceSectionModal;

