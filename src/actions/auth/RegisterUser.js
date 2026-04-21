"use server";
import dbConnect, { collectionObj } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export const RegisterUser = async (payload) => {
  try {
    const { email, password, name, role } = payload;

    // 1. Validation
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }

    // 2. Security Guard: Prevent public 'admin' registration
    // Even if a user manipulates the frontend to send 'admin', we force it to 'user'
    let assignedRole = role;
    if (assignedRole === "admin") {
      assignedRole = "user";
    }

    // Default to 'user' if role is missing or invalid
    const validRoles = ["user", "seller"];
    if (!validRoles.includes(assignedRole)) {
      assignedRole = "user";
    }

    const userCollection = await dbConnect(collectionObj.userCollection);

    // 3. Check if user already exists
    const existingUser = await userCollection.findOne({ email: email });
    if (existingUser) {
      return {
        success: false,
        message: "User already exists with this email.",
      };
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Insert User with Role
    const result = await userCollection.insertOne({
      name,
      email,
      role: assignedRole,
      password: hashedPassword,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: `Registered successfully as a ${assignedRole}!`,
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      message: "Internal server error. Please try again.",
    };
  }
};
