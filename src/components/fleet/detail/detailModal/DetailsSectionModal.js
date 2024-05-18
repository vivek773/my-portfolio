// Details Section Modal

// Default
import { useFormik } from "formik";
import { useEffect, useState } from "react";

// MUI components
import Stack from "@mui/material/Stack";

// Custom
import Modal from "../../../modal/Modal";
import CustomInput from "../../../../forms/input/CustomInput";
import CustomButton from "../../../../forms/button/CustomButton";
import CustomSelect from "../../../../forms/select/CustomSelect";

// Context
import { useModal } from "../../../../context/ModalContext";
import { useToast } from "../../../../context/ToastContext";
import { useLoader } from "../../../../context/LoaderContext";

// Utils
import { fetchPUTRequest } from "../../../../utils/Services";

const DetailsSectionModal = ({ detailsItems, setDetailsItems }) => {
  const { isModal, closeModal } = useModal();
  const { setToast } = useToast();
  const { isLoading, startLoading, stopLoading } = useLoader();

  const [initialValues, setInitialValues] = useState({});

  const CATEGORY_OPTIONS = [
    { label: "ASEL", value: "airplane_single_engine_land" },
    { label: "AMEL", value: "airplane_multi_engine_land" },
  ];

  const formik = useFormik({
    initialValues: {
      tail_number: "",
      year: "",
      make: "",
      model: "",
      passenger_seats: "",
      home_based_airport: "",
      number_of_seats: "",
      total_seats: "",
      category: "",
      icao_equipment: "",
      icao_surveillance_codes: "",
      serial_number: "",
      faa_designator: "",
      fuel_burn_rate: "",
      empty_weight: "",
      fuel_capacity: "",
      hourly_rate: "",
    },
    onSubmit: async (values) => {

      values["category"] = values["category"].value;

      if(initialValues.tail_number !== formik.values.tail_number) {
        values["updated_tail_number"] = formik.values.tail_number
        values["tail_number"] = initialValues.tail_number
      }   
      startLoading();

      const response = await fetchPUTRequest(`/fleet/owner/edit-plane`, values);

      if (response?.statusCode === 200 && response) {
        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });

        closeModal();
        stopLoading();

        const updatedArray = detailsItems.map((item) => {
          if (response.data.hasOwnProperty(item.key)) {
            return {
              ...item,
              value: response.data[item.key],
            };
          }
          return item;
        });

        setDetailsItems([...updatedArray]);
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
    if (detailsItems && Array.isArray(detailsItems)) {
      const updatedInitialValues = { ...initialValues };
      detailsItems.forEach((item) => {
        if (item.key === "category") {
          const findValue = CATEGORY_OPTIONS.find(
            (cat) => cat.value === item.value
          );
          formik.setFieldValue(item.key, findValue ? findValue : "");
          updatedInitialValues[item.key] = findValue;
        } else {
          formik.setFieldValue(item.key, item.value ? item.value : "");
          updatedInitialValues[item.key] = item.value;
        }
      });
      setInitialValues(updatedInitialValues);
    }
    // eslint-disable-next-line
  }, [detailsItems]);

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "Details"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
          <CustomInput
            name="tail_number"
            value={formik.values.tail_number}
            label="Tail Number"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="year"
            label="Year"
            value={formik.values.year}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="make"
            label="Make"
            value={formik.values.make}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="model"
            label="Model"
            value={formik.values.model}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="passenger_seats"
            label="Passenger Seats"
            type="number"
            value={formik.values.passenger_seats}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="total_seats"
            label="Total Seats"
            type="number"
            value={formik.values.total_seats}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomSelect
            name="category"
            label="Category"
            onChange={(_, newValue) => {
              formik.setFieldValue("category", newValue);
            }}
            options={CATEGORY_OPTIONS}
            formik={formik}
            value={formik.values.category}
          />
          <CustomInput
            name="icao_equipment"
            value={formik.values.icao_equipment}
            label="Icao Equipment"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="icao_surveillance_codes"
            value={formik.values.icao_surveillance_codes}
            label="Icao Surveillance Codes"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="serial_number"
            value={formik.values.serial_number}
            label="Serial Number"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="faa_designator"
            value={formik.values.faa_designator}
            label="Faa Designator"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="fuel_burn_rate"
            value={formik.values.fuel_burn_rate}
            type="number"
            label="Fuel Burn Rate"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="empty_weight"
            value={formik.values.empty_weight}
            type="number"
            label="Empty Weight"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="fuel_capacity"
            value={formik.values.fuel_capacity}
            type="number"
            label="Fuel Capacity"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="hourly_rate"
            label="Hourly Rate"
            type="number"
            value={formik.values.hourly_rate}
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

export default DetailsSectionModal;
