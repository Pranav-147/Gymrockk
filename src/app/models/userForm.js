import mongoose from "mongoose";
const userFormSchema = new mongoose.Schema({
    name:String,
    formDate:String,
})
const userForm=mongoose.models.userForms||mongoose.model('userForms',userFormSchema);
export default userForm;