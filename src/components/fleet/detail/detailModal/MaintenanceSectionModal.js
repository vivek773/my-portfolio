// Maintenance Modal

// Default
import { useEffect } from "react";
import { useFormik, FormikProvider, Form } from "formik";

// MUI components
import Stack from "@mui/material/Stack";

// Custom
import Modal from "../../../modal/Modal";
import CustomDatePicker from "../../../../forms/datePicker/CustomDatePicker";
import CustomInput from "../../../../forms/input/CustomInput";
import CustomButton from "../../../../forms/button/CustomButton";

// Context
import { useModal } from "../../../../context/ModalContext";
import { useLoader } from "../../../../context/LoaderContext";
import { useToast } from "../../../../context/ToastContext";

// Utils
import { fetchPUTRequest } from "../../../../utils/Services";
import { formatDate } from "../../../../utils/Helper";

const MaintenanceSectionModal = ({ maintenanceItems, setMaintenanceItems }) => {
  const { isModal, closeModal } = useModal();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const { setToast } = useToast();

  const formik = useFormik({
    initialValues: {
      tail_number: "",
      altimeter_due_date: "",
      transponder_due_date: "",
      elt_due_date: "",
      pitot_static_due_date: "",
      vor_check_due_date: "",
      hundred_hour_due: "",
      progressive_inspection_due_date: "",
      progressive_maintenance_interval: "",
      special_inspection_due_date: "",
      propeller_due_date: "",
      engine_overhaul_due_date: "",
      structural_inspection_due_date: "",
      corrosion_due_date: "",
      landing_gear_due_date: "",
      hydraulic_system_due_date: "",
      fuel_system_due_date: "",
    },
    onSubmit: async (values) => {
      const formattedValues = { ...values };

      const dateFields = Object.keys(formattedValues);

      dateFields?.forEach((field) => {
        if (formattedValues[field]) {
          if (
            field !== "tail_number" &&
            field !== "hundred_hour_due" &&
            field !== "progressive_maintenance_interval"
          ) {
            formattedValues[field] = formatDate(
              formattedValues[field],
              "YYYY-MM-DD"
            );
          }
        }
      });

      startLoading();

      const response = await fetchPUTRequest(
        `/fleet/owner/update-plane-inspections`,
        formattedValues
      );

      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });

        closeModal();
        stopLoading();
        const updatedArray = maintenanceItems.map((item) => {
          if (response.data.hasOwnProperty(item.key)) {
            return {
              ...item,
              value:
                item.key !== "tail_number" &&
                item.key !== "hundred_hour_due" &&
                item.key !== "progressive_maintenance_interval"
                  ? formatDate(response.data[item.key])
                  : response.data[item.key],
            };
          }
          return item;
        });

        setMaintenanceItems([...updatedArray]);

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
    if (maintenanceItems && Array.isArray(maintenanceItems)) {
      maintenanceItems.forEach((item) => {
        formik.setFieldValue(item.key, item.value ? item.value : "");
      });
    }
    // eslint-disable-next-line
  }, [maintenanceItems]);


  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "Maintenance"}
      content={
        <FormikProvider value={formik}>
          <Form>
            <Stack display={"flex"} flexDirection={"column"} gap={5}>
              <CustomDatePicker
                name={"altimeter_due_date"}
                label={"Altimeter Due Date"}
              />
              <CustomDatePicker
                name={"transponder_due_date"}
                label={"Transponder Due Date"}
              />
              <CustomDatePicker name={"elt_due_date"} label={"Elt Due Date"} />
              <CustomDatePicker
                name={"pitot_static_due_date"}
                label={"Pitot Static Due Date"}
              />
              <CustomDatePicker
                name={"vor_check_due_date"}
                label={"Vor Check Due Date"}
              />
              <CustomInput
                label={"Hundred Hour Due"}
                type="number"
                onChange={formik.handleChange}
                name={"hundred_hour_due"}
                value={formik.values.hundred_hour_due}
              />
              <CustomDatePicker
                name={"progressive_inspection_due_date"}
                label={"Progressive Inspection Due Date"}
              />
              <CustomInput
                name={"progressive_maintenance_interval"}
                label={"Progressive Maintenance Interval"}
                type="number"
                onChange={formik.handleChange}
                value={formik.values.progressive_maintenance_interval}
              />
              <CustomDatePicker
                name={"special_inspection_due_date"}
                label={"Special Inspection Due Date"}
              />
              <CustomDatePicker
                name={"propeller_due_date"}
                label={"Propeller Due Date"}
              />
              <CustomDatePicker
                name={"engine_overhaul_due_date"}
                label={"Engine Overhaul Due Date"}
              />
              <CustomDatePicker
                name={"structural_inspection_due_date"}
                label={"Structural Inspection Due Date"}
              />
              <CustomDatePicker
                name={"corrosion_due_date"}
                label={"Corrosion Due Date"}
              />
              <CustomDatePicker
                name={"landing_gear_due_date"}
                label={"Landing Gear Due Date"}
              />
              <CustomDatePicker
                name={"hydraulic_system_due_date"}
                label={"Hydraulic System Due Date"}
              />
              <CustomDatePicker
                name={"fuel_system_due_date"}
                label={"Fuel System Due Date"}
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
          disabled={false}
          bgColor={"#479DE1"}
          isLoading={isLoading}
          onClick={formik.handleSubmit}
        />
      }
    />
  );
};

export default MaintenanceSectionModal;
