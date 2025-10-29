// /pages/products/[slug].js

import products from "@/data/products"; // <-- use local data file

export async function getStaticPaths() {
  const paths = products.map((p) => ({
    params: { slug: p.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 60,
  };
}

export default function ProductDetail({ product }) {
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
