// /pages/products/[slug].js

export async function getStaticPaths() {
  // Dynamically get product slugs for SSG
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/products`);
  const products = await res.json();

  const paths = products.map((p) => ({
    params: { slug: p.slug },
  }));

  return { paths, fallback: "blocking" }; // ISR fallback
}

export async function getStaticProps({ params }) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
      : "http://localhost:3000");

  try {
    const res = await fetch(`${baseUrl}/api/products/${params.slug}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${params.slug}`);
    }

    const product = await res.json();

    return {
      props: { product },
      revalidate: 60, // ISR every 60s
    };
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return { notFound: true };
  }
}

export default function ProductDetail({ product }) {
  if (!product) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>❌ Product not found</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={product.image || "/images/placeholder.jpg"}
        alt={product.name}
        style={{
          width: "100%",
          height: "350px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      />
      <h1>{product.name}</h1>
      <p style={{ fontSize: "18px", color: "#555" }}>{product.description}</p>
      <p style={{ fontWeight: "bold", fontSize: "20px" }}>₹{product.price}</p>
      <p style={{ color: "#888" }}>Category: {product.category}</p>
      <p style={{ color: product.inventory > 0 ? "green" : "red" }}>
        {product.inventory > 0
          ? `${product.inventory} in stock`
          : "Out of stock"}
      </p>
    </div>
  );
}
