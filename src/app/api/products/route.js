import dbConnect, { collectionObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    // 1. Check for email in query parameters (e.g., /api/products?email=test@test.com)
    const { searchParams } = new URL(req.url);
    const sellerEmail = searchParams.get("email");

    const productCollection = await dbConnect(collectionObj.productCollection);

    // 2. If email exists, filter by it; otherwise, return everything
    const query = sellerEmail ? { sellerEmail } : {};
    const products = await productCollection.find(query).toArray();

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch products" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    // 3. Destructure sellerEmail and sellerName from the request body
    const {
      name,
      category,
      price,
      description,
      image,
      stock,
      sellerEmail,
      sellerName,
    } = body;

    if (
      !name ||
      !category ||
      !price ||
      !description ||
      !stock ||
      !sellerEmail
    ) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields, including Seller identity",
        }),
        { status: 400 },
      );
    }

    const productCollection = await dbConnect(collectionObj.productCollection);

    const result = await productCollection.insertOne({
      name,
      category,
      price: parseFloat(price), // Ensure price is a number
      description,
      image,
      stock: parseInt(stock), // Ensure stock is a number
      sellerEmail, // Linked to the user's account
      sellerName, // Display name of the store/seller
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
    });
  }
}
