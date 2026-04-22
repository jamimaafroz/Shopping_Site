import dbConnect, { collectionObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getToken } from "next-auth/jwt";

export async function PATCH(req, { params }) {
  try {
    // THE FIX: Add the secret here just like we did in the GET route!
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    console.log("BACKEND SESSION CHECK (PATCH):", token);

    if (!token || token.role !== "admin") {
      return new Response(
        JSON.stringify({ error: "Unauthorized. Admin access only." }),
        { status: 403 },
      );
    }

    // 2. PARSE DATA
    const { id } = await params; // Note: In Next.js 15, params must be awaited!
    const { role } = await req.json();

    // 3. VALIDATION
    const validRoles = ["user", "seller", "admin"];
    if (!validRoles.includes(role)) {
      return new Response(JSON.stringify({ error: "Invalid role provided." }), {
        status: 400,
      });
    }

    // 4. DATABASE UPDATE
    const usersCollection = await dbConnect(collectionObj.userCollection);
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { role, updatedAt: new Date() } },
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "User not found." }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update user role." }),
      { status: 500 },
    );
  }
}
