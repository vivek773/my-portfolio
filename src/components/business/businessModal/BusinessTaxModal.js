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

const BusinessTaxModal = ({ businessTax, setBusinessTax }) => {
  const { isModal, closeModal } = useModal();
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const formik = useFormik({
    initialValues: {
      tax_rate: "",
    },

    onSubmit: async (values) => {
      startLoading();

      const response = await fetchPUTRequest(
        `/business/owner/update-sales-tax-rate`,
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

        const updatedArray = businessTax.map((item) => {
          if (response?.updatedBusiness?.tax.hasOwnProperty(item.key)) {
            return {
              ...item,
              value: response?.updatedBusiness?.tax[item.key],
            };
          }
          return item;
        });
        setBusinessTax([...updatedArray]);
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
    if (businessTax && Array.isArray(businessTax)) {
      businessTax.forEach((item) =>
        formik.setFieldValue(item.key, item?.value)
      );
    }
    // eslint-disable-next-line
  }, [businessTax]);

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "businessTax"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
          <CustomInput
            name="tax_rate"
            label="Tax Rate"
            value={formik.values.tax_rate}
            type="number"
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
          isLoading={isLoading}
          bgColor={"#479DE1"}
        />
      }
    />
  );
};

export default BusinessTaxModal;
