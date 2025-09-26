import dbConnect, { collectionObj } from "@/lib/dbConnect";

export async function GET() {
  try {
    const productCollection = await dbConnect(collectionObj.productCollection);
    const products = await productCollection.find({}).toArray();

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
    const { name, category, price, description, image, stock } = body;

    if (!name || !category || !price || !description || !stock) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const productCollection = await dbConnect(collectionObj.productCollection);

    const result = await productCollection.insertOne({
      name,
      category,
      price,
      description,
      image,
      stock,
      createdAt: new Date(),
    });

    return new Response(
      JSON.stringify({ success: true, id: result.insertedId }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return new Response(JSON.stringify({ error: "Failed to add product" }), {
      status: 500,
    });
  }
}
