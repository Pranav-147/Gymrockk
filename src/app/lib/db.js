import mongoose from "mongoose";
global.mongoose={
    conn:null,
    promise:null
}

export async function dbConnect(){
    if(global.mongoose && global.mongoose.conn){
        console.log('connected from prev');
        return global.mongoose.conn;
    }
    else{
        const conString = "mongodb+srv://renik:25742004@cluster0.yixvr.mongodb.net/";
        const promise= mongoose.connect(conString,{
            autoIndex:true,
        });
        global.mongoose={
            conn:await promise,
            promise,
        };
        console.log("Newly connected");
        return await promise;
    }


}