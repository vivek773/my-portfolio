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

const BusinessDetailsModal = ({ businessDetails, setBusinessDetails }) => {
  const { isModal, closeModal } = useModal();
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const formik = useFormik({
    initialValues: {
      name: "",
      street: "",
      unit: "",
      city: "",
      state: "",
      zip_code: "",
      phone_number: "",
      primary_airport_code: "",
    },

    onSubmit: async (values) => {
      startLoading();

      const response = await fetchPUTRequest(
        `/business/owner/edit-business`,
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

        const updatedArray = businessDetails.map((item) => {
          if (response.data.hasOwnProperty(item.key)) {
            return {
              ...item,
              value: response.data[item.key],
            };
          }
          return item;
        });
        setBusinessDetails([...updatedArray]);
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
    if (businessDetails && Array.isArray(businessDetails)) {
      businessDetails.forEach((item) =>
        formik.setFieldValue(item.key, item?.value)
      );
    }
    // eslint-disable-next-line
  }, [businessDetails]);

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "businessDetails"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
          <CustomInput
            name="name"
            value={formik.values.name}
            label="Name"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="street"
            label="Street"
            value={formik.values.street}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="unit"
            label="Unit"
            value={formik.values.unit}
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
            name="zip_code"
            label="Zip Code"
            type="number"
            value={formik.values.zip_code}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="phone_number"
            value={formik.values.phone_number}
            label="Phone Number"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="primary_airport_code"
            value={formik.values.primary_airport_code}
            label="Primary Airport Code"
            onChange={formik.handleChange}
            formik={formik}
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

export default BusinessDetailsModal;
