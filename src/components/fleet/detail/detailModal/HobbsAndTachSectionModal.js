// Hobbs & Tach Section Modal

// Default
import { useFormik } from "formik";

// MUI components
import Stack from "@mui/material/Stack";

// Custom
import Modal from "../../../modal/Modal";

// Context
import { useModal } from "../../../../context/ModalContext";
import CustomInput from "../../../../forms/input/CustomInput";
import CustomButton from "../../../../forms/button/CustomButton";

const HobbsAndTachSectionModal = ({ hobbsItems, setHobbsItems }) => {
  const { isModal, closeModal } = useModal();


  const formik = useFormik({
    initialValues: {
      hobbs: "",
      tach_engine_one: "",
    },
    onSubmit: async (values) => {
      closeModal()
    },
  });

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "Hobbs & Tach"}
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
          <CustomInput
            name="tach_engine_one"
            label="Tach Engine One"
            type="number"
            value={formik.values.tach_engine_one}
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

export default HobbsAndTachSectionModal;
