"use server";
import dbConnect, { collectionObj } from "@/lib/dbConnect";
import React from "react";

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

    const result = await userCollection.insertOne({
      email,
      password,
      name,
      createdAt: new Date(),
    });

    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: error.message };
  }
};
