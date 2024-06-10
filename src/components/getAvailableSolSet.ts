"use server";
import connectDB from "@/config/database.js";
import codeModel from "@/models/codeModel.js";


async function GetAvailSolSet() : Promise<string>{
    try {
        await connectDB();

        const list = await codeModel.aggregate([{ $project: { PID: 1  , _id : 0} }]);
        const arr : string[] = list.map( (element) => element.PID ); 
        return arr.toString();
    
    } catch (error) {
        console.error(error);
    }

    return "" ;
}

export default GetAvailSolSet;
