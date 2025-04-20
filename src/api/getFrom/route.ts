import mongoose from "mongoose";
import { dbConnect } from "@/app/lib/db";
import userForm from "@/app/models/userForm";
import { NextResponse } from "next/server";

export async function POST(request:any) {
  try {
    // Establish database connection
    await dbConnect();

    // Parse the request body
    const { name } = await request.json(); // Parse JSON from the request body

    // Query the database for the user
    const form = await userForm.find({ name: name });

    // Check if no results were found
    if (!form || form.length === 0) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Return the form data
    return NextResponse.json(
      {
        form: form,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
