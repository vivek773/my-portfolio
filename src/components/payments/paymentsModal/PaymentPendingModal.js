// Details Section Modal

// Default
import { useFormik, FormikProvider, Form } from "formik";
import { useEffect } from "react";

// MUI components
import Stack from "@mui/material/Stack";

// Custom
import Modal from "../../modal/Modal";
import CustomInput from "../../../forms/input/CustomInput";
import CustomButton from "../../../forms/button/CustomButton";
import CustomDatePicker from "../../../forms/datePicker/CustomDatePicker";

// Context
import { useModal } from "../../../context/ModalContext";
import { useToast } from "../../../context/ToastContext";
import { useLoader } from "../../../context/LoaderContext";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setPayments } from "../../../store/features/PaymentsSlice";

// Utils
import { fetchPUTRequest } from "../../../utils/Services";
import { formatCurrency } from "../../../utils/Helper";

const PaymentPendingModal = ({ data, paymentData }) => {
  const { isModal, closeModal } = useModal();
  const { setToast } = useToast();
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const { payments } = useSelector((state) => state.payments)


  const formik = useFormik({
    initialValues: {
      // pending_payment_id: "",
      amount: "",
      status: "",
      due_date: ""
    },

    onSubmit: async (values) => {

      const newPayload = { ...values };

      newPayload["pending_payment_id"] = paymentData?.pending_payment_id
      newPayload["amount"] = values["amount"] * 100

      startLoading();

      const response = await fetchPUTRequest(
        `/payment/owner/edit-pending-payment`,
        newPayload
      );

      if (response?.statusCode === 200 && response) {

        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });

        const newData = { ...data, pending_payments: response?.pendingPayment[1] }

        const updatedPayment = payments.map(payment => {
          if (payment.payment_id === newData.payment_id) {
            return newData;
          }
          return payment;
        });

        dispatch(setPayments(updatedPayment))
        closeModal();
        stopLoading();
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
    if (paymentData) {
      Object.keys(formik.values).forEach((item) => {
        if (item === "amount") {
          formik.setFieldValue(item, formatCurrency(paymentData[item]))
        } else {
          formik.setFieldValue(item, paymentData[item])
        }
      }
      )
    }
  }, [paymentData]);


  return (
    <Modal
      title={"Update Pending Payment"}
      open={isModal.open && isModal.type === "pendingPayment"}
      content={
        <FormikProvider value={formik}>
          <Form>
            <Stack display={"flex"} flexDirection={"column"} gap={5}>
              <CustomInput
                name="amount"
                label="Amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                formik={formik}
                type="number"
                required={true}
              />
              <CustomInput
                name="status"
                label="Status"
                value={formik.values.status}
                onChange={formik.handleChange}
                formik={formik}
                required={true}
              />
              <CustomDatePicker
                name={"due_date"}
                label={"Due Date"}
              />
            </Stack>
          </Form>
        </FormikProvider>

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

export default PaymentPendingModal;
