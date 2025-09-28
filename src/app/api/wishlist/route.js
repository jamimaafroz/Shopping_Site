import dbConnect, { collectionObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId, productId, userEmail } = body;

    if (!userId || !productId || !userEmail) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const wishlistCollection = await dbConnect(collectionObj.wishCollection);
    const exist = await wishlistCollection.findOne({
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
    });

    if (exist) {
      return new Response(
        JSON.stringify({ error: "Product already in wishlist" }),
        { status: 400 }
      );
    }
    const result = await wishlistCollection.insertOne({
      userId: new ObjectId(userId),
      userEmail,
      productId: new ObjectId(productId),
      addedAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add to wishlist" }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("userEmail");

    if (!userEmail) {
      return new Response(
        JSON.stringify({ error: "userEmail query parameter is required" }),
        { status: 400 }
      );
    }

    const wishlistCollection = await dbConnect(collectionObj.wishCollection);
    const wishlistItems = await wishlistCollection
      .find({ userEmail })
      .toArray();

    return new Response(JSON.stringify(wishlistItems), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch wishlist" }), {
      status: 500,
    });
  }
}
