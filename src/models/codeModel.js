import { Schema , model , models } from "mongoose";


const codeSchema = new Schema({
    PID: {
        type : String,
        required : true
    },
    Title : {
        type : String,
        required : true
    },
    Code : {
        type : String,
        required : true
    },
});

const codeModel = models.Code || model("Code", codeSchema);

export default codeModel;