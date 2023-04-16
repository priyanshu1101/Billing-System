import billingModel from "../model/billingModel.js";
import shipingModel from "../model/shipingModel.js";

export const fetchData = async (req,res)=>{
    const billingData = await billingModel.find();
    const shipingData = await shipingModel.find();
    res.send({billingData,shipingData});
};
export const postData = async (req,res)=>{
    try {
        const {shiping,billing}=req.body;
        const allData = await shipingModel.find();
        const id = allData.length+1;
        await (new shipingModel({...shiping,id:id})).save();
        await (new billingModel({...billing,id:id})).save();
        res.send("Add Successfully");
    } catch (error) {
        console.log(error);
        res.send("Couldn't add due to some error");
    }
};