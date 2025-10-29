// /pages/products/[slug].js
export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/products");
  const products = await res.json();

  const paths = products.map((p) => ({
    params: { slug: p.slug },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://localhost:3000/api/products/${params.slug}`);
  
  if (!res.ok) {
    return { notFound: true };
  }

  const product = await res.json();

  return {
    props: { product },
    revalidate: 60, // ISR: Regenerate every 60 seconds
  };
}

export default function ProductDetail({ product }) {
  if (!product) return <h2>Product not found.</h2>;

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>{product.name}</h1>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "250px", borderRadius: "8px", margin: "20px 0" }}
      />
      <p>{product.description}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>In Stock:</strong> {product.inventory}</p>
    </div>
  );
}
