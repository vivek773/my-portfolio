// Hobbs & Tach Section Modal

// Default
import { useFormik } from "formik";
import { useEffect } from "react";

// MUI components
import Stack from "@mui/material/Stack";

// Custom
import Modal from "../../../modal/Modal";
import CustomInput from "../../../../forms/input/CustomInput";
import CustomButton from "../../../../forms/button/CustomButton";

// Redux
import { useSelector } from "react-redux";

// Context
import { useModal } from "../../../../context/ModalContext";
import { useLoader } from "../../../../context/LoaderContext";
import { useToast } from "../../../../context/ToastContext";

// Utils
import { fetchPUTRequest } from "../../../../utils/Services";

const HobbsAndTachSectionModal = ({ hobbsItems, setHobbsItems }) => {
  const { isModal, closeModal } = useModal();
  const { startLoading, stopLoading } = useLoader();
  const { setToast } = useToast();
  const fleet = useSelector((state) => state.fleet);

  const formik = useFormik({
    initialValues: {
      tail_number: "",
      hobbs: "",
      tach_engine_one: "",
      tach_engine_two: "",
    },
    onSubmit: async (values) => {
      startLoading();

      values["tail_number"] = fleet.tail_number;
      const response = await fetchPUTRequest(
        `/fleet/owner/update-hobbs-and-tach`,
        values
      );

      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });

        closeModal();
        stopLoading();

        const updatedArray = hobbsItems.map((item) => {
          if (response.data.hasOwnProperty(item.key)) {
            return {
              ...item,
              value: response.data[item.key],
            };
          }
          return item;
        });

        setHobbsItems([...updatedArray]);
        formik.resetForm();
      } else {
        setToast({
          open: true,
          message: response?.Message,
          severity: "error",
        });
        stopLoading();
        formik.resetForm();
        closeModal();
      }
    },
  });

  useEffect(() => {
    if (hobbsItems && Array.isArray(hobbsItems)) {
      hobbsItems.forEach((item) => {
        formik.setFieldValue(item.key, item.value ? item.value : "");
      });
    }
    // eslint-disable-next-line
  }, [hobbsItems]);

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
          {fleet?.details.category === "airplane_multi_engine_land" && (
            <CustomInput
              name="tach_engine_two"
              label="Tach Engine Two"
              type="number"
              value={formik.values.tach_engine_two}
              onChange={formik.handleChange}
              formik={formik}
            />
          )}
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
