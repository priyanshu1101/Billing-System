import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: 600,
    margin: "auto"
  }
}));

const BillingInformationForm = ({ billingFormState, flagState }) => {
  const classes = useStyles();

  const [formData, setFormData] = billingFormState;
  const [flag, setFlag] = flagState;

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (!flag || name === "GSTNumber") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };
  return (
    <Paper elevation={3} style={{ padding: '20px' }}>
      <div>
        <h1>Billing Form</h1>

        <FormControlLabel
          label="Check this box if Shipping and Billing Information are the same"
          control={
            <Checkbox onChange={(e) => { setFlag(e.target.checked) }} color="primary" />
          }
        />

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First Name"
                fullWidth
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last Name"
                fullWidth
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="companyName"
                name="companyName"
                label="Company Name"
                fullWidth
                autoComplete="organization"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                label="Address"
                fullWidth
                multiline
                minRows={2}
                maxRows={4}
                autoComplete="shipping street-address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="address2"
                name="address2"
                label="Address Line 2"
                multiline
                minRows={2}
                maxRows={4}
                fullWidth
                autoComplete="shipping address-line2"
                value={formData.address2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="pincode"
                name="pincode"
                label="Postal Code"
                type="number"
                fullWidth
                autoComplete="shipping postal-code"
                value={formData.pincode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-level2"
                value={formData.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="state"
                name="state"
                label="State/Province/Region"
                fullWidth
                value={formData.state}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="phone"
                name="phone"
                type="number"
                label="Phone Number"
                fullWidth
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="GSTNumber"
                name="GSTNumber"
                label="GST Number"
                fullWidth
                autoComplete="off"
                value={formData.GSTNumber}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Paper>
  );
};
export default BillingInformationForm;
