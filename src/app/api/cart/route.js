import dbConnect, { collectionObj } from "@/lib/dbConnect";

// Next.js App Router: /api/cart
export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("userId");
  const cartCollection = dbConnect(collectionObj.cartCollection);

  const cart = await cartCollection.findOne({ userId });
  return new Response(JSON.stringify({ items: cart?.items || [] }), {
    status: 200,
  });
}

export async function POST(req) {
  const { userId, product } = await req.json();
  const cartCollection = dbConnect(collectionObj.cartCollection);

  const existingCart = await cartCollection.findOne({ userId });

  if (existingCart) {
    const index = existingCart.items.findIndex(
      (item) => item.productId === product._id
    );

    if (index > -1) {
      existingCart.items[index].quantity += 1; // increment quantity
    } else {
      existingCart.items.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    await cartCollection.updateOne(
      { userId },
      { $set: { items: existingCart.items } }
    );
  } else {
    await cartCollection.insertOne({
      userId,
      items: [
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        },
      ],
    });
  }

  return new Response(JSON.stringify({ message: "Added to cart" }), {
    status: 200,
  });
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const productId = searchParams.get("productId");

  const cartCollection = dbConnect(collectionObj.cartCollection);

  const cart = await cartCollection.findOne({ userId });
  if (!cart)
    return new Response(JSON.stringify({ message: "Cart not found" }), {
      status: 404,
    });

  const updatedItems = cart.items.filter(
    (item) => item.productId !== productId
  );
  await cartCollection.updateOne({ userId }, { $set: { items: updatedItems } });

  return new Response(JSON.stringify({ message: "Removed from cart" }), {
    status: 200,
  });
}
