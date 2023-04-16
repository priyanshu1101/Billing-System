import mongoose from "mongoose";

const shipingSchema = mongoose.Schema({
    id:Number,
    firstName : String,
    lastName : String,
    companyName : String,
    address : String,
    address2 : String,
    pincode : Number,
    city : String,
    state : String,
    phone : Number
})

export default mongoose.model("Shipping",shipingSchema);