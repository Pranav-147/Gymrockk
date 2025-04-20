import { dbConnect } from "@/app/lib/db";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

export async function POST(request:any){
    try {
        await dbConnect();
        const {name,password} =await request.json();
        const newUser=new User({name,password});
        await newUser.save();
        return NextResponse.json(newUser,{status:201});

    } catch (error) {
        console.log(error);
    }
}