"use server";
import dbConnect, { collectionObj } from "@/lib/dbConnect";
import React from "react";
import bcrypt from "bcrypt";

export const RegisterUser = async (payload) => {
  try {
    const { email, password, name } = payload;
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }

    const userCollection = await dbConnect(collectionObj.userCollection);
    const existingUser = await userCollection.findOne({ email: email });
    if (existingUser) {
      return { success: false, message: "User already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await userCollection.insertOne({
      name,
      email,
      role: "user",
      password: hashedPassword,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "User registered successfully.",
      id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: error.message };
  }
};
