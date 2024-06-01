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
import CustomSelect from "../../../forms/select/CustomSelect";
import SwitchComponent from "../../switch/SwitchComponent";

// Context
import { useModal } from "../../../context/ModalContext";
import { useToast } from "../../../context/ToastContext";
import { useLoader } from "../../../context/LoaderContext";

// Utils
import { fetchPUTRequest } from "../../../utils/Services";
import { TIME_ZONE } from "../../../utils/Constants";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setDestinations } from "../../../store/features/DestinationsSlice";

const DestinationDetailsModal = ({ destinationDetails, destinationData }) => {
  const { isModal, closeModal } = useModal();
  const { setToast } = useToast();
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoader();
  const state = useSelector((state) => state.destinations);

  const formik = useFormik({
    initialValues: {
      city: destinationData?.city || "",
      state: destinationData?.state || "",
      country: destinationData?.country || "",
      airport_name: destinationData?.airport_name || "",
      destination_specific_cost:
        destinationData?.destination_specific_cost || "",
      status: destinationData?.status || "",
      airport_timezone: destinationData?.airport_timezone || "",
      show_in_arrival_list: destinationData?.show_in_arrival_list || false,
      show_in_departure_list: destinationData?.show_in_departure_list || false,
      airport_longitude: destinationData?.airport_longitude || "",
      airport_latitude: destinationData?.airport_latitude || "",
    },

    onSubmit: async (values) => {
      startLoading();

      const newPayload = { ...values };

      newPayload["airport_timezone"] = newPayload["airport_timezone"].value;
      newPayload["destination_id"] = destinationData?.destination_id;
      newPayload["destination_specific_cost"] =
        newPayload.destination_specific_cost * 100;

      const response = await fetchPUTRequest(
        `/destination/owner/edit-destination`,
        newPayload
      );

      if (response?.statusCode === 201 && response) {
        setToast({
          open: true,
          message: response?.Message,
          severity: "success",
        });

        Object.assign(destinationData, response?.data);

        closeModal();
        stopLoading();
        const updatedDestinations = state?.destinations?.map((destination) => {
          if (destination?.destination_id === destinationData?.destination_id) {
            return destinationData;
          }
          return destination;
        });

        dispatch(setDestinations(updatedDestinations));

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
    if (destinationDetails && Array.isArray(destinationDetails)) {
      destinationDetails.forEach((item) =>
        formik.setFieldValue(item.key, item?.value)
      );
    }
    // eslint-disable-next-line
  }, [destinationDetails]);

  return (
    <Modal
      title={"Update Details"}
      open={isModal.open && isModal.type === "destinationDetail"}
      content={
        <Stack display={"flex"} flexDirection={"column"} gap={5}>
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
            name="country"
            label="Country"
            value={formik.values.country}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="airport_name"
            value={formik.values.airport_name}
            label="Airport Name"
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
          <CustomInput
            name="destination_specific_cost"
            value={formik.values.destination_specific_cost}
            label="Destination Specific Cost"
            onChange={formik.handleChange}
            formik={formik}
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

          <CustomSelect
            name="airport_timezone"
            label="Airport Timezone"
            onChange={(_, newValue) => {
              formik.setFieldValue("airport_timezone", newValue);
            }}
            options={TIME_ZONE}
            formik={formik}
            value={formik.values.airport_timezone}
          />

          <SwitchComponent
            value={formik.values.show_in_arrival_list}
            label={"Show In Arrival List"}
            onChange={() =>
              formik.setFieldValue(
                "show_in_arrival_list",
                !formik.values.show_in_arrival_list
              )
            }
          />
          <SwitchComponent
            value={formik.values.show_in_departure_list}
            label={"Show In Departure List"}
            onChange={() =>
              formik.setFieldValue(
                "show_in_departure_list",
                !formik.values.show_in_departure_list
              )
            }
          />

          <CustomInput
            name="airport_longitude"
            label="Airport Longitude"
            value={formik.values.airport_longitude}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
            type="number"
          />

          <CustomInput
            name="airport_latitude"
            label="Airport Latitude"
            value={formik.values.airport_latitude}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
            type="number"
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

export default DestinationDetailsModal;
