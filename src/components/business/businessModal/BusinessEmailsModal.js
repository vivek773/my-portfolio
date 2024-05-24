// Details Section Modal

// Default
import { useFormik } from "formik";
import { useEffect } from "react";

// MUI components
import Stack from "@mui/material/Stack";

// Custom
import Modal from "../../modal/Modal";
import CustomInput from "../../../forms/input/CustomInput";
import CustomButton from "../../../forms/button/CustomButton";

// Context
import { useModal } from "../../../context/ModalContext";
import { useToast } from "../../../context/ToastContext";
import { useLoader } from "../../../context/LoaderContext";

// Utils
import { fetchPUTRequest } from "../../../utils/Services";

const BusinessEmailsModal = ({ businessEmail, setBusinessEmail }) => {
  const { isModal, closeModal } = useModal();
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const formik = useFormik({
    initialValues: {
      booking_email: "",
      contact_email: "",
      booking_email_key: "",
    },

    onSubmit: async (values) => {
      startLoading();

      const response = await fetchPUTRequest(
        `/business/owner/update-business-emails`,
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

        const updatedArray = businessEmail.map((item) => {
          if (response?.emails.hasOwnProperty(item.key)) {
            return {
              ...item,
              value: response?.emails[item.key],
            };
          }
          return item;
        });
        setBusinessEmail([...updatedArray]);
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
    if (businessEmail && Array.isArray(businessEmail)) {
      businessEmail.forEach((item) =>
        formik.setFieldValue(item.key, item?.value)
      );
    }
    // eslint-disable-next-line
  }, [businessEmail]);

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "businessEmail"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
          <CustomInput
            name="booking_email"
            value={formik.values.booking_email}
            label="Booking Email"
            onChange={formik.handleChange}
            formik={formik}
          />
          <CustomInput
            name="contact_email"
            label="Contact Email"
            value={formik.values.contact_email}
            onChange={formik.handleChange}
            formik={formik}
          />
          <CustomInput
            name="booking_email_key"
            label="Booking Email Key"
            value={formik.values.booking_email_key}
            onChange={formik.handleChange}
            formik={formik}
            type="password"
            required={true}
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
          isLoading={isLoading}
          bgColor={"#479DE1"}
        />
      }
    />
  );
};

export default BusinessEmailsModal;
