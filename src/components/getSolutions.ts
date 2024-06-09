"use server";
import codeModel from "@/models/codeModel.js";
import connectDB from "@/config/database.js";

interface mongooseObject {
    PID: string;
    Code: string;
    Title: string;
    _id: any;
}

async function getSolution(PID : string): Promise<string> { 
    // extract code from the database mongodb
    try {
        await connectDB();
        const code : mongooseObject | null = await codeModel.findOne({PID: PID});
        
        if (code === null) {
            console.error("Error: Code cannot be fetched for PID = ", PID , " from the database , file: getSolution.ts");
            return "Error: Code cannot be fetched";
        }

        return code.Code;
    
    }
    catch (err ) {
        console.error(err);
    }
    return "Error: Code cannot be fetched";
}

export default getSolution;