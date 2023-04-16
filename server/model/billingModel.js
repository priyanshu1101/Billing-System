import mongoose from "mongoose";

const billingSchema = mongoose.Schema({
    id:Number,
    firstName : String,
    lastName : String,
    companyName : String,
    address : String,
    address2 : String,
    pincode : Number,
    city : String,
    state : String,
    phone : Number,
    GSTNumber : String
})
export default mongoose.model("Billing",billingSchema)