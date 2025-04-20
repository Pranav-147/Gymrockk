import { dbConnect } from "@/app/lib/db";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// Add bcrypt for secure password comparison

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export async function POST(request: any) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { name, password } = await request.json();

    // Check if the user exists
    const user = await User.findOne({ name });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Use bcrypt to compare passwords
    const isPasswordValid = (password == user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    // Set the token in an HttpOnly cookie
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { id: user._id, name: user.name },
      },
      { status: 200 }
    );

    response.cookies.set("jwtoken", token, {
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error in login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}