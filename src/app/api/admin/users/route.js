import dbConnect, { collectionObj } from "@/lib/dbConnect";
import { getToken } from "next-auth/jwt";

export async function GET(req) {
  try {
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token || token.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized. Admin access only." }),
        { status: 403 },
      );
    }

    // THE FIX: Connect to the collection directly!
    const usersCollection = await dbConnect(collectionObj.userCollection);
    const users = await usersCollection
      .find({})
      .project({ password: 0 })
      .toArray();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
