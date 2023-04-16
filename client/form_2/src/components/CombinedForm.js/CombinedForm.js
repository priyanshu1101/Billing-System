import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { postData } from "../../api/data";
import BillingInformationForm from "../Billing Form/Billing_Form";
import ShippingInformationForm from "../Shipping Form/ShippingForm";
import Grid from '@material-ui/core/Grid';

const CombinedForm = () => {
    const shippingFormState = useState({ firstName: "", lastName: "", companyName: "", address: "", address2: "", pincode: "", city: "", state: "", phone: "", });
    const billingFormState = useState({ firstName: "", lastName: "", companyName: "", address: "", address2: "", pincode: "", city: "", state: "", phone: "", GSTNumber: "" });
    const flagState = React.useState(false);
    useEffect(() => {
        if (flagState[0]) {
            billingFormState[1]({ ...shippingFormState[0], GSTNumber: billingFormState[0].GSTNumber });
        }
    }, [flagState[0], shippingFormState[0]]);

    const handleSubmit = async () => {
        try {
            await postData({ shiping: shippingFormState[0], billing: billingFormState[0] });
            shippingFormState[1]({ firstName: "", lastName: "", companyName: "", address: "", address2: "", pincode: "", city: "", state: "", phone: "", });
            billingFormState[1]({ firstName: "", lastName: "", companyName: "", address: "", address2: "", pincode: "", city: "", state: "", phone: "", GSTNumber: "" });
            alert("Data Added Successfully!!")
        } catch (error) {
            console.log(error);
            alert("Data Couldn't Be Added")
        }
    }
    return (
        <>
            <div style={{ maxWidth:"99%", marginTop:"10px" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <ShippingInformationForm shippingFormState={shippingFormState} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <BillingInformationForm billingFormState={billingFormState} flagState={flagState} />
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                        <Button variant="contained" color="primary" onClick={handleSubmit}  style={{position:"relative" , bottom:"50px"}}>Submit</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

export default CombinedForm;