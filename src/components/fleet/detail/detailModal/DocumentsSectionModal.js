// Pricing Section Modal

// Default
import { useFormik } from "formik";
import * as Yup from "yup";

// Custom
import Modal from "../../../modal/Modal";
import CustomButton from "../../../../forms/button/CustomButton";
import CustomFileInput from "../../../../forms/fileInput/CustomFileInput";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setFleetDetails } from "../../../../store/features/FleetSlice";

// Context
import { useModal } from "../../../../context/ModalContext";
import { useLoader } from "../../../../context/LoaderContext";
import { useToast } from "../../../../context/ToastContext";

// Utils
import { fetchPOSTRequest } from "../../../../utils/Services";
import { DOCUMENTS_TYPES } from "../../../../utils/Constants";

const DocumentsSectionModal = ({ documentModal }) => {
  const { isModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const { setToast } = useToast();
  const fleet = useSelector((state) => state.fleet);

  const getDocumentType = () => {
    switch (documentModal) {
      case "Pilot Operating Handbook":
        return DOCUMENTS_TYPES[0];
      case "Checklist":
        return DOCUMENTS_TYPES[1];
      case "Weight and Balance":
        return DOCUMENTS_TYPES[2];
      case "Airworthiness Certificate":
        return DOCUMENTS_TYPES[3];
      case "Registration":
        return DOCUMENTS_TYPES[4];
      case "Insurance":
        return DOCUMENTS_TYPES[5];
      default:
        return "";
    }
  };

  const validationSchema = Yup.object({
    file: Yup.mixed().required("File is required."),
    tail_number: Yup.string().optional(),
    document_type: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues: {
      file: "",
      tail_number: "",
      document_type: "",
    },

    validationSchema: validationSchema,
    onSubmit: async (values) => {
      values["tail_number"] = fleet.tail_number;
      values["document_type"] = getDocumentType();

      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("tail_number", values.tail_number);
      formData.append("document_type", values.document_type);

      startLoading();

      const response = await fetchPOSTRequest(
        `/document/owner/fleet/upload-fleet-document`,
        formData
      );

      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.message,
          severity: "success",
        });

        const updatedFleetDetails = { ...fleet?.details, documents: { ...fleet?.details?.documents, [getDocumentType(documentModal)]: response?.data?.uploadedFile?.key }}

        dispatch(setFleetDetails(updatedFleetDetails))

        closeModal();
        
        stopLoading();

        formik.resetForm();
      } else {
        setToast({
          open: true,
          message: response?.message,
          severity: "error",
        });
        stopLoading();
        formik.resetForm();
        closeModal();
      }
    },
  });

  return (
    <Modal
      title={"Upload documents"}
      open={isModal.open && isModal.type === "Documents"}
      content={
        <CustomFileInput
          label={documentModal}
          setFieldValue={formik.setFieldValue}
          name="file"
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
