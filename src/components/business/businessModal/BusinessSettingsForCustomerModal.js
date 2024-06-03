// Pricing Section Modal

// Default
import { useFormik } from "formik";
import { useEffect } from "react";

// Custom
import Modal from "../../modal/Modal";
import CustomInput from "../../../forms/input/CustomInput";
import CustomButton from "../../../forms/button/CustomButton";

// Context
import { useModal } from "../../../context/ModalContext";
import { useLoader } from "../../../context/LoaderContext";
import { useToast } from "../../../context/ToastContext";

// Utils
import { fetchPUTRequest } from "../../../utils/Services";

const DocumentsSectionModal = ({
  editable,
  businessSettingsCustomer,
  setBusinessSettingsCustomer,
}) => {
  const { isModal, closeModal } = useModal();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const { setToast } = useToast();

  const formik = useFormik({
    initialValues: {
      percentage_at_time_of_booking: "",
      hours_before_flight_for_remaining_payment: "",
      one_way_customer_pays_for_return_percentage: "",
      hours_before_flight_for_cancellation: "",
    },

    onSubmit: async (values) => {
      
      const payload = { [editable?.key]: values[editable?.key] };
      startLoading();


      const urlEndPoint = editable?.key === "tax_rate" ? "update-sales-tax-rate " : "update-business-settings-for-customer";

      const response = await fetchPUTRequest(
        `/business/owner/${urlEndPoint}`,
        payload
      );

      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });

        closeModal();
        stopLoading();

        const updateApiKey = editable?.key === "tax_rate" ? "tax" : "business_settings_for_customer"

        const updatedArray = businessSettingsCustomer.map((item) => {
          if (response?.updatedBusiness?.[updateApiKey].hasOwnProperty(item.key)) {
            return {
              ...item,
              value: response?.updatedBusiness?.[updateApiKey][item.key],
            };
          }
          return item;
        });


        setBusinessSettingsCustomer([...updatedArray]);
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
    if (businessSettingsCustomer && Array.isArray(businessSettingsCustomer)) {
      businessSettingsCustomer.forEach((item) => {
        if (editable?.key === item?.key) {
          formik.setFieldValue(item.key, item.value);
        }
      });
    }
    // eslint-disable-next-line
  }, [businessSettingsCustomer, editable]);

  return (
    <Modal
      title={"Update details"}
      open={isModal.open && isModal.type === "businessSettingsForCustomer"}
      content={
        <CustomInput
          name={editable?.key}
          label={editable?.label}
          value={formik.values[editable?.key]}
          onChange={formik.handleChange}
          type="number"
          formik={formik}
        />
      }
      action={
        <CustomButton
          label={"Update"}
          size={"medium"}
          width={"fit-content"}
          onClick={formik.handleSubmit}
          isLoading={isLoading}
          disabled={false}
          bgColor={"#479DE1"}
        />
      }
    />
  );
};

export default DocumentsSectionModal;
