import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/system";
import Modal from "../modal/Modal";
import { fetchPUTRequest } from "../../utils/Services";
import { useToast } from "../../context/ToastContext";
import { useModal } from "../../context/ModalContext";
import { useLoader } from "../../context/LoaderContext";
import {
  setBusinessSettings,
  setTax,
} from "../../store/features/BusinessSlice";

const StyledCard = styled(Card)(({ theme }) => ({
  border: "1px solid #ddd",
  margin: "35px 0",
  boxShadow: "none",
  borderRadius: "10px",
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  background: "#f2f5f7",
  borderBottom: "1px solid #ddd",
  padding: "15px 25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

const headerTitleStyle = {
  alignItems: "center",
  display: "flex",
};

const BusinessTaxSettingsCardComponent = () => {
  const businessSettings = useSelector(
    (state) => state.business.business_settings
  );
  const taxSettings = useSelector((state) => state.business.tax_rate);

  const dispatch = useDispatch();
  const { setToast } = useToast();
  const { isModal, closeModal, openModal } = useModal();
  const { isLoading, startLoading, stopLoading } = useLoader();

  // Destructure the properties with default values to avoid undefined errors
  const { is_calculate_tax = false } = businessSettings || {};
  const { tax_rate = 0 } = taxSettings || {};

  const [formValues, setFormValues] = useState({
    is_calculate_tax,
    tax_rate,
  });
  const [previousValues, setPreviousValues] = useState({
    tax_rate,
  });

  useEffect(() => {
    setFormValues({
      is_calculate_tax,
      tax_rate,
    });
    setPreviousValues({
      tax_rate,
    });
  }, [is_calculate_tax, tax_rate]);

  const handleOpen = () => openModal("editTaxSettings");
  const handleClose = () => closeModal();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "is_calculate_tax") {
      const isCalculateTax = value === "true";
      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        is_calculate_tax: isCalculateTax,
        tax_rate: isCalculateTax ? previousValues.tax_rate : 0,
      }));
    } else {
      setFormValues((prevFormValues) => {
        if (name === "tax_rate") {
          setPreviousValues((prevPreviousValues) => ({
            ...prevPreviousValues,
            [name]: value,
          }));
        }
        return { ...prevFormValues, [name]: value };
      });
    }
  };

  const isFormValid = () => {
    if (!formValues.is_calculate_tax) {
      return true;
    }
    return formValues.tax_rate > 0 && formValues.tax_rate < 100;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...formValues };
    startLoading();
    try {
      const response = await fetchPUTRequest(
        "/business/owner/update-sales-tax-settings",
        payload
      );
      if (response.statusCode === 200) {
        dispatch(
          setBusinessSettings(response.updatedBusiness.business_settings)
        );
        dispatch(setTax(response.updatedBusiness.tax));
        setToast({
          open: true,
          message: response.message,
          severity: "success",
        });
        closeModal();
      } else {
        setToast({
          open: true,
          message: response.message,
          severity: "error",
        });
      }
    } catch (error) {
      setToast({
        open: true,
        message: "An error occurred",
        severity: "error",
      });
    } finally {
      stopLoading();
    }
  };

  const renderModalContent = () => (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        margin="normal"
        label="Calculate Tax on All Payments"
        name="is_calculate_tax"
        value={formValues.is_calculate_tax}
        onChange={handleChange}
        select
        SelectProps={{
          native: true,
        }}
      >
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        label="Tax Rate"
        name="tax_rate"
        value={formValues.tax_rate}
        onChange={handleChange}
        type="number"
        disabled={!formValues.is_calculate_tax}
        helperText="Must be > 0 and < 100"
      />
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </Box>
    </form>
  );

  return (
    <>
      <StyledCard>
        <StyledCardHeader
          title={
            <Typography sx={headerTitleStyle} variant="h6">
              Sales Tax Settings
            </Typography>
          }
          action={
            <Button variant="contained" color="primary" onClick={handleOpen}>
              Edit
            </Button>
          }
        />
        <CardContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography variant="subtitle1" align="left">
                    Charge Tax On All Payments
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="left">
                    {is_calculate_tax ? "Yes" : "No"}
                  </Typography>
                </Grid>
                <Grid item xs={11} mt={1} mb={4}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="left"
                  >
                    Charge tax on all payments. We will automatically calculate
                    the tax based on the tax rate you have set and add it to the
                    total cost.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    align="left"
                    style={{
                      color: !is_calculate_tax ? "#aaa" : "inherit",
                    }}
                  >
                    Sales Tax Rate
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    align="left"
                    style={{
                      color: !is_calculate_tax ? "#aaa" : "inherit",
                    }}
                  >
                    {tax_rate}%
                  </Typography>
                </Grid>
                <Grid item xs={11} mt={1} mb={4}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    align="left"
                  >
                    Set the tax rate you want to charge on all payments. Set
                    this amount based on your zip code. You can use tools like
                    https://www.taxjar.com/sales-tax-calculator/ to find the tax
                    rate for your area.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </StyledCard>

      <Modal
        title="Edit Tax Settings"
        open={isModal.open && isModal.type === "editTaxSettings"}
        onClose={handleClose}
        content={renderModalContent()}
      />
    </>
  );
};

export default BusinessTaxSettingsCardComponent;
